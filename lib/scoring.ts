import type { Control, ControlState, AssessmentState, ThemeScore, ScoringResult, MaturityLevel, Stage1Verdict, ThemeCode } from "./types";

const STATUS_WEIGHT: Record<string, number> = {
  implemented: 1.0,
  in_progress: 0.5,
  not_started: 0.0,
  not_applicable: -1,
};

const MATURITY_THRESHOLDS: [number, MaturityLevel][] = [
  [86, "Optimized"],
  [66, "Mature"],
  [41, "Developing"],
  [0, "Basic"],
];

function getMaturity(percentage: number): MaturityLevel {
  for (const [threshold, level] of MATURITY_THRESHOLDS) {
    if (percentage >= threshold) return level;
  }
  return "Basic";
}

function getStage1Verdict(composite: number, themes: ThemeScore[]): Stage1Verdict {
  if (composite < 50) return "Not Ready";
  const allThemesAbove60 = themes.every((t) => t.applicableTotal === 0 || t.percentage >= 60);
  if (composite >= 75 && allThemesAbove60) return "Ready";
  return "Borderline";
}

export function computeScores(
  controls: Control[],
  state: AssessmentState
): ScoringResult {
  const themeMap = new Map<ThemeCode, { controls: Control[]; themeName: string }>();

  for (const control of controls) {
    if (!themeMap.has(control.theme)) {
      themeMap.set(control.theme, { controls: [], themeName: control.themeName });
    }
    themeMap.get(control.theme)!.controls.push(control);
  }

  const themes: ThemeScore[] = [];
  let totalScore = 0;
  let totalApplicable = 0;
  let totalImplemented = 0;
  let totalInProgress = 0;
  let totalNotStarted = 0;
  let totalNotApplicable = 0;

  for (const [theme, { controls: themeControls, themeName }] of themeMap) {
    let implemented = 0;
    let inProgress = 0;
    let notStarted = 0;
    let notApplicable = 0;
    let score = 0;
    let applicableTotal = 0;

    for (const control of themeControls) {
      const cs: ControlState = state.controls[control.control] ?? {
        status: "not_started",
        evidenceRef: "",
        notes: "",
        lastUpdated: "",
      };

      if (cs.status === "not_applicable") {
        notApplicable++;
      } else {
        applicableTotal++;
        score += STATUS_WEIGHT[cs.status] ?? 0;
        if (cs.status === "implemented") implemented++;
        else if (cs.status === "in_progress") inProgress++;
        else notStarted++;
      }
    }

    const percentage = applicableTotal > 0 ? (score / applicableTotal) * 100 : 100;

    themes.push({
      theme,
      themeName,
      total: themeControls.length,
      implemented,
      inProgress,
      notStarted,
      notApplicable,
      applicableTotal,
      percentage,
      maturity: getMaturity(percentage),
    });

    totalScore += score;
    totalApplicable += applicableTotal;
    totalImplemented += implemented;
    totalInProgress += inProgress;
    totalNotStarted += notStarted;
    totalNotApplicable += notApplicable;
  }

  const composite = totalApplicable > 0 ? (totalScore / totalApplicable) * 100 : 100;

  return {
    composite,
    themes,
    stage1Verdict: getStage1Verdict(composite, themes),
    totalControls: controls.length,
    totalImplemented,
    totalInProgress,
    totalNotStarted,
    totalNotApplicable,
  };
}
