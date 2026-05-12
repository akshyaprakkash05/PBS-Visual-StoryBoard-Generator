import React, { useState } from "react";
import { I } from "./Icons.jsx";
import { EMOTION_META } from "../lib/constants.js";

export default function StoryCard({ idx, total, step, onEdit }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const emo = EMOTION_META[step.emotion] || EMOTION_META.active;
  const EmoIcon = I[emo.icon] || I.Check;
  const progress = ((idx + 1) / total) * 100;

  return (
    <div
      className="story-card"
      style={{ cursor: "pointer" }}
      onClick={(e) => { if (!e.target.closest("[data-prompt-toggle]")) onEdit(); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onEdit(); }}
      aria-label={`Edit step ${idx + 1}: ${step.title}`}
    >
      <div style={{ height: 4, background: "var(--line-2)" }}>
        <div style={{ height: "100%", width: progress + "%", background: "var(--sage)", transition: "width .3s ease" }} />
      </div>
      <div className="story-img">
        <span className="step-num">{step.n || idx + 1}</span>
        <span
          style={{
            position: "absolute", top: 10, right: 10,
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 9px", borderRadius: 6,
            background: "rgba(255,255,255,.92)",
            color: emo.colour, fontFamily: "var(--font)",
            fontSize: 11, fontWeight: 600, letterSpacing: 0.1,
          }}
        >
          <EmoIcon size={12} sw={2.5} /> {emo.label}
        </span>
        <span>visual: {step.imagePrompt ? step.imagePrompt.split(",").slice(0, 2).join(",") : step.cue}</span>
      </div>
      <div className="story-body">
        <div className="title" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.25 }}>{step.title}</div>
        {step.pbsTip && (
          <div
            style={{
              display: "flex", gap: 8, alignItems: "flex-start",
              background: "var(--sage-soft)", color: "var(--sage-deep)",
              borderRadius: 8, padding: "8px 10px",
              fontSize: 12.5, lineHeight: 1.45, marginTop: 4,
            }}
          >
            <I.Heart size={13} sw={2} style={{ marginTop: 2, flex: "0 0 auto" }} />
            <div><strong style={{ fontWeight: 700 }}>PBS tip · </strong>{step.pbsTip}</div>
          </div>
        )}
        {step.carerGuidance && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", color: "var(--ink-2)", fontSize: 12.5, lineHeight: 1.45 }}>
            <I.Users size={13} sw={2} style={{ marginTop: 2, flex: "0 0 auto", color: "var(--muted)" }} />
            <div><strong style={{ fontWeight: 600, color: "var(--ink)" }}>Carer · </strong>{step.carerGuidance}</div>
          </div>
        )}
        <div
          style={{
            marginTop: "auto", paddingTop: 10, borderTop: "1px dashed var(--line-2)",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
          }}
        >
          <span style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 500 }}>
            {idx + 1 < total
              ? <>Next: <strong style={{ color: "var(--ink-2)", fontWeight: 600 }}>{step.nextHint}</strong></>
              : <>✓ Final step</>}
          </span>
          <button
            data-prompt-toggle
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowPrompt(!showPrompt); }}
            title="AI image generation prompt"
            aria-expanded={showPrompt}
            style={{
              border: "1px solid var(--line)", background: showPrompt ? "var(--bg-2)" : "#fff",
              borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 4,
            }}
          >
            <I.Sparkles size={11} sw={2.5} /> AI prompt
          </button>
        </div>
        {showPrompt && (
          <div
            style={{
              background: "#1B2330", color: "#E4E8EE", fontFamily: "var(--mono)",
              fontSize: 11.5, padding: 10, borderRadius: 8, lineHeight: 1.5,
            }}
          >
            {step.imagePrompt}
          </div>
        )}
      </div>
    </div>
  );
}
