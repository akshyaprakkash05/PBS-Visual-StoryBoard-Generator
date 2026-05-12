import React from "react";

export default function SafeguardLine({ inline = false }) {
  if (inline) {
    return (
      <div className="a4-safeguard">
        <span className="sg-icon">!</span>
        <div>
          <strong>Safeguarding reminder.</strong> Review with the client's current
          support plan and PBS guidance before use. Confirm the storyboard reflects
          this person's most up-to-date communication, sensory and behaviour notes.
        </div>
      </div>
    );
  }
  return (
    <div className="safeguard-banner" data-no-print>
      <span className="sg-mark">!</span>
      <div>
        <strong>Safeguarding reminder.</strong>{" "}
        Review with the client's current support plan and PBS guidance before use.
      </div>
    </div>
  );
}
