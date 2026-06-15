"use client";

import { useRef } from "react";
import { useAssessment } from "@/lib/context";
import { computeScores } from "@/lib/scoring";
import { getTopGaps } from "@/lib/gap-analyzer";
import { exportJSON, importJSON, resetState } from "@/lib/storage";
import dynamic from "next/dynamic";
import { ThemeSidebar } from "@/components/ThemeSidebar";
import { Stage1Banner } from "@/components/Stage1Banner";
import { GapList } from "@/components/GapList";

const ThemeRadarChart = dynamic(() => import("@/components/ThemeRadarChart").then(m => m.ThemeRadarChart), { ssr: false, loading: () => <div className="h-[280px] animate-pulse bg-muted rounded" /> });
const StatusDistributionChart = dynamic(() => import("@/components/StatusDistributionChart").then(m => m.StatusDistributionChart), { ssr: false, loading: () => <div className="h-[240px] animate-pulse bg-muted rounded" /> });
const OverallDonutChart = dynamic(() => import("@/components/StatusDistributionChart").then(m => m.OverallDonutChart), { ssr: false, loading: () => <div className="h-[200px] animate-pulse bg-muted rounded" /> });
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import controlsData from "@/lib/controls.json";
import type { Control, MaturityLevel } from "@/lib/types";
import { generatePDFReport } from "@/lib/pdf-report";
import { FileDown, Upload, RotateCcw, RefreshCw } from "lucide-react";
import { useState } from "react";

const controls = controlsData as Control[];

const MATURITY_BADGE: Record<MaturityLevel, "default" | "secondary" | "outline" | "destructive"> = {
  Optimized: "default",
  Mature: "secondary",
  Developing: "outline",
  Basic: "destructive",
};

export default function DashboardPage() {
  const { state, dispatch } = useAssessment();
  const scores = computeScores(controls, state);
  const gaps = getTopGaps(controls, state, 15);
  const [showReset, setShowReset] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  async function handlePDF() {
    setPdfLoading(true);
    try {
      await generatePDFReport(state, scores, gaps, controls);
    } finally {
      setPdfLoading(false);
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importJSON(file);
      dispatch({ type: "LOAD_STATE", payload: imported });
    } catch (err) {
      alert(`Import failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
    e.target.value = "";
  }

  function handleReset() {
    const fresh = resetState();
    dispatch({ type: "LOAD_STATE", payload: fresh });
    setShowReset(false);
  }

  return (
    <div className="flex min-h-screen">
      <ThemeSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                {state.companyName ? `${state.companyName} · ` : ""}ISO 27001:2022 Annex A Assessment
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => exportJSON(state)} className="gap-2">
                <FileDown className="w-4 h-4" /> Export JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => importRef.current?.click()} className="gap-2">
                <Upload className="w-4 h-4" /> Import JSON
              </Button>
              <input ref={importRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <Button onClick={handlePDF} disabled={pdfLoading} size="sm" className="gap-2">
                <FileDown className="w-4 h-4" />
                {pdfLoading ? "Generating…" : "Export PDF Report"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowReset(true)} className="gap-2 text-destructive hover:text-destructive">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </div>
          </div>

          <Stage1Banner verdict={scores.stage1Verdict} composite={scores.composite} />

          {/* Composite + theme maturity */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold text-primary">{Math.round(scores.composite)}%</div>
                <Progress value={scores.composite} className="h-2" />
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <span className="text-green-600">{scores.totalImplemented} Implemented</span>
                  <span className="text-yellow-600">{scores.totalInProgress} In Progress</span>
                  <span className="text-red-500">{scores.totalNotStarted} Not Started</span>
                  <span>{scores.totalNotApplicable} N/A</span>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Per-Theme Maturity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scores.themes.map((t) => (
                    <div key={t.theme} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{t.theme} — {t.themeName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground tabular-nums">{Math.round(t.percentage)}%</span>
                          <Badge variant={MATURITY_BADGE[t.maturity]} className="text-xs py-0">{t.maturity}</Badge>
                        </div>
                      </div>
                      <Progress value={t.percentage} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Theme Maturity Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeRadarChart themes={scores.themes} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Status Distribution by Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <StatusDistributionChart themes={scores.themes} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Overall Status Mix</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <OverallDonutChart scores={scores} />
            </CardContent>
          </Card>

          {/* Gap list */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top Priority Gaps (by criticality)</CardTitle>
            </CardHeader>
            <CardContent>
              <GapList gaps={gaps} />
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showReset} onOpenChange={setShowReset}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset all assessment data?</DialogTitle>
            <DialogDescription>
              This will permanently delete all control statuses, evidence references, and notes stored in your browser. This cannot be undone. Export your JSON first if you want a backup.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReset(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReset} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Reset Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
