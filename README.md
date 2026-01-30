SafePurdue 🛡️

A survivor-centered decision-support tool for Purdue students

SafePurdue is a non-directive, survivor-centered chatbot and timeline interface designed to help students explore medical, forensic, academic, and reporting options after sexual assault — without pressure, deadlines, or requirements.

SafePurdue does not tell users what to do.
It helps users understand what options exist, when they may be available, and where to find support on campus, so they can make decisions on their own terms.

🌱 Core Principles

Choice & agency — all actions are optional

Privacy first — support does not require reporting

No urgency language — information is provided without countdowns or pressure

Trauma-informed design — supportive, non-judgmental responses

Campus-grounded — resources are tailored specifically to Purdue University

✨ Key Features
⏱️ 5-Day Interactive Clock (0–120 Hours)

The first several days after an incident can be important for health care and forensic options, if those options matter to the survivor.

SafePurdue presents this period using a visual clock interface to help users understand what may be available during this window — not to impose deadlines.

Covers the first 0–120 hours after an incident

Each hour slice is clickable and reveals dropdown text explaining:

medical care options (e.g., injury assessment, STI prevention)

forensic considerations (if the survivor chooses)

confidential and non-confidential support resources

Emphasizes that:

earlier care can expand options

choosing not to pursue care is always valid

support does not disappear after this window

Some medical and forensic options are most effective within the first several days, but choosing not to pursue them — or pursuing support later — is always valid.

📅 Post-120-Hour Recovery Timeline

After the initial window, SafePurdue shifts focus to ongoing care and support.

The recovery timeline is displayed as a calendar-style visual, with expandable text sections below it.

Daily → weekly → monthly structure

Highlights:

follow-up medical care

counseling and advocacy

academic and housing accommodations

optional reporting pathways

Reinforces that:

there is no expiration on seeking help

survivors can re-engage with support at any time

💬 SafePurdue Chatbot

SafePurdue includes a rule-based chatbot designed to provide predictable, low-risk support.

The chatbot:

detects user intent (medical, confidential support, reporting, academic/housing, crisis)

ranks and returns the top 5 most relevant Purdue resources

responds with survivor-centered, non-directive language

Design choices:

No vector database

No document scraping

No generative advice beyond predefined responses

This approach keeps the system:

testable

transparent

resistant to hallucination

intentionally limited in scope

📍 Campus Resource Matching

Based on what a user shares, SafePurdue may surface Purdue-specific resources such as:

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

pauses standard resource ranking

prioritizes crisis support resources

encourages reaching out to immediate help

SafePurdue does not attempt crisis intervention itself.

🔒 Data & Privacy

No user accounts

No long-term message storage

No analytics or tracking of individual users

No reporting is initiated through the tool

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

Return:

a supportive response

the top 5 relevant resources

This architecture:

minimizes hallucination risk

keeps responses within ethical scope

supports unit testing of intent and ranking behavior

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
