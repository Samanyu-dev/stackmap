"use client";

import React from "react";
import { Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPProps {
  xp: number;
  label?: string;
  className?: string;
}

export default function XPBadge({ xp, label = "XP earned", className }: XPProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/25 text-violet-400 font-bold text-xs animate-pulse shadow-md shadow-violet-500/5",
        className
      )}
    >
      <Trophy className="h-4 w-4 fill-violet-400/10" />
      <span>{xp} {label}</span>
    </div>
  );
}
