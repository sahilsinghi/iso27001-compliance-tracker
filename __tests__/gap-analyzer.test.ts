import { describe, it, expect } from "vitest";
import { getTopGaps } from "../lib/gap-analyzer";
import type { Control, AssessmentState } from "../lib/types";

const mockControls: Control[] = [
  { theme: "A.5", themeName: "Organizational", control: "A.5.1", name: "Policies", implementationHint: "", category: "Governance", criticality: 3, auditRelevance: "high" },
  { theme: "A.5", themeName: "Organizational", control: "A.5.2", name: "Roles", implementationHint: "", category: "Governance", criticality: 1, auditRelevance: "low" },
  { theme: "A.8", themeName: "Technological", control: "A.8.1", name: "Endpoints", implementationHint: "", category: "Endpoint Security", criticality: 3, auditRelevance: "high" },
  { theme: "A.8", themeName: "Technological", control: "A.8.7", name: "Malware", implementationHint: "", category: "Endpoint Security", criticality: 3, auditRelevance: "high" },
];

function makeState(overrides: Record<string, string> = {}): AssessmentState {
  const controls: AssessmentState["controls"] = {};
  for (const [id, status] of Object.entries(overrides)) {
    controls[id] = { status: status as AssessmentState["controls"][string]["status"], evidenceRef: "", notes: "", lastUpdated: "" };
  }
  return { version: 1, companyName: "", assessorName: "", lastSaved: "", controls };
}

describe("getTopGaps", () => {
  it("excludes implemented and NA controls", () => {
    const state = makeState({ "A.5.1": "implemented", "A.5.2": "not_applicable" });
    const gaps = getTopGaps(mockControls, state);
    const ids = gaps.map((g) => g.control.control);
    expect(ids).not.toContain("A.5.1");
    expect(ids).not.toContain("A.5.2");
    expect(ids).toContain("A.8.1");
    expect(ids).toContain("A.8.7");
  });

  it("ranks higher criticality not_started above lower criticality not_started", () => {
    const gaps = getTopGaps(mockControls, makeState());
    expect(gaps[0].control.criticality).toBeGreaterThanOrEqual(gaps[1].control.criticality);
  });

  it("in_progress gaps rank lower than not_started at same criticality", () => {
    const state = makeState({ "A.8.1": "in_progress" });
    const gaps = getTopGaps(mockControls, state);
    const a81 = gaps.find((g) => g.control.control === "A.8.1");
    const a87 = gaps.find((g) => g.control.control === "A.8.7");
    expect(a87!.gapScore).toBeGreaterThan(a81!.gapScore);
  });

  it("respects topN limit", () => {
    const gaps = getTopGaps(mockControls, makeState(), 2);
    expect(gaps.length).toBeLessThanOrEqual(2);
  });

  it("returns empty array when all controls are implemented", () => {
    const state = makeState({
      "A.5.1": "implemented",
      "A.5.2": "implemented",
      "A.8.1": "implemented",
      "A.8.7": "implemented",
    });
    expect(getTopGaps(mockControls, state)).toHaveLength(0);
  });

  it("gapScore formula: criticality * weight (not_started=1.0, in_progress=0.5)", () => {
    const state = makeState({ "A.5.1": "in_progress" }); // criticality 3 * 0.5 = 1.5
    const gaps = getTopGaps(mockControls, state);
    const a51 = gaps.find((g) => g.control.control === "A.5.1");
    expect(a51?.gapScore).toBeCloseTo(1.5);
  });
});
