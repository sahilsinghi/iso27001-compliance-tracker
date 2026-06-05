"use client";

import type { GapItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";

interface Props {
  gaps: GapItem[];
}

const CRITICALITY_COLORS = ["", "text-slate-500", "text-yellow-600 dark:text-yellow-400", "text-red-600 dark:text-red-400"];
const CRITICALITY_LABELS = ["", "Low", "Medium", "High"];

export function GapList({ gaps }: Props) {
  if (gaps.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No gaps found — all applicable controls are implemented or marked N/A.
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border rounded-lg border border-border overflow-hidden">
      {gaps.map((gap, i) => (
        <div key={gap.control.control} className="flex items-start gap-3 px-4 py-3 bg-card">
          <span className="text-xs font-bold text-muted-foreground tabular-nums w-5 shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-semibold text-primary">{gap.control.control}</span>
              <span className="text-sm font-medium">{gap.control.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{gap.control.implementationHint}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge
              variant={gap.state.status === "in_progress" ? "secondary" : "outline"}
              className="flex items-center gap-1 text-xs"
            >
              {gap.state.status === "in_progress" ? <Clock className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {gap.state.status === "in_progress" ? "In Progress" : "Not Started"}
            </Badge>
            <span className={`text-xs font-semibold ${CRITICALITY_COLORS[gap.control.criticality]}`}>
              {CRITICALITY_LABELS[gap.control.criticality]} criticality
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
