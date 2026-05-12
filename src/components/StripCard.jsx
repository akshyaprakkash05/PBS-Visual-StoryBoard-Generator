import React from "react";
import { I } from "./Icons.jsx";
import { EMOTION_META } from "../lib/constants.js";

export default function StripCard({ idx, total, step, onEdit }) {
  const emo = EMOTION_META[step.emotion] || EMOTION_META.active;
  const EmoIcon = I[emo.icon] || I.Check;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "170px 1fr auto",
        gap: 18,
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: 14,
        alignItems: "center",
      }}
    >
      <div className="story-img" style={{ aspectRatio: "4 / 3", borderRadius: 10 }}>
        <span className="step-num">{idx + 1}</span>
        <span>visual: {step.imagePrompt ? step.imagePrompt.split(",")[0] : step.cue}</span>
      </div>
      <div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: emo.colour, fontSize: 11, fontWeight: 600 }}>
            <EmoIcon size={12} sw={2.5} /> {emo.label}
          </span>
          <span style={{ color: "var(--muted)", fontSize: 11.5 }}>Step {idx + 1} of {total}</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 17 }}>{step.title}</div>
        {step.pbsTip && (
          <div style={{ color: "var(--ink-2)", fontSize: 13.5, marginTop: 4, lineHeight: 1.5 }}>
            <strong style={{ color: "var(--sage-deep)" }}>PBS tip:</strong> {step.pbsTip}
          </div>
        )}
        {step.carerGuidance && (
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2, lineHeight: 1.5 }}>
            <strong style={{ color: "var(--ink-2)" }}>Carer:</strong> {step.carerGuidance}
          </div>
        )}
      </div>
      <button className="btn btn-ghost" onClick={onEdit}>
        <I.Edit size={14} /> Edit
      </button>
    </div>
  );
}
