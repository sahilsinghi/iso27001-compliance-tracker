"use client";

import { ControlListView } from "@/components/ControlListView";
import type { Control } from "@/lib/types";

interface Props {
  controls: Control[];
}

export function ControlListViewWrapper({ controls }: Props) {
  return <ControlListView controls={controls} />;
}
