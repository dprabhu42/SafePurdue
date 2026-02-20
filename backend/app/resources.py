# backend/app/resources.py

from __future__ import annotations

# Deterministic resource catalog used by the rules engine.
# Keep it simple + testable: name, tags, base_weight, url, description (+ optional phone/location/notes)

RESOURCE_CATALOG = [
    {
        "name": "988 Suicide & Crisis Lifeline (U.S.)",
        "tags": ["crisis"],
        "base_weight": 100,
        "url": "https://988lifeline.org/",
        "description": "Call or text 988 for immediate crisis support in the U.S. If you’re in immediate danger, call emergency services.",
        "phone": "988",
    },
    {
        "name": "Purdue CARE (Confidential Advocacy)",
        "tags": ["confidential_support", "academic_housing", "forensic"],
        "base_weight": 90,
        "url": "https://www.purdue.edu/odos/care/",
        "description": "Confidential advocacy and support. Can help you explore options without requiring reporting.",
    },
    {
        "name": "CAPS (Counseling and Psychological Services)",
        "tags": ["confidential_support", "crisis"],
        "base_weight": 75,
        "url": "https://www.purdue.edu/caps/",
        "description": "Counseling support if you want to talk to someone.",
    },
    {
        "name": "PUSH (Purdue Student Health Center)",
        "tags": ["medical", "forensic"],
        "base_weight": 80,
        "url": "https://www.purdue.edu/push/",
        "description": "Medical care and follow-up support (injury concerns, STI testing, general health questions).",
    },
    {
        "name": "Office of the Dean of Students (ODOS)",
        "tags": ["academic_housing"],
        "base_weight": 70,
        "url": "https://www.purdue.edu/odos/",
        "description": "Support with academic concerns and connections to accommodations and campus support.",
    },
    {
        "name": "Title IX Office (Optional Reporting)",
        "tags": ["reporting"],
        "base_weight": 65,
        "url": "https://www.purdue.edu/titleix/",
        "description": "Information about reporting options and supportive measures. Reporting is always your choice.",
    },
    {
        "name": "Purdue University Police Department (PUPD)",
        "tags": ["reporting", "crisis"],
        "base_weight": 60,
        "url": "https://www.purdue.edu/ehps/police/",
        "description": "Emergency response and law enforcement. If there is immediate danger, call 911.",
        "phone": "911 (emergency)",
    },
]