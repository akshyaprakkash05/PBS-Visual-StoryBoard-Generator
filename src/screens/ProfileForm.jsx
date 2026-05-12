import React, { useState } from "react";
import { I } from "../components/Icons.jsx";
import Topbar from "../components/Topbar.jsx";
import Stepper from "../components/Stepper.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Field from "../components/Field.jsx";
import ChipGroup from "../components/ChipGroup.jsx";

export default function ProfileForm({ data, setData, onNext, onBack, onMenu }) {
  const [touched, setTouched] = useState(false);
  const update = (k, v) => setData({ ...data, [k]: v });

  const firstNameError = touched && !data.firstName?.trim() ? "Please enter a first name." : null;
  const isValid = !!data.firstName?.trim();

  const handleContinue = () => {
    setTouched(true);
    if (isValid) onNext();
  };

  return (
    <>
      <Topbar
        crumbs={["Create", "New storyboard", "Person"]}
        onMenu={onMenu}
        actions={
          <button className="btn btn-ghost" onClick={onBack}>
            <I.ArrowL size={16} /> Cancel
          </button>
        }
      />

      <Stepper step={1} />

      <SectionTitle
        eyebrow="Step 1 of 3"
        title="Who is this storyboard for?"
        sub="Tell us a little about the person. This shapes the language, images, and pacing of the steps. Everything is saved to their care record."
      />

      <div className="col-2">
        <div className="card card-lg" style={{ minWidth: 0 }}>
          <h2 style={{ marginBottom: 6 }}>About the person</h2>
          <p className="card-sub" style={{ marginBottom: 22 }}>
            Required fields are marked with an asterisk.
          </p>

          <div className="grid-2">
            <Field label="First name *" error={firstNameError}>
              <input
                className={"input " + (firstNameError ? "error" : "")}
                value={data.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="e.g. Aaron"
                aria-invalid={!!firstNameError}
              />
            </Field>
            <Field label="Initial of surname" hint="for privacy">
              <input
                className="input"
                value={data.lastInitial}
                onChange={(e) => update("lastInitial", e.target.value)}
                maxLength={2}
                placeholder="T."
              />
            </Field>
          </div>

          <div className="grid-2" style={{ marginTop: 18 }}>
            <Field label="Age">
              <input
                className="input"
                type="number"
                value={data.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="27"
                min={0}
                max={120}
              />
            </Field>
            <Field label="Pronouns">
              <select
                className="select"
                value={data.pronouns}
                onChange={(e) => update("pronouns", e.target.value)}
              >
                <option>he / him</option>
                <option>she / her</option>
                <option>they / them</option>
                <option>other</option>
              </select>
            </Field>
          </div>

          <div style={{ marginTop: 18 }}>
            <Field
              label="Diagnosis"
              help="Used only to shape language and image style. Leave blank if you'd rather not say."
            >
              <input
                className="input"
                value={data.diagnosis}
                onChange={(e) => update("diagnosis", e.target.value)}
                placeholder="e.g. Autism · learning disability"
              />
            </Field>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 6 }}>Communication</h3>
          <p className="card-sub" style={{ marginBottom: 14 }}>
            How does the person usually communicate and understand information?
          </p>

          <Field label="Primary communication style">
            <ChipGroup
              multi={false}
              value={data.commStyle}
              onChange={(v) => update("commStyle", v)}
              options={[
                "Verbal — full sentences",
                "Verbal — short phrases",
                "Single words / key words",
                "Makaton signs",
                "PECS / picture exchange",
                "AAC device",
                "Non-verbal",
              ]}
            />
          </Field>

          <div style={{ marginTop: 18 }}>
            <Field label="Reading level" help="Used to shape sentence length in step captions.">
              <ChipGroup
                multi={false}
                value={data.readingLevel}
                onChange={(v) => update("readingLevel", v)}
                options={["Pictures only", "1–3 word captions", "Short sentences", "Full sentences"]}
              />
            </Field>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 6 }}>Sensory profile</h3>
          <p className="card-sub" style={{ marginBottom: 14 }}>
            Tick any that apply. We'll plan around these in the storyboard.
          </p>

          <Field label="Known sensitivities & triggers">
            <ChipGroup
              value={data.sensitivities}
              onChange={(v) => update("sensitivities", v)}
              options={[
                "Loud noise", "Bright lights", "Crowds", "Unexpected touch",
                "Strong smells", "New people", "Waiting", "Changes to routine",
              ]}
            />
          </Field>

          <div style={{ marginTop: 18 }}>
            <Field label="What helps them feel safe">
              <ChipGroup
                value={data.regulators}
                onChange={(v) => update("regulators", v)}
                options={[
                  "Ear defenders", "Weighted blanket", "Fidget object", "Familiar staff",
                  "Music", "Short breaks", "Quiet space", "Visual timer",
                ]}
              />
            </Field>
          </div>

          <hr className="divider" />

          <h3 style={{ marginBottom: 6 }}>What motivates them</h3>
          <p className="card-sub" style={{ marginBottom: 14 }}>
            Interests, themes, and rewards help us frame the ending of the storyboard.
          </p>

          <Field label="Interests, themes & motivators">
            <ChipGroup
              value={data.motivators}
              onChange={(v) => update("motivators", v)}
              options={[
                "Football", "Music", "Drawing", "Animals", "Cooking", "Cars",
                "Walks", "Café visits", "TV shows", "Reading",
              ]}
            />
          </Field>

          <div style={{ marginTop: 18 }}>
            <Field
              label="Anything else we should know"
              help="Behaviours that communicate distress, additional triggers, or notes from the PBS plan."
            >
              <textarea
                className="textarea"
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="e.g. Aaron may pace and tap his chest when overwhelmed. Offering his headphones and stepping outside usually helps."
              />
            </Field>
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sage-soft)", color: "var(--sage-deep)", display: "grid", placeItems: "center" }}>
                <I.Heart size={18} />
              </span>
              <h3>Person-centred</h3>
            </div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0, lineHeight: 1.5 }}>
              Use the person's own language wherever you can. If something feels uncertain, it's better to leave blank than guess.
            </p>
          </div>

          <div className="card" style={{ background: "#FBF8F2", borderStyle: "dashed" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", marginBottom: 8, fontSize: 13, fontWeight: 600 }}>
              <I.Alert size={14} /> DATA HANDLING
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0, lineHeight: 1.55 }}>
              Stored in your Urban Care workspace only. Never used to train AI models. Removed after 24 months unless saved to a plan.
            </p>
          </div>
        </aside>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12, flexWrap: "wrap" }}>
        <button className="btn btn-ghost" onClick={onBack}>
          <I.ArrowL size={16} /> Save & exit
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleContinue} disabled={!isValid}>
          Continue to activity <I.Arrow size={16} />
        </button>
      </div>
    </>
  );
}
