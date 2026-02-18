# backend/app/config.py

import os
from types import SimpleNamespace

ENV = os.getenv("ENV", "development").lower()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

if ENV == "production":
    CORS_ALLOW_ORIGINS = [FRONTEND_ORIGIN]
else:
    CORS_ALLOW_ORIGINS = ["*"]

TOP_K_RESOURCES = int(os.getenv("TOP_K_RESOURCES", "5"))

# ✅ Add this so `from app.config import settings` works
settings = SimpleNamespace(
    env=ENV,
    frontend_origin=FRONTEND_ORIGIN,
    cors_allow_origins=CORS_ALLOW_ORIGINS,
    top_k_resources=TOP_K_RESOURCES,
)

