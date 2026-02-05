# backend/app/main.py

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.config import settings
from app.safety import safety_check
from app.rules import classify_intent, rank_resources
from app.resources import RESOURCE_CATALOG

app = FastAPI(title="SafePurdue API", version="1.0.0")


# ✅ CORS for Codespaces + local dev
# IMPORTANT: If you use allow_origins=["*"], you must set allow_credentials=False
# Otherwise browsers can block the request and your frontend shows "Failed to fetch".
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_allow_origins),  # e.g. ["*"] in dev
    allow_credentials=False,  # ✅ FIX for "Failed to fetch" with wildcard origins
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)


class AskResponse(BaseModel):
    response: str
    intent: str
    resources: list[dict]


@app.get("/")
def root():
    return {"message": "SafePurdue backend running. Visit /docs for API docs."}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    text = req.message.strip()

    # 1) Safety check (crisis routing)
    safety = safety_check(text)
    if safety.get("is_crisis"):
        ranked = rank_resources(intent="crisis", user_text=text, catalog=RESOURCE_CATALOG)
        return {
            "response": safety.get("response", ""),
            "intent": "crisis",
            "resources": ranked[: settings.top_k_resources],
        }

    # 2) Intent classification (deterministic)
    intent = classify_intent(text)

    # 3) Resource ranking (deterministic)
    ranked = rank_resources(intent=intent, user_text=text, catalog=RESOURCE_CATALOG)

    # 4) Predefined supportive copy (deterministic)
    response_map = {
        "medical": (
            "If you’d like, I can share Purdue options for medical care and what each one can help with. "
            "You don’t have to decide anything right now."
        ),
        "forensic": (
            "If you’re considering forensic options, I can share general time-sensitive considerations and "
            "Purdue-related pathways—only if that’s something you want."
        ),
        "confidential_support": (
            "You deserve support on your terms. If you want confidential help, I can point to Purdue options "
            "that don’t require reporting."
        ),
        "reporting": (
            "If you’re considering reporting, I can outline Purdue pathways and what to expect. "
            "It’s always your choice whether to report."
        ),
        "academic_housing": (
            "If school or housing feels harder right now, there may be accommodations and support options. "
            "I can share Purdue resources that help with academics or housing."
        ),
        "general": (
            "I can help you explore support options at Purdue. If you share what you’re looking for—medical, "
            "confidential support, reporting, academics/housing—I’ll surface the most relevant resources."
        ),
    }

    return {
        "response": response_map.get(intent, response_map["general"]),
        "intent": intent,
        "resources": ranked[: settings.top_k_resources],
    }
