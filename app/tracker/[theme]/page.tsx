import { notFound } from "next/navigation";
import { ThemeSidebar } from "@/components/ThemeSidebar";
import { ControlListViewWrapper } from "./ControlListViewWrapper";
import controlsData from "@/lib/controls.json";
import type { Control, ThemeCode } from "@/lib/types";

const controls = controlsData as Control[];

const THEME_MAP: Record<string, ThemeCode> = {
  A5: "A.5",
  A6: "A.6",
  A7: "A.7",
  A8: "A.8",
};

const THEME_DESCRIPTIONS: Record<ThemeCode, { count: number; description: string }> = {
  "A.5": { count: 37, description: "Governance, policies, access control, incident management, supplier relations, and compliance obligations." },
  "A.6": { count: 8, description: "Screening, employment terms, security awareness, remote working, and event reporting." },
  "A.7": { count: 14, description: "Physical perimeters, secure areas, equipment protection, environmental threats, and media handling." },
  "A.8": { count: 34, description: "Endpoint security, vulnerability management, cryptography, network security, and secure development." },
};

interface Props {
  params: Promise<{ theme: string }>;
}

export default async function TrackerPage({ params }: Props) {
  const { theme } = await params;
  const themeCode = THEME_MAP[theme];
  if (!themeCode) notFound();

  const themeControls = controls.filter((c) => c.theme === themeCode);
  const desc = THEME_DESCRIPTIONS[themeCode];

  return (
    <div className="flex min-h-screen">
      <ThemeSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-bold">{themeCode} — {themeControls[0]?.themeName}</h1>
              <span className="text-sm text-muted-foreground">{desc.count} controls</span>
            </div>
            <p className="text-muted-foreground mt-1">{desc.description}</p>
          </div>
          <ControlListViewWrapper controls={themeControls} />
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { theme: "A5" },
    { theme: "A6" },
    { theme: "A7" },
    { theme: "A8" },
  ];
}
