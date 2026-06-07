"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ThreeRoadmap from "@/components/roadmap/ThreeRoadmap";
import DetailPanel from "@/components/roadmap/DetailPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore, RoadmapNodeData } from "@/store/useRoadmapStore";
import { roadmapBlueprints } from "@/lib/roadmapBlueprints";
import { ChevronRight, CheckCircle2, Info } from "lucide-react";

export default function IndividualRoadmap() {
  const params = useParams();
  const slug = params?.slug as string;

  const { completedNodes, enrollInRoadmap } = useRoadmapStore();
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
          <h2 className="text-2xl font-serif text-starlight font-bold">Roadmap Path Not Found</h2>
          <p className="text-sm text-muted-foreground">The career path slug you requested does not exist in our catalog.</p>
          <Link href="/roadmaps">
            <Button className="cursor-pointer">Return to Catalog</Button>
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
      <div className="space-y-6 relative pb-16 w-full max-w-7xl mx-auto">
        {/* Navigation Breadcrumb - Monospace styled */}
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <Link href="/roadmaps" className="hover:text-nova transition-colors cursor-pointer">Catalog</Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="text-starlight font-medium">{roadmap.title}</span>
        </div>

        {/* Roadmap Title header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border-cosmic pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold italic text-starlight tracking-tight">
                {roadmap.title} Path
              </h1>
              <Badge className="uppercase text-[9px] font-mono tracking-wider beginner px-2.5 py-0.5">
                {roadmap.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              {roadmap.description}
            </p>
          </div>

          {/* Progress Card - Glassmorphism styled */}
          <div className="w-full md:w-80 rounded-xl glass-panel p-5 space-y-3.5 relative overflow-hidden">
            <div className="flex justify-between items-center text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="flex items-center space-x-1.5 text-pulsar">
                <CheckCircle2 className="h-4 w-4 text-pulsar" />
                <span>Progress Tracker</span>
              </span>
              <span>{progressPercent}% Done</span>
            </div>
            
            <div className="relative">
              <Progress value={progressPercent} className="h-1.5 bg-void [&>[data-state=newValue]]:bg-nova text-nova" />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>{completed} of {nodeSlugs.length} Constellation Nodes</span>
              <span>Est: {roadmap.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Info Banner - Luxury editorial typography */}
        <div className="flex items-start space-x-3.5 p-4 rounded-xl glass-panel border border-nova/20 bg-nova/5 text-xs text-starlight/90 leading-relaxed font-sans shadow-md">
          <Info className="h-4.5 w-4.5 text-pulsar flex-shrink-0 mt-0.5" />
          <div>
            <p>
              <strong className="text-pulsar font-semibold">Galaxy Navigator:</strong> Left-click and drag to rotate the 3D space map. Right-click and drag (or use scroll wheel) to pan and zoom. <strong className="text-nova-glow font-semibold">Click on a star node</strong> to warp through space and access curated curricula, interview challenges, and notes.
            </p>
          </div>
        </div>

        {/* Visual Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 3D Constellation Star-Map */}
          <div className={selectedNode ? "lg:col-span-2" : "lg:col-span-3"}>
            <ThreeRoadmap
              nodesData={roadmap.nodes}
              onSelectNode={(node) => setSelectedNode(node)}
            />
          </div>

          {/* Detail drawer panel inline if active node is selected */}
          {selectedNode && (
            <div className="h-[650px] lg:col-span-1 rounded-2xl overflow-hidden glass-panel border border-border-cosmic shadow-2xl">
              <DetailPanel
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
                totalNodes={roadmap.nodes.length}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
