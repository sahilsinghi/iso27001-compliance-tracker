"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { AssessmentState, ControlStatus } from "./types";
import { loadState, saveState } from "./storage";

type Action =
  | { type: "SET_COMPANY"; payload: string }
  | { type: "SET_ASSESSOR"; payload: string }
  | { type: "UPDATE_STATUS"; control: string; status: ControlStatus }
  | { type: "UPDATE_EVIDENCE"; control: string; evidenceRef: string }
  | { type: "UPDATE_NOTES"; control: string; notes: string }
  | { type: "LOAD_STATE"; payload: AssessmentState };

function reducer(state: AssessmentState, action: Action): AssessmentState {
  switch (action.type) {
    case "SET_COMPANY":
      return { ...state, companyName: action.payload };
    case "SET_ASSESSOR":
      return { ...state, assessorName: action.payload };
    case "UPDATE_STATUS": {
      const prev = state.controls[action.control] ?? { status: "not_started", evidenceRef: "", notes: "", lastUpdated: "" };
      return {
        ...state,
        controls: {
          ...state.controls,
          [action.control]: { ...prev, status: action.status, lastUpdated: new Date().toISOString() },
        },
      };
    }
    case "UPDATE_EVIDENCE": {
      const prev = state.controls[action.control] ?? { status: "not_started", evidenceRef: "", notes: "", lastUpdated: "" };
      return {
        ...state,
        controls: {
          ...state.controls,
          [action.control]: { ...prev, evidenceRef: action.evidenceRef },
        },
      };
    }
    case "UPDATE_NOTES": {
      const prev = state.controls[action.control] ?? { status: "not_started", evidenceRef: "", notes: "", lastUpdated: "" };
      return {
        ...state,
        controls: {
          ...state.controls,
          [action.control]: { ...prev, notes: action.notes },
        },
      };
    }
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

interface ContextValue {
  state: AssessmentState;
  dispatch: React.Dispatch<Action>;
}

const AssessmentContext = createContext<ContextValue | null>(null);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    const loaded = loadState();
    if (loaded.companyName || loaded.assessorName || Object.keys(loaded.controls).length > 0) {
      dispatch({ type: "LOAD_STATE", payload: loaded });
    }
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
