import React from "react";
import { I } from "../components/Icons.jsx";
import Topbar from "../components/Topbar.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Dashboard({ setRoute, recent, startNew, onMenu, topActions }) {
  return (
    <>
      <Topbar
        crumbs={["Workspace", "Dashboard"]}
        onMenu={onMenu}
        actions={
          <>
            {topActions}
            <button className="btn btn-primary" onClick={startNew}>
              <I.Plus size={16} sw={2.4} /> New storyboard
            </button>
          </>
        }
      />

      <SectionTitle
        eyebrow="Good morning, Jess"
        title="Plan a calmer day, together."
        sub="Create personalised visual storyboards for the people you support — tailored to communication needs, sensory profile, and what works for them."
      />

      <div className="grid-3" style={{ marginBottom: 28 }}>
        <div className="stat">
          <div className="label">Storyboards this month</div>
          <div className="value">23</div>
          <div className="trend" style={{ color: "var(--muted)" }}>+6 vs. last month</div>
        </div>
        <div className="stat">
          <div className="label">People supported</div>
          <div className="value">12</div>
          <div className="trend" style={{ color: "var(--muted)" }}>Across 4 houses</div>
        </div>
        <div className="stat">
          <div className="label">Most used activity</div>
          <div className="value" style={{ fontSize: 22 }}>Dental visit</div>
          <div className="trend" style={{ color: "var(--muted)" }}>8 storyboards</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 20 }}>
        <div className="card card-lg">
          <div className="card-head">
            <div>
              <h2>Start a new storyboard</h2>
              <div className="card-sub">Walks you through person, activity, and step generation in about 3 minutes.</div>
            </div>
            <span className="tag sage">PBS-aligned</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 8 }}>
            {[
              { title: "From a person", sub: "Pick someone you support", icon: I.Users, action: () => setRoute("clients") },
              { title: "From an activity", sub: "Reuse a saved template", icon: I.Library, action: () => setRoute("library") },
              { title: "Blank storyboard", sub: "Start from scratch", icon: I.Sparkles, action: startNew, primary: true },
            ].map((opt, i) => (
              <button
                key={i}
                onClick={opt.action}
                style={{
                  border: "1px solid " + (opt.primary ? "var(--sage)" : "var(--line)"),
                  background: opt.primary ? "var(--sage-soft)" : "#fff",
                  borderRadius: 12,
                  padding: 18,
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  cursor: "pointer",
                  transition: "transform .08s ease, border-color .15s ease, box-shadow .15s ease",
                }}
              >
                <span
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: opt.primary ? "var(--sage)" : "var(--bg-2)",
                    color: opt.primary ? "#fff" : "var(--ink)",
                    display: "grid", placeItems: "center",
                  }}
                >
                  <opt.icon size={18} />
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{opt.title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>

          <hr className="divider" />

          <div className="card-head" style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: 15 }}>Recent storyboards</h3>
            <button
              className="btn btn-ghost"
              style={{ minHeight: 34, padding: "6px 12px" }}
              onClick={() => setRoute("library")}
            >
              View all <I.Arrow size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recent.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 14px",
                  border: "1px solid var(--line-2)",
                  borderRadius: 10,
                  background: "#fff",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: r.colour, display: "grid", placeItems: "center",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                  }}
                >
                  {r.initials}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{r.activity}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>
                    For {r.person} · {r.steps} steps · {r.ago}
                  </div>
                </div>
                <span className={"tag " + r.tagClass}>{r.tag}</span>
                <button
                  className="btn btn-ghost"
                  style={{ minHeight: 36, padding: "6px 12px" }}
                  onClick={startNew}
                >
                  <I.Eye size={14} /> Open
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <div className="card-head">
              <h3>Tip of the day</h3>
              <span className="tag clay">Practice</span>
            </div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0, lineHeight: 1.55 }}>
              Use a person's own photos where possible — familiar objects and places reduce uncertainty and support recognition.
            </p>
            <button className="btn btn-ghost" style={{ marginTop: 14, minHeight: 38, padding: "8px 14px" }}>
              Read PBS guide <I.Arrow size={14} />
            </button>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Upcoming</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { t: "Dental appt — Aaron T.", d: "Tomorrow · 10:30", icon: I.Calendar, accent: "var(--clay)" },
                { t: "Day service trip — Priya K.", d: "Wed · 14:00", icon: I.Calendar, accent: "var(--lilac)" },
                { t: "Team review meeting", d: "Fri · 09:00", icon: I.Clock, accent: "var(--sage)" },
              ].map((u, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 8, height: 38, borderRadius: 4, background: u.accent, flex: "0 0 auto" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{u.t}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12.5 }}>{u.d}</div>
                  </div>
                  <u.icon size={16} style={{ color: "var(--muted)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
