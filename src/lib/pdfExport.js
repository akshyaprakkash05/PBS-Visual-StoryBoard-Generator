// Client-side PDF export. Renders each `.a4-sheet` inside the supplied
// container to a canvas, then assembles the canvases into a multi-page A4 PDF.
// jsPDF and html2canvas are loaded lazily so they only ship to users who
// actually export, keeping the initial bundle small.

const A4_MM = { w: 210, h: 297 };

async function loadDeps() {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);
  return { jsPDF, html2canvas };
}

function safeFilename(base) {
  return String(base || "storyboard")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "storyboard";
}

export async function exportSheetsToPdf({ container, filename = "pbs-storyboard.pdf" } = {}) {
  if (!container) throw new Error("exportSheetsToPdf: container is required");

  const sheets = Array.from(container.querySelectorAll(".a4-sheet"));
  if (sheets.length === 0) throw new Error("No printable sheets found.");

  const { jsPDF, html2canvas } = await loadDeps();
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  // Temporarily reset any responsive transforms applied by mobile styles.
  const previousTransforms = sheets.map((el) => el.style.transform);
  sheets.forEach((el) => { el.style.transform = "none"; });

  try {
    for (let i = 0; i < sheets.length; i++) {
      const sheet = sheets[i];
      const canvas = await html2canvas(sheet, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: sheet.scrollWidth,
        windowHeight: sheet.scrollHeight,
      });
      const img = canvas.toDataURL("image/jpeg", 0.92);
      if (i > 0) pdf.addPage("a4", "portrait");
      pdf.addImage(img, "JPEG", 0, 0, A4_MM.w, A4_MM.h, undefined, "FAST");
    }
    pdf.save(safeFilename(filename) + (filename.endsWith(".pdf") ? "" : ".pdf"));
  } finally {
    sheets.forEach((el, i) => { el.style.transform = previousTransforms[i]; });
  }
}

export function downloadStoryboardJson(payload, baseName = "storyboard") {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = safeFilename(baseName) + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
