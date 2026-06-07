"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { roadmapBlueprints } from "@/lib/roadmapBlueprints";
import { Search, Compass, Layers, CheckCircle2 } from "lucide-react";

export default function RoadmapsCatalog() {
  const { activeRoadmaps, completedNodes, enrollInRoadmap } = useRoadmapStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const roadmaps = Object.values(roadmapBlueprints);

  const categories = [
    { label: "All Pathways", value: "ALL" },
    { label: "Software Development", value: "DEVELOPMENT" },
    { label: "Systems & Infrastructure", value: "SYSTEMS" },
    { label: "Interview Prep & DSA", value: "PREPARATION" }
  ];

  const filteredRoadmaps = roadmaps.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                          r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getRoadmapProgress = (slug: string) => {
    const rm = roadmapBlueprints[slug];
    if (!rm) return 0;
    const nodeSlugs = rm.nodes.map(n => n.slug);
    const completed = nodeSlugs.filter(slug => completedNodes[slug]).length;
    return Math.round((completed / nodeSlugs.length) * 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Career Roadmaps</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Choose a structured tech pathway, check off topics, and master tools step-by-step.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                className="text-xs h-9 rounded-lg"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search pathways..."
              className="pl-9 h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Pathway cards grid */}
        {filteredRoadmaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((rm) => {
              const isEnrolled = activeRoadmaps.includes(rm.slug);
              const progress = getRoadmapProgress(rm.slug);

              return (
                <Card key={rm.slug} hoverGlow className="flex flex-col h-full bg-card/40 border-border/80">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                        {rm.category.toLowerCase()}
                      </Badge>
                      <Badge
                        variant={
                          rm.difficulty === "BEGINNER"
                            ? "info"
                            : rm.difficulty === "INTERMEDIATE"
                            ? "warning"
                            : "destructive"
                        }
                        className="text-[10px] font-bold uppercase"
                      >
                        {rm.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold flex items-center space-x-1.5">
                      <span>{rm.title}</span>
                      {isEnrolled && progress === 100 && (
                        <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10" />
                      )}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed min-h-[60px]">
                      {rm.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-4">
                    {/* Roadmap meta */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
                      <div>
                        <span className="block font-semibold text-foreground">Duration</span>
                        <span>{rm.estimatedTime}</span>
                      </div>
                      <div>
                        <span className="block font-semibold text-foreground">Milestones</span>
                        <span>{rm.nodes.length} Key Topics</span>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    {isEnrolled && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                    <Link href={`/roadmaps/${rm.slug}`} className="flex-1">
                      <Button variant={isEnrolled ? "default" : "outline"} className="w-full text-xs font-bold">
                        {isEnrolled ? "Resume Track" : "View Syllabus"}
                      </Button>
                    </Link>
                    {!isEnrolled && (
                      <Button
                        variant="default"
                        size="icon"
                        className="h-10 w-10 flex-shrink-0"
                        onClick={() => enrollInRoadmap(rm.slug)}
                        title="Enroll in path"
                      >
                        <Compass className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl border border-dashed border-border/60 bg-card/20">
            <Layers className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-bold">No pathways match your search</h3>
            <p className="text-sm text-muted-foreground mt-1">Try resetting your filter parameters or checking your spellings.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
