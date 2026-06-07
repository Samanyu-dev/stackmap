"use client";

import React from "react";
import { Flame, CheckCircle, Code2, Briefcase, Calendar } from "lucide-react";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { useTrackerStore } from "@/store/useTrackerStore";

export default function MetricsGrid() {
  const { user } = useRoadmapStore();
  const { applications, dsaProblems } = useTrackerStore();

  const solvedDsaCount = dsaProblems.filter(p => p.status === "SOLVED").length;
  const appliedCount = applications.filter(a => a.status === "APPLIED" || a.status === "OA" || a.status === "INTERVIEW").length;
  const interviewsCount = applications.filter(a => a.status === "INTERVIEW" || a.status === "HR").length;

  const metrics = [
    {
      name: "Daily Learn Streak",
      value: `${user.streak} Days`,
      sub: "Top 8% of students",
      icon: Flame,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    },
    {
      name: "Topics Completed",
      value: user.completedTopics.toString(),
      sub: "+3 new items this week",
      icon: CheckCircle,
      color: "text-green-400 bg-green-500/10 border-green-500/20"
    },
    {
      name: "DSA Problems Solved",
      value: solvedDsaCount.toString(),
      sub: "Confidence Level: Medium",
      icon: Code2,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      name: "Applications Active",
      value: appliedCount.toString(),
      sub: "Average package: $135k",
      icon: Briefcase,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      name: "Interviews Scheduled",
      value: interviewsCount.toString(),
      sub: "Next: Google (SWE Intern)",
      icon: Calendar,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((m) => (
        <div
          key={m.name}
          className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-md flex flex-col justify-between hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.02] transition-all duration-300 group"
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
