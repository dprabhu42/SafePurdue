"use client";

import clsx from "clsx";

type Props = {
  selectedHourIndex: number;   // 0..119
  onSelectHourIndex: (h: number) => void;
};

export default function Clock({ selectedHourIndex, onSelectHourIndex }: Props) {
  const day = Math.floor(selectedHourIndex / 24);     // 0..4
  const hourOfDay = selectedHourIndex % 24;           // 0..23

  function setDay(newDay: number) {
    const next = newDay * 24 + hourOfDay;
    onSelectHourIndex(next);
  }

  function setHour(newHourOfDay: number) {
    const next = day * 24 + newHourOfDay;
    onSelectHourIndex(next);
  }

  return (
    <div className="clockWrap">
      <div className="clockTop">
        <div className="pillGroup" role="tablist" aria-label="Day selector">
          {Array.from({ length: 5 }, (_, d) => (
            <button
              key={d}
              className={clsx("pill", d === day && "active")}
              onClick={() => setDay(d)}
              role="tab"
              aria-selected={d === day}
            >
              Day {d + 1}
            </button>
          ))}
        </div>

        <div className="clockMeta">
          <div className="metaTitle">Selected</div>
          <div className="metaValue">
            Day {day + 1}, Hour {hourOfDay} ({selectedHourIndex}h)
          </div>
        </div>
      </div>

      {/* A simple 24-hour “dial” grid (clickable). This is lightweight + reliable. */}
      <div className="hourGrid" aria-label="24-hour clock">
        {Array.from({ length: 24 }, (_, h) => (
          <button
            key={h}
            className={clsx("hourCell", h === hourOfDay && "active")}
            onClick={() => setHour(h)}
            aria-pressed={h === hourOfDay}
            title={`Select hour ${h} of Day ${day + 1}`}
          >
            {h}
          </button>
        ))}
      </div>

      {/* If you truly want literal clock IMAGE: drop it here.
          Example:
          <img src="/clock.png" alt="5-day clock visual" className="clockImage" />
          Then keep the hour grid below as the actual selector. */}
    </div>
  );
}
