"use client";

import { useMemo, useState } from "react";

import Clock from "./components/Clock";
import StagePanel from "./components/StagePanel";
import AskSafePurdue from "./components/AskSafePurdue";
import RecoveryCalendar from "./components/RecoveryCalendar";

import {
  FIVE_DAY_TIMELINE,
  RECOVERY_TIMELINE,
  CORE_MESSAGE_ALWAYS_VISIBLE,
} from "./data/timeline";

export default function Home() {
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);

  const hour = useMemo(() => {
    return FIVE_DAY_TIMELINE[selectedHourIndex] ?? FIVE_DAY_TIMELINE[0];
  }, [selectedHourIndex]);

  return (
    <main style={{ padding: 32, display: "grid", gap: 28 }}>
      {/* Header + hackathon-style instructions */}
      <header style={{ display: "grid", gap: 14 }}>
        <div className="muted" style={{ fontStyle: "italic" }}>
          You don’t need to know what to ask. You can start anywhere.
        </div>

        <h1>SafePurdue</h1>

      

        <div className="panel" style={{ padding: 18 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(200,178,115,0.25)",
                  color: "#fff",
                  fontSize: 13,
                }}
              >
                 Demo
              </span>
              <span className="muted" style={{ fontSize: 13 }}>
                Survivor-centered • Purdue resources • Non-directive
              </span>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ fontWeight: 650 }}>What this app does</div>
              <ul className="bullets" style={{ marginTop: 0 }}>
                <li>
                  Lets users explore an optional <strong>0–120 hour</strong> timeline (Day 1–5) to
                  understand what options may be available — without pressure.
                </li>
                <li>
                  Shows non-directive, campus-grounded information and resources (CARE, CAPS, PUSH,
                  ODOS, Title IX) so users can decide on their own terms.
                </li>
                <li>
                  Includes an “Ask SafePurdue” box that returns <strong>resource matches</strong>{" "}
                  and a supportive response — not advice or instructions.
                </li>
              </ul>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ fontWeight: 650 }}>How to use</div>
              <ol style={{ margin: 0, paddingLeft: 20, color: "rgba(255,255,255,0.88)" }}>
                <li>
                  Use <strong>Day 1–5</strong> and select an <strong>hour</strong> to view optional
                  info.
                </li>
                <li>
                  Look to the right for details for that hour (medical, forensic, support).
                </li>
                <li>
                  Use <strong>Ask SafePurdue</strong> to find campus options (confidential support,
                  medical care, academic accommodations, reporting info).
                </li>
                <li>
                  Scroll down to <strong>After the first 5 days</strong> for longer-term support.
                </li>
              </ol>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 650 }}>Safety + boundaries</div>
              <ul className="bullets" style={{ marginTop: 0 }}>
                <li>Not therapy, not a crisis hotline, not legal/medical advice.</li>
                <li>No accounts, no long-term storage, no reporting initiated through the app.</li>
                <li>Language is intentionally non-urgent: support remains valid at any time.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Two-column main area */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          alignItems: "start",
        }}
      >
        {/* LEFT: Clock → Image → Chat */}
        <div style={{ display: "grid", gap: 18 }}>
          <div className="panel">
            <Clock
              selectedHourIndex={selectedHourIndex}
              onSelectHourIndex={setSelectedHourIndex}
            />
          </div>

          <div className="supportMarkWrap" aria-hidden="true">
            <img src="/support-mark.svg" alt="" className="supportMark" />
            <div className="supportCaption">You can return to support anytime.</div>
          </div>

          {/* Chatbot sits UNDER the image */}
          <AskSafePurdue />
        </div>

        {/* RIGHT: Hour details */}
        <StagePanel hour={hour} />
      </section>

      {/* Recovery calendar (full width below) */}
      <section>
        <RecoveryCalendar
          sections={RECOVERY_TIMELINE}
          coreMessage={CORE_MESSAGE_ALWAYS_VISIBLE}
        />
      </section>
    </main>
  );
}
