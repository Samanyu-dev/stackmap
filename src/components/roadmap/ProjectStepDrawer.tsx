"use client";

import React, { useState, useEffect } from "react";
import { X, ExternalLink, HelpCircle, FileCheck, Landmark, CheckSquare, Square, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectStep } from "@/data/project-roadmaps";

interface ProjectStepDrawerProps {
  step: ProjectStep | null;
  index: number;
  onClose: () => void;
}

export default function ProjectStepDrawer({ step, index, onClose }: ProjectStepDrawerProps) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (step) {
      setNote("");
      setSaved(false);
    }
  }, [step]);

  if (!step) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-card border-l border-border shadow-2xl z-50 flex flex-col transition-all duration-300 transform translate-x-0 animate-slide-in text-left">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Phase {index + 1} Step Guide</span>
          <h3 className="text-lg font-bold text-foreground mt-1 line-clamp-1">{step.task}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg border hover:bg-secondary text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content Scroll area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Core objective */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Target Objective</span>
          <p className="text-xs text-foreground leading-relaxed font-light bg-secondary/20 p-3 rounded-lg border border-border/40">
            {step.task}
          </p>
        </div>

        {/* Learning resources */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Syllabus References</span>
          <div className="space-y-2">
            {step.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/20 hover:bg-primary/5 transition-all text-xs font-medium text-muted-foreground hover:text-primary"
              >
                <span>{res.name}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Expected outcomes */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Expected Output</span>
          <div className="p-3.5 rounded-xl border border-border bg-background text-xs font-light leading-relaxed">
            {step.expectedOutput}
          </div>
        </div>

        {/* Debugging guidelines */}
        {step.debuggingTips && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block flex items-center">
              <HelpCircle className="h-4 w-4 mr-1 text-yellow-400" /> Debugging & Gotchas
            </span>
            <div className="p-3.5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs font-light text-yellow-500/90 leading-relaxed">
              {step.debuggingTips}
            </div>
          </div>
        )}

        {/* Notes Pad */}
        <div className="space-y-3 border-t border-border pt-5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step Notes</span>
            <Button size="sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="h-8 text-xs font-semibold">
              {saved ? "Saved!" : "Save"}
            </Button>
          </div>
          <textarea
            className="w-full h-24 p-2.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Document file configurations, port mapping commands, or database credentials..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
