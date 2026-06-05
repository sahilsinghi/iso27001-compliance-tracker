import { ThemeSidebar } from "@/components/ThemeSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen">
      <ThemeSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">About & Methodology</h1>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important Disclaimer:</strong> This tool is an internal preparation aid and does NOT constitute an ISO 27001 certification or formal audit opinion. ISO 27001:2022 certification requires Stage-1 (documentation review) and Stage-2 (implementation testing) audits conducted by a certification body accredited by a member of the IAF (e.g., JAS-ANZ, UKAS, DAkkS). No self-assessment tool can replace this process.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader><CardTitle>What This Tool Does</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>ISO 27001 Self-Check helps in-house ISMS leads and junior GRC analysts track their organization&apos;s implementation posture against all 93 Annex A controls from ISO/IEC 27001:2022. It is designed for organizations preparing for first-time ISO 27001 certification who need to understand their gap position before engaging a certification body.</p>
              <p>Every control in the tool includes the exact Annex A reference, the official control name, and a plain-English implementation hint drawn from ISO 27002:2022 guidance (paraphrased to avoid copyright concerns). The tool does not reproduce the standard text verbatim.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Scoring Methodology</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-1">Status Weights</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Implemented = 100% (1.0)</li>
                  <li>In Progress = 50% (0.5)</li>
                  <li>Not Started = 0% (0.0)</li>
                  <li>Not Applicable = excluded from denominator</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">Per-Theme Maturity Tiers</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Basic: 0–40%</li>
                  <li>Developing: 41–65%</li>
                  <li>Mature: 66–85%</li>
                  <li>Optimized: 86–100%</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">Stage-1 Audit Readiness Verdict</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><strong className="text-green-600">Ready:</strong> Composite ≥ 75% AND every applicable theme ≥ 60%</li>
                  <li><strong className="text-yellow-600">Borderline:</strong> Composite 50–74%, or one theme below 60%</li>
                  <li><strong className="text-red-600">Not Ready:</strong> Composite below 50%</li>
                </ul>
                <p className="text-muted-foreground mt-2 text-xs">A Stage-1 audit is a documentation review — auditors check that your policies, procedures, and records exist and are adequate. A Stage-2 audit tests whether controls are actually implemented. This tool only helps you prepare for Stage-1.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Gap Prioritization</p>
                <p className="text-muted-foreground">Gaps are scored as: <code className="bg-muted px-1 rounded">criticality × status_weight</code> where Not Started = 1.0 and In Progress = 0.5. Criticality weights (1–3) reflect common audit emphasis: foundational governance and access controls carry higher criticality than operational procedural controls.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Privacy Architecture</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>All assessment data is stored exclusively in your browser&apos;s <code className="bg-muted px-1 rounded">localStorage</code> under the key <code className="bg-muted px-1 rounded">iso27001_tracker_v1</code>. No data is transmitted to any server. There are no analytics, no third-party scripts, and no telemetry of any kind.</p>
              <p>localStorage is limited to approximately 5 MB per origin. At 93 controls with moderate notes, usage is typically well under 100 KB. The JSON export function allows you to back up your assessment data and transfer it to another device or share it with a colleague via secure file transfer.</p>
              <p>The tool is suitable for deployment on a corporate intranet without any outbound data egress. To self-host, fork the repository, run <code className="bg-muted px-1 rounded">npm run build</code>, and serve the <code className="bg-muted px-1 rounded">out/</code> directory from any static host.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>ISO 27001:2022 vs 2013</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>This tool uses the <strong>2022 revision</strong> exclusively. ISO 27001:2022 restructured and consolidated the 2013 Annex A from 114 controls across 14 clauses into 93 controls across 4 themes. The 2022 revision added 11 new controls (including A.5.7 Threat intelligence, A.5.23 Cloud services, A.8.10 Information deletion, A.8.11 Data masking, A.8.12 DLP) and merged several 2013 controls.</p>
              <p>Organizations certified under ISO 27001:2013 were required to transition to the 2022 standard by October 2025. Do not reference 2013 control numbers in any new ISMS documentation.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Companion Tools</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>This tool is part of Sahil Singhi&apos;s GRC portfolio. See also:</p>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="https://github.com/sahilsinghi/dpdp-compliance-tool" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                    DPDP Act 2023 Self-Check
                  </a>{" "}
                  — India&apos;s Digital Personal Data Protection Act 2023 compliance tracker
                </li>
              </ul>
              <p className="mt-3 text-xs">Several ISO 27001 controls map directly to DPDP obligations: A.8.10 (Information deletion) ↔ DPDP right to erasure; A.5.34 (Privacy and PII protection) ↔ DPDP Data Fiduciary obligations; A.5.33 (Records protection) ↔ DPDP data retention requirements.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
