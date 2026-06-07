"use client";

import React, { useState, useEffect } from "react";
import { Flame, Star, Trophy, FileText, Code2, Sparkles, Award } from "lucide-react";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { useTrackerStore } from "@/store/useTrackerStore";

export default function MetricsGrid() {
  const { user } = useRoadmapStore();
  const { dsaProblems } = useTrackerStore();

  const [mounted, setMounted] = useState(false);
  const [skillXp, setSkillXp] = useState(300);
  const [resumeScore, setResumeScore] = useState(85);

  const solvedDsaCount = dsaProblems.filter(p => p.status === "SOLVED").length;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedXp = localStorage.getItem("stackmap_skills_xp");
      if (savedXp) {
        setSkillXp(parseInt(savedXp) || 300);
      }

      const savedScore = localStorage.getItem("stackmap_resume_score");
      if (savedScore) {
        setResumeScore(parseInt(savedScore) || 85);
      }
    }
  }, []);

  // Developer level formula: Level = Math.floor(sqrt(XP / 100)) + 1
  const level = Math.floor(Math.sqrt(skillXp / 100)) + 1;
  const xpForNextLevel = Math.pow(level, 2) * 100;
  const xpForCurrentLevel = Math.pow(level - 1, 2) * 100;
  const levelProgress = Math.min(
    Math.round(((skillXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100),
    100
  );

  const metrics = [
    {
      name: "Daily Learn Streak",
      value: `${user.streak} Days`,
      sub: "Top 8% of students",
      icon: Flame,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    },
    {
      name: "Career Level",
      value: `Level ${level}`,
      sub: `Next at ${xpForNextLevel} XP`,
      icon: Trophy,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      name: "Skill XP",
      value: `${skillXp} XP`,
      sub: `Level progress: ${levelProgress}%`,
      icon: Award,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20"
    },
    {
      name: "Resume Score",
      value: `${resumeScore}%`,
      sub: resumeScore >= 80 ? "ATS Optimization: Excellent" : "Needs optimization",
      icon: FileText,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      name: "DSA Problems Solved",
      value: solvedDsaCount.toString(),
      sub: "Confidence Level: Medium",
      icon: Code2,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((m) => (
        <div
          key={m.name}
          className="p-5 rounded-2xl border border-border bg-card/45 backdrop-blur-md flex flex-col justify-between hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.02] transition-all duration-300 group text-left"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {m.name}
            </span>
            <div className={`p-2 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${m.color}`}>
              <m.icon className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold tracking-tight">{m.value}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
