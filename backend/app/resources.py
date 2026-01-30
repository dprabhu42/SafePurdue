"""
resources.py
-----------
Resource catalog for SafePurdue.
Design goal:
- Single source of truth for resources (IDs + metadata).
- Backend returns resources by referencing this catalog.
- Frontend should display whatever backend returns (avoid duplicating resource data in two places)

IMPORTANT:
Since SafePurdue is campus-grounded, resource details should be accurate.
You can keep URLs/phones here. (Optional: move into config if you want environment overrides.)
"""
from typing import Dict, List, TypedDict

class Resources(TypedDict):
    """
    Resource shape returned to the frontend.

    id: stable unique identifier (used in ranking + timeline references)
    name: display name
    description: short, non-urgent description
    tags: used for intent matching (medical, confidential_support, reporting, academic_housing, etc.)
    contact: optional contact methods
    """
    id: str
    name: str
    description: str
    tags: List[str]
    contact: Dict[str, str]

# NOTE: Tags should be consistent across the project.
# Recommended tag set:
# - "medical"
# - "confidential_support"
# - "reporting"
# - "academic_housing"
# - "forensic"
# - "crisis"
RESOURCES: Dict[str, Resource] = {
    "care": {
        "id": "care",
        "name": "CARE (Confidential Advocacy)",
        "description": "Confidential support and advocacy to help you understand options.",
        "tags": ["confidential_support", "support"],
        "contact": {"note": "Purdue campus confidential advocacy resource"},
    },
    "caps": {
        "id": "caps"
        "name": "CAPS (Counseling)",
        "description": "Counseling and mental health support for students.",
        "tags": ["support"],
        "contact": {"note": "Purdue conseling services"},
    },
    "push": {
        "id": "push"
        "name": "PUSH (Medical Care)",
        "description": "Medical care and health services for students."
        "tags": ["medical"],
        "contact": {"note": "Purdue student health"},
    },
    "odos": {
        "id": "odos",
        "name": "Office of the Dean of Students",
        "description": "Academic support, accommodations, and help navigate campus processes.",
        "tags": ["academic_housing"],
        "contact": {"note": "Academic and student support office"},
    },
    "titleix": {
        "id": "titleix",
        "name": "Title IX (Optional Reporting)",
        "description": "Information about reporting options and supportive measures.",
        "tags": ["reporting"],
        "contact": {"note": "Purdue Title IX office"},
    },
}
def get_all_resources() -> List[Resource]:
    """Convenience helper if you ever need to list everything."""
    return list(RESOURCES.values())
    