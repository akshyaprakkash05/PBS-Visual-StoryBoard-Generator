import React from "react";
import Topbar from "../components/Topbar.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function PlaceholderScreen({ title, sub, icon: Ico, onMenu }) {
  return (
    <>
      <Topbar crumbs={["Workspace", title]} onMenu={onMenu} />
      <SectionTitle title={title} sub={sub} />
      <div className="card card-lg" style={{ textAlign: "center", padding: "60px 40px" }}>
        <div
          style={{
            width: 64, height: 64, borderRadius: 16,
            background: "var(--bg-2)", color: "var(--ink-2)",
            margin: "0 auto 18px", display: "grid", placeItems: "center",
          }}
        >
          <Ico size={28} sw={1.6} />
        </div>
        <h3 style={{ marginBottom: 8 }}>Coming soon</h3>
        <p style={{ color: "var(--muted)", margin: "0 auto 18px", maxWidth: 420 }}>
          The five storyboard screens are fully wired up. Use the sidebar to navigate to{" "}
          <strong>Dashboard</strong> or <strong>New storyboard</strong>.
        </p>
      </div>
    </>
  );
}
