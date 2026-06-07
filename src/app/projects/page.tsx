"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FolderGit2, Search, BookOpen, Layers, CheckCircle2, Award, Terminal } from "lucide-react";

interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: "FRONTEND" | "BACKEND" | "FULLSTACK" | "DEVOPS";
  stack: string[];
  features: string[];
  timeframe: string;
}

const mockProjects: ProjectTemplate[] = [
  {
    id: "p1",
    title: "Sleek Dark Portfolio Website",
    description: "Build a high-performance profile layout showing developer credentials, responsive grids, custom CSS variables, and light/dark switches.",
    difficulty: "BEGINNER",
    category: "FRONTEND",
    stack: ["HTML5", "CSS Grid", "JavaScript ES6", "GitHub Pages"],
    features: [
      "Semantic markup layout optimizing SEO indexing.",
      "CSS Variable theme configurations toggleable via Javascript.",
      "Responsive viewport grid adjusting to mobile devices."
    ],
    timeframe: "3-5 Days"
  },
  {
    id: "p2",
    title: "Secure Task REST API Server",
    description: "Write a server back-end that exposes CRUD routes for notes and lists, implementing authentication schemas and parameter validation checks.",
    difficulty: "INTERMEDIATE",
    category: "BACKEND",
    stack: ["Node.js", "Express.js", "PostgreSQL / Prisma", "JWT Auth", "Zod"],
    features: [
      "Password hashing validation using secure bcrypt protocols.",
      "Bearer Token authentication checks preventing unauthorized routes.",
      "Schema checks preventing invalid database inserts."
    ],
    timeframe: "1-2 Weeks"
  },
  {
    id: "p3",
    title: "E-Commerce System with Analytics",
    description: "Formulate a full-stack store containing shopping carts, state providers, database configurations, and admin metrics dashboard panels.",
    difficulty: "ADVANCED",
    category: "FULLSTACK",
    stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Supabase DB", "Stripe API"],
    features: [
      "Global store providers keeping track of local checkout items.",
      "Dynamic SSR product directories matching categories.",
      "Web-hook listeners handling payment success triggers."
    ],
    timeframe: "3-4 Weeks"
  },
  {
    id: "p4",
    title: "Automated Docker CI/CD Pipeline",
    description: "Dockerize a full-stack app structure, configure compose environments, and write deploy actions triggering on git push.",
    difficulty: "ADVANCED",
    category: "DEVOPS",
    stack: ["Docker Compose", "GitHub Actions", "AWS EC2", "Nginx Proxy"],
    features: [
      "Multi-stage Dockerfiles optimizing compiled bundle weights.",
      "Automated runners executing unit tests and code lints.",
      "Reverse proxy mappings handling SSL terminations."
    ],
    timeframe: "1-2 Weeks"
  }
];

export default function ProjectIdeasBank() {
  const [projects, setProjects] = useState<ProjectTemplate[]>(mockProjects);
  const [search, setSearch] = useState("");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<ProjectTemplate | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.stack.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty = activeDifficulty === "ALL" || p.difficulty === activeDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Student Project Blueprints</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Select structured project tasks matching your skill levels. Review detailed feature specifications and starter stacks.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-1.5 w-full md:w-auto">
            {["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"].map((diff) => (
              <Button
                key={diff}
                variant={activeDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDifficulty(diff)}
                className="text-xs h-9 rounded-lg"
              >
                {diff === "ALL" ? "All Levels" : diff.toLowerCase()}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stack or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* List panel */}
          <div className="lg:col-span-2 space-y-4">
            {filteredProjects.map((p) => (
              <Card
                key={p.id}
                hoverGlow
                className={`bg-card/40 border-border/80 text-left transition-all cursor-pointer ${
                  selectedProject?.id === p.id ? "border-primary bg-primary/[0.01]" : ""
                }`}
                onClick={() => setSelectedProject(p)}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold">{p.category}</Badge>
                    <Badge
                      variant={
                        p.difficulty === "BEGINNER"
                          ? "info"
                          : p.difficulty === "INTERMEDIATE"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[10px] uppercase font-bold"
                    >
                      {p.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Tech Pill tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.stack.map(tech => (
                      <span key={tech} className="text-[10px] font-medium bg-secondary/80 text-secondary-foreground border px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 pt-3 mt-1">
                    <span>Timeline: {p.timeframe}</span>
                    <Button variant="link" size="sm" className="h-auto p-0 font-semibold text-primary">
                      Review Spec Outline &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Details inspection panel */}
          <div className="lg:col-span-1">
            {selectedProject ? (
              <Card glass className="sticky top-6 bg-card/65 border-border text-left">
                <CardHeader className="border-b border-border/40">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base font-bold">Project Specification</CardTitle>
                  </div>
                  <CardDescription className="text-xs">Detailed build outline for building {selectedProject.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Recommended Tech Stack</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedProject.stack.map(s => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Key Feature Requirements</span>
                    <ul className="space-y-2 mt-2">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="text-xs text-foreground flex items-start space-x-2 leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-secondary/40 border border-border/60 rounded-lg text-xs space-y-2">
                    <span className="font-bold flex items-center space-x-1">
                      <Terminal className="h-3.5 w-3.5" />
                      <span>Suggested Git setup</span>
                    </span>
                    <code className="block text-[10px] text-primary select-all bg-background/60 p-2 rounded border font-mono">
                      git init<br />
                      git add .<br />
                      git commit -m "feat: init template"
                    </code>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                  <Button className="w-full text-xs font-bold">Start this Project</Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground bg-card/20 sticky top-6">
                <FolderGit2 className="h-10 w-10 mx-auto opacity-40 mb-3" />
                <h4 className="font-semibold text-sm">No project selected</h4>
                <p className="text-xs mt-1">Select a blueprint template card from the catalog list to view key requirements.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
