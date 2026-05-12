import React from "react";
import { I } from "../components/Icons.jsx";
import Topbar from "../components/Topbar.jsx";

export default function GeneratingScreen({ person, activity, onMenu }) {
  return (
    <>
      <Topbar crumbs={["Create", "New storyboard", "Generating"]} onMenu={onMenu} />
      <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <div className="card card-lg" style={{ textAlign: "center", maxWidth: 520 }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: 16,
              background: "var(--sage-soft)", color: "var(--sage-deep)",
              margin: "0 auto 18px", display: "grid", placeItems: "center",
            }}
          >
            <I.Sparkles size={28} sw={2} />
          </div>
          <h2 style={{ marginBottom: 8 }}>Putting it together for {person.firstName}…</h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Writing captions in a {(activity.tone || "warm").toLowerCase()} voice and pacing for {activity.numSteps} steps.
          </p>
          <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: "var(--sage)",
                  opacity: 0.4,
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: i * 0.2 + "s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
