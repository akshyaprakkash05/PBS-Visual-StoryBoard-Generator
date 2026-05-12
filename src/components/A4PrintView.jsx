import React from "react";
import SafeguardLine from "./SafeguardLine.jsx";

export default function A4PrintView({
  person,
  activity,
  steps,
  perPage = 6,
  includeCover = true,
}) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const cols = perPage === 1 ? "cols-1" : perPage === 3 ? "cols-3" : "";
  const pages = [];
  for (let i = 0; i < steps.length; i += perPage) {
    pages.push(steps.slice(i, i + perPage));
  }
  const totalPages = pages.length + (includeCover ? 1 : 0);
  let pageNum = 0;

  return (
    <>
      {includeCover && (
        <section className="a4-sheet a4-cover" aria-label="Cover page">
          <div>
            <div className="c-eyebrow">Visual storyboard</div>
            <div className="c-title">{activity.customName || activity.activityName}</div>
            <div style={{ color: "#475467", fontSize: "12pt", maxWidth: "120mm", lineHeight: 1.5 }}>
              A {steps.length}-step Positive Behaviour Support storyboard prepared for {person.firstName} {person.lastInitial}.
            </div>
            <dl className="c-meta">
              <div><dt>Prepared for</dt><dd>{person.firstName} {person.lastInitial}{person.age ? ` · age ${person.age}` : ""}</dd></div>
              <div><dt>Activity</dt><dd>{activity.customName || activity.activityName}</dd></div>
              <div><dt>Where & when</dt><dd>{activity.location || "—"}<br />{activity.when || ""}</dd></div>
              <div><dt>Support level</dt><dd>{activity.supportLevel}</dd></div>
              <div><dt>Communication</dt><dd>{person.commStyle}</dd></div>
              <div><dt>Reading level</dt><dd>{person.readingLevel}</dd></div>
            </dl>
            {person.sensitivities && person.sensitivities.length > 0 && (
              <div style={{ marginTop: "6mm" }}>
                <div style={{ fontSize: "9pt", textTransform: "uppercase", letterSpacing: "0.06em", color: "#7A8699", fontWeight: 600, marginBottom: "2mm" }}>Be careful with</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2mm" }}>
                  {person.sensitivities.map((s) => (
                    <span key={s} style={{ background: "#F4E6DF", color: "#8E4A30", padding: "1.5mm 3mm", borderRadius: "2mm", fontSize: "10pt", fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {person.regulators && person.regulators.length > 0 && (
              <div style={{ marginTop: "5mm" }}>
                <div style={{ fontSize: "9pt", textTransform: "uppercase", letterSpacing: "0.06em", color: "#7A8699", fontWeight: 600, marginBottom: "2mm" }}>What helps</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2mm" }}>
                  {person.regulators.map((s) => (
                    <span key={s} style={{ background: "#E6EFF2", color: "#2E6273", padding: "1.5mm 3mm", borderRadius: "2mm", fontSize: "10pt", fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <SafeguardLine inline />
            <div className="a4-foot">
              <span>Urban Care Community · PBS Visual Storyboard</span>
              <span>Page {++pageNum} of {totalPages} · Generated {today}</span>
            </div>
          </div>
        </section>
      )}

      {pages.map((chunk, pi) => (
        <section key={pi} className="a4-sheet" aria-label={`Storyboard page ${pi + 1}`}>
          <header className="a4-head">
            <div>
              <div className="h-title">{activity.customName || activity.activityName}</div>
              <div className="h-sub">For {person.firstName} {person.lastInitial} · {steps.length} steps · {activity.supportLevel}</div>
            </div>
            <div className="h-meta">
              <div><strong>Date</strong> {today}</div>
              <div><strong>Activity</strong> {activity.when || "—"}</div>
              <div><strong>Where</strong> {activity.location || "—"}</div>
            </div>
          </header>

          <div className={"a4-grid " + cols}>
            {chunk.map((s, i) => {
              const stepIndex = pi * perPage + i;
              return (
                <article key={i} className="a4-card">
                  <div className="a4-row">
                    <div className="a4-num">{stepIndex + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="a4-title">{s.title}</div>
                    </div>
                  </div>
                  <div className="a4-img">
                    visual cue<br />
                    {s.imagePrompt ? s.imagePrompt.split(",").slice(0, 2).join(",") : s.cue}
                  </div>
                  {s.pbsTip && (
                    <div className="a4-tip"><strong>PBS tip · </strong>{s.pbsTip}</div>
                  )}
                  {s.carerGuidance && (
                    <div className="a4-carer"><strong>Carer · </strong>{s.carerGuidance}</div>
                  )}
                </article>
              );
            })}
          </div>

          <SafeguardLine inline />
          <div className="a4-foot">
            <span>Urban Care Community · PBS Visual Storyboard</span>
            <span>Page {++pageNum} of {totalPages}</span>
          </div>
        </section>
      ))}
    </>
  );
}
