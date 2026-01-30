"use client";

import Accordion from "./Accordion";
import type { TimelineHour } from "@/data/timeline";

export default function StagePanel({ hour }: { hour: TimelineHour }) {
  const items = hour.sections.map((s, idx) => ({
    id: `${hour.hourIndex}-${idx}`,
    title: s.title,
    content: (
      <ul className="bullets">
        {s.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    ),
  }));

  return (
    <div className="panel">
      <div className="panelHeader">
        <h3 className="panelTitle">{hour.label}</h3>
        <p className="panelSub">
          Information only — no requirements, no pressure.
        </p>
      </div>
      <Accordion items={items} />
    </div>
  );
}
