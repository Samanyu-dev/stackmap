"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  currentTemplate: string;
  onChange: (template: string) => void;
}

export default function ResumeTemplateSelector({ currentTemplate, onChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: "faang",
      name: "FAANG Standard",
      description: "Traditional single-column layout using classic serif fonts. Ideal for large enterprise companies.",
      badge: "Traditional"
    },
    {
      id: "internship",
      name: "Student Internship",
      description: "Highlights course works, laboratory projects, and certifications. Tailored for university recruits.",
      badge: "Academic"
    },
    {
      id: "fresher",
      name: "Fresher Entry",
      description: "Emphasizes skill grids, coding indices, and extracurricular milestones for entry-level developers.",
      badge: "Skills Focus"
    },
    {
      id: "startup",
      name: "Modern Startup",
      description: "Contemporary sans-serif typography featuring subtle violet colored accents. Highly premium.",
      badge: "Creative"
    }
  ];

  return (
    <div className="space-y-4 text-left">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Resume Template Layout</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => onChange(tpl.id)}
            className={cn(
              "p-4 rounded-xl border cursor-pointer bg-card/40 transition-all duration-200 hover:border-primary/40 flex flex-col justify-between space-y-2",
              currentTemplate === tpl.id ? "border-primary bg-primary/[0.01] shadow-lg shadow-primary/[0.02]" : "border-border/80"
            )}
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-sm text-foreground">{tpl.name}</span>
              <Badge variant="secondary" className="text-[9px] uppercase font-bold">{tpl.badge}</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              {tpl.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
