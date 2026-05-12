import React, { useState } from "react";
import { I } from "../components/Icons.jsx";
import Topbar from "../components/Topbar.jsx";
import Stepper from "../components/Stepper.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Field from "../components/Field.jsx";
import ChipGroup from "../components/ChipGroup.jsx";
import { ACTIVITY_PRESETS } from "../lib/constants.js";

export default function ActivityForm({ data, setData, person, onNext, onBack, onMenu }) {
  const [touched, setTouched] = useState(false);
  const update = (k, v) => setData({ ...data, [k]: v });

  const name = data.customName?.trim() || (data.activityName !== "Custom activity" ? data.activityName?.trim() : "");
  const nameError = touched && !name ? "Please describe the activity." : null;
  const isValid = !!name;

  const handleNext = () => {
    setTouched(true);
    if (isValid) {
      if (data.activityName === "Custom activity" && !data.customName) {
        update("customName", "");
      }
      onNext();
    }
  };

  return (
    <>
      <Topbar
        crumbs={["Create", "New storyboard", "Activity"]}
        onMenu={onMenu}
        actions={
          <button className="btn btn-ghost" onClick={onBack}>
            <I.ArrowL size={16} /> Back
          </button>
        }
      />

      <Stepper step={2} />

      <SectionTitle
        eyebrow={`Step 2 of 3 · for ${person.firstName || "this person"}`}
        title="What's the activity?"
        sub="Pick a starting point or describe your own. You can fine-tune length, tone, and what to show in each step."
      />

      <div className="col-2">
        <div className="card card-lg" style={{ minWidth: 0 }}>
          <h2 style={{ marginBottom: 6 }}>The activity</h2>
          <p className="card-sub" style={{ marginBottom: 18 }}>Choose a preset to start, then refine the details.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 22 }}>
            {ACTIVITY_PRESETS.map((p) => {
              const on = data.activityName === p.name;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    update("activityName", p.name);
                    if (p.name !== "Custom activity") update("customName", p.name);
                  }}
                  aria-pressed={on}
                  style={{
                    border: "1.5px solid " + (on ? "var(--sage)" : "var(--line)"),
                    background: on ? "var(--sage-soft)" : "#fff",
                    color: on ? "var(--sage-deep)" : "var(--ink)",
                    borderRadius: 14,
                    padding: "16px 12px",
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    minHeight: 86,
                  }}
                >
                  <span style={{ fontSize: 26 }} aria-hidden>{p.icon}</span>
                  {p.name}
                </button>
              );
            })}
          </div>

          <Field label="Activity name *" help="This becomes the storyboard title." error={nameError}>
            <input
              className={"input " + (nameError ? "error" : "")}
              value={data.customName}
              onChange={(e) => update("customName", e.target.value)}
              placeholder={
                data.activityName === "Custom activity"
                  ? "Describe in plain language"
                  : data.activityName || "e.g. Going to the dentist"
              }
              aria-invalid={!!nameError}
            />
          </Field>

          <div className="grid-2" style={{ marginTop: 18 }}>
            <Field label="Where will it happen?">
              <input
                className="input"
                value={data.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Bridgewater Dental Surgery, Reading"
              />
            </Field>
            <Field label="When?">
              <input
                className="input"
                value={data.when}
                onChange={(e) => update("when", e.target.value)}
                placeholder="Tomorrow at 10:30"
              />
            </Field>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 6 }}>Pacing & length</h3>
          <p className="card-sub" style={{ marginBottom: 14 }}>
            We'll generate this many steps. Most storyboards work well at 6.
          </p>

          <Field label="Number of steps">
            <ChipGroup
              multi={false}
              value={String(data.numSteps)}
              onChange={(v) => update("numSteps", Number(v))}
              options={["5", "6", "7"]}
            />
          </Field>

          <div style={{ marginTop: 18 }}>
            <Field label="Support level on the day">
              <ChipGroup
                multi={false}
                value={data.supportLevel}
                onChange={(v) => update("supportLevel", v)}
                options={["1:1 throughout", "1:1 with breaks", "2:1 support", "Independent with prompts"]}
              />
            </Field>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 6 }}>Tone of language</h3>
          <p className="card-sub" style={{ marginBottom: 14 }}>Mirrors how staff already speak with the person.</p>

          <Field label="Voice">
            <ChipGroup
              multi={false}
              value={data.tone}
              onChange={(v) => update("tone", v)}
              options={["Warm & reassuring", "Plain & matter-of-fact", "Cheerful & upbeat", "Brief instructions"]}
            />
          </Field>

          <div style={{ marginTop: 18 }}>
            <Field label="Things to highlight">
              <ChipGroup
                value={data.highlights}
                onChange={(v) => update("highlights", v)}
                options={[
                  "Choices the person can make",
                  "What might feel new or different",
                  "When breaks are available",
                  "What happens after",
                  "Who will be there",
                ]}
              />
            </Field>
          </div>

          <div style={{ marginTop: 18 }}>
            <Field
              label="Anything to avoid or be careful with?"
              help="Trigger words listed here are filtered from the storyboard."
            >
              <textarea
                className="textarea"
                value={data.avoid}
                onChange={(e) => update("avoid", e.target.value)}
                placeholder="e.g. Don't mention the dentist drill until it's needed. Avoid the word 'injection'."
              />
            </Field>
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div className="avatar" style={{ background: "var(--sage-soft)", color: "var(--sage-deep)", width: 42, height: 42 }}>
                {(person.firstName || "?").slice(0, 1)}{(person.lastInitial || "").slice(0, 1)}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{person.firstName || "—"} {person.lastInitial}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {person.age ? `Age ${person.age} · ` : ""}{person.pronouns}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(person.sensitivities || []).slice(0, 4).map((s) => <span key={s} className="tag clay">{s}</span>)}
              {(person.regulators || []).slice(0, 3).map((s) => <span key={s} className="tag sage">{s}</span>)}
            </div>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={onBack}>
              <I.Edit size={14} /> Edit person
            </button>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 10 }}>What we'll generate</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Personalised step captions",
                "Visual cue suggestions",
                "Optional 'feelings check' step",
                "PBS-friendly ending",
              ].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--ink-2)" }}>
                  <span style={{ color: "var(--sage)", marginTop: 2 }}><I.Check size={16} sw={2.5} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12, flexWrap: "wrap" }}>
        <button className="btn btn-ghost" onClick={onBack}>
          <I.ArrowL size={16} /> Back to person
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleNext} disabled={!isValid}>
          <I.Sparkles size={16} /> Generate storyboard
        </button>
      </div>
    </>
  );
}
