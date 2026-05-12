import React, { useRef, useState } from "react";
import { I } from "../components/Icons.jsx";
import Topbar from "../components/Topbar.jsx";
import Stepper from "../components/Stepper.jsx";
import SafeguardLine from "../components/SafeguardLine.jsx";
import StoryCard from "../components/StoryCard.jsx";
import StripCard from "../components/StripCard.jsx";
import EditDrawer from "../components/EditDrawer.jsx";
import A4PrintView from "../components/A4PrintView.jsx";
import { exportSheetsToPdf } from "../lib/pdfExport.js";

export default function StoryboardPreview({
  person, activity, steps, setSteps,
  regenerate, onBack, goExport, onMenu, showToast,
  isAiGenerated,
}) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [perPage, setPerPage] = useState(6);
  const [exporting, setExporting] = useState(false);
  const printRootRef = useRef(null);

  const updateStep = (i, patch) => {
    setSteps(steps.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  };

  const downloadPdf = async () => {
    setLayout("a4");
    // Wait for the A4 sheets to render before snapshotting.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    setExporting(true);
    try {
      await exportSheetsToPdf({
        container: printRootRef.current,
        filename: `pbs-storyboard-${person.firstName || "person"}-${activity.activityName || "activity"}.pdf`,
      });
      showToast?.({ message: "PDF downloaded.", kind: "success" });
    } catch (e) {
      console.error(e);
      showToast?.({ message: "Could not export PDF. Try again or use Print.", kind: "error" });
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <Topbar
        crumbs={["Create", "New storyboard", "Review"]}
        onMenu={onMenu}
        actions={
          <>
            <button className="btn btn-ghost" onClick={regenerate} disabled={exporting}>
              <I.Refresh size={16} /> Regenerate
            </button>
            <button className="btn btn-primary" onClick={goExport}>
              <I.Download size={16} /> Export
            </button>
          </>
        }
      />

      <Stepper step={3} />

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18, gap: 16, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Step 3 of 3 · Review & adjust</div>
          <h1>{activity.customName || activity.activityName}</h1>
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <span className="tag sage">For {person.firstName} {person.lastInitial}</span>
            <span className="tag">{steps.length} steps</span>
            <span className="tag">{activity.tone}</span>
            <span className="tag">{activity.supportLevel}</span>
            {isAiGenerated ? (
              <span className="tag lilac"><I.Sparkles size={11} sw={2.5} /> AI-generated</span>
            ) : (
              <span className="tag clay">Template-based</span>
            )}
          </div>
        </div>
        <div className="stepper" style={{ margin: 0 }}>
          <button className={"step-pill " + (layout === "grid" ? "active" : "")} onClick={() => setLayout("grid")} style={{ border: "none", background: "transparent" }}>
            <I.Library size={14} /> Grid
          </button>
          <button className={"step-pill " + (layout === "strip" ? "active" : "")} onClick={() => setLayout("strip")} style={{ border: "none", background: "transparent" }}>
            <I.Doc size={14} /> Strip
          </button>
          <button className={"step-pill " + (layout === "a4" ? "active" : "")} onClick={() => setLayout("a4")} style={{ border: "none", background: "transparent" }}>
            <I.Print size={14} /> A4 print
          </button>
        </div>
      </div>

      <SafeguardLine />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 18 }}>
        {[
          { icon: I.Arrow, title: "Predictable sequence",  sub: `${steps.length} steps, same order every time` },
          { icon: I.Heart, title: "Emotional safety",      sub: "Trigger words filtered. Calm language." },
          { icon: I.Check, title: "Progress through task", sub: "Each card shows what's next." },
        ].map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            background: "#fff", border: "1px solid var(--line)",
            borderRadius: 12, padding: "12px 14px", boxShadow: "var(--shadow-sm)",
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--sage-soft)", color: "var(--sage-deep)",
              display: "grid", placeItems: "center", flex: "0 0 auto",
            }}><p.icon size={16} sw={2} /></span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{p.title}</div>
              <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 2, lineHeight: 1.45 }}>{p.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card card-lg" style={{ padding: 24 }}>
        <div className="card-head" style={{ marginBottom: 18 }}>
          <div>
            <h2>The storyboard</h2>
            <div className="card-sub">Tap any card to edit text, swap the visual, or copy the AI image prompt.</div>
          </div>
          <button className="btn btn-soft" onClick={regenerate}>
            <I.Sparkles size={16} /> Try a different version
          </button>
        </div>

        {layout === "grid" && (
          <div className="story-grid">
            {steps.map((s, i) => (
              <StoryCard key={i} idx={i} total={steps.length} step={s} onEdit={() => setEditingIdx(i)} />
            ))}
          </div>
        )}
        {layout === "strip" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {steps.map((s, i) => (
              <StripCard key={i} idx={i} total={steps.length} step={s} onEdit={() => setEditingIdx(i)} />
            ))}
          </div>
        )}
        {layout === "a4" && (
          <div className="a4-stage" ref={printRootRef}>
            <div className="a4-stage-bar" data-no-print>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span>Steps per page</span>
                <div className="chips">
                  {[2, 4, 6].map((n) => (
                    <button key={n} type="button"
                      className={"chip " + (perPage === n ? "on" : "")}
                      onClick={() => setPerPage(n)}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn btn-ghost" onClick={() => window.print()} style={{ minHeight: 38 }}>
                  <I.Print size={14} /> Print
                </button>
                <button className="btn btn-primary" onClick={downloadPdf} style={{ minHeight: 38 }} disabled={exporting}>
                  {exporting
                    ? <><span className="loader" /> Exporting…</>
                    : <><I.Download size={14} /> Download PDF</>}
                </button>
              </div>
            </div>
            <A4PrintView person={person} activity={activity} steps={steps} perPage={perPage} includeCover />
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 20 }}>
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>How does this read?</h3>
          <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0 }}>
            Captions written for <strong>{person.readingLevel?.toLowerCase() || "short sentences"}</strong>{" "}
            with a <strong>{(activity.tone || "warm").toLowerCase()}</strong> voice.
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>Visuals</h3>
          <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0 }}>
            We've suggested visual cues. Upload the person's own photos for stronger recognition.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12, flexWrap: "wrap" }}>
        <button className="btn btn-ghost" onClick={onBack}>
          <I.ArrowL size={16} /> Back to activity
        </button>
        <button className="btn btn-primary btn-lg" onClick={goExport}>
          Continue to export <I.Arrow size={16} />
        </button>
      </div>

      {editingIdx !== null && (
        <EditDrawer
          idx={editingIdx}
          step={steps[editingIdx]}
          onChange={(p) => updateStep(editingIdx, p)}
          onClose={() => setEditingIdx(null)}
        />
      )}
    </>
  );
}
