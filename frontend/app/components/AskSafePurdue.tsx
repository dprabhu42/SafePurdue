"use client";

import { useState } from "react";
import { askSafePurdue, type AskResponse } from "../lib/api";

import ResourceList from "./ResourceList";

export default function AskSafePurdue() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSend() {
    const trimmed = message.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await askSafePurdue(trimmed);
      setData(res);
      setMessage("");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <div className="panelHeader">
        <h3 className="panelTitle">Ask SafePurdue</h3>
        <p className="panelSub">
          This tool provides options and campus resources. It does not tell you what to do.
        </p>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Example questions</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            "I want confidential support",
            "What medical options are available?",
            "Can I get academic accommodations?",
            "This happened a while ago — can I still get help?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => setMessage(q)}
              style={{
                padding: "6px 10px",
                borderRadius: 16,
                border: "1px solid #ccc",
                background: "#f7f7f7",
                cursor: "pointer",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="chatRow">
        <textarea
          className="chatInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share what you’re looking for (medical, confidential support, academic help, reporting info, etc.)"
          rows={3}
        />
        <button className="primaryBtn" onClick={onSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {error && <div className="errorBox">{error}</div>}

      {data && (
        <div className="chatResult">
          <div className="replyBox">
            <div className="replyLabel">Response</div>
            {/* ✅ FIX: use data.response (not data.reply) */}
            <p className="replyText">{data.response}</p>
          </div>

          <div className="replyBox">
            <div className="replyLabel">Top Resources</div>
            <ResourceList resources={data.resources} />
          </div>
        </div>
      )}
    </div>
  );
}
