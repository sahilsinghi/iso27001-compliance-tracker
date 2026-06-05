"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadState } from "@/lib/storage";
import { FileCheck, Shield, BarChart3, FileDown, Lock, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = loadState();
    const hasProgress =
      saved.companyName ||
      saved.assessorName ||
      Object.keys(saved.controls).length > 0;
    if (hasProgress) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <FileCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">ISO 27001 Self-Check</h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Track your ISO/IEC 27001:2022 compliance posture across all{" "}
            <strong>93 Annex A controls</strong>. Evidence references, maturity ratings,
            and Stage-1 audit-readiness — all in your browser.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          {[
            { icon: <Shield className="w-5 h-5 text-primary" />, title: "All 93 Controls", desc: "Organizational, People, Physical, Technological themes" },
            { icon: <BarChart3 className="w-5 h-5 text-primary" />, title: "Maturity Ratings", desc: "Per-theme scoring with Stage-1 readiness verdict" },
            { icon: <FileDown className="w-5 h-5 text-primary" />, title: "PDF Export", desc: "Executive report suitable for CISOs and auditors" },
            { icon: <Lock className="w-5 h-5 text-primary" />, title: "Privacy-First", desc: "All data stays in your browser. Zero server storage." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
              <div className="shrink-0 mt-0.5">{icon}</div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tracker/A5" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Start Assessment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className={buttonVariants({ variant: "outline", size: "lg" })}>
            View Dashboard
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          This tool is an internal preparation aid and does NOT replace formal ISO 27001 certification audits.
          Certification requires Stage-1 + Stage-2 audits by a JAS-ANZ accredited body.
        </p>

        <p className="text-xs text-muted-foreground">
          Companion tool:{" "}
          <a href="https://github.com/sahilsinghi/dpdp-compliance-tool" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
            DPDP Act 2023 Self-Check
          </a>
        </p>
      </div>
    </main>
  );
}
