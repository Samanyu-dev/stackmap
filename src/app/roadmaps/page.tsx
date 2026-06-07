"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { roadmapBlueprints } from "@/lib/roadmapBlueprints";
import Pagination from "@/components/roadmap/Pagination";
import { Search, Compass, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom tiny rotating compass star indicator for rows
const OrbitStar = ({ active = false }: { active?: boolean }) => {
  return (
    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 relative">
      <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", active ? "animate-spin [animation-duration:12s]" : "")}>
        <circle cx="12" cy="12" r="9" stroke="var(--rim)" strokeWidth="1" />
        <circle cx="12" cy="12" r="5" stroke={active ? "var(--nova)" : "var(--border-subtle)"} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12" stroke={active ? "var(--pulsar)" : "var(--text-muted)"} strokeWidth="1" />
        <circle cx="12" cy="12" r="2" fill={active ? "var(--nova)" : "var(--rim)"} />
      </svg>
    </div>
  );
};

export default function RoadmapsCatalog() {
  const { activeRoadmaps, completedNodes, enrollInRoadmap } = useRoadmapStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const roadmaps = Object.values(roadmapBlueprints);

  const categories = [
    { label: "All Pathways", value: "ALL" },
    { label: "Software Development", value: "DEVELOPMENT" },
    { label: "Systems & Infrastructure", value: "SYSTEMS" },
    { label: "Interview Prep & DSA", value: "PREPARATION" }
  ];

  // Reset page when switching categories or typing search
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  const filteredRoadmaps = roadmaps.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                          r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const itemsPerPage = 8;
  const totalItems = filteredRoadmaps.length;
  const paginatedRoadmaps = filteredRoadmaps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRoadmapProgress = (slug: string) => {
    const rm = roadmapBlueprints[slug];
    if (!rm) return 0;
    const nodeSlugs = rm.nodes.map(n => n.slug);
    const completed = nodeSlugs.filter(slug => completedNodes[slug]).length;
    return Math.round((completed / nodeSlugs.length) * 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rim pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold italic text-starlight tracking-tight">
              Observatory pathways
            </h1>
            <p className="text-sm text-text-secondary mt-1 font-sans">
              Choose a structured tech pathway, check off constellation nodes, and track curriculum progress.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-void p-3 rounded-lg border border-rim/60">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                className="text-xs h-9 rounded-md font-mono cursor-pointer transition-all uppercase tracking-wider"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Search pathways..."
              className="pl-9 h-10 border-rim bg-deep placeholder:text-text-muted/50 focus:border-nova/55 font-mono text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Pathway List Directory */}
        {paginatedRoadmaps.length > 0 ? (
          <div className="space-y-3">
            {paginatedRoadmaps.map((rm) => {
              const isEnrolled = activeRoadmaps.includes(rm.slug);
              const progress = getRoadmapProgress(rm.slug);

              return (
                <div 
                  key={rm.slug} 
                  className={cn(
                    "flex flex-col lg:flex-row items-start lg:items-center justify-between p-5 bg-deep border border-rim rounded-lg gap-6 hover:border-nova-bright/40 transition-all shadow-md group relative overflow-hidden"
                  )}
                >
                  {/* Orbital texture line highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rim group-hover:bg-nova transition-all" />

                  {/* Left Column: Index & Details */}
                  <div className="flex items-start gap-4 lg:w-5/12">
                    <OrbitStar active={isEnrolled} />
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/roadmaps/${rm.slug}`} className="hover:underline cursor-pointer block">
                          <h2 className="text-xl font-display font-bold italic text-starlight leading-snug group-hover:text-nova-bright transition-colors">
                            {rm.title}
                          </h2>
                        </Link>
                        {isEnrolled && progress === 100 && (
                          <CheckCircle2 className="h-4.5 w-4.5 text-pulsar fill-pulsar/10 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed font-sans pr-4">
                        {rm.description}
                      </p>
                      <span className="inline-block text-[9px] font-mono text-text-muted uppercase tracking-wider">
                        Category: {rm.category}
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-4 lg:w-3/12 font-mono text-xs">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-text-muted uppercase tracking-widest">Difficulty</span>
                      <span className={cn(
                        "difficulty-pill text-[9px] px-2.5 py-0.5",
                        rm.difficulty === "BEGINNER" && "beginner",
                        rm.difficulty === "INTERMEDIATE" && "intermediate",
                        rm.difficulty === "ADVANCED" && "advanced"
                      )}>
                        {rm.difficulty}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] text-text-muted uppercase tracking-widest">Milestones</span>
                      <span className="text-starlight font-medium font-mono">{rm.nodes.length} Nodes</span>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] text-text-muted uppercase tracking-widest">Duration</span>
                      <span className="text-starlight font-medium font-mono">{rm.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Right Column: Progress Tracking */}
                  <div className="w-full lg:w-2/12 space-y-1">
                    {isEnrolled ? (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono font-semibold uppercase tracking-wider text-nova-bright">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5 bg-abyss text-nova [&>[data-state=newValue]]:bg-nova" />
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        Uncharted path
                      </span>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end border-t border-rim/40 lg:border-0 pt-4 lg:pt-0">
                    <Link href={`/roadmaps/${rm.slug}`} className="flex-1 lg:flex-none">
                      <Button 
                        variant={isEnrolled ? "default" : "outline"} 
                        className="w-full lg:w-auto text-xs font-mono uppercase tracking-wider cursor-pointer"
                        size="sm"
                      >
                        <span>{isEnrolled ? "Resume Orbit" : "Open Syllabus"}</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
                      </Button>
                    </Link>
                    {!isEnrolled && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 flex-shrink-0 cursor-pointer hover:border-nova-bright/40 hover:bg-nova/5 text-text-secondary"
                        onClick={() => enrollInRoadmap(rm.slug)}
                        title="Enroll in pathway"
                      >
                        <Compass className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls */}
            <div className="flex justify-end pt-4">
              <Pagination
                total={totalItems}
                perPage={itemsPerPage}
                current={currentPage}
                onChange={(p) => setCurrentPage(p)}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 rounded-lg border border-dashed border-rim/60 bg-void/50">
            <Layers className="h-10 w-10 text-text-muted mx-auto mb-3" />
            <h3 className="text-lg font-bold">No pathways match your search</h3>
            <p className="text-sm text-text-secondary mt-1">Try resetting your filter parameters or checking your spelling.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
