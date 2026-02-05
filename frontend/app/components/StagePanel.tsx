"use client";

import type { TimelineHour } from "../data/timeline";

function SectionList({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <details open>
      <summary style={{ cursor: "pointer", fontWeight: 700 }}>{title}</summary>
      <ul className="bullets">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </details>
  );
}

export default function StagePanel({ hour }: { hour: TimelineHour }) {
  const s = hour.stage;

  return (
    <div className="panel">
      <div className="panelHeader">
        <h3 className="panelTitle">{hour.label}</h3>
        <p className="panelSub">{s.title}</p>
        <p className="panelSub">Focus: {s.focus}</p>
        <p className="panelSub">Information only — no requirements, no pressure.</p>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <SectionList title="Medical care (optional)" bullets={s.medical} />
        <SectionList title="Forensic considerations (optional)" bullets={s.forensic} />
        <SectionList title="Support resources" bullets={s.support} />
        <SectionList title="Reminders" bullets={s.reminder} />
      </div>
    </div>
  );
}
