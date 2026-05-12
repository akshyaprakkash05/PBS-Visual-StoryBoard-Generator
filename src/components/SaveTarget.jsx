import React from "react";
import { I } from "./Icons.jsx";

export default function SaveTarget({ label, sub, icon: Ico, on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px",
        border: "1.5px solid " + (on ? "var(--sage)" : "var(--line)"),
        borderRadius: 14,
        background: on ? "var(--sage-soft)" : "#fff",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 40, height: 40, borderRadius: 10,
          background: on ? "var(--sage)" : "var(--bg-2)",
          color: on ? "#fff" : "var(--ink)",
          display: "grid", placeItems: "center", flex: "0 0 auto",
        }}
      >
        <Ico size={18} />
      </span>
      <span style={{ flex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: 14.5, display: "block", color: on ? "var(--sage-deep)" : "var(--ink)" }}>{label}</span>
        <span style={{ fontSize: 13, color: on ? "var(--sage-deep)" : "var(--muted)", display: "block", marginTop: 2 }}>{sub}</span>
      </span>
      <span
        style={{
          width: 24, height: 24, borderRadius: "50%",
          border: "2px solid " + (on ? "var(--sage)" : "#D6CFC0"),
          background: on ? "var(--sage)" : "#fff",
          display: "grid", placeItems: "center", color: "#fff",
        }}
      >
        {on && <I.Check size={14} sw={3} />}
      </span>
    </button>
  );
}
