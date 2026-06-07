"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SkillNodeCard from "@/components/roadmap/SkillNodeCard";
import SkillProgressPanel from "@/components/roadmap/SkillProgressPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { skillTreeData, SkillNode } from "@/data/skill-tree";
import { ChevronRight, ArrowLeft, Trophy, Star, Network, Info } from "lucide-react";

export default function SkillTreePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const domain = skillTreeData[slug];

  // Global XP & Completion States
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(300); // Start with baseline

  useEffect(() => {
    // Check local storage for saved skills
    const savedCompleted = localStorage.getItem("stackmap_skills_completed");
    const savedXp = localStorage.getItem("stackmap_skills_xp");
    
    if (savedCompleted) {
      try {
        setCompletedList(JSON.parse(savedCompleted));
      } catch (e) {}
    }
    if (savedXp) {
      setTotalXp(parseInt(savedXp) || 300);
    }
  }, []);

  if (!domain) {
    return (
      <DashboardLayout>
        <div className="text-center py-16 space-y-4">
          <h2 className="text-2xl font-bold">Skill Domain Not Found</h2>
          <p className="text-sm text-muted-foreground">The requested skill tree domain does not exist in our catalog.</p>
          <Link href="/skills">
            <Button>Return to Skill Trees</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Node Lock/Unlock Logic: A node is unlocked if it has no prerequisites OR if all prerequisites are inside the completedList
  const isNodeUnlocked = (node: SkillNode) => {
    if (node.prerequisites.length === 0) return true;
    return node.prerequisites.every(reqId => completedList.includes(reqId));
  };

  const handleCompleteSkill = (nodeId: string) => {
    if (completedList.includes(nodeId)) return;

    const targetNode = domain.nodes.find(n => n.id === nodeId);
    if (!targetNode) return;

    const newCompleted = [...completedList, nodeId];
    const newXp = totalXp + targetNode.xp;

    setCompletedList(newCompleted);
    setTotalXp(newXp);

    // Backup to local storage
    localStorage.setItem("stackmap_skills_completed", JSON.stringify(newCompleted));
    localStorage.setItem("stackmap_skills_xp", newXp.toString());
  };

  // Recommendations: Find nodes that are unlocked but not completed
  const getNextRecommended = () => {
    return domain.nodes
      .filter(n => isNodeUnlocked(n) && !completedList.includes(n.id))
      .map(n => ({ name: n.name, domain: domain.title }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 relative pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/skills" className="hover:text-foreground">Skill Trees</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-semibold">{domain.title} Tree</span>
        </div>

        {/* Domain Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6 text-left">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{domain.title} Skill Tree</h1>
              <Badge variant="outline" className="uppercase text-[9px] font-bold text-violet-400 border-violet-500/20 bg-violet-500/5">
                {domain.domain}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {domain.description}
            </p>
          </div>
          <div className="h-11 w-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
            <Network className="h-6 w-6" />
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10 text-xs text-primary/80 leading-relaxed">
          <Info className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
          <p>
            <strong>Prerequisite Locking:</strong> Completing base skill nodes unlocks advanced nodes automatically. (e.g. Complete HTML/CSS to unlock JavaScript basics, then complete JS to unlock React, and so on).
          </p>
        </div>

        {/* Interactive layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Skill Nodes Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domain.nodes.map((node) => {
              const isCompleted = completedList.includes(node.id);
              const isUnlocked = isNodeUnlocked(node);
              
              return (
                <SkillNodeCard
                  key={node.id}
                  node={node}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  onComplete={handleCompleteSkill}
                />
              );
            })}
          </div>

          {/* Progress panel column */}
          <div className="lg:col-span-1">
            <SkillProgressPanel
              totalXp={totalXp}
              completedCount={domain.nodes.filter(n => completedList.includes(n.id)).length}
              totalCount={domain.nodes.length}
              nextRecommended={getNextRecommended()}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
