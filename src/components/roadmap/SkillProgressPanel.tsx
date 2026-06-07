"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

interface SkillProgressProps {
  totalXp: number;
  completedCount: number;
  totalCount: number;
  nextRecommended: { name: string; domain: string }[];
}

export default function SkillProgressPanel({ totalXp, completedCount, totalCount, nextRecommended }: SkillProgressProps) {
  // Developer level formula: Level = Math.floor(sqrt(XP / 100)) + 1
  const level = Math.floor(Math.sqrt(totalXp / 100)) + 1;
  const xpForNextLevel = Math.pow(level, 2) * 100;
  const xpForCurrentLevel = Math.pow(level - 1, 2) * 100;
  
  const progressPercent = Math.min(
    Math.round(((totalXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100),
    100
  );

  return (
    <div className="space-y-6 text-left">
      {/* 1. Level progress card */}
      <Card className="bg-card border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Career Level</span>
              <h3 className="text-2xl font-extrabold text-foreground mt-1 flex items-center">
                <Star className="h-6 w-6 text-yellow-400 mr-1.5 fill-yellow-400" />
                <span>Level {level} Architect</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total XP</span>
              <span className="text-xl font-black text-primary block">{totalXp} XP</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Current Level Progress</span>
              <span>{totalXp} / {xpForNextLevel} XP</span>
            </div>
            <Progress value={progressPercent} className="h-2.5" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Completion percentages */}
      <Card className="bg-card border-border p-5 space-y-4">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Mastery Ratio</span>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-foreground">{completedCount} of {totalCount}</h4>
            <p className="text-xs text-muted-foreground font-light">Nodes Mastered across trees</p>
          </div>
          <div className="h-14 w-14 rounded-full border-4 border-primary flex items-center justify-center font-bold text-sm text-foreground">
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </div>
        </div>
      </Card>

      {/* 3. Next target unlocks */}
      {nextRecommended.length > 0 && (
        <Card className="bg-card border border-primary/20 bg-primary/[0.01] p-5 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1 flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-primary animate-pulse" /> Next Priority Targets
          </span>
          <div className="space-y-3">
            {nextRecommended.map((rec, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 border rounded-lg bg-background/60 text-xs">
                <div>
                  <span className="font-bold text-foreground block">{rec.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{rec.domain.toLowerCase()}</span>
                </div>
                <Badge variant="secondary" className="font-semibold text-[10px]">Unlock Node &rarr;</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
