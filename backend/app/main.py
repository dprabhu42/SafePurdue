"""
main.py
------
FastAPI entry point.

Design goal:
- Define request/response models,
- Define API routs,
- Delegate logic to safety + rules modules.

Why:
- Easier to test: your real logic lives in pure functions in other files.
- Reduces risk of side-effects and makes refactors safe.
"""

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

from app.safety import detect_crisis, build_crisis_response
from app.rules import handle_request

app = FastAPI(
    title = "SafePurdue Backend",
    version = "0.1.0",
)

class AskRequest(BaseModel):
    """
    The request body for POST /ask.

    message: the user's free-text input
    hour: optional context fro the UI clock (0-120)
        If provided, ranking can be adjusted to match the time window.
    """
    message: str
    hour: Optional[int] = None

@app.get("/health")
def health():
    """
    Simple health endpoint to confirm the service is running.
    Useful for front-end dec and automated deployment checks. 
    """
    return {"status": "ok"}

@app.post("/ask")
def ask(req: AskRequest):
    """
    Main decision-support endpoint.

    Flow (always determinstic):
    1) Safety gate: if crisis language is detected, return crisis routing response. 
    2) Otherwise classify intent + rank resources using rules engine.

    Note: 
    - We do NOT persist anything.
    - We do NOT log sensitive content by default.
    - We do NOT generate advice; we return options + resources.
    """

    # Safety check first (high priority)
    if detect_crisis(req.message):
        # Crisis response should include:
        # - supporitve text
        # - crisis resources
        # - a flag so UI can render a different style if needed
        return build_crisis_response()
    # Non-crisis: run rules engine (intent + top 5)
    return handle_request(message=req.message, hour=req.hour)