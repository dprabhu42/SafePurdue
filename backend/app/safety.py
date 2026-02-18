# backend/app/safety.py

from __future__ import annotations

import re
from typing import Dict, Any

# Very small, conservative keyword set for crisis routing.
# This does NOT attempt intervention—only routes to crisis resources.
CRISIS_PATTERNS = [
    r"\bi want to die\b",
    r"\bkill myself\b",
    r"\bsuicide\b",
    r"\bself[- ]?harm\b",
    r"\bhurt myself\b",
    r"\bend my life\b",
    r"\bno reason to live\b",
    r"\bim in danger\b",
    r"\bi am in danger\b",
    r"\bimmediate danger\b",
]

_crisis_regex = re.compile("|".join(CRISIS_PATTERNS), re.IGNORECASE)


def safety_check(text: str) -> Dict[str, Any]:
    """
    Returns a dict:
      - is_crisis: bool
      - response: str (only if crisis)
    """
    t = (text or "").strip()
    if not t:
        return {"is_crisis": False}

    is_crisis = bool(_crisis_regex.search(t))
    if not is_crisis:
        return {"is_crisis": False}

    return {
        "is_crisis": True,
        "response": (
            "I’m really sorry you’re feeling this way. If you’re in immediate danger or might hurt yourself, "
            "please call 911 (or your local emergency number) right now. You can also call or text 988 in the U.S. "
            "to reach the Suicide & Crisis Lifeline. If you’re able, consider reaching out to someone you trust to stay with you."
        ),
    }
