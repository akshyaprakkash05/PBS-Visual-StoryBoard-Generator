import React from "react";
import { I } from "./Icons.jsx";

export default function Topbar({ crumbs = [], actions, onMenu }) {
  return (
    <div className="topbar" data-no-print>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onMenu && (
          <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
            <I.Menu size={18} />
          </button>
        )}
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">›</span>}
              {i === crumbs.length - 1 ? <strong>{c}</strong> : <span>{c}</span>}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="top-actions">{actions}</div>
    </div>
  );
}
