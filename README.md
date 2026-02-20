# SafePurdue 🛡️
https://safe-purdue-gamma.vercel.app/

**A survivor-centered decision-support tool for Purdue students**

SafePurdue is a **non-directive, survivor-centered chatbot and timeline interface** designed to help students explore medical, forensic, academic, and reporting options after sexual assault — **without pressure, deadlines, or requirements**.

SafePurdue does not tell users what to do.  
It helps users understand **what options exist, when they may be available, and where to find support on campus**, so they can make decisions on their **own terms**.

---

## Core Principles

- **Choice & agency** — all actions are optional  
- **Privacy first** — support does not require reporting  
- **No urgency language** — no countdowns or pressure  
- **Trauma-informed design** — supportive, non-judgmental responses  
- **Campus-grounded** — resources tailored specifically to Purdue University  

---

## Key Features

### 5-Day Interactive Clock (0–120 Hours)

The first several days after an incident can matter for health care and forensic options — *if those options matter to the survivor*.

SafePurdue presents this period using a **visual clock interface** to help users understand what may be available during this window — **not to impose deadlines**.

**Details:**
- Covers the first **0–120 hours** after an incident  
- Each hour slice is clickable and reveals:
  - medical care options (e.g., injury assessment, STI prevention)
  - forensic considerations (if the survivor chooses)
  - confidential and non-confidential support resources  

**Emphasis:**
- Earlier care can expand options  
- Choosing not to pursue care is always valid  
- Support does not disappear after this window  

> Some medical and forensic options are most effective within the first several days, but choosing not to pursue them — or pursuing support later — is always valid.

---

### Post-120-Hour Recovery Timeline

After the initial window, SafePurdue shifts focus to ongoing care and support.

The recovery timeline is displayed as a **calendar-style visual**, with expandable text sections below it.

**Structure:**
- Daily → weekly → monthly  

**Highlights:**
- Follow-up medical care  
- Counseling and advocacy  
- Academic and housing accommodations  
- Optional reporting pathways  

**Reinforces that:**
- There is no expiration on seeking help  
- Survivors can re-engage with support at any time  

---

### SafePurdue Chatbot

SafePurdue includes a **rule-based chatbot** designed to provide predictable, low-risk support.

The chatbot:
- Detects user intent (medical, confidential support, reporting, academic/housing, crisis)
- Ranks and returns the **top 5 most relevant Purdue resources**
- Responds using survivor-centered, non-directive language  

**Design choices:**
- No vector database  
- No document scraping  
- No generative advice beyond predefined responses  

This keeps the system:
- Testable  
- Transparent  
- Resistant to hallucination  
- Intentionally limited in scope  

---

### Campus Resource Matching

Based on what a user shares, SafePurdue may surface Purdue-specific resources such as:

- CARE (Confidential Advocacy)  
- CAPS (Counseling and Psychological Services)  
- PUSH (Medical Care)  
- Office of the Dean of Students  
- Title IX (optional reporting)  
- 988 Suicide & Crisis Lifeline (when appropriate)  

Resources are **suggested, never required**.

---

### Safety & Crisis Routing

SafePurdue includes a safety check for crisis language.

If a message indicates immediate danger or self-harm risk, the system:
1. Pauses standard resource ranking  
2. Prioritizes crisis support resources  
3. Encourages reaching out to immediate help  

SafePurdue does **not** attempt crisis intervention itself.

---

## Data & Privacy

- No user accounts  
- No long-term message storage  
- No analytics or tracking of individual users  
- No reporting is initiated through the tool  

SafePurdue is designed to provide **information, not surveillance**.

---

## What SafePurdue Is Not

- Not therapy  
- Not a reporting system  
- Not a substitute for medical or legal professionals  
- Not a crisis hotline  

---

## How the Chatbot Works

SafePurdue uses a **deterministic rules engine**.

**Flow:**
1. User enters a message  
2. Safety check for crisis language  
3. Intent classification (keyword + scoring)  
4. Resource ranking using predefined priority rules  

**Returns:**
- A supportive response  
- The **top 5 relevant resources**

This architecture:
- Minimizes hallucination risk  
- Keeps responses within ethical scope  
- Supports unit testing of intent and ranking behavior  

---

## Project Structure

```txt
safepurdue/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── Clock.tsx
│   │   │   ├── StagePanel.tsx
│   │   │   ├── AskSafePurdue.tsx
│   │   │   └── ResourceList.tsx
│   │   ├── data/
│   │   │   └── timeline.ts
│   │   └── lib/
│   │       └── api.ts
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── safety.py
│   │   ├── rules.py
│   │   ├── resources.py
│   │   └── config.py
│   ├── requirements.txt
│   └── README.md
│
└── README.md
