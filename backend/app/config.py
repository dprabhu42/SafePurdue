# backend/app/config.py

import os

ENV = os.getenv("ENV", "development").lower()

# In Codespaces, your frontend is usually https://<something>-3000.app.github.dev
# Set FRONTEND_ORIGIN to that exact URL if you want strict CORS.
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

# For dev, allow all origins to stop CORS from blocking fetch.
# For prod, set FRONTEND_ORIGIN and restrict to it.
if ENV == "production":
    CORS_ALLOW_ORIGINS = [FRONTEND_ORIGIN]
else:
    CORS_ALLOW_ORIGINS = ["*"]  # dev-friendly

TOP_K_RESOURCES = int(os.getenv("TOP_K_RESOURCES", "5"))
