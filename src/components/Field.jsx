import React from "react";

export default function Field({ label, help, hint, error, children }) {
  return (
    <div className="field">
      <label>
        {label}{" "}
        {hint && (
          <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: 13 }}>· {hint}</span>
        )}
      </label>
      {children}
      {error && <span className="error-text">{error}</span>}
      {help && !error && <span className="help">{help}</span>}
    </div>
  );
}
