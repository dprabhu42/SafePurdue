"""
resources.py
------------
Resource catalog for SafePurdue.
Single source of truth for IDs + metadata.
"""

from typing import Dict, List, TypedDict


class Resource(TypedDict):
    id: str
    name: str
    description: str
    tags: List[str]
    contact: Dict[str, str]


RESOURCES: Dict[str, Resource] = {
    "care": {
        "id": "care",
        "name": "CARE (Confidential Advocacy)",
        "description": "Confidential support and advocacy to help you understand options.",
        "tags": ["confidential_support", "support"],
        "contact": {"note": "Purdue confidential advocacy resource"},
    },
    "caps": {
        "id": "caps",
        "name": "CAPS (Counseling)",
        "description": "Counseling and mental health support for students.",
        "tags": ["support"],
        "contact": {"note": "Purdue counseling services"},
    },
    "push": {
        "id": "push",
        "name": "PUSH (Medical Care)",
        "description": "Medical care and health services for students.",
        "tags": ["medical"],
        "contact": {"note": "Purdue student health"},
    },
    "odos": {
        "id": "odos",
        "name": "Office of the Dean of Students",
        "description": "Academic support, accommodations, and help navigating campus processes.",
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
    return list(RESOURCES.values())
