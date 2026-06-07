"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { companyRoadmaps } from "@/data/company-roadmaps";
import { Search, Building2, Briefcase, Award, ArrowRight } from "lucide-react";

export default function CompaniesCatalog() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");

  const list = Object.values(companyRoadmaps);

  const filtered = list.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.overview.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = difficulty === "ALL" || c.difficulty === difficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight">Company Interview Preparation</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Study company-specific interview rounds, online assessment patterns, frequently asked questions, and prep timelines.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Google, Microsoft..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11"
            />
          </div>

          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="h-11 w-44 text-xs">
            <option value="ALL">All Interview Tiers</option>
            <option value="INTERMEDIATE">Medium Difficulty</option>
            <option value="ADVANCED">Hard Difficulty</option>
          </Select>
        </div>

        {/* Company Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <Card key={c.slug} hoverGlow className="bg-card/40 border-border/80 flex flex-col justify-between text-left">
                <CardHeader className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <Badge
                      variant={
                        c.difficulty === "BEGINNER"
                          ? "info"
                          : c.difficulty === "INTERMEDIATE"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[9px] uppercase font-bold"
                    >
                      {c.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground">{c.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {c.commonRoles.slice(0, 2).map((role) => (
                        <span key={role} className="text-[9px] font-semibold bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-xs leading-relaxed line-clamp-3 min-h-[50px]">
                    {c.overview}
                  </CardDescription>
                </CardHeader>
                <CardContent className="border-t border-border/40 pt-4 flex-grow space-y-3">
                  {/* Summary lists */}
                  <div className="text-[10px] text-muted-foreground space-y-1">
                    <span className="block font-bold text-foreground uppercase tracking-wider text-[9px] mb-1">Key DSA Subjects</span>
                    <div className="flex flex-wrap gap-1">
                      {c.dsaTopics.slice(0, 3).map(top => (
                        <Badge key={top} variant="outline" className="text-[9px]">{top}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/40 pt-4">
                  <Link href={`/companies/${c.slug}`} className="w-full">
                    <Button variant="default" size="sm" className="w-full text-xs font-semibold flex items-center justify-center space-x-1.5">
                      <span>View Interview Roadmap</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border/60 bg-card/20 text-muted-foreground">
            <Building2 className="h-10 w-10 mx-auto opacity-40 mb-3" />
            <h4 className="font-bold">No companies found</h4>
            <p className="text-xs mt-1">Try adapting your search parameters or select a different tier.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
