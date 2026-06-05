"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ThemeScore } from "@/lib/types";

interface Props {
  themes: ThemeScore[];
}

export function ThemeRadarChart({ themes }: Props) {
  const data = themes.map((t) => ({
    theme: t.themeName,
    score: Math.round(t.percentage),
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="theme" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar
          name="Implementation %"
          dataKey="score"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.25}
        />
        <Tooltip formatter={(value) => [`${value}%`, "Implementation"]} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
