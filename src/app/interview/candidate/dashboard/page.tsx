"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  MessageSquare, 
  Award, 
  Video, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  Users
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore, Candidate } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CandidateDashboard() {
  const { candidates, jobs, initialize, isHydrated } = useInterviewStore();
  const [selectedCandId, setSelectedCandId] = useState("");

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Set default candidate if loaded
  useEffect(() => {
    if (isHydrated && candidates.length > 0 && !selectedCandId) {
      setSelectedCandId(candidates[0].id);
    }
  }, [isHydrated, candidates, selectedCandId]);

  if (!isHydrated) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse font-bold">Lading student console database...</span>
        </div>
      </DashboardLayout>
    );
  }

  const activeCandidate = candidates.find(c => c.id === selectedCandId);
  const activeJob = activeCandidate ? jobs.find(j => j.id === activeCandidate.jobId) : null;

  return (
    <DashboardLayout>
      <div className="space-y-8 text-left max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="border-b border-border/40 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-pulsar mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CANDIDATE TESTING LAB</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">Student Sandbox Console</h1>
            <p className="text-sm text-muted-foreground mt-1 font-sans">
              Access your invitation tests, write custom SQL scripts, join speech-activated AI mock rounds, and review feedback cards.
            </p>
          </div>

          {/* Candidate Profile Impersonation Selector */}
          <div className="flex items-center gap-2 bg-[#090915] border border-rim rounded-lg px-3 py-1.5 font-mono text-xs shrink-0 self-start">
            <Users className="h-4 w-4 text-pulsar" />
            <span className="text-muted-foreground">Candidate Identity:</span>
            <select 
              value={selectedCandId} 
              onChange={(e) => setSelectedCandId(e.target.value)}
              className="bg-transparent border-none text-foreground font-bold focus:outline-none cursor-pointer"
            >
              {candidates.map(c => (
                <option key={c.id} value={c.id} className="bg-abyss text-foreground text-xs font-mono">
                  {c.name} ({c.pipelineStage})
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeCandidate && activeJob && (
          <div className="space-y-6">
            {/* Candidate Identity Overview Card */}
            <Card className="bg-card/40 border-border/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pulsar/10 to-transparent pointer-events-none" />
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Assigned Recruitment Target</span>
                    <h3 className="text-xl font-bold font-sans text-foreground">{activeJob.title}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{activeCandidate.college} • GPA: {activeCandidate.cgpa}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-muted-foreground uppercase block font-mono">Invitation Status</span>
                    <Badge className="bg-pulsar/10 border border-pulsar/30 text-pulsar font-mono text-[9px] mt-1.5 uppercase font-bold tracking-wider">
                      {activeCandidate.pipelineStage}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stages action tasks list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              {/* Task 1: Technical Assessment Lab */}
              <Card className="bg-card/40 border-border/80 text-left flex flex-col justify-between group">
                <CardContent className="pt-6 space-y-3.5">
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-10 rounded-lg bg-nova/10 border border-nova/20 flex items-center justify-center text-nova-bright group-hover:bg-nova group-hover:text-white transition-all">
                      <Code2 className="h-5 w-5" />
                    </div>
                    {isAssessmentCompleted(activeCandidate.pipelineStage) ? (
                      <Badge className="bg-pulsar/10 border border-pulsar/30 text-pulsar text-[9px] uppercase font-bold">COMPLETED</Badge>
                    ) : isAssessmentLocked(activeCandidate.pipelineStage) ? (
                      <Badge className="bg-void border-rim text-muted-foreground text-[9px] uppercase font-bold">LOCKED</Badge>
                    ) : (
                      <Badge className="bg-sol/10 border border-sol/30 text-sol text-[9px] uppercase font-bold animate-pulse">ASSIGNED</Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Interactive Technical Assessment</h4>
                    <p className="text-[11px] text-muted-foreground font-sans leading-relaxed mt-1">
                      Includes 3 components: logical MCQ questions, custom PostgreSQL SQL query executor, and a data structures compiler mockup.
                    </p>
                  </div>
                </CardContent>
                <div className="border-t border-border/40 p-4 bg-void/20">
                  {isAssessmentLocked(activeCandidate.pipelineStage) ? (
                    <Button disabled className="w-full bg-void text-muted-foreground border border-rim/55 text-xs font-bold gap-1.5 cursor-not-allowed">
                      <span>Awaiting Invitation Email</span>
                    </Button>
                  ) : (
                    <Link href={`/interview/candidate/assessment/${activeCandidate.id}`}>
                      <Button className="w-full bg-nova hover:bg-nova-bright text-xs font-bold flex items-center justify-center gap-1.5">
                        <span>Enter Technical Lab</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>

              {/* Task 2: Speech Activated AI Mock Interview */}
              <Card className="bg-card/40 border-border/80 text-left flex flex-col justify-between group">
                <CardContent className="pt-6 space-y-3.5">
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-10 rounded-lg bg-pulsar/10 border border-pulsar/20 flex items-center justify-center text-pulsar group-hover:bg-pulsar group-hover:text-abyss transition-all">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    {isInterviewCompleted(activeCandidate.pipelineStage) ? (
                      <Badge className="bg-pulsar/10 border border-pulsar/30 text-pulsar text-[9px] uppercase font-bold">COMPLETED</Badge>
                    ) : isInterviewLocked(activeCandidate.pipelineStage) ? (
                      <Badge className="bg-void border-rim text-muted-foreground text-[9px] uppercase font-bold">LOCKED</Badge>
                    ) : (
                      <Badge className="bg-flare/10 border border-flare/30 text-flare text-[9px] uppercase font-bold animate-pulse">ASSIGNED</Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Voice AI Interview Chamber</h4>
                    <p className="text-[11px] text-muted-foreground font-sans leading-relaxed mt-1">
                      A hands-free technical discussion. Uses native Web Speech API to capture speech and synthesis response queues instantly.
                    </p>
                  </div>
                </CardContent>
                <div className="border-t border-border/40 p-4 bg-void/20">
                  {isInterviewLocked(activeCandidate.pipelineStage) ? (
                    <Button disabled className="w-full bg-void text-muted-foreground border border-rim/55 text-xs font-bold gap-1.5 cursor-not-allowed">
                      <span>Complete Technical Labs First</span>
                    </Button>
                  ) : (
                    <Link href={`/interview/candidate/interview/${activeCandidate.id}`}>
                      <Button className="w-full bg-pulsar text-abyss hover:bg-pulsar-bright text-xs font-extrabold flex items-center justify-center gap-1.5">
                        <span>Enter Voice Chamber</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>

              {/* Task 3: Review AI Feedback Card */}
              {isInterviewCompleted(activeCandidate.pipelineStage) && (
                <Card className="bg-card/40 border-border/80 text-left flex flex-col justify-between group md:col-span-2">
                  <CardContent className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-quasar" />
                        <h4 className="font-bold text-sm text-foreground">AI Interview Feedback Report</h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-sans leading-relaxed mt-1 max-w-xl">
                        Review detailed ratings across communication, problem solving, and logical depth along with personalized growth suggestions.
                      </p>
                    </div>
                    <Link href={`/interview/candidate/interview/${activeCandidate.id}/feedback`} className="w-full sm:w-auto shrink-0">
                      <Button className="w-full sm:w-auto bg-[#070715] border border-rim hover:border-quasar/40 hover:bg-quasar/5 text-xs font-bold flex items-center justify-center gap-1.5 px-6">
                        <span>View Evaluation Cards</span>
                        <ArrowRight className="h-4 w-4 text-quasar" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Task 4: Live Calendar Event Link */}
              {activeCandidate.jitsiLink && (
                <Card className="bg-card/40 border-border/80 text-left flex flex-col justify-between group md:col-span-2 border-flare/30">
                  <CardContent className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-flare animate-pulse" />
                        <h4 className="font-bold text-sm text-foreground">Scheduled Video Interview Confirmed</h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-sans leading-relaxed mt-1 max-w-xl">
                        You have been scheduled for a live follow-up meeting with HR. Join the video link at: <b>{activeCandidate.scheduledTime}</b>.
                      </p>
                    </div>
                    <a href={activeCandidate.jitsiLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto shrink-0">
                      <Button className="w-full sm:w-auto bg-flare hover:bg-flare/80 text-foreground text-xs font-bold flex items-center justify-center gap-1.5 px-6">
                        <span>Join Jitsi Call</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// Helpers for pipeline state visibility rules
function isAssessmentLocked(stage: string): boolean {
  return stage === "UPLOADED" || stage === "RESUME_PROCESSED" || stage === "EVALUATING" || stage === "EVALUATED" || stage === "RANKED";
}

function isAssessmentCompleted(stage: string): boolean {
  return stage === "TEST_COMPLETED" || stage === "SHORTLISTED" || stage === "INTERVIEW_SCHEDULED";
}

function isInterviewLocked(stage: string): boolean {
  return isAssessmentLocked(stage) || stage === "TEST_SENT";
}

function isInterviewCompleted(stage: string): boolean {
  return stage === "SHORTLISTED" || stage === "INTERVIEW_SCHEDULED";
}
