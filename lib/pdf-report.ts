import type { AssessmentState, ScoringResult, GapItem, Control } from "./types";

export async function generatePDFReport(
  state: AssessmentState,
  scores: ScoringResult,
  gaps: GapItem[],
  controls: Control[]
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 15;
  const contentW = pageW - margin * 2;
  const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  const PRIMARY = [37, 99, 235] as [number, number, number];
  const DARK = [15, 23, 42] as [number, number, number];
  const GRAY = [100, 116, 139] as [number, number, number];
  const GREEN = [34, 197, 94] as [number, number, number];
  const YELLOW = [245, 158, 11] as [number, number, number];
  const RED = [239, 68, 68] as [number, number, number];
  const LIGHT_BLUE = [239, 246, 255] as [number, number, number];

  const verdictColor = scores.stage1Verdict === "Ready" ? GREEN : scores.stage1Verdict === "Borderline" ? YELLOW : RED;

  // ── COVER PAGE ──────────────────────────────────────────────────────────────
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, pageW, 60, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("ISO 27001:2022 Compliance", margin, 28);
  doc.text("Assessment Report", margin, 38);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("ISO 27001 Self-Check · Annex A Controls Assessment", margin, 50);

  doc.setTextColor(...DARK);
  let y = 80;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Organization:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(state.companyName || "—", margin + 40, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Assessor:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(state.assessorName || "—", margin + 40, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Date:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(date, margin + 40, y);
  y += 16;

  doc.setFillColor(...LIGHT_BLUE);
  doc.roundedRect(margin, y, contentW, 36, 3, 3, "F");
  doc.setTextColor(...PRIMARY);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(`${Math.round(scores.composite)}%`, margin + 10, y + 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text("Composite implementation score", margin + 35, y + 15);
  doc.text(`${scores.totalImplemented} of ${scores.totalControls - scores.totalNotApplicable} applicable controls implemented`, margin + 35, y + 23);

  doc.setFillColor(...verdictColor);
  doc.roundedRect(margin + contentW - 55, y + 8, 50, 20, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Stage-1: ${scores.stage1Verdict}`, margin + contentW - 52, y + 20, { maxWidth: 44 });
  y += 50;

  // ── DISCLAIMER ──────────────────────────────────────────────────────────────
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "italic");
  const disclaimer = "DISCLAIMER: This report is an internal preparation aid and does NOT constitute an ISO 27001 certification or formal audit opinion. ISO 27001 certification requires Stage-1 and Stage-2 audits conducted by a JAS-ANZ accredited certification body.";
  doc.text(disclaimer, margin, y, { maxWidth: contentW });
  y += 16;

  // ── THEME SUMMARY TABLE ──────────────────────────────────────────────────────
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Theme Maturity Summary", margin, y);
  y += 6;

  autoTable(doc, {
    startY: y,
    head: [["Theme", "Controls", "Implemented", "In Progress", "Not Started", "N/A", "Score", "Maturity"]],
    body: scores.themes.map((t) => [
      `${t.theme} — ${t.themeName}`,
      t.total,
      t.implemented,
      t.inProgress,
      t.notStarted,
      t.notApplicable,
      `${Math.round(t.percentage)}%`,
      t.maturity,
    ]),
    headStyles: { fillColor: PRIMARY, fontSize: 8, fontStyle: "bold" },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 250, 252] as [number, number, number] },
    columnStyles: {
      0: { cellWidth: 60 },
      6: { fontStyle: "bold" },
      7: { fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  // ── GAP LIST ─────────────────────────────────────────────────────────────────
  doc.addPage();
  y = 20;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...DARK);
  doc.text("Top Priority Gaps", margin, y);
  y += 6;

  const CRIT_LABELS: Record<number, string> = { 1: "Low", 2: "Medium", 3: "High" };

  autoTable(doc, {
    startY: y,
    head: [["#", "Control", "Name", "Status", "Criticality"]],
    body: gaps.map((g, i) => [
      i + 1,
      g.control.control,
      g.control.name,
      g.state.status === "in_progress" ? "In Progress" : "Not Started",
      CRIT_LABELS[g.control.criticality],
    ]),
    headStyles: { fillColor: PRIMARY, fontSize: 8, fontStyle: "bold" },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 250, 252] as [number, number, number] },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 18, fontStyle: "bold" },
      2: { cellWidth: 80 },
    },
    margin: { left: margin, right: margin },
  });

  // ── PER-THEME DETAIL PAGES ───────────────────────────────────────────────────
  const themeOrder = ["A.5", "A.6", "A.7", "A.8"];

  for (const themeCode of themeOrder) {
    const themeControls = controls.filter((c) => c.theme === themeCode);
    if (themeControls.length === 0) continue;

    doc.addPage();
    y = 20;
    const themeScore = scores.themes.find((t) => t.theme === themeCode);

    doc.setFillColor(...PRIMARY);
    doc.rect(margin, y - 2, contentW, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${themeCode} — ${themeControls[0].themeName} Controls`, margin + 3, y + 6);
    y += 18;

    doc.setTextColor(...GRAY);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${themeScore?.implemented ?? 0} implemented · ${themeScore?.inProgress ?? 0} in progress · ${themeScore?.notStarted ?? 0} not started · Score: ${Math.round(themeScore?.percentage ?? 0)}% (${themeScore?.maturity ?? "—"})`,
      margin,
      y
    );
    y += 8;

    autoTable(doc, {
      startY: y,
      head: [["Control", "Name", "Status", "Evidence Ref", "Notes"]],
      body: themeControls.map((c) => {
        const cs = state.controls[c.control];
        const statusMap: Record<string, string> = {
          implemented: "Implemented",
          in_progress: "In Progress",
          not_started: "Not Started",
          not_applicable: "N/A",
        };
        return [
          c.control,
          c.name,
          statusMap[cs?.status ?? "not_started"] ?? "Not Started",
          cs?.evidenceRef ?? "",
          cs?.notes ?? "",
        ];
      }),
      headStyles: { fillColor: [71, 85, 105] as [number, number, number], fontSize: 7, fontStyle: "bold" },
      bodyStyles: { fontSize: 7 },
      alternateRowStyles: { fillColor: [248, 250, 252] as [number, number, number] },
      columnStyles: {
        0: { cellWidth: 16, fontStyle: "bold" },
        1: { cellWidth: 55 },
        2: { cellWidth: 22 },
        3: { cellWidth: 40 },
        4: { cellWidth: 42 },
      },
      margin: { left: margin, right: margin },
    });
  }

  const fileName = `iso27001-report-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
