import React, { useRef, useState } from "react";
import { I } from "../components/Icons.jsx";
import Topbar from "../components/Topbar.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import SafeguardLine from "../components/SafeguardLine.jsx";
import Field from "../components/Field.jsx";
import ChipGroup from "../components/ChipGroup.jsx";
import Toggle from "../components/Toggle.jsx";
import SaveTarget from "../components/SaveTarget.jsx";
import A4PrintView from "../components/A4PrintView.jsx";
import { exportSheetsToPdf, downloadStoryboardJson } from "../lib/pdfExport.js";

export default function ExportScreen({
  person, activity, steps,
  onBack, onDone, showToast, onMenu,
}) {
  const [format, setFormat] = useState("pdf-a4");
  const [perPage, setPerPage] = useState("6");
  const [includeCover, setIncludeCover] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [destinations, setDestinations] = useState(["care-record"]);
  const [acknowledged, setAcknowledged] = useState(false);
  const [working, setWorking] = useState(false);
  const printRef = useRef(null);

  const toggleDest = (d) =>
    setDestinations((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  const numPerPage = format === "pdf-cards" ? 1 : Number(perPage) || 6;

  const handleAction = async (action) => {
    if (!acknowledged) {
      showToast?.({ message: "Please tick the safeguarding reminder first.", kind: "error" });
      return;
    }
    if (action === "print") {
      window.print();
      return;
    }
    if (action === "download") {
      setWorking(true);
      try {
        await exportSheetsToPdf({
          container: printRef.current,
          filename: `pbs-storyboard-${person.firstName || "person"}.pdf`,
        });
        showToast?.({ message: "PDF downloaded.", kind: "success" });
      } catch (e) {
        console.error(e);
        showToast?.({ message: "Could not export PDF. Try Print instead.", kind: "error" });
      } finally {
        setWorking(false);
      }
      return;
    }
    if (action === "save") {
      downloadStoryboardJson(
        { person, activity, steps, exportedAt: new Date().toISOString() },
        `pbs-storyboard-${person.firstName || "person"}`
      );
      showToast?.({
        message: `Storyboard saved for ${person.firstName || "this person"}.`,
        kind: "success",
      });
      onDone?.();
      return;
    }
    if (action === "share") {
      const url = window.location.href;
      try {
        await navigator.clipboard?.writeText(url);
        showToast?.({ message: "Read-only link copied to clipboard.", kind: "success" });
      } catch {
        showToast?.({ message: "Clipboard blocked — copy the URL manually.", kind: "error" });
      }
    }
  };

  const runAll = async () => {
    if (!acknowledged) {
      showToast?.({ message: "Please tick the safeguarding reminder first.", kind: "error" });
      return;
    }
    const order = ["download", "print", "share", "care-record"];
    for (const d of order) {
      if (destinations.includes(d)) {
        const map = { "care-record": "save", download: "download", print: "print", share: "share" };
        // eslint-disable-next-line no-await-in-loop
        await handleAction(map[d]);
      }
    }
  };

  return (
    <>
      <Topbar
        crumbs={["Create", "New storyboard", "Export"]}
        onMenu={onMenu}
        actions={
          <button className="btn btn-ghost" onClick={onBack}>
            <I.ArrowL size={16} /> Back
          </button>
        }
      />

      <SectionTitle
        eyebrow="Final step"
        title="Save, print or share"
        sub="Your storyboard is ready. Choose how to get it to the people who'll use it on the day."
      />

      <SafeguardLine />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 24 }}>
        <div className="card card-lg">
          <h2 style={{ marginBottom: 6 }}>Format</h2>
          <p className="card-sub" style={{ marginBottom: 16 }}>Pick a layout that suits how it'll be used.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {[
              { id: "pdf-a4", title: "PDF · A4", sub: "Print-ready, foldable", icon: I.Doc },
              { id: "pdf-cards", title: "PDF · Cards", sub: "One step per page", icon: I.Library },
              { id: "slides", title: "Slideshow", sub: "Show on a tablet", icon: I.Eye },
            ].map((f) => {
              const on = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  aria-pressed={on}
                  style={{
                    border: "1.5px solid " + (on ? "var(--sage)" : "var(--line)"),
                    background: on ? "var(--sage-soft)" : "#fff",
                    borderRadius: 14, padding: 16, textAlign: "left",
                    display: "flex", flexDirection: "column", gap: 8, cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: on ? "var(--sage)" : "var(--bg-2)",
                      color: on ? "#fff" : "var(--ink)",
                      display: "grid", placeItems: "center",
                    }}
                  >
                    <f.icon size={18} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{f.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <hr className="divider" />

          <div className="grid-2">
            <Field label="Steps per page">
              <ChipGroup
                multi={false}
                value={perPage}
                onChange={setPerPage}
                options={["1", "2", "4", "6"]}
              />
            </Field>
            <Field label="Orientation">
              <ChipGroup
                multi={false}
                value="portrait"
                onChange={() => {}}
                options={["portrait"]}
              />
            </Field>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 10 }}>Include</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Toggle
              label="Cover page with the person's name and date"
              sub="Useful for filing"
              value={includeCover}
              onChange={setIncludeCover}
            />
            <Toggle
              label="Staff notes page"
              sub="Sensitivities, motivators, and a checklist of what to bring"
              value={includeNotes}
              onChange={setIncludeNotes}
            />
            <Toggle
              label="Easy-read large font"
              sub="20pt minimum, generous spacing"
              value={true}
              onChange={() => {}}
            />
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 6 }}>Save to</h3>
          <p className="card-sub" style={{ marginBottom: 14 }}>You can choose more than one destination.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { id: "download", label: "Download PDF",        sub: "A printable A4 storyboard saved to this device", icon: I.Download },
              { id: "print",    label: "Print",               sub: "Send to your default printer", icon: I.Print },
              { id: "care-record", label: "Save storyboard",  sub: `Download as JSON to attach to ${person.firstName || "this person"}'s plan`, icon: I.Save },
              { id: "share",    label: "Share with support team", sub: "Copy a link to send to colleagues", icon: I.Share },
            ].map((d) => (
              <SaveTarget
                key={d.id}
                label={d.label}
                sub={d.sub}
                icon={d.icon}
                on={destinations.includes(d.id)}
                onToggle={() => toggleDest(d.id)}
              />
            ))}
          </div>

          <hr className="divider" />

          <div
            style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              background: "#FBF8F2", border: "1px solid var(--line)",
              borderRadius: 12, padding: "14px 16px",
            }}
          >
            <button
              type="button"
              onClick={() => setAcknowledged(!acknowledged)}
              aria-pressed={acknowledged}
              style={{
                width: 22, height: 22, borderRadius: 6, marginTop: 2,
                border: "2px solid " + (acknowledged ? "var(--sage)" : "#C9D2DE"),
                background: acknowledged ? "var(--sage)" : "#fff",
                color: "#fff", flex: "0 0 auto",
                display: "grid", placeItems: "center", cursor: "pointer",
              }}
            >
              {acknowledged && <I.Check size={13} sw={3} />}
            </button>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)" }}>
              <strong style={{ color: "var(--ink)" }}>Safeguarding reminder.</strong>{" "}
              I have reviewed this storyboard against {person.firstName || "the person"}'s current support plan and PBS guidance before use.
            </div>
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Preview</h3>
            <div
              style={{
                background: "#fff", border: "1px solid var(--line)", borderRadius: 12,
                padding: 14, fontSize: 12.5,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>{activity.customName || activity.activityName}</div>
              <div style={{ color: "var(--muted)", marginBottom: 10 }}>
                For {person.firstName} · {steps.length} steps
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {steps.slice(0, 4).map((s, i) => (
                  <div key={i} style={{ border: "1px solid var(--line-2)", borderRadius: 8, padding: 8, background: "#FBF8F2" }}>
                    <div
                      style={{
                        aspectRatio: "4/3", borderRadius: 6,
                        background: "repeating-linear-gradient(135deg, #EEE6D2 0 6px, #E8DFC7 6px 12px)",
                        marginBottom: 6, fontSize: 9, color: "#B0A48A",
                        display: "grid", placeItems: "center",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 11, lineHeight: 1.25 }}>{s.title}</div>
                  </div>
                ))}
              </div>
              {steps.length > 4 && (
                <div style={{ marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
                  + {steps.length - 4} more steps
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ background: "var(--sage-soft)", borderColor: "transparent" }}>
            <h3 style={{ marginBottom: 6, color: "var(--sage-deep)" }}>Ready to go</h3>
            <p style={{ fontSize: 14, margin: "0 0 14px", color: "var(--sage-deep)" }}>
              {destinations.length} destination{destinations.length !== 1 ? "s" : ""} selected.
            </p>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={!acknowledged || working || destinations.length === 0}
              onClick={runAll}
            >
              {working
                ? <><span className="loader" /> Working…</>
                : <><I.Check size={16} sw={2.5} /> Confirm & finish</>}
            </button>
            <button
              className="btn btn-ghost"
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              onClick={() => handleAction("print")}
              disabled={!acknowledged}
            >
              <I.Print size={14} /> Open print preview
            </button>
          </div>
        </aside>
      </div>

      {/* Hidden A4 sheets — rendered for PDF export but visually offscreen. */}
      <div
        ref={printRef}
        aria-hidden="true"
        style={{
          position: "absolute", left: "-99999px", top: 0,
          width: "210mm", background: "#fff",
        }}
      >
        <A4PrintView
          person={person}
          activity={activity}
          steps={steps}
          perPage={numPerPage}
          includeCover={includeCover}
        />
      </div>
    </>
  );
}
