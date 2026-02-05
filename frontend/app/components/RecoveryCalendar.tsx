"use client";

import type { RecoverySection } from "../data/timeline";

function SectionCard({ s }: { s: RecoverySection }) {
  return (
    <div className="slideCard">
      <div className="slideTitle">{s.title}</div>

      <div className="slideBlock">
        <div className="slideLabel">Medical</div>
        <ul className="bullets">
          {s.medical.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="slideBlock">
        <div className="slideLabel">Reporting (optional)</div>
        <ul className="bullets">
          {s.reporting.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="slideBlock">
        <div className="slideLabel">Support</div>
        <ul className="bullets">
          {s.support.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      {s.extra?.map((ex) => (
        <div className="slideBlock" key={ex.title}>
          <div className="slideLabel">{ex.title}</div>
          <ul className="bullets">
            {ex.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function RecoveryCalendar({
  sections,
  coreMessage,
}: {
  sections: RecoverySection[];
  coreMessage: string;
}) {
  const daysSection = sections[0];
  const slideSections = sections.slice(1);

  return (
    <div className="panel">
      <div className="panelHeader">
        <h3 className="panelTitle">After the first 5 days</h3>
        <p className="panelSub">{coreMessage}</p>
      </div>

      <div className="calendarWrap">
        <div className="calendarHeader">
          <div className="calendarMonth">Recovery timeline</div>
          <div className="calendarHint">Daily → weekly → monthly</div>
        </div>

        {/* Simple 14-day “calendar image feel” */}
        <div className="calendarGrid">
          {Array.from({ length: 14 }, (_, i) => {
            const dayNum = i + 1;
            const isPostWindow = dayNum >= 6; // highlight 6–14

            return (
              <div
                key={dayNum}
                className={`calendarCell ${isPostWindow ? "active" : ""}`}
                aria-label={`Day ${dayNum}`}
              >
                <div className="calendarDayNum">Day {dayNum}</div>
                {dayNum === 6 && <div className="calendarTag">Start</div>}
              </div>
            );
          })}
        </div>

        {/* The content below the calendar */}
        {daysSection && (
          <details className="calendarDetails" open>
            <summary className="calendarSummary">
              {daysSection.title} — expand for next steps
            </summary>
            <div style={{ marginTop: 12 }}>
              <SectionCard s={daysSection} />
            </div>
          </details>
        )}
      </div>

      {/* Later phases as swipe cards */}
      <div className="slidesHeader">
        <div className="slidesTitle">Later support</div>
        <div className="slidesSub">Scroll → each card is a phase with options and support.</div>
      </div>

      <div className="slidesRow" role="region" aria-label="Recovery timeline slides">
        {slideSections.map((s) => (
          <SectionCard key={s.id} s={s} />
        ))}

        <div className="slideCard affirmationCard">
          <div className="slideTitle">Words of support</div>
          <ul className="bullets">
            <li>You’re allowed to go at your pace.</li>
            <li>You don’t need the “right” story to deserve help.</li>
            <li>Support is still valid even if time has passed.</li>
            <li>You can pause and come back whenever you want.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
