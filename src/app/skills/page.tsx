"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { skillTreeData } from "@/data/skill-tree";
import { Search, Trophy, Landmark, Network, ArrowRight } from "lucide-react";

export default function SkillsCatalog() {
  const [search, setSearch] = useState("");
  const domains = Object.values(skillTreeData);

  // Mock progress state calculations
  const getDomainProgress = (slug: string): number => {
    // Return dummy percentage for display
    if (slug === "frontend") return 75; // e.g., HTML, JS, React complete, Next.js locked
    if (slug === "backend") return 25; // Node complete, DB locked
    return 0;
  };

  const filtered = domains.filter((d) => {
    return d.title.toLowerCase().includes(search.toLowerCase()) ||
           d.description.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight">Gamified Skill Trees</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Unlock developer nodes, earn XP points, level up your career character, and review pathway guides.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search skill domains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
        </div>

        {/* Domains Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => {
              const progress = getDomainProgress(d.slug);
              return (
                <Card key={d.slug} hoverGlow className="bg-card/40 border-border/80 flex flex-col justify-between text-left h-full">
                  <CardHeader className="space-y-2.5 pb-4">
                    <div className="flex justify-between items-center">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Network className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-violet-400 border-violet-500/20 bg-violet-500/5 flex items-center space-x-1">
                        <Trophy className="h-3 w-3 fill-violet-400/10" />
                        <span>{d.xpAward} XP Tier</span>
                      </Badge>
                    </div>

                    <div>
                      <CardTitle className="text-base font-bold text-foreground">{d.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 min-h-[32px] leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4 space-y-4 border-t border-border/40 pt-4 flex-grow">
                    <div className="grid grid-cols-2 gap-4 text-[10px] text-muted-foreground">
                      <div>
                        <span className="block font-bold text-foreground">Syllabus Nodes</span>
                        <span>{d.nodes.length} Skills Mapped</span>
                      </div>
                      <div>
                        <span className="block font-bold text-foreground">Status</span>
                        <span>{progress === 100 ? "Mastered" : progress > 0 ? "In Progress" : "Locked"}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <span>Domain Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-border/40 pt-4">
                    <Link href={`/skills/${d.slug}`} className="w-full">
                      <Button size="sm" className="w-full text-xs font-bold flex items-center justify-center space-x-1.5">
                        <span>View Interactive Skill Tree</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card/20 text-muted-foreground">
            <Network className="h-10 w-10 mx-auto opacity-40 mb-3" />
            <h4 className="font-bold">No skill domains found</h4>
            <p className="text-xs mt-1">Try adapting your search parameters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
