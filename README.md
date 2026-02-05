🛡️ SafePurdue

A survivor-centered decision-support tool for Purdue students

SafePurdue is a non-directive, survivor-centered chatbot and timeline interface designed to help students explore medical, forensic, academic, and reporting options after sexual assault — without pressure, deadlines, or requirements.

SafePurdue does not tell users what to do.
It helps users understand what options exist, when they may be available, and where to find support on campus, so they can make decisions on their own terms.

🌱 Core Principles

Choice & agency — all actions are optional

Privacy first — support does not require reporting

No urgency language — no countdowns or pressure

Trauma-informed design — supportive, non-judgmental responses

Campus-grounded — resources tailored specifically to Purdue University

✨ Key Features
⏱️ 5-Day Interactive Clock (0–120 Hours)

The first several days after an incident can matter for health care and forensic options — if those options matter to the survivor.

SafePurdue presents this window using a visual clock interface to inform, not impose deadlines.

Features:

Covers the first 0–120 hours after an incident

Each hour slice is clickable and reveals:

medical care options (e.g., injury assessment, STI prevention)

forensic considerations (if the survivor chooses)

confidential and non-confidential support resources

Design emphasis:

Earlier care can expand options

Choosing not to pursue care is always valid

Support does not disappear after this window

Some medical and forensic options are most effective within the first several days, but choosing not to pursue them — or pursuing support later — is always valid.

📅 Post-120-Hour Recovery Timeline

After the initial window, SafePurdue shifts focus to ongoing care and support.

The recovery timeline is displayed as a calendar-style visual, with expandable sections beneath it.

Structure:

Daily → weekly → monthly

Highlights:

Follow-up medical care

Counseling and advocacy

Academic and housing accommodations

Optional reporting pathways

Reinforces that:

There is no expiration on seeking help

Survivors can re-engage with support at any time

💬 SafePurdue Chatbot

SafePurdue includes a rule-based chatbot designed to provide predictable, low-risk support.

The chatbot:

Detects user intent (medical, confidential support, reporting, academic/housing, crisis)

Ranks and returns the top 5 most relevant Purdue resources

Responds using survivor-centered, non-directive language

Design choices:

No vector database

No document scraping

No generative advice beyond predefined responses

This keeps the system:

Testable

Transparent

Resistant to hallucination

Intentionally limited in scope

📍 Campus Resource Matching

Based on what a user shares, SafePurdue may surface Purdue-specific resources, including:

CARE (Confidential Advocacy)

CAPS (Counseling and Psychological Services)

PUSH (Medical Care)

Office of the Dean of Students

Title IX (optional reporting)

988 Suicide & Crisis Lifeline (when appropriate)

Resources are suggested, never required.

🚨 Safety & Crisis Routing

SafePurdue includes a safety check for crisis language.

If a message indicates immediate danger or self-harm risk, the system:

Pauses standard resource ranking

Prioritizes crisis support resources

Encourages reaching out to immediate help

SafePurdue does not attempt crisis intervention itself.

🔒 Data & Privacy

No user accounts

No long-term message storage

No analytics or tracking of individual users

No reporting initiated through the tool

SafePurdue is designed to provide information, not surveillance.

🚫 What SafePurdue Is Not

❌ Not therapy

❌ Not a reporting system

❌ Not a substitute for medical or legal professionals

❌ Not a crisis hotline (but it will point users to one when needed)

🧠 How the Chatbot Works

SafePurdue uses a deterministic rules engine.

Flow:

User enters a message

Safety check for crisis language

Intent classification (keyword + scoring)

Resource ranking using predefined priority rules

Output:

A supportive response

The top 5 relevant resources

This architecture:

Minimizes hallucination risk

Keeps responses within ethical scope

Supports unit testing of intent and ranking behavior

🗂️ Project Structure
safepurdue/
├── frontend/                      # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # main UI (clock + calendar + chat panel)
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── Clock.tsx          # SVG clock with clickable hour slices
│   │   │   ├── StagePanel.tsx     # dropdown text for selected time slice
│   │   │   ├── AskSafePurdue.tsx  # chatbot input + API call
│   │   │   └── ResourceList.tsx   # top 5 ranked resources
│   │   ├── data/
│   │   │   └── timeline.ts        # structured timeline data
│   │   └── lib/
│   │       └── api.ts             # frontend → backend calls
│   └── package.json
│
├── backend/                       # FastAPI (rules engine)
│   ├── app/
│   │   ├── main.py                # /ask, /health routes
│   │   ├── safety.py              # crisis detection + routing
│   │   ├── rules.py               # intent detection + ranking logic
│   │   ├── resources.py           # Purdue resource catalog
│   │   └── config.py              # settings
│   ├── requirements.txt
│   └── README.md
│
└── README.md                      # repository overview
