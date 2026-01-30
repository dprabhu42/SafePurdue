# SafePurdue 🛡️  
**A survivor-centered decision-support tool for Purdue students**

SafePurdue is a **non-directive, survivor-centered chatbot and timeline interface** designed to help students explore **medical, forensic, academic, and reporting options** after sexual assault — **without pressure, deadlines, or requirements**.

SafePurdue does **not** tell users what to do. It helps users understand **what options exist**, **when they are available**, and **where to find support on campus**.

---

## 🌱 Core Principles
- **Choice & agency** — all actions are optional  
- **Privacy first** — support does not require reporting  
- **No urgency language** — support does not expire  
- **Trauma-informed design** — supportive, non-judgmental responses  
- **Campus-grounded** — resource routing is tailored to Purdue

---

## ✨ Key Features

### ⏱️ 5-Day Interactive Clock (0–120 Hours)
- Visual hour-by-hour interface covering the first 5 days after an incident  
- Clickable time slices show:
  - medical options
  - forensic considerations
  - support resources
- Emphasizes that **nothing must be decided immediately**

### 📅 Post-120-Hour Recovery Timeline
- Daily → weekly → monthly view
- Focuses on:
  - follow-up care
  - counseling
  - academic support
  - optional reporting
- Reinforces that **support remains available months later**

### 💬 SafePurdue Chatbot (Option A — No RAG)
- A **rule-based chatbot** that:
  - detects user intent (medical, confidential support, reporting, academic/housing, crisis)
  - ranks and returns the **top 5 most relevant campus resources**
  - responds with survivor-centered, non-directive language
- **No vector database or document scraping**
- Designed to be **predictable, testable, and low-hallucination**

### 📍 Campus Resource Matching
Based on what a user shares, the chatbot surfaces relevant Purdue resources such as:
- CARE (confidential advocacy)
- CAPS (counseling)
- PUSH (medical care)
- Office of the Dean of Students
- Title IX (optional reporting)
- 988 Suicide & Crisis Lifeline (when appropriate)

---

## 🚫 What SafePurdue Is Not
- ❌ Not therapy  
- ❌ Not a reporting system  
- ❌ Not a substitute for medical or legal professionals  
- ❌ Not a crisis hotline (but it can point users to one)

---

## 🧠 How the Chatbot Works (No RAG)
SafePurdue uses a **deterministic rules engine** instead of retrieval-augmented generation.

**Flow:**
1. User enters a message  
2. Safety check for crisis language  
3. Intent classification (keyword + scoring)  
4. Resource ranking using predefined priority rules  
5. Return:
   - supportive response
   - top 5 relevant resources
   - optional time-window context (based on clicked clock stage)

This approach:
- minimizes hallucination risk
- keeps responses within scope
- supports unit testing for intent + ranking behavior

---

## 🗂️ Project Structure

```text
safepurdue/
├── frontend/                      # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # main UI (clocks + AI panel)
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── Clock.tsx          # SVG clock with clickable hour slices
│   │   │   ├── StagePanel.tsx     # shows info for clicked hour
│   │   │   ├── AskSafePurdue.tsx  # chatbot input + API call
│   │   │   └── ResourceList.tsx   # shows top 5 ranked resources
│   │   ├── data/
│   │   │   └── timeline.ts        # structured 5-day hour-by-hour data
│   │   └── lib/
│   │       └── api.ts             # frontend calls to backend
│   └── package.json
│
├── backend/                       # FastAPI (rules engine)
│   ├── app/
│   │   ├── main.py                # FastAPI routes /ask, /health
│   │   ├── safety.py              # crisis detection + safe routing
│   │   ├── rules.py               # intent detection + top-5 ranking
│   │   ├── resources.py           # Purdue resource catalog
│   │   └── config.py              # env vars & settings (optional)
│   ├── requirements.txt
│   └── README.md
│
└── README.md                      # repo overview (this file)
