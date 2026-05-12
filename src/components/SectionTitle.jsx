import React from "react";

export default function SectionTitle({ eyebrow, title, sub, right }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 20,
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <h1>{title}</h1>
        {sub && <p className="lede" style={{ marginTop: 8, marginBottom: 0 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}
