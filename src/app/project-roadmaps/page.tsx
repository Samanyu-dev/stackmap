"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectRoadmapCard from "@/components/roadmap/ProjectRoadmapCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { projectRoadmaps } from "@/data/project-roadmaps";
import { Search, FolderGit2, Info } from "lucide-react";

export default function ProjectRoadmapsCatalog() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");

  const list = Object.values(projectRoadmaps);

  const filtered = list.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesDiff = difficulty === "ALL" || p.difficulty === difficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight">Project Learning Roadmaps</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Build production-ready applications. Follow step-by-step development checkpoints, explore resources, and extract resume descriptions.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10 text-xs text-primary/80 leading-relaxed">
          <Info className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
          <p>
            <strong>Portfolio Importance:</strong> Having a complete step-by-step explanation of complex projects on your resume is key. Use these roadmaps to build robust apps and master their interview talking points.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stack, React, Docker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11"
            />
          </div>

          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="h-11 w-44 text-xs">
            <option value="ALL">All Project Tiers</option>
            <option value="BEGINNER">Easy Difficulty</option>
            <option value="INTERMEDIATE">Medium Difficulty</option>
            <option value="ADVANCED">Hard Difficulty</option>
          </Select>
        </div>

        {/* Grid listing */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proj) => (
              <ProjectRoadmapCard key={proj.slug} project={proj} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card/20 text-muted-foreground">
            <FolderGit2 className="h-10 w-10 mx-auto opacity-40 mb-3" />
            <h4 className="font-bold">No project roadmaps matched</h4>
            <p className="text-xs mt-1">Try adapting search strings or choose a different difficulty tier.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
