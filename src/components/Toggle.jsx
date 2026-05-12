import React from "react";

export default function Toggle({ label, sub, value, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 14px",
        border: "1px solid var(--line)",
        borderRadius: 12,
        background: value ? "var(--sage-soft)" : "#fff",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 44, height: 26, borderRadius: 999,
          background: value ? "var(--sage)" : "#D6CFC0",
          position: "relative",
          transition: "background .15s ease",
          flex: "0 0 auto",
        }}
      >
        <span
          style={{
            position: "absolute", top: 3, left: value ? 21 : 3,
            width: 20, height: 20, borderRadius: "50%", background: "#fff",
            transition: "left .15s ease", boxShadow: "0 1px 2px rgba(0,0,0,.15)",
          }}
        />
      </span>
      <span style={{ flex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: 14.5, display: "block", color: value ? "var(--sage-deep)" : "var(--ink)" }}>{label}</span>
        {sub && (
          <span style={{ fontSize: 13, color: value ? "var(--sage-deep)" : "var(--muted)", display: "block", marginTop: 2 }}>{sub}</span>
        )}
      </span>
    </button>
  );
}
