import React, { useState, useEffect } from "react";
import { I } from "./Icons.jsx";
import ChipGroup from "./ChipGroup.jsx";

export default function EditDrawer({ idx, step, onChange, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard?.writeText(step.imagePrompt || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op — clipboard may be blocked */
    }
  };

  const wordCount = String(step.title || "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(27,35,48,.35)",
          backdropFilter: "blur(2px)", zIndex: 80,
        }}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-drawer-title"
        style={{
          position: "fixed", top: 0, right: 0, height: "100vh",
          width: 480, maxWidth: "94vw",
          background: "var(--bg)", borderLeft: "1px solid var(--line)",
          zIndex: 81, padding: 24, overflowY: "auto", boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 id="edit-drawer-title">Edit step {idx + 1}</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ minHeight: 38 }}>
            <I.Close size={14} /> Close
          </button>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="story-img" style={{ aspectRatio: "16/9", borderRadius: 10, marginBottom: 12 }}>
            <span>visual: {step.imagePrompt ? step.imagePrompt.split(",")[0] : step.cue}</span>
          </div>
        </div>
        <div className="field" style={{ marginBottom: 14 }}>
          <label>
            Simple instruction{" "}
            <span style={{ color: "var(--muted)", fontWeight: 500 }}>· max 4–5 words</span>
          </label>
          <input
            className="input"
            value={step.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
          <span className="help" style={{ color: wordCount > 5 ? "var(--clay)" : "var(--muted)" }}>
            {wordCount} word{wordCount === 1 ? "" : "s"}
          </span>
        </div>
        <div className="field" style={{ marginBottom: 14 }}>
          <label>AI image generation prompt</label>
          <textarea
            className="textarea"
            value={step.imagePrompt || ""}
            onChange={(e) => onChange({ imagePrompt: e.target.value })}
            style={{ fontFamily: "var(--mono)", fontSize: 13, minHeight: 90 }}
          />
          <button
            className="btn btn-ghost"
            onClick={copyPrompt}
            style={{ alignSelf: "flex-start", minHeight: 36, padding: "6px 12px", marginTop: 6 }}
          >
            {copied ? <><I.Check size={14} /> Copied</> : <><I.Doc size={14} /> Copy prompt</>}
          </button>
        </div>
        <div className="field" style={{ marginBottom: 14 }}>
          <label>PBS support tip</label>
          <textarea
            className="textarea"
            value={step.pbsTip || ""}
            onChange={(e) => onChange({ pbsTip: e.target.value })}
            style={{ minHeight: 72 }}
          />
        </div>
        <div className="field" style={{ marginBottom: 14 }}>
          <label>
            Carer guidance{" "}
            <span style={{ color: "var(--muted)", fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            className="textarea"
            value={step.carerGuidance || ""}
            onChange={(e) => onChange({ carerGuidance: e.target.value })}
            style={{ minHeight: 72 }}
          />
        </div>
        <div className="field">
          <label>Emotional tone of this step</label>
          <ChipGroup
            multi={false}
            value={step.emotion || "active"}
            onChange={(v) => onChange({ emotion: v })}
            options={["calm", "transition", "active", "reward"]}
          />
        </div>
      </div>
    </>
  );
}
