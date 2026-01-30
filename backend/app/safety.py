"""
safety.py
---------
Crisis detection + safe routing.

Design goal:
- High recall: catch risky language even if it increases false positives.
- Deterministic: simple keyword/phrase matching with an extendable list.
- No clincal claims: supportive routing only.

Important:
This is NOT a mental health diagnostic tool.
It only detects signals that the user may need immediate help
and routes to crisis resources.
"""

from typing import Dict, List
# NOTE: Keep phrases lowercase so comparing with text.lower()
CRISIS_PHRASES: List[str] = [
    # Self-harm / suicide intent
    "kill myself",
    "end my life",
    "suicide",
    "i want to die",
    "hurt myself",
    "self harm",
    "self-harm",

    # Immediate danger signals
    "i'm in danger", 
    "someone is following me",
    "they are outside my door",
    "i am not safe",
    "i'm not safe",
]
def detect_crisis(text: str) -> bool:
    """
    Returns True if the input text contains crisis/danger signals.

    Implementation
    - Deterministic phrase match
    - Extend by adding to CRISIS_PHRASES

    Unit tests should include:
    - phrase found (True)
    - phrase not found (False)
    - mixed case handling
    - empty string handling
    """
    if not text:
        return False

    normalized = text.lower()
    return any(phrase in normalized for phrase in CRISIS_PHRASES)

def build_crisis_response() -> Dict:
    """
    Creates a standard crisis response payload.

    Keep this response:
    - supportive
    - non-judgemental
    - not directive beyond crisis support routing
    - minimal (avoid long paragraphs)

    The frontend can render this differently using crisis=True.
    """
    return {
        "crisis": True,
        "intent": "crisis",
        "message": (
            "Im really sorry your're going through this. "
            "If you feel in immediate danger or might hurt yourself, "
            "please call 911 (or campus emergency services) right now. "
            "If you can, reaching out to a crisis counselor can also help."

        ),
        "resources": [
            {
                "id": "988",
                "name": "988 Suicide & Crisis Lifeline",
                "description": "24/7 crisis support in the U.S",
                "tags": ["crisis"],
                "contact": {"phone": "988", "text": "988"},
            },
        ],
    }