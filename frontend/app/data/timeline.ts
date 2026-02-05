export type TimelineSection = {
  title: string;
  bullets: string[];
};

export type ClockStage = {
  id: string;
  title: string;
  focus: string;
  rangeStart: number;
  rangeEnd: number;
  medical: string[];
  forensic: string[];
  support: string[];
  reminder: string[];
};

export type TimelineHour = {
  hourIndex: number;
  label: string;
  stage: ClockStage;
};

export type RecoverySection = {
  id: string;
  title: string;
  medical: string[];
  reporting: string[];
  support: string[];
  extra?: { title: string; bullets: string[] }[];
};

export const WHAT_TO_KNOW_ALWAYS: string[] = [
  "All actions are optional and offered as suggestions, not requirements.",
  "Medical care does not require a police report.",
  "You can pause, leave, and return at any time.",
  "Support at Purdue is available regardless of when this happened.",
  "These steps are not a checklist and not the only path forward.",
  "This tool does not replace personalized support from medical or advocacy professionals.",
];

/* -------------------------
   CLOCK STAGES (0–120h)
-------------------------- */

export const CLOCK_STAGES: ClockStage[] = [
  {
    id: "0-6",
    title: "HOURS 0–6 — Immediate Safety & Stabilization",
    focus: "Safety, grounding, preserving options.",
    rangeStart: 0,
    rangeEnd: 6,
    medical: [
      "Emergency medical care is available immediately through local emergency departments.",
      "Follow-up care is available through Purdue Student Health Center (PUSH).",
      "Injuries can be treated without making any report.",
      "Treating injuries and ensuring safety are the priority.",
      "Emergency contraception may be an option during this time, depending on your body and circumstances.",
    ],
    forensic: [
      "Sexual Assault Forensic Exams (SAFE/SANE exams) are available at local hospitals.",
      "Evidence collection does not require contacting law enforcement.",
      "If preserving evidence is important to you, avoiding actions such as changing clothes, showering, brushing teeth, or using the restroom may help — only if and when you feel ready.",
    ],
    support: [
      "Confidential advocacy is available through CARE at Purdue.",
      "The 988 Suicide & Crisis Lifeline is available 24/7 by call or text.",
      "Reaching out to a trusted person can help, if you want.",
    ],
    reminder: ["Nothing needs to be decided right now.", "Your safety comes first."],
  },

  {
    id: "6-12",
    title: "HOURS 6–12 — Early Care Window",
    focus: "Preserving options while maintaining control.",
    rangeStart: 6,
    rangeEnd: 12,
    medical: [
      "Full forensic medical exams are still available.",
      "STI prevention options are available.",
      "Injury assessment remains important.",
      "Emergency contraception may still be an option for some people.",
    ],
    forensic: [
      "DNA evidence collection remains highly effective.",
      "Evidence can be stored without filing a report.",
      "Reporting remains optional and separate.",
    ],
    support: [
      "CARE can explain medical care, evidence collection, and campus options, only if you want.",
      "Crisis counseling is available through CAPS.",
    ],
    reminder: ["You are not late.", "You can choose now or later."],
  },

  {
    id: "12-24",
    title: "HOURS 12–24 — Decision Flexibility Window",
    focus: "Access to resources with flexibility in decisions.",
    rangeStart: 12,
    rangeEnd: 24,
    medical: [
      "All medical treatments remain available.",
      "Pain and injury treatment is unchanged.",
      "Emergency contraception may still be discussed depending on timing and individual factors.",
    ],
    forensic: [
      "Evidence collection remains highly effective.",
      "Anonymous evidence storage options are still available.",
    ],
    support: [
      "Academic or housing accommodations can be requested through the Office of the Dean of Students.",
      "Confidential reporting options can be explored if safety is a concern.",
    ],
    reminder: [
      "There is no requirement to decide anything during this window.",
      "Everyone reacts differently.",
      "Support remains available at any point.",
    ],
  },

  {
    id: "24-48",
    title: "HOURS 24–48 — Strong Evidence Window",
    focus: "Clear options without urgency.",
    rangeStart: 24,
    rangeEnd: 48,
    medical: [
      "Exams remain available if desired.",
      "Preventive treatments remain effective.",
      "Emergency contraception may be discussed in some cases.",
    ],
    forensic: [
      "DNA recovery likelihood remains high.",
      "Evidence storage without reporting is still available.",
    ],
    support: [
      "Counseling and advocacy through CARE and CAPS are available.",
      "Reporting through Purdue or law enforcement is optional.",
      "Support from friends or family can be helpful.",
    ],
    reminder: ["Your options are still open.", "Nothing expires suddenly."],
  },

  {
    id: "48-72",
    title: "HOURS 48–72 — Transition Window",
    focus: "Reducing anxiety about timing.",
    rangeStart: 48,
    rangeEnd: 72,
    medical: [
      "Medical care remains unchanged.",
      "STI prevention and injury documentation are still available.",
    ],
    forensic: [
      "Evidence collection may still be possible.",
      "Some evidence types may decline, but this does not diminish your experience.",
      "Care is tailored to each individual situation.",
    ],
    support: [
      "Advocacy and counseling through CARE and CAPS remain available.",
      "Academic accommodations can still be discussed.",
    ],
    reminder: ["Support does not expire.", "Care is still meaningful."],
  },

  {
    id: "72-96",
    title: "HOURS 72–96 — Late Forensic Window",
    focus: "Honest expectations with reassurance.",
    rangeStart: 72,
    rangeEnd: 96,
    medical: [
      "All medical care remains available.",
      "Follow-up testing may be recommended later.",
    ],
    forensic: [
      "Evidence collection may be limited but still possible.",
      "Available options depend on medical assessment.",
    ],
    support: [
      "Reporting options remain unchanged.",
      "Counseling and advocacy through CARE and CAPS remain available.",
    ],
    reminder: ["There is no wrong choice.", "You are not late."],
  },

  {
    id: "96-120",
    title: "HOURS 96–120 — Final Typical Forensic Window",
    focus: "Dignity, agency, and transition forward.",
    rangeStart: 96,
    rangeEnd: 120,
    medical: [
      "Medical exams may still be offered depending on individual circumstances.",
      "Emergency contraception may still be discussed.",
    ],
    forensic: [
      "Typical DNA collection windows may be nearing an end.",
      "Evidence storage may still be offered.",
    ],
    support: [
      "Ongoing support is available through CARE, CAPS, and the Office of the Dean of Students.",
      "School-based reporting remains an option regardless of timing.",
    ],
    reminder: ["Care continues beyond this window."],
  },
];

/* -------------------------
   BUILD 120-HOUR TIMELINE
-------------------------- */

function getStageForHour(hourIndex: number): ClockStage {
  return (
    CLOCK_STAGES.find(
      (s) => hourIndex >= s.rangeStart && hourIndex < s.rangeEnd
    ) ?? CLOCK_STAGES[CLOCK_STAGES.length - 1]
  );
}

function hourLabel(hourIndex: number) {
  const day = Math.floor(hourIndex / 24);
  const hourOfDay = hourIndex % 24;
  return `Day ${day + 1} • Hour ${hourOfDay} (${hourIndex}h)`;
}

export const FIVE_DAY_TIMELINE: TimelineHour[] = Array.from(
  { length: 120 },
  (_, hourIndex) => ({
    hourIndex,
    label: hourLabel(hourIndex),
    stage: getStageForHour(hourIndex),
  })
);

/* -------------------------
   AFTER 120 HOURS
-------------------------- */

export const CORE_MESSAGE_ALWAYS_VISIBLE =
  "You can return to support at any time, even if months have passed. You are not alone.";

export const RECOVERY_TIMELINE: RecoverySection[] = [
  {
    id: "days-6-14",
    title: "DAYS 6–14 — Early Post-Window Phase",
    medical: [
      "STI testing schedules can be discussed with a medical provider.",
      "Follow-up care may be recommended.",
      "Injury documentation remains relevant.",
    ],
    reporting: [
      "Reporting remains an option.",
      "Confidential and formal reporting options are explained clearly.",
    ],
    extra: [
      {
        title: "Confidential vs. Formal Reporting (Overview)",
        bullets: [
          "Confidential reporting focuses on support and privacy.",
          "Formal reporting involves investigation and potential disciplinary action.",
          "CARE can help you understand both without pressure.",
        ],
      },
    ],
    support: [
      "Counseling through CAPS.",
      "Advocacy through CARE.",
      "Academic accommodations through the Office of the Dean of Students.",
    ],
  },

  {
    id: "weeks-2-4",
    title: "WEEKS 2–4 — Stabilization Phase",
    medical: [
      "Follow-up STI testing may be discussed.",
      "Continued care through PUSH, CARE, or CAPS.",
      "Checking in with a provider about sleep, appetite, or stress-related symptoms can be helpful.",
    ],
    reporting: [
      "Title IX processes can be explored if desired.",
      "Law enforcement reporting remains optional.",
      "Information about reporting can be revisited without starting a process.",
    ],
    support: [
      "Trauma-informed counseling.",
      "Support groups.",
      "Housing or academic adjustments.",
      "Some people find it helpful to begin regular counseling or advocacy check-ins during this time.",
      "Support may shift from crisis-focused to day-to-day coping and stabilization.",
      "You can adjust or stop support at any point if your needs change.",
    ],
  },

  {
    id: "months-1-3",
    title: "MONTHS 1–3 — Long-Term Support Phase",
    medical: [
      "Continued health follow-ups through PUSH or another provider.",
      "Follow-up testing as recommended.",
      "Referrals to additional providers if needed.",
    ],
    reporting: [
      "Reporting options remain available.",
      "There is no expiration on seeking information or support.",
    ],
    support: [
      "Ongoing individual counseling through CAPS.",
      "Continued advocacy support through CARE.",
      "Legal advocacy resources available if you want information.",
    ],
  },

  {
    id: "months-3-plus",
    title: "MONTHS 3+ — Ongoing Recovery Phase",
    medical: [
      "Continued access to wellness and mental health services.",
      "Care can be restarted at any time.",
    ],
    reporting: [
      "Reporting options can be revisited at any point.",
      "Choosing not to report is always valid.",
    ],
    support: [
      "Continued access to campus and community resources.",
      "You do not need to explain why you are reaching out again.",
    ],
  },
];
