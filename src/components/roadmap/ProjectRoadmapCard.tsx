"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FolderGit2, ArrowRight } from "lucide-react";
import { ProjectRoadmapData } from "@/data/project-roadmaps";

interface ProjectCardProps {
  project: ProjectRoadmapData;
}

export default function ProjectRoadmapCard({ project }: ProjectCardProps) {
  return (
    <Card hoverGlow className="bg-card/40 border-border/85 flex flex-col justify-between text-left h-full">
      <CardHeader className="space-y-2.5 pb-4">
        <div className="flex justify-between items-center">
          <Badge
            variant={
              project.difficulty === "BEGINNER"
                ? "info"
                : project.difficulty === "INTERMEDIATE"
                ? "warning"
                : "destructive"
            }
            className="text-[9px] uppercase font-bold"
          >
            {project.difficulty}
          </Badge>
          <div className="flex items-center space-x-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{project.duration}</span>
          </div>
        </div>

        <div>
          <CardTitle className="text-base font-bold flex items-center space-x-1.5">
            <FolderGit2 className="h-4.5 w-4.5 text-primary" />
            <span>{project.title}</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 min-h-[32px] leading-relaxed">
            {project.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-2 border-t border-border/40 pt-4 flex-grow">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Required Stack</span>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map(tech => (
            <span key={tech} className="text-[9px] font-semibold bg-secondary/80 text-secondary-foreground border px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/40 pt-4">
        <Link href={`/project-roadmaps/${project.slug}`} className="w-full">
          <Button size="sm" className="w-full text-xs font-bold flex items-center justify-center space-x-1.5">
            <span>View Step-by-Step Build</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
