"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Plus, 
  Building2, 
  Users, 
  BookMarked, 
  Trophy, 
  ArrowRight, 
  Settings, 
  Calendar,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Trash2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecruiterDashboard() {
  const { jobs, candidates, evaluations, scores, deleteJob, initialize, isHydrated } = useInterviewStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isHydrated) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse">Lading screening console state...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Stats calculation
  const totalJobs = jobs.length;
  const totalCandidates = candidates.length;
  const evaluatedCount = candidates.filter(c => c.pipelineStage === "EVALUATED" || c.pipelineStage === "RANKED" || c.pipelineStage === "TEST_SENT" || c.pipelineStage === "TEST_COMPLETED" || c.pipelineStage === "SHORTLISTED" || c.pipelineStage === "INTERVIEW_SCHEDULED").length;
  const scheduledCount = candidates.filter(c => c.pipelineStage === "INTERVIEW_SCHEDULED").length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="border-b border-border/40 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-nova-bright mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COSMIC RECRUITER HUD</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">Recruiter Console</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Aggregate resume vectors, configure custom grading weights, and trigger semantic ranking evaluations.
            </p>
          </div>
          <Link href="/interview/recruiter/jobs">
            <Button className="bg-nova hover:bg-nova-bright font-bold flex items-center gap-1.5 self-start">
              <Plus className="h-4 w-4" />
              <span>Configure New Job</span>
            </Button>
          </Link>
        </div>

        {/* Numeric Dashboard stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/40 border-border/80 text-left">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Active Job Posts</span>
                <div className="p-2 rounded-lg bg-nova/10 border border-nova/20 text-nova-bright">
                  <Building2 className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono">{totalJobs}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Active talent funnels</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/80 text-left">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Candidates</span>
                <div className="p-2 rounded-lg bg-pulsar/10 border border-pulsar/20 text-pulsar">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono">{totalCandidates}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Uploaded pool members</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/80 text-left">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Screened Profiles</span>
                <div className="p-2 rounded-lg bg-sol/10 border border-sol/20 text-sol">
                  <BrainCircuit className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono">{evaluatedCount}</div>
              <p className="text-[10px] text-muted-foreground mt-1">AI vectors computed</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/80 text-left">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Live Scheduled</span>
                <div className="p-2 rounded-lg bg-flare/10 border border-flare/20 text-flare">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono">{scheduledCount}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Confirmed Jitsi meetings</p>
            </CardContent>
          </Card>
        </div>

        {/* Funnels listing section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-nova-bright" />
            <span>Active Talent Funnels</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => {
              const jobCands = candidates.filter(c => c.jobId === job.id);
              const processedCands = jobCands.filter(c => c.pipelineStage !== "UPLOADED" && c.pipelineStage !== "ERROR");
              const topScore = jobCands.reduce((max, c) => {
                const s = scores[c.id]?.compositeScore ?? 0;
                return s > max ? s : max;
              }, 0);

              return (
                <Card key={job.id} hoverGlow className="bg-card/40 border-border/80 flex flex-col justify-between text-left relative group">
                  <CardHeader className="space-y-2.5 pb-4">
                    <div className="flex justify-between items-start">
                      <div className="h-9 w-9 rounded-lg bg-nova/10 border border-nova/20 flex items-center justify-center text-nova-bright">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[9px] font-mono border-border/80">
                          {jobCands.length} Candidates
                        </Badge>
                        {topScore > 0 && (
                          <Badge className="text-[9px] font-mono bg-pulsar/10 border border-pulsar/30 text-pulsar">
                            Top Score: {topScore}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-nova-bright transition-colors">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2 mt-1 leading-relaxed">
                        {job.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="border-t border-border/40 py-4 flex-grow space-y-4">
                    {/* Weights config tags preview */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Screening Weights</span>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-[9px] font-mono">JD Alignment {job.weightConfig.jdMatch}%</Badge>
                        <Badge variant="outline" className="text-[9px] font-mono">GitHub Impact {job.weightConfig.github}%</Badge>
                        <Badge variant="outline" className="text-[9px] font-mono">Coding Labs {job.weightConfig.coding}%</Badge>
                        <Badge variant="outline" className="text-[9px] font-mono">Logical {job.weightConfig.logical}%</Badge>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-muted-foreground">Screening Process Ratio</span>
                        <span className="text-starlight font-bold">{processedCands.length}/{jobCands.length}</span>
                      </div>
                      <div className="h-1.5 w-full bg-void rounded-full overflow-hidden border border-rim/35">
                        <div 
                          className="h-full bg-gradient-to-r from-nova to-pulsar transition-all duration-500"
                          style={{ width: `${jobCands.length > 0 ? (processedCands.length / jobCands.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <div className="border-t border-border/40 px-6 py-4 flex items-center justify-between gap-2 bg-void/30">
                    <Button 
                      variant="outline" 
                      onClick={() => deleteJob(job.id)}
                      className="border-red-500/25 bg-red-500/5 hover:bg-red-500/15 text-red-400 p-2 rounded-lg text-xs"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Link href={`/interview/recruiter/jobs/${job.id}`} className="flex-1">
                      <Button className="w-full bg-nova/80 hover:bg-nova text-xs font-semibold flex items-center justify-center gap-1.5">
                        <span>Enter Pipeline Screen</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent recruitment log audit stream */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Hiring Logs Audit Trail</h2>
          <Card className="bg-card/40 border-border/80">
            <CardContent className="p-0">
              <div className="divide-y divide-border/40 font-mono text-xs text-left">
                {candidates.slice(-4).map((c, idx) => {
                  const jobName = jobs.find(j => j.id === c.jobId)?.title ?? "System Pipeline";
                  return (
                    <div key={idx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 hover:bg-white/[0.01]">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground text-sm">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{jobName} • {c.college}</span>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-muted-foreground text-[10px]">{c.statusMessage}</span>
                        <Badge 
                          variant={c.pipelineStage === "ERROR" ? "destructive" : "outline"} 
                          className="text-[9px] tracking-wider uppercase font-bold"
                        >
                          {c.pipelineStage}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
