import React, { useState } from "react";
import { I } from "./Icons.jsx";
import { PALETTES } from "../lib/constants.js";

const SWATCHES = {
  sage: "#3D7C8E",
  ocean: "#2F6FA8",
  lilac: "#7A6FA8",
  forest: "#4F7A60",
};

export default function AccessibilityPanel({ prefs, setPref }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        data-no-print
        style={{ minHeight: 38 }}
      >
        <I.Settings size={14} /> Accessibility
      </button>

      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-label="Accessibility & theme"
          data-no-print
          style={{
            position: "fixed", right: 20, top: 90,
            width: 280, background: "#fff",
            border: "1px solid var(--line)", borderRadius: 14,
            padding: 18, zIndex: 70,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <strong>Accessibility</strong>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{ background: "transparent", border: 0, color: "var(--muted)", cursor: "pointer" }}
            >
              <I.Close size={16} />
            </button>
          </div>

          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", fontWeight: 600, marginBottom: 8 }}>
            Palette
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {Object.keys(PALETTES).map((p) => (
              <button
                key={p}
                onClick={() => setPref("palette", p)}
                aria-label={`Palette ${p}`}
                aria-pressed={prefs.palette === p}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: SWATCHES[p],
                  border: prefs.palette === p ? "3px solid var(--ink)" : "2px solid #fff",
                  outline: "1px solid var(--line)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", fontWeight: 600, marginBottom: 8 }}>
            Text size
          </div>
          <div className="chips" style={{ marginBottom: 16 }}>
            {[
              { id: "regular", label: "Regular" },
              { id: "large", label: "Large" },
              { id: "xlarge", label: "X-Large" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                className={"chip " + (prefs.fontSize === s.id ? "on" : "")}
                onClick={() => setPref("fontSize", s.id)}
              >
                <span className="dot" /> {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>High-contrast borders</span>
            <button
              type="button"
              role="switch"
              aria-checked={!!prefs.highContrast}
              onClick={() => setPref("highContrast", !prefs.highContrast)}
              style={{
                width: 44, height: 26, borderRadius: 999,
                background: prefs.highContrast ? "var(--sage)" : "#D6CFC0",
                position: "relative", border: 0, cursor: "pointer",
              }}
            >
              <span
                style={{
                  position: "absolute", top: 3, left: prefs.highContrast ? 21 : 3,
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  transition: "left .15s ease", boxShadow: "0 1px 2px rgba(0,0,0,.15)",
                }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
