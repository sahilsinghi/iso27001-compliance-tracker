import type { AssessmentState } from "./types";

const STORAGE_KEY = "iso27001_tracker_v1";

export const DEFAULT_STATE: AssessmentState = {
  version: 1,
  companyName: "",
  assessorName: "",
  lastSaved: "",
  controls: {},
};

export function loadState(): AssessmentState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as AssessmentState;
    if (parsed.version !== 1) return DEFAULT_STATE;
    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AssessmentState): void {
  if (typeof window === "undefined") return;
  const toSave: AssessmentState = { ...state, lastSaved: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

export function exportJSON(state: AssessmentState): void {
  const date = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `iso27001-tracker-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file: File): Promise<AssessmentState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string) as AssessmentState;
        if (!parsed.version || !parsed.controls) {
          reject(new Error("Invalid tracker file format."));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error("Could not parse the JSON file."));
      }
    };
    reader.readAsText(file);
  });
}

export function resetState(): AssessmentState {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_STATE;
}
