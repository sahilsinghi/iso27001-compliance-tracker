"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import type { ThemeScore, ScoringResult } from "@/lib/types";

interface BarProps {
  themes: ThemeScore[];
}

export function StatusDistributionChart({ themes }: BarProps) {
  const data = themes.map((t) => ({
    name: t.theme,
    Implemented: t.implemented,
    "In Progress": t.inProgress,
    "Not Started": t.notStarted,
    "N/A": t.notApplicable,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="Implemented" stackId="a" fill="#22c55e" />
        <Bar dataKey="In Progress" stackId="a" fill="#f59e0b" />
        <Bar dataKey="Not Started" stackId="a" fill="#ef4444" />
        <Bar dataKey="N/A" stackId="a" fill="#94a3b8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const DONUT_COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#94a3b8"];
const DONUT_LABELS = ["Implemented", "In Progress", "Not Started", "N/A"];

interface DonutProps {
  scores: ScoringResult;
}

export function OverallDonutChart({ scores }: DonutProps) {
  const data = [
    { name: "Implemented", value: scores.totalImplemented },
    { name: "In Progress", value: scores.totalInProgress },
    { name: "Not Started", value: scores.totalNotStarted },
    { name: "N/A", value: scores.totalNotApplicable },
  ].filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={DONUT_COLORS[DONUT_LABELS.indexOf(entry.name)]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
