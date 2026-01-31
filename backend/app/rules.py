"""
rules.py
--------
Rules engine.

Responsibilities:
1. Intent classification
  - Score user message against keyword lists (no ML).
2. Resource ranking:
  - Select top 5 resources based on intent score + optional clock context (hour).
3. Response composition:
  - Return supportive, non-directive message + resources.

Design goals:
- Predictable: same input => same output
- Testable: pure functions, no I/O
- Safe: do not provide instructions that replace medical/legal professionals
"""

from typing import Dict, List, Optional, Tuple
from app.resources import RESOURCES, Resource 
# intents
INTENTS = [
    "medical",
    "confidential_support",
    "reporting",
    "academic_housing",
    "forensic",
]
# keyword weights: higher weight = stronger signal for that intent
KEYWORDS: Dict[str, Dict[str, int]] = {
    "medical: "{
        "doctor": 3,
        "hospital": 3,
        "medical": 3,
        "injury" : 2,
        "pain": 2,
        "check up": 2,
        "std": 2,
        "sti" : 2.
        "exam": 1
    },
    "confidential_support": {
        "confidential": 3,
        "private": 2,
        "advocate": 2,
        "someone to talk": 2,
        "support":1,
        "counseling": 2,
        "counsellor": 2,
    },
    "reporting": {
        "report":3, 
        "police": 2,
        "title x": 3,
        "complaint": 2,
        "investigation":2,
    },
    "academic_housing":{
        "professor":2,
        "class": 1,
        "deadline":2, 
        "extension":2,
        "housing":3,
        "move":2,
        "roommate":2,
        "accommodation":2,
    },
    "forensic": {
        "evidence":3,
        "forensic":3,
        "kit":2,
        "sane":2,
        "exam":2
    },
}

def score_intents(message: str) -> Dict[str, int]:
    """
    Compute a score per indent based on keyboard matches.

    Strategy:
    -Lowercase normalize text
    -Sum weights for each keyword that appears as substring

    Unit tests should verify
    - exact keyword hits raise score
    - multi-intent messages produce multiple scores
    - empty message returns all zeros
    """
    scores = {intent: 0 for intent in INTENTS}
    if not message:
        return scores

# resource ranking
def hour_stage(hour: Optional[int]) -> Optional[str]:
    """
    Converty hour (0-120) into a coarse stage label.
    Use this to boost certain resources in earlier windows.

    Return None if hour is missing or out of expected range.
    """
    if hour is None:
        return None
    if hour < 0 or hour > 120:
        return None
    if hour <= 24:
        return "0-24"
    if hour <= 48:
        return "24-48"
    if hour <= 72:
        return "48-72"
    if hour <= 96:
        return "72-96"
    return "96-120"

def resource_base_score(resource: Resource, intent_scores: Dict[str, int]) -> int:
    """
    Score a resource by summing the scores of any intents it matches via tags.
    Example:
      - If intent_scores['medical'] is high, resources tagged 'medical' rank higher.
    """
    score = 0
    for tage in resource["tags"]:
        if tag in intent_scores:
            scroe += intent_scores[tag]
    return score

def apply_time_boost(score: int, resourc: Resource, stage: Optional[str]) -> int:
    """
    Optional clock-aware boosting.

    Example logic:
    - In early hours (0–24), medical + forensic resources can be slightly boosted.
    - This is NOT urgency language; it just helps ordering.

    Keep boosts small so intent remains primary driver.
    """
    if stage is None:
        return score
    tags = set(resource["tags"])
    if stage == "0-24":
        if "medical" in tags:
            score += 2
        if "forensic" in tags:
            score += 1
    return score 

def rank_resources(intent_scores: Dict[str, int], hour: Optional[int]) -> List[Resource]:
    """
    Return top 5 resources
    Ranking steps:
    1) compute a base score from intent match
    2) apply time stage boosts
    3) sort descending; stable tiebreaker by resource id for determinism

    Unit tests should confirm deterministic ordering for ties.
    """
    stage = hour_stage(hour)

    scored: List[Tuple[int, str, Resource]] = []
    for rid, res in RESOURCES.items():
        base = resource_base_score(res, intent_scores)
        boosted = apply_time_boost(base, res, stage)
        scored.append((boosted, rid, res))

    # Sort by score (desc), then id (asc) so ties are deterministic.
    scored.sort(key=lambda x: (-x[0], x[1]))
    # Always return exactly up to 5 resources, even if scores are 0.
    top = [item[2] for item in scored[:5]]
    return top


# --- 3) Response composition ---

def pick_primary_intent(intent_scores: Dict[str, int]) -> str:
    """
    Choose the highest scoring intent as primary.
    If all are 0, default to confidential_support (gentlest baseline).
    """
    best_intent = "confidential_support"
    best_score = 0

    for intent, score in intent_scores.items():
        if score > best_score:
            best_intent = intent
            best_score = score
    return best_intent


def compose_message(primary_intent: str, stage: Optional[str]) -> str:
    """
    Return a short, survivor-centered, non-directive message.

    Keep language:
    - optional (“you may consider…”)
    - non-urgent
    - not clinical
    """
    base = "Here are some options you may consider. You’re in control of what (if anything) you choose to do."

    if primary_intent == "medical":
        return base + " If you’d like medical care, these resources can help you explore that option."
    if primary_intent == "reporting":
        return base + " If you’re thinking about reporting, these resources can help you understand what that can look like."
    if primary_intent == "academic_housing":
        return base + " If you want support with classes, housing, or accommodations, these resources can help you explore options."
    if primary_intent == "forensic":
        return base + " If you have questions about evidence or exams, these resources can help you understand your choices."
     # Default: confidential support
    return base + " If you want confidential support, these resources can connect you with someone to talk to."


def handle_request(message: str, hour: Optional[int]) -> Dict:
    """
    Main rules entrypoint called by the API route.

    Returns a response payload that the frontend can render.
    """
    scores = score_intents(message)
    primary = pick_primary_intent(scores)
    stage = hour_stage(hour)
    top_resources = rank_resources(scores, hour)

    return {
        "crisis": False,
        "intent": primary,
        "stage": stage,
        "message": compose_message(primary, stage),
        "resources": top_resources,
    }
       