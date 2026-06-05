export type ControlStatus = "not_started" | "in_progress" | "implemented" | "not_applicable";

export type ThemeCode = "A.5" | "A.6" | "A.7" | "A.8";

export type Criticality = 1 | 2 | 3;

export type MaturityLevel = "Basic" | "Developing" | "Mature" | "Optimized";

export type Stage1Verdict = "Ready" | "Borderline" | "Not Ready";

export interface Control {
  theme: ThemeCode;
  themeName: string;
  control: string;
  name: string;
  implementationHint: string;
  category: string;
  criticality: Criticality;
  auditRelevance: "high" | "medium" | "low";
}

export interface ControlState {
  status: ControlStatus;
  evidenceRef: string;
  notes: string;
  lastUpdated: string;
}

export interface AssessmentState {
  version: number;
  companyName: string;
  assessorName: string;
  lastSaved: string;
  controls: Record<string, ControlState>;
}

export interface ThemeScore {
  theme: ThemeCode;
  themeName: string;
  total: number;
  implemented: number;
  inProgress: number;
  notStarted: number;
  notApplicable: number;
  applicableTotal: number;
  percentage: number;
  maturity: MaturityLevel;
}

export interface ScoringResult {
  composite: number;
  themes: ThemeScore[];
  stage1Verdict: Stage1Verdict;
  totalControls: number;
  totalImplemented: number;
  totalInProgress: number;
  totalNotStarted: number;
  totalNotApplicable: number;
}

export interface GapItem {
  control: Control;
  state: ControlState;
  gapScore: number;
}
