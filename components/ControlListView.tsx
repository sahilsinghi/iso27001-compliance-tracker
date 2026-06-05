"use client";

import { useState } from "react";
import { useAssessment } from "@/lib/context";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ControlEditor } from "./ControlEditor";
import type { Control, ControlStatus } from "@/lib/types";
import { Search, ChevronRight, AlertTriangle, CheckCircle2, Clock, MinusCircle } from "lucide-react";

const STATUS_CONFIG: Record<ControlStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
  implemented: { label: "Implemented", variant: "default", icon: <CheckCircle2 className="w-3 h-3" /> },
  in_progress: { label: "In Progress", variant: "secondary", icon: <Clock className="w-3 h-3" /> },
  not_started: { label: "Not Started", variant: "outline", icon: <AlertTriangle className="w-3 h-3" /> },
  not_applicable: { label: "N/A", variant: "outline", icon: <MinusCircle className="w-3 h-3" /> },
};

const CRITICALITY_LABEL: Record<number, string> = { 1: "Low", 2: "Medium", 3: "High" };

interface Props {
  controls: Control[];
}

export function ControlListView({ controls }: Props) {
  const { state } = useAssessment();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ControlStatus | "all">("all");
  const [expandedControl, setExpandedControl] = useState<string | null>(null);

  const filtered = controls.filter((c) => {
    const cs = state.controls[c.control];
    const status: ControlStatus = cs?.status ?? "not_started";
    const matchesSearch =
      search === "" ||
      c.control.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.implementationHint.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by control number or keyword (e.g. A.8.13, backup)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ControlStatus | "all")}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Controls</SelectItem>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="implemented">Implemented</SelectItem>
            <SelectItem value="not_applicable">Not Applicable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {controls.length} controls
      </p>

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border overflow-hidden">
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-muted-foreground text-sm">
            No controls match your search.
          </div>
        )}
        {filtered.map((control) => {
          const cs = state.controls[control.control];
          const status: ControlStatus = cs?.status ?? "not_started";
          const cfg = STATUS_CONFIG[status];
          const isExpanded = expandedControl === control.control;

          return (
            <div key={control.control} className="bg-card">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedControl(isExpanded ? null : control.control)}
              >
                <ChevronRight className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-primary shrink-0">{control.control}</span>
                    <span className="text-sm font-medium truncate">{control.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{control.category}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className={`text-xs ${control.criticality === 3 ? "text-destructive" : control.criticality === 2 ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground"}`}>
                      {CRITICALITY_LABEL[control.criticality]} criticality
                    </span>
                    {cs?.evidenceRef && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-green-600 dark:text-green-400">Evidence linked</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant={cfg.variant} className="flex items-center gap-1 shrink-0 text-xs">
                  {cfg.icon}
                  {cfg.label}
                </Badge>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border bg-muted/20">
                  <ControlEditor control={control} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
