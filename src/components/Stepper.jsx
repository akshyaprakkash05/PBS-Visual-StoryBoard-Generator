import React from "react";
import { I } from "./Icons.jsx";

export default function Stepper({ step }) {
  const steps = ["Person", "Activity", "Review", "Export"];
  return (
    <div
      className="stepper"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-valuenow={step}
      aria-label={`Step ${step} of ${steps.length}`}
    >
      {steps.map((label, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "active" : "";
        return (
          <span key={label} className={"step-pill " + state}>
            <span className="n">{n < step ? <I.Check size={12} sw={3} /> : n}</span>
            {label}
          </span>
        );
      })}
    </div>
  );
}
