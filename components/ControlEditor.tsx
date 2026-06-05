"use client";

import { useAssessment } from "@/lib/context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { Control, ControlStatus } from "@/lib/types";
import { Info, AlertTriangle } from "lucide-react";

const STATUSES: { value: ControlStatus; label: string; description: string }[] = [
  { value: "not_started", label: "Not Started", description: "Control not yet addressed" },
  { value: "in_progress", label: "In Progress", description: "Implementation underway" },
  { value: "implemented", label: "Implemented", description: "Fully implemented with evidence" },
  { value: "not_applicable", label: "Not Applicable", description: "Not relevant to this scope" },
];

const AUDIT_RELEVANCE_COLOR = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const;

interface Props {
  control: Control;
}

export function ControlEditor({ control }: Props) {
  const { state, dispatch } = useAssessment();
  const cs = state.controls[control.control] ?? {
    status: "not_started" as ControlStatus,
    evidenceRef: "",
    notes: "",
    lastUpdated: "",
  };

  return (
    <div className="pt-4 space-y-5">
      <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3 flex gap-2">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-0.5">Implementation Guidance</p>
          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">{control.implementationHint}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
        <span>Category: <strong>{control.category}</strong></span>
        <span>·</span>
        <span>Audit relevance:
          <Badge variant={AUDIT_RELEVANCE_COLOR[control.auditRelevance]} className="ml-1 text-xs py-0">
            {control.auditRelevance}
          </Badge>
        </span>
        <span>·</span>
        <span>Criticality: <strong>{control.criticality === 3 ? "High" : control.criticality === 2 ? "Medium" : "Low"}</strong></span>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold">Implementation Status</Label>
        <RadioGroup
          value={cs.status}
          onValueChange={(v) => dispatch({ type: "UPDATE_STATUS", control: control.control, status: v as ControlStatus })}
          className="grid grid-cols-2 gap-2"
        >
          {STATUSES.map(({ value, label, description }) => (
            <div key={value} className={`flex items-start gap-2 rounded-md border p-3 cursor-pointer transition-colors ${cs.status === value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
              <RadioGroupItem value={value} id={`${control.control}-${value}`} className="mt-0.5" />
              <Label htmlFor={`${control.control}-${value}`} className="cursor-pointer">
                <span className="text-sm font-medium block">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`evidence-${control.control}`} className="text-sm font-semibold">
          Evidence Reference
        </Label>
        <Input
          id={`evidence-${control.control}`}
          placeholder="e.g. Policy-SEC-001, JIRA-1234, SharePoint/infosec/policies"
          value={cs.evidenceRef}
          onChange={(e) => dispatch({ type: "UPDATE_EVIDENCE", control: control.control, evidenceRef: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">Document name, ticket ID, SharePoint URL, or policy reference — no file uploads.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`notes-${control.control}`} className="text-sm font-semibold">
          Implementation Notes
        </Label>
        <Textarea
          id={`notes-${control.control}`}
          placeholder="Describe what is in place, gaps identified, or planned actions..."
          value={cs.notes}
          onChange={(e) => dispatch({ type: "UPDATE_NOTES", control: control.control, notes: e.target.value })}
          rows={3}
        />
      </div>

      {cs.status === "implemented" && !cs.evidenceRef && (
        <div className="flex items-center gap-2 text-xs text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-md p-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          Marked as Implemented but no evidence reference provided. Auditors will ask for this.
        </div>
      )}

      {cs.lastUpdated && (
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(cs.lastUpdated).toLocaleString()}
        </p>
      )}
    </div>
  );
}
