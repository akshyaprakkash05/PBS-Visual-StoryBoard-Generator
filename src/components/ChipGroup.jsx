import React from "react";

export default function ChipGroup({ options, value, onChange, multi = true }) {
  const toggle = (opt) => {
    if (multi) {
      onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <div className="chips" role={multi ? "group" : "radiogroup"}>
      {options.map((opt) => {
        const on = multi ? value.includes(opt) : value === opt;
        return (
          <button
            key={opt}
            type="button"
            className={"chip " + (on ? "on" : "")}
            onClick={() => toggle(opt)}
            aria-pressed={on}
            role={multi ? undefined : "radio"}
            aria-checked={multi ? undefined : on}
          >
            <span className="dot" /> {opt}
          </button>
        );
      })}
    </div>
  );
}
