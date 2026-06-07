"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FlowRoadmap from "@/components/roadmap/FlowRoadmap";
import RoadmapSidebar from "@/components/roadmap/RoadmapSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore, RoadmapNodeData } from "@/store/useRoadmapStore";
import { roadmapBlueprints } from "@/lib/roadmapBlueprints";
import { ArrowLeft, ChevronRight, CheckCircle2, Bookmark, Info } from "lucide-react";

export default function IndividualRoadmap() {
  const params = useParams();
  const slug = params?.slug as string;

  const { completedNodes, enrollInRoadmap, activeRoadmaps } = useRoadmapStore();
  const [selectedNode, setSelectedNode] = useState<RoadmapNodeData | null>(null);

  const roadmap = roadmapBlueprints[slug];

  useEffect(() => {
    if (roadmap) {
      enrollInRoadmap(roadmap.slug);
    }
  }, [roadmap, enrollInRoadmap]);

  if (!roadmap) {
    return (
      <DashboardLayout>
        <div className="text-center py-16 space-y-4">
          <h2 className="text-2xl font-bold">Roadmap Path Not Found</h2>
          <p className="text-sm text-muted-foreground">The career path slug you request does not exist in our curriculum catalog.</p>
          <Link href="/roadmaps">
            <Button>Return to Catalog</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate local progress percentage
  const nodeSlugs = roadmap.nodes.map(n => n.slug);
  const completed = nodeSlugs.filter(slug => completedNodes[slug]).length;
  const progressPercent = Math.round((completed / nodeSlugs.length) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6 relative pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/roadmaps" className="hover:text-foreground">Catalog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-semibold">{roadmap.title}</span>
        </div>

        {/* Roadmap Title header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{roadmap.title} Syllabus</h1>
              <Badge variant="outline" className="uppercase text-[9px] font-bold">
                {roadmap.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {roadmap.description}
            </p>
          </div>

          {/* Progress Card */}
          <div className="w-full md:w-80 rounded-xl bg-card border border-border/60 p-5 space-y-3.5">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Track Progress</span>
              </span>
              <span>{progressPercent}% Done</span>
            </div>
            <Progress value={progressPercent} className="h-2.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{completed} of {nodeSlugs.length} Steps Checked</span>
              <span>Est: {roadmap.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-primary/5 border border-primary/10 text-xs text-primary/80 leading-relaxed">
          <Info className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
          <p>
            <strong>Interactive Canvas:</strong> Drag to pan, scroll to zoom in/out, and **click on a topic node** to unlock official documentation, learning resources, interview questions, projects, and dynamic study notes.
          </p>
        </div>

        {/* Flow Canvas */}
        <FlowRoadmap
          nodesData={roadmap.nodes}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        {/* Details Drawer */}
        <RoadmapSidebar
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </DashboardLayout>
  );
}
