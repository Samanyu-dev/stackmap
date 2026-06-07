"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, CheckCircle2, Trophy, ExternalLink } from "lucide-react";
import { SkillNode } from "@/data/skill-tree";
import { cn } from "@/lib/utils";

interface SkillNodeCardProps {
  node: SkillNode;
  isCompleted: boolean;
  isUnlocked: boolean;
  onComplete: (id: string) => void;
}

export default function SkillNodeCard({ node, isCompleted, isUnlocked, onComplete }: SkillNodeCardProps) {
  return (
    <Card
      className={cn(
        "bg-card/40 border-border text-left relative overflow-hidden transition-all duration-300",
        isCompleted && "border-green-500/40 bg-green-500/[0.01]",
        isUnlocked && !isCompleted && "border-primary/30 hover:border-primary/50",
        !isUnlocked && "opacity-60 grayscale border-dashed border-border/80"
      )}
    >
      {/* Dynamic top bar glow */}
      {isCompleted && <div className="absolute top-0 inset-x-0 h-1 bg-green-500" />}
      {isUnlocked && !isCompleted && <div className="absolute top-0 inset-x-0 h-1 bg-primary" />}

      <CardContent className="p-5 space-y-4">
        {/* Status headers */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1.5 text-xs font-semibold">
            {isCompleted ? (
              <span className="text-green-400 flex items-center space-x-1"><CheckCircle2 className="h-4 w-4" /> <span>Mastered</span></span>
            ) : isUnlocked ? (
              <span className="text-primary flex items-center space-x-1"><Unlock className="h-4 w-4" /> <span>Ready to Learn</span></span>
            ) : (
              <span className="text-muted-foreground flex items-center space-x-1"><Lock className="h-4 w-4" /> <span>Locked</span></span>
            )}
          </div>

          <div className="flex items-center space-x-1 text-xs font-bold text-violet-400">
            <Trophy className="h-3.5 w-3.5" />
            <span>+{node.xp} XP</span>
          </div>
        </div>

        {/* Content detail */}
        <div>
          <h4 className="font-bold text-sm text-foreground">{node.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-light">
            {node.description}
          </p>
        </div>

        {/* Requirements references */}
        {isUnlocked && (
          <div className="space-y-3.5 border-t border-border/40 pt-4 text-xs font-light">
            {node.recommendedRoadmaps.length > 0 && (
              <div>
                <span className="font-bold text-foreground block text-[10px] uppercase tracking-wider mb-1">Recommended Pathway</span>
                <div className="flex flex-wrap gap-1">
                  {node.recommendedRoadmaps.map(r => (
                    <Badge key={r} variant="outline" className="text-[9px]">{r}</Badge>
                  ))}
                </div>
              </div>
            )}

            {node.recommendedProjects.length > 0 && (
              <div>
                <span className="font-bold text-foreground block text-[10px] uppercase tracking-wider mb-1">Portfolio Project</span>
                <div className="space-y-1 mt-1 text-[11px] text-muted-foreground">
                  {node.recommendedProjects.map((p, pIdx) => (
                    <a
                      key={pIdx}
                      href={p.url}
                      className="flex items-center hover:text-primary transition-colors hover:underline"
                    >
                      <span className="font-semibold text-zinc-300 mr-1">• Build:</span> {p.name} <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prerequisites indicators */}
        {node.prerequisites.length > 0 && !isUnlocked && (
          <div className="border-t border-border/40 pt-3 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider flex flex-wrap gap-1 items-center">
            <span>Requires:</span>
            {node.prerequisites.map(req => (
              <Badge key={req} variant="outline" className="text-[9px] lowercase font-bold">{req.replace("fe-", "").replace("be-", "").replace("dsa-", "")}</Badge>
            ))}
          </div>
        )}

        {/* Complete action button */}
        {isUnlocked && !isCompleted && (
          <Button
            onClick={() => onComplete(node.id)}
            size="sm"
            className="w-full text-xs font-bold h-9 mt-1.5"
          >
            Mark Skill as Mastered
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
