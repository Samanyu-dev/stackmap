"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import ActivityCharts from "@/components/dashboard/ActivityCharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { roadmapBlueprints } from "@/lib/roadmapBlueprints";
import { companyRoadmaps } from "@/data/company-roadmaps";
import { projectRoadmaps } from "@/data/project-roadmaps";
import { Sparkles, ArrowRight, PlayCircle, BookMarked, CheckSquare, BrainCircuit, Building2, FolderGit2, Trophy } from "lucide-react";

export default function UserDashboard() {
  const { activeRoadmaps, completedNodes, user } = useRoadmapStore();

  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [projectProgress, setProjectProgress] = useState<number>(0);
  const [companyProgress, setCompanyProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const companySlug = localStorage.getItem("stackmap_active_company");
      const projectSlug = localStorage.getItem("stackmap_active_project");
      setActiveCompany(companySlug);
      setActiveProject(projectSlug);

      if (projectSlug) {
        const savedCompleted = localStorage.getItem(`stackmap_project_completed_${projectSlug}`);
        const proj = projectRoadmaps[projectSlug];
        if (proj && savedCompleted) {
          try {
            const completed = JSON.parse(savedCompleted);
            const percent = Math.round(
              (Object.values(completed).filter(Boolean).length / proj.steps.length) * 100
            );
            setProjectProgress(percent);
          } catch (e) {}
        }
      }

      if (companySlug) {
        const savedCompleted = localStorage.getItem(`stackmap_company_completed_${companySlug}`);
        const comp = companyRoadmaps[companySlug];
        if (comp && savedCompleted) {
          try {
            const completed = JSON.parse(savedCompleted);
            const percent = Math.round(
              (Object.values(completed).filter(Boolean).length / comp.timeline.length) * 100
            );
            setCompanyProgress(percent);
          } catch (e) {}
        }
      }
    }
  }, []);

  const getRoadmapProgress = (slug: string) => {
    const rm = roadmapBlueprints[slug];
    if (!rm) return 0;
    const nodeSlugs = rm.nodes.map(n => n.slug);
    const completed = nodeSlugs.filter(slug => completedNodes[slug]).length;
    return Math.round((completed / nodeSlugs.length) * 100);
  };

  // Recommendations logic based on progress
  const getNextSteps = () => {
    const steps = [];
    if (!completedNodes["javascript-dom"]) {
      steps.push({
        title: "Master JS & DOM Manipulation",
        pathway: "Frontend Developer",
        href: "/roadmaps/frontend-developer",
        desc: "You completed CSS Styles. JavaScript DOM manipulation is the next core building block."
      });
    }
    if (completedNodes["javascript-dom"] && !completedNodes["react-framework"]) {
      steps.push({
        title: "Start React Components",
        pathway: "Frontend Developer",
        href: "/roadmaps/frontend-developer",
        desc: "You understand standard JS. React components and props will unlock modern dynamic UI engineering."
      });
    }
    steps.push({
      title: "Review 'Two Sum' Hash Map solution",
      pathway: "DSA Preparation",
      href: "/tracker/dsa",
      desc: "Confidence score is high, but checking memory complexity is critical for upcoming Google interviews."
    });
    steps.push({
      title: "Ask AI Mentor for a 7-day study plan",
      pathway: "AI Assistant",
      href: "/mentor",
      desc: "Generate custom timelines to match your Stripe and Google internship tracks."
    });
    return steps;
  };

  const nextSteps = getNextSteps();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user.name}!</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your streak is active. Keep completing topics to preserve your {user.streak}-day goal!
            </p>
          </div>
          <Link href="/mentor">
            <Button className="font-bold flex items-center space-x-1.5 shadow-md shadow-primary/10">
              <Sparkles className="h-4 w-4" />
              <span>Ask AI Mentor</span>
            </Button>
          </Link>
        </div>

        {/* Metrics Overview */}
        <MetricsGrid />

        {/* Active Pathways Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">My Active Roadmaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Core Roadmaps */}
            {activeRoadmaps.map((slug) => {
              const rm = roadmapBlueprints[slug];
              if (!rm) return null;
              const progress = getRoadmapProgress(slug);

              return (
                <Card key={slug} hoverGlow className="bg-card/30 border-border/80 flex flex-col justify-between text-left">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="uppercase text-[9px] font-bold text-violet-400 border-violet-500/20 bg-violet-500/5 flex items-center space-x-1">
                        <Trophy className="h-3 w-3" />
                        <span>Core Pathway</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">Est: {rm.estimatedTime}</span>
                    </div>
                    <CardTitle className="text-lg font-bold mt-2">{rm.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed mt-1">
                      {rm.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3.5 flex-grow">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Pathway Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                    <Link href={`/roadmaps/${slug}`} className="flex-1">
                      <Button variant="default" size="sm" className="w-full text-xs font-semibold">
                        Resume Syllabus <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}

            {/* 2. Active Company Roadmap */}
            {activeCompany && companyRoadmaps[activeCompany] && (() => {
              const comp = companyRoadmaps[activeCompany];
              return (
                <Card hoverGlow className="bg-card/30 border-border/80 flex flex-col justify-between text-left">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="uppercase text-[9px] font-bold text-emerald-400 border-emerald-500/20 bg-emerald-500/5 flex items-center space-x-1">
                        <Building2 className="h-3 w-3" />
                        <span>Company Prep</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">{comp.difficulty}</span>
                    </div>
                    <CardTitle className="text-lg font-bold mt-2">{comp.name} Prep Roadmap</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed mt-1">
                      {comp.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3.5 flex-grow">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Prep Progress</span>
                        <span>{companyProgress}%</span>
                      </div>
                      <Progress value={companyProgress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                    <Link href={`/companies/${activeCompany}`} className="flex-1">
                      <Button variant="default" size="sm" className="w-full text-xs font-semibold">
                        Resume Prep <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })()}

            {/* 3. Active Project Roadmap */}
            {activeProject && projectRoadmaps[activeProject] && (() => {
              const proj = projectRoadmaps[activeProject];
              return (
                <Card hoverGlow className="bg-card/30 border-border/80 flex flex-col justify-between text-left">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="uppercase text-[9px] font-bold text-blue-400 border-blue-500/20 bg-blue-500/5 flex items-center space-x-1">
                        <FolderGit2 className="h-3 w-3" />
                        <span>Project Build</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">{proj.difficulty}</span>
                    </div>
                    <CardTitle className="text-lg font-bold mt-2">{proj.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed mt-1">
                      {proj.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3.5 flex-grow">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Build Progress</span>
                        <span>{projectProgress}%</span>
                      </div>
                      <Progress value={projectProgress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                    <Link href={`/project-roadmaps/${activeProject}`} className="flex-1">
                      <Button variant="default" size="sm" className="w-full text-xs font-semibold">
                        Resume Build <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })()}

            {/* Optional placeholders if not active */}
            {!activeCompany && (
              <Card className="border border-dashed border-border bg-card/10 flex flex-col justify-between p-6 text-center text-muted-foreground h-full min-h-[220px]">
                <div className="my-auto space-y-2">
                  <Building2 className="h-8 w-8 mx-auto opacity-30 text-primary" />
                  <h4 className="font-bold text-sm text-foreground">No Target Company Active</h4>
                  <p className="text-xs max-w-[220px] mx-auto">Enroll in Google, Microsoft, Stripe prep timelines to track goals.</p>
                </div>
                <Link href="/companies">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">Explore Company Prep</Button>
                </Link>
              </Card>
            )}

            {!activeProject && (
              <Card className="border border-dashed border-border bg-card/10 flex flex-col justify-between p-6 text-center text-muted-foreground h-full min-h-[220px]">
                <div className="my-auto space-y-2">
                  <FolderGit2 className="h-8 w-8 mx-auto opacity-30 text-primary" />
                  <h4 className="font-bold text-sm text-foreground">No Portfolio Build Active</h4>
                  <p className="text-xs max-w-[220px] mx-auto">Track step-by-step builds for portfolio apps.</p>
                </div>
                <Link href="/project-roadmaps">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">Explore Project Guides</Button>
                </Link>
              </Card>
            )}
          </div>
        </div>

        {/* Analytics Charts */}
        <ActivityCharts />

        {/* Recommended Actions & Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Action List */}
          <div className="lg:col-span-3 p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md space-y-4">
            <div>
              <h3 className="font-bold text-base">Suggested Next Steps</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Custom task recommendations from your AI guide.</p>
            </div>
            <div className="space-y-3">
              {nextSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3.5 p-3.5 rounded-xl border border-border/60 bg-background/40 hover:border-primary/20 hover:bg-primary/[0.01] transition-all"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 text-primary flex-shrink-0 mt-0.5">
                    <BrainCircuit className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{step.pathway}</span>
                      <Link href={step.href}>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-semibold flex items-center">
                          Go to panel <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                    <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base">Upcoming Deadlines</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Important dates from trackers.</p>
            </div>
            <div className="space-y-4 mt-4 flex-1">
              <div className="flex items-start space-x-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground">Stripe OA Completion</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Completed, review answers. Due: June 15, 2026</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground">Google Interview Mock</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Friday, 10:00 AM. Topic: Tree DFS algorithms.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-foreground">Next.js Blog Project</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Deadline: June 22, 2026. Current: Mockup complete.</p>
                </div>
              </div>
            </div>
            <div className="border-t border-border/40 pt-4 mt-4">
              <Link href="/tracker/applications">
                <Button variant="outline" className="w-full text-xs font-semibold">
                  Manage Application Boards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
