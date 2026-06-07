"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectStepDrawer from "@/components/roadmap/ProjectStepDrawer";
import ResumeBulletSuggestions from "@/components/roadmap/ResumeBulletSuggestions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectRoadmaps, ProjectStep } from "@/data/project-roadmaps";
import { ChevronRight, ArrowLeft, Clock, Award, FileCode, CheckSquare, Square, ExternalLink, HelpCircle, Terminal, ShieldCheck, FolderGit2 } from "lucide-react";

export default function ProjectRoadmapPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projectRoadmaps[slug];

  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [selectedStep, setSelectedStep] = useState<ProjectStep | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const active = localStorage.getItem("stackmap_active_project");
      setIsActive(active === slug);

      const savedCompleted = localStorage.getItem(`stackmap_project_completed_${slug}`);
      if (savedCompleted) {
        try {
          setCompletedSteps(JSON.parse(savedCompleted));
        } catch (e) {}
      }
    }
  }, [slug]);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-16 space-y-4">
          <h2 className="text-2xl font-bold">Project Path Not Found</h2>
          <p className="text-sm text-muted-foreground">The requested project roadmap does not exist in our catalog.</p>
          <Link href="/project-roadmaps">
            <Button>Return to Catalog</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const toggleStep = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...completedSteps, [idx]: !completedSteps[idx] };
    setCompletedSteps(updated);
    localStorage.setItem(`stackmap_project_completed_${slug}`, JSON.stringify(updated));
  };

  const openStepDetails = (step: ProjectStep, idx: number) => {
    setSelectedStep(step);
    setSelectedIdx(idx);
  };

  const handleToggleActive = () => {
    if (isActive) {
      localStorage.removeItem("stackmap_active_project");
      setIsActive(false);
    } else {
      localStorage.setItem("stackmap_active_project", slug);
      setIsActive(true);
    }
  };

  const progressPercent = Math.round(
    (Object.values(completedSteps).filter(Boolean).length / project.steps.length) * 100
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 relative pb-16 text-left">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/project-roadmaps" className="hover:text-foreground">Project Catalog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-semibold">{project.title} Guide</span>
        </div>

        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{project.title} Build Roadmap</h1>
              <Badge variant="outline" className="uppercase text-[9px] font-bold">
                {project.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.map(s => (
                <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
              ))}
            </div>
          </div>

          {/* Quick stats block */}
          <div className="w-full md:w-72 border border-border bg-card/40 p-5 rounded-2xl space-y-3 flex-shrink-0">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Build Progress</span>
              <span>{progressPercent}% Done</span>
            </div>
            <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5">
              <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> Est: {project.duration}</span>
              <span>{project.steps.length} Steps</span>
            </div>
            <Button
              variant={isActive ? "default" : "outline"}
              onClick={handleToggleActive}
              className="w-full text-xs font-bold flex items-center justify-center space-x-1.5 h-9"
            >
              {isActive ? (
                <>
                  <ShieldCheck className="h-4 w-4 text-green-400" />
                  <span>Tracking Progress</span>
                </>
              ) : (
                <>
                  <FolderGit2 className="h-4 w-4" />
                  <span>Track Project Build</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main build steps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card/45 backdrop-blur-md space-y-4">
              <h3 className="font-bold text-lg text-foreground flex items-center">
                <FileCode className="h-5 w-5 mr-2 text-primary" /> Step-by-Step Build Checklist
              </h3>

              <div className="space-y-3">
                {project.steps.map((step, idx) => {
                  const isCompleted = !!completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => openStepDetails(step, idx)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                        isCompleted
                          ? "border-green-500/30 bg-green-500/5 hover:bg-green-500/10"
                          : "border-border bg-background/50 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start space-x-3.5">
                        <button
                          type="button"
                          onClick={(e) => toggleStep(idx, e)}
                          className={`p-0.5 rounded text-muted-foreground flex-shrink-0 mt-0.5 transition-colors ${
                            isCompleted && "text-green-500"
                          }`}
                        >
                          {isCompleted ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
                        </button>

                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Phase {idx + 1}</span>
                          <span className="text-sm font-bold text-foreground line-clamp-1">{step.task}</span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                        Review Guide
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resume descriptions suggestions */}
            <ResumeBulletSuggestions
              bullets={project.resumeBullets}
              interviewPoints={project.interviewPoints}
            />
          </div>

          {/* Sidebar lists */}
          <div className="lg:col-span-1 space-y-6">
            {/* Prerequisites */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Prerequisites</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex flex-wrap gap-1.5">
                {project.prerequisites.map(p => (
                  <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
                ))}
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Key Learning Outcomes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground font-light">
                {project.outcomes.map((out, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{out}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Readme Checklist */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">GitHub README Criteria</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground font-light">
                {project.readmeChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <CheckSquare className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Deployment Guide */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Production Deployment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground font-light">
                {project.deploymentGuide.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-foreground">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step details drawer */}
        <ProjectStepDrawer
          step={selectedStep}
          index={selectedIdx}
          onClose={() => setSelectedStep(null)}
        />
      </div>
    </DashboardLayout>
  );
}
