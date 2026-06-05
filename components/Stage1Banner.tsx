"use client";

import type { Stage1Verdict } from "@/lib/types";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const CONFIG: Record<Stage1Verdict, { icon: React.ReactNode; bg: string; border: string; text: string; description: string }> = {
  Ready: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-300 dark:border-green-700",
    text: "text-green-800 dark:text-green-300",
    description: "Composite ≥ 75% and all themes ≥ 60%. Your documentation posture is likely sufficient for a Stage-1 audit.",
  },
  Borderline: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-300 dark:border-yellow-700",
    text: "text-yellow-800 dark:text-yellow-400",
    description: "Composite between 50–74% or one or more themes below 60%. Address priority gaps before scheduling a Stage-1 audit.",
  },
  "Not Ready": {
    icon: <XCircle className="w-5 h-5" />,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-300 dark:border-red-700",
    text: "text-red-800 dark:text-red-400",
    description: "Composite below 50%. Significant implementation work required before pursuing ISO 27001 certification.",
  },
};

interface Props {
  verdict: Stage1Verdict;
  composite: number;
}

export function Stage1Banner({ verdict, composite }: Props) {
  const cfg = CONFIG[verdict];
  return (
    <div className={`flex items-start gap-3 rounded-lg border ${cfg.bg} ${cfg.border} p-4`}>
      <div className={cfg.text}>{cfg.icon}</div>
      <div>
        <div className={`font-bold text-base ${cfg.text}`}>
          Stage-1 Readiness: {verdict} ({Math.round(composite)}% composite)
        </div>
        <p className={`text-sm mt-0.5 ${cfg.text} opacity-90`}>{cfg.description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Disclaimer: This assessment is an internal tracking aid only. ISO 27001 certification requires a formal Stage-1 + Stage-2 audit conducted by a JAS-ANZ accredited certification body.
        </p>
      </div>
    </div>
  );
}
