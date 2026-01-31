"""
config.py
---------
Centralized configuration.

You only need this if:
- you want CORS origins configurable
- you have environment flags (DEV/PROD)
- you want to avoid hardcoding hostnames/ports

If you don't need config yet, you can keep this file minimal.
"""

import os

ENV = os.getenv("ENV", "development")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
