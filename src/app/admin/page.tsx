"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ShieldCheck, Plus, Check, X, Map, FileCode, Users, Star, ClipboardList } from "lucide-react";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { roadmapBlueprints } from "@/lib/roadmapBlueprints";

interface SubmittedResource {
  id: string;
  title: string;
  url: string;
  category: string;
  submittedBy: string;
  roadmapNode: string;
}

const mockSubmissions: SubmittedResource[] = [
  {
    id: "sub-1",
    title: "Understanding CSS Grid (Smashing Magazine)",
    url: "https://www.smashingmagazine.com/2020/01/understanding-css-grid-layout/",
    category: "DOCUMENTATION",
    submittedBy: "alice_dev@gatech.edu",
    roadmapNode: "CSS Styles & Responsive Layouts"
  },
  {
    id: "sub-2",
    title: "Docker Compose Tutorial Playlist",
    url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeHS876n0791VqdCa87z",
    category: "YOUTUBE",
    submittedBy: "pete_cs@berkeley.edu",
    roadmapNode: "Docker Containerization"
  }
];

export default function AdminConsole() {
  const { user } = useRoadmapStore();
  const [activeTab, setActiveTab] = useState<"sub" | "roadmap" | "stats">("sub");
  const [submissions, setSubmissions] = useState<SubmittedResource[]>(mockSubmissions);
  const [roadmaps, setRoadmaps] = useState(Object.values(roadmapBlueprints));

  const handleApprove = (id: string) => {
    setSubmissions(prev => prev.filter(item => item.id !== id));
    // Simulate updating resource catalog list
  };

  const handleReject = (id: string) => {
    setSubmissions(prev => prev.filter(item => item.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span>Admin Console Workspace</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add roadmap pathways, append syllabus nodes, configure resources, and review student suggestion links.
            </p>
          </div>
        </div>

        {/* Admin Tab Switches */}
        <div className="flex gap-2 border-b border-border pb-3">
          <Button
            variant={activeTab === "sub" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("sub")}
          >
            Review Resource queue ({submissions.length})
          </Button>
          <Button
            variant={activeTab === "roadmap" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("roadmap")}
          >
            Manage Path Syllabus
          </Button>
          <Button
            variant={activeTab === "stats" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("stats")}
          >
            Syllabus Metrics
          </Button>
        </div>

        {/* Tab contents */}
        {activeTab === "sub" && (
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold">Student-Submitted Resources Queue</h3>
            <p className="text-xs text-muted-foreground">Approve URLs to index them into the specific roadmap topic nodes.</p>

            <div className="space-y-3">
              {submissions.length > 0 ? (
                submissions.map((sub) => (
                  <Card key={sub.id} className="bg-card/45 border-border">
                    <CardContent className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{sub.category}</Badge>
                          <span className="text-[10px] text-muted-foreground font-semibold">Node: {sub.roadmapNode}</span>
                        </div>
                        <h4 className="font-bold text-sm text-foreground">{sub.title}</h4>
                        <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline truncate block max-w-md">
                          {sub.url}
                        </a>
                        <span className="block text-[10px] text-muted-foreground font-light pt-1">Suggested by: {sub.submittedBy}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(sub.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white font-bold h-9 px-3 flex items-center space-x-1"
                        >
                          <Check className="h-4 w-4" />
                          <span>Approve</span>
                        </Button>
                        <Button
                          onClick={() => handleReject(sub.id)}
                          variant="destructive"
                          size="sm"
                          className="h-9 px-3 flex items-center space-x-1"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 rounded-2xl border border-dashed border-border bg-card/20 text-muted-foreground">
                  <ClipboardList className="h-10 w-10 mx-auto opacity-40 mb-3" />
                  <h4 className="font-bold">Queue is empty</h4>
                  <p className="text-xs mt-1">No new study resources submitted for review.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-6 text-left">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Curriculum Path Indexes</h3>
                <p className="text-xs text-muted-foreground">Manage active pathways, slugs, difficulty and milestones.</p>
              </div>
              <Button size="sm" className="font-semibold flex items-center space-x-1">
                <Plus className="h-4 w-4" />
                <span>Create Pathway</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmaps.map((rm) => (
                <Card key={rm.slug} className="bg-card/45 border-border">
                  <CardContent className="p-5 flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{rm.category}</Badge>
                        <Badge variant="secondary">{rm.difficulty}</Badge>
                      </div>
                      <h4 className="font-bold text-base text-foreground">{rm.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{rm.nodes.length} syllabus nodes mapped.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Button variant="outline" size="sm" className="text-xs font-semibold h-8">Edit path</Button>
                      <Button variant="outline" size="sm" className="text-xs font-semibold h-8">Append node</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold">System Status Metrics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold block">1,420</span>
                    <span className="text-xs text-muted-foreground">Active platform students</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Map className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold block">{roadmaps.length}</span>
                    <span className="text-xs text-muted-foreground">Published syllabus roadmaps</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold block">312</span>
                    <span className="text-xs text-muted-foreground">Resource indexes approved</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
