import { describe, it, expect } from "vitest";
import { computeScores } from "../lib/scoring";
import type { Control, AssessmentState } from "../lib/types";

const mockControls: Control[] = [
  { theme: "A.5", themeName: "Organizational", control: "A.5.1", name: "Policies", implementationHint: "", category: "Governance", criticality: 3, auditRelevance: "high" },
  { theme: "A.5", themeName: "Organizational", control: "A.5.2", name: "Roles", implementationHint: "", category: "Governance", criticality: 2, auditRelevance: "medium" },
  { theme: "A.6", themeName: "People", control: "A.6.1", name: "Screening", implementationHint: "", category: "HR Security", criticality: 2, auditRelevance: "medium" },
  { theme: "A.6", themeName: "People", control: "A.6.2", name: "Terms", implementationHint: "", category: "HR Security", criticality: 2, auditRelevance: "medium" },
];

function makeState(overrides: Record<string, string> = {}): AssessmentState {
  const controls: AssessmentState["controls"] = {};
  for (const [id, status] of Object.entries(overrides)) {
    controls[id] = { status: status as AssessmentState["controls"][string]["status"], evidenceRef: "", notes: "", lastUpdated: "" };
  }
  return { version: 1, companyName: "", assessorName: "", lastSaved: "", controls };
}

describe("computeScores", () => {
  it("returns 100% composite when all controls implemented", () => {
    const state = makeState({ "A.5.1": "implemented", "A.5.2": "implemented", "A.6.1": "implemented", "A.6.2": "implemented" });
    const result = computeScores(mockControls, state);
    expect(result.composite).toBe(100);
    expect(result.stage1Verdict).toBe("Ready");
  });

  it("returns 0% composite when all controls not started", () => {
    const result = computeScores(mockControls, makeState());
    expect(result.composite).toBe(0);
    expect(result.stage1Verdict).toBe("Not Ready");
  });

  it("returns 50% for all in_progress", () => {
    const state = makeState({ "A.5.1": "in_progress", "A.5.2": "in_progress", "A.6.1": "in_progress", "A.6.2": "in_progress" });
    const result = computeScores(mockControls, state);
    expect(result.composite).toBe(50);
    expect(result.stage1Verdict).toBe("Borderline");
  });

  it("excludes NA controls from denominator", () => {
    // 2 NA, 2 implemented → composite should be 100%
    const state = makeState({ "A.5.1": "not_applicable", "A.5.2": "not_applicable", "A.6.1": "implemented", "A.6.2": "implemented" });
    const result = computeScores(mockControls, state);
    expect(result.composite).toBe(100);
    expect(result.totalNotApplicable).toBe(2);
  });

  it("returns 100% when ALL controls are NA (no applicable denominator)", () => {
    const state = makeState({ "A.5.1": "not_applicable", "A.5.2": "not_applicable", "A.6.1": "not_applicable", "A.6.2": "not_applicable" });
    const result = computeScores(mockControls, state);
    expect(result.composite).toBe(100);
  });

  it("handles mixed statuses correctly", () => {
    // 1 implemented (1.0), 1 in_progress (0.5), 2 not_started (0) → score = 1.5/4 = 37.5%
    const state = makeState({ "A.5.1": "implemented", "A.6.1": "in_progress" });
    const result = computeScores(mockControls, state);
    expect(result.composite).toBeCloseTo(37.5);
    expect(result.totalImplemented).toBe(1);
    expect(result.totalInProgress).toBe(1);
    expect(result.totalNotStarted).toBe(2);
  });

  it("returns Borderline when composite is 75% but a theme is below 60%", () => {
    // A.5: 2/2 = 100%, A.6: 1/2 = 50% (below 60% threshold) → composite = 75% but not all themes ≥ 60%
    const state = makeState({ "A.5.1": "implemented", "A.5.2": "implemented", "A.6.1": "implemented" });
    const result = computeScores(mockControls, state);
    expect(result.composite).toBe(75);
    expect(result.stage1Verdict).toBe("Borderline");
  });

  it("returns Not Ready when composite < 50", () => {
    const state = makeState({ "A.5.1": "in_progress" }); // 0.5/4 = 12.5%
    const result = computeScores(mockControls, state);
    expect(result.stage1Verdict).toBe("Not Ready");
  });

  it("returns Borderline when composite is exactly 50% with one theme at 0%", () => {
    // A.5: 2/2 implemented = 100%, A.6: 0/2 = 0% → composite = 50% → Borderline (not < 50)
    const state = makeState({ "A.5.1": "implemented", "A.5.2": "implemented" });
    const result = computeScores(mockControls, state);
    const a6Theme = result.themes.find((t) => t.theme === "A.6");
    expect(a6Theme?.percentage).toBe(0);
    expect(result.composite).toBe(50);
    expect(result.stage1Verdict).toBe("Borderline");
  });

  it("assigns correct maturity tiers at boundaries", () => {
    // A.5: 1 implemented out of 2 = 50% → Developing
    const state = makeState({ "A.5.1": "implemented", "A.6.1": "implemented", "A.6.2": "implemented" });
    const result = computeScores(mockControls, state);
    const a5 = result.themes.find((t) => t.theme === "A.5");
    const a6 = result.themes.find((t) => t.theme === "A.6");
    expect(a5?.maturity).toBe("Developing");
    expect(a6?.maturity).toBe("Optimized");
  });

  it("per-theme NA exclusion: single theme all NA returns 100% for that theme", () => {
    const state = makeState({ "A.6.1": "not_applicable", "A.6.2": "not_applicable" });
    const result = computeScores(mockControls, state);
    const a6 = result.themes.find((t) => t.theme === "A.6");
    expect(a6?.percentage).toBe(100);
    expect(a6?.applicableTotal).toBe(0);
  });
});
