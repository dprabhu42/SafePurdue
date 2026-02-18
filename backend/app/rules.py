# backend/app/rules.py

from __future__ import annotations

from typing import Dict, List


INTENTS = [
    "medical",
    "forensic",
    "confidential_support",
    "reporting",
    "academic_housing",
    "crisis",
    "general",
]

# keyword weights per intent
KEYWORDS: Dict[str, Dict[str, int]] = {
    "medical": {
        "medical": 3,
        "doctor": 3,
        "hospital": 3,
        "clinic": 3,
        "push": 4,
        "injury": 3,
        "pain": 2,
        "bleeding": 3,
        "sti": 3,
        "std": 3,
        "pregnancy": 3,
        "test": 2,
        "testing": 2,
        "exam": 2,
        "care": 1,
        "medicine": 2,
    },
    "forensic": {
        "forensic": 4,
        "rape kit": 5,
        "sane": 4,
        "evidence": 4,
        "kit": 2,
        "exam": 2,
        "collection": 3,
        "preserve": 2,
        "report later": 2,
    },
    "confidential_support": {
        "confidential": 5,
        "privacy": 4,
        "care": 4,
        "advocate": 3,
        "advocacy": 3,
        "counseling": 2,
        "caps": 4,
        "talk to someone": 3,
        "support": 2,
    },
    "reporting": {
        "report": 4,
        "title ix": 5,
        "police": 4,
        "investigation": 3,
        "complaint": 3,
        "formal": 2,
        "conduct": 2,
        "who do i tell": 2,
    },
    "academic_housing": {
        "class": 2,
        "classes": 2,
        "professor": 2,
        "extension": 3,
        "absence": 3,
        "missed": 2,
        "accommodation": 4,
        "accommodations": 4,
        "housing": 4,
        "room": 2,
        "dorm": 2,
        "move": 2,
        "odos": 4,
        "dean of students": 4,
    },
    "crisis": {
        "suicide": 10,
        "kill myself": 10,
        "self harm": 10,
        "hurt myself": 10,
        "end my life": 10,
        "immediate danger": 10,
        "in danger": 8,
        "911": 8,
        "988": 8,
    },
}


def _score_text(text: str, vocab: Dict[str, int]) -> int:
    t = text.lower()
    score = 0
    for phrase, weight in vocab.items():
        if phrase in t:
            score += weight
    return score


def classify_intent(text: str) -> str:
    """
    Deterministic intent classifier using keyword scoring.
    Returns one of:
      medical, forensic, confidential_support, reporting, academic_housing, crisis, general
    """
    t = (text or "").strip()
    if not t:
        return "general"

    scores = {intent: _score_text(t, KEYWORDS[intent]) for intent in KEYWORDS.keys()}
    best_intent = max(scores, key=scores.get)
    best_score = scores[best_intent]

    # If nothing matched, keep it general
    if best_score <= 0:
        return "general"

    return best_intent


def rank_resources(intent: str, user_text: str, catalog: List[dict]) -> List[dict]:
    """
    Rank resources deterministically.
    Inputs:
      - intent: intent string
      - user_text: user message (optional additional boosts)
      - catalog: list of resource dicts with at least: name, tags, base_weight
    Output:
      - sorted list of resource dicts (desc score)
    """
    t = (user_text or "").lower()
    intent = intent if intent in INTENTS else "general"

    ranked = []
    for r in catalog:
        base = int(r.get("base_weight", 0))
        tags = [str(x).lower() for x in r.get("tags", [])]

        score = base

        # boost if resource tag matches intent
        if intent in tags:
            score += 50

        # soft boosts based on common terms
        name = str(r.get("name", "")).lower()
        desc = str(r.get("description", "")).lower()

        if "confidential" in t and ("confidential_support" in tags or "care" in name):
            score += 10
        if "medical" in t and "medical" in tags:
            score += 10
        if "report" in t and "reporting" in tags:
            score += 10
        if ("class" in t or "housing" in t or "accommodation" in t) and "academic_housing" in tags:
            score += 10
        if ("crisis" in tags) and ("suicide" in t or "kill myself" in t or "self harm" in t):
            score += 100

        ranked.append({**r, "_score": score})

    ranked.sort(key=lambda x: x["_score"], reverse=True)
    for r in ranked:
        r.pop("_score", None)
    return ranked
     