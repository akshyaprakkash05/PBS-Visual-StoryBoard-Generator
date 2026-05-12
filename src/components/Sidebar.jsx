import React from "react";
import { I } from "./Icons.jsx";

export default function Sidebar({ route, setRoute, draftCount = 3, open, onClose }) {
  const Item = ({ id, label, icon: Ico, badge }) => (
    <button
      className={"nav-item " + (route === id ? "active" : "")}
      onClick={() => { setRoute(id); onClose?.(); }}
      aria-current={route === id ? "page" : undefined}
    >
      <Ico className="ico" />
      <span>{label}</span>
      {badge ? <span className="badge">{badge}</span> : null}
    </button>
  );

  return (
    <aside className={"sidebar " + (open ? "open" : "")} data-no-print aria-label="Primary">
      <div className="brand">
        <div className="brand-mark">UC</div>
        <div>
          <div className="brand-name">PBS Storyboards</div>
          <div className="brand-sub">Urban Care Community</div>
        </div>
      </div>

      <Item id="dashboard" label="Dashboard" icon={I.Home} />
      <Item id="clients" label="People I support" icon={I.Users} badge="12" />
      <Item id="library" label="Storyboard library" icon={I.Library} badge="47" />

      <div className="nav-section">Create</div>
      <Item id="profile" label="New storyboard" icon={I.Sparkles} />
      <Item id="drafts" label="Drafts" icon={I.Doc} badge={String(draftCount)} />

      <div className="nav-section">Workspace</div>
      <Item id="settings" label="Settings" icon={I.Settings} />
      <Item id="help" label="Help & guidance" icon={I.Help} />

      <div className="sidebar-foot">
        <div className="avatar">JM</div>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Jess Morgan</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>PBS practitioner</div>
        </div>
      </div>
    </aside>
  );
}
