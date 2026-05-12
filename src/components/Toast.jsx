import React from "react";
import { I } from "./Icons.jsx";

export default function Toast({ toast }) {
  if (!toast) return null;
  const cls = "toast " + (toast.kind || "");
  const Ico = toast.kind === "error" ? I.Alert : I.Check;
  return (
    <div className={cls} role="status" aria-live="polite">
      <Ico size={16} sw={2.5} /> {toast.message}
    </div>
  );
}
