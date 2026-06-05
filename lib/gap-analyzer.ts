import type { Control, ControlState, AssessmentState, GapItem } from "./types";

const GAP_WEIGHT: Record<string, number> = {
  not_started: 1.0,
  in_progress: 0.5,
};

export function getTopGaps(
  controls: Control[],
  state: AssessmentState,
  topN = 15
): GapItem[] {
  const gaps: GapItem[] = [];

  for (const control of controls) {
    const cs: ControlState = state.controls[control.control] ?? {
      status: "not_started",
      evidenceRef: "",
      notes: "",
      lastUpdated: "",
    };

    if (cs.status === "implemented" || cs.status === "not_applicable") continue;

    const weight = GAP_WEIGHT[cs.status] ?? 0;
    gaps.push({
      control,
      state: cs,
      gapScore: control.criticality * weight,
    });
  }

  gaps.sort((a, b) => b.gapScore - a.gapScore);
  return gaps.slice(0, topN);
}
