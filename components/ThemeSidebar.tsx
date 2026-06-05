"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAssessment } from "@/lib/context";
import { computeScores } from "@/lib/scoring";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import controlsData from "@/lib/controls.json";
import type { Control, ThemeCode } from "@/lib/types";
import { Shield, Users, Building2, Cpu, LayoutDashboard, Info, FileCheck } from "lucide-react";

const controls = controlsData as Control[];

const THEME_ICONS: Record<ThemeCode, React.ReactNode> = {
  "A.5": <Building2 className="w-4 h-4" />,
  "A.6": <Users className="w-4 h-4" />,
  "A.7": <Shield className="w-4 h-4" />,
  "A.8": <Cpu className="w-4 h-4" />,
};

const THEME_ORDER: ThemeCode[] = ["A.5", "A.6", "A.7", "A.8"];

export function ThemeSidebar() {
  const { state, dispatch } = useAssessment();
  const pathname = usePathname();
  const scores = computeScores(controls, state);

  return (
    <aside className="w-64 shrink-0 flex flex-col gap-4 border-r border-border bg-card h-full min-h-screen p-4">
      <div className="flex items-center gap-2 py-2">
        <FileCheck className="w-6 h-6 text-primary" />
        <span className="font-bold text-sm leading-tight">ISO 27001 Self-Check</span>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="company" className="text-xs text-muted-foreground">Organization</Label>
          <Input
            id="company"
            placeholder="Acme Health Pvt Ltd"
            value={state.companyName}
            onChange={(e) => dispatch({ type: "SET_COMPANY", payload: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="assessor" className="text-xs text-muted-foreground">Assessor</Label>
          <Input
            id="assessor"
            placeholder="Your name"
            value={state.assessorName}
            onChange={(e) => dispatch({ type: "SET_ASSESSOR", payload: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
      </div>

      <Separator />

      <nav className="flex flex-col gap-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${pathname === "/dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-3 pb-1">
          Annex A Themes
        </p>

        {THEME_ORDER.map((themeCode) => {
          const themeScore = scores.themes.find((t) => t.theme === themeCode);
          const isActive = pathname === `/tracker/${themeCode.replace(".", "")}`;
          const pct = Math.round(themeScore?.percentage ?? 0);

          return (
            <Link
              key={themeCode}
              href={`/tracker/${themeCode.replace(".", "")}`}
              className={`flex flex-col gap-1.5 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {THEME_ICONS[themeCode]}
                  <span className="font-medium">{themeCode}</span>
                </div>
                <span className={`text-xs tabular-nums ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {themeScore?.implemented ?? 0}/{themeScore?.applicableTotal ?? themeScore?.total ?? 0}
                </span>
              </div>
              <div className={`text-xs truncate ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {themeScore?.themeName}
              </div>
              <Progress
                value={pct}
                className={`h-1 ${isActive ? "bg-primary-foreground/20" : ""}`}
              />
            </Link>
          );
        })}

        <Separator className="my-2" />

        <Link
          href="/about"
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${pathname === "/about" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
        >
          <Info className="w-4 h-4" />
          About & Methodology
        </Link>
      </nav>

      {state.lastSaved && (
        <div className="mt-auto text-xs text-muted-foreground px-1">
          Saved {new Date(state.lastSaved).toLocaleTimeString()}
        </div>
      )}
    </aside>
  );
}
