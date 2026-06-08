"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  GitBranch, 
  BookMarked, 
  Star, 
  GitFork, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Award,
  Video,
  AlertCircle
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CandidateDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const { 
    jobs, 
    candidates, 
    evaluations, 
    scores, 
    mockSessions,
    scheduleInterview,
    initialize, 
    isHydrated 
  } = useInterviewStore();

  const [interviewTime, setInterviewTime] = useState("2026-06-15T14:30");
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const candidate = candidates.find(c => c.id === candidateId);
  const job = candidate ? jobs.find(j => j.id === candidate.jobId) : null;
  const evaluation = evaluations[candidateId];
  const score = scores[candidateId];
  const session = mockSessions[candidateId];

  if (!isHydrated || !candidate || !job) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse font-bold">Lading candidate resume vector profile...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Set up chart data from percentiles in score breakdown
  const chartData = score ? [
    { subject: "JD Match", A: score.breakdown.jdMatch.normalized },
    { subject: "GitHub", A: score.breakdown.github.normalized },
    { subject: "Coding", A: score.breakdown.coding.normalized },
    { subject: "Logical", A: score.breakdown.logical.normalized },
    { subject: "Projects", A: score.breakdown.project.normalized },
    { subject: "Research", A: score.breakdown.research.normalized },
    { subject: "CGPA", A: score.breakdown.cgpa.normalized }
  ] : [
    { subject: "JD Match", A: 50 },
    { subject: "GitHub", A: 50 },
    { subject: "Coding", A: 50 },
    { subject: "Logical", A: 50 },
    { subject: "Projects", A: 50 },
    { subject: "Research", A: 50 },
    { subject: "CGPA", A: 50 }
  ];

  const handleSchedule = () => {
    setIsScheduling(true);
    setTimeout(() => {
      const date = new Date(interviewTime);
      const options: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'short' };
      const timeStr = date.toLocaleString('en-US', options);
      scheduleInterview(candidateId, timeStr);
      setIsScheduling(false);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Back navigation */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push(`/interview/recruiter/jobs/${job.id}`)}
            className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Job Pipeline</span>
          </Button>
        </div>

        {/* Candidate Summary Banner */}
        <Card className="bg-card/40 border-border/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-nova/10 to-transparent pointer-events-none" />
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="text-[10px] font-mono border-border/60 uppercase text-muted-foreground">
                    {job.title}
                  </Badge>
                  <Badge className="bg-nova/10 border border-nova/30 text-nova-bright text-[9px] uppercase font-bold tracking-wider">
                    {candidate.pipelineStage}
                  </Badge>
                </div>
                <h1 className="text-3xl font-extrabold font-display text-foreground">{candidate.name}</h1>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {candidate.email} • {candidate.college}
                </p>
              </div>

              {/* Score highlights */}
              {score && (
                <div className="bg-[#090915] border border-rim rounded-xl px-5 py-3 font-mono text-center flex flex-col items-center shrink-0">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider block mb-0.5">Weighted Rank</span>
                  <div className="text-2xl font-black text-gradient">#{score.rank}</div>
                  <span className="text-[10px] text-muted-foreground font-bold mt-1">Score: {score.compositeScore}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Jitsi video interview scheduler */}
        <Card className="bg-card/40 border-border/80">
          <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Video className="h-4.5 w-4.5 text-flare" />
                <span>Interview Dispatch Panel</span>
              </h4>
              <p className="text-xs text-muted-foreground font-sans max-w-xl">
                Schedule a virtual round. This will generate a no-auth secure Jitsi Meet link and provision a calendar reference key.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {candidate.jitsiLink ? (
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs w-full sm:w-auto">
                  <div className="bg-[#050511] border border-rim px-3 py-2 rounded-lg leading-relaxed text-left flex-1 sm:flex-none">
                    <span className="text-[9px] text-muted-foreground uppercase block">Scheduled Time</span>
                    <span className="font-bold text-foreground">{candidate.scheduledTime}</span>
                  </div>
                  <a href={candidate.jitsiLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                    <Button className="bg-flare hover:bg-flare/80 font-bold flex items-center gap-1.5 h-11 text-xs w-full">
                      <span>Join Jitsi Video Call</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input 
                    type="datetime-local" 
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="bg-abyss text-foreground text-xs font-mono border border-rim rounded-lg h-11 px-3 focus:outline-none focus:border-flare shrink-0"
                  />
                  <Button 
                    disabled={isScheduling}
                    onClick={handleSchedule}
                    className="bg-nova hover:bg-nova-bright font-bold flex items-center gap-1.5 h-11 text-xs whitespace-nowrap"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{isScheduling ? "Generating..." : "Schedule Call"}</span>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: AI details & Radar */}
          <div className="space-y-6">
            {/* Skills Radar */}
            <Card className="bg-card/40 border-border/80">
              <CardHeader>
                <CardTitle className="text-lg">Capabilities Vector Space</CardTitle>
                <CardDescription className="text-xs">Percentiles relative to candidates in this job pool.</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                    <PolarGrid stroke="rgba(238, 238, 255, 0.08)" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: 'rgba(238,238,255,0.6)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} 
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fill: 'rgba(238,238,255,0.3)', fontSize: 8 }} 
                      stroke="rgba(238, 238, 255, 0.05)"
                    />
                    <Radar 
                      name={candidate.name} 
                      dataKey="A" 
                      stroke="#6E54F7" 
                      fill="#6E54F7" 
                      fillOpacity={0.25} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Qualitative explanations */}
            {evaluation ? (
              <Card className="bg-card/40 border-border/80">
                <CardHeader>
                  <CardTitle className="text-lg">Gemini Qualitative Summary</CardTitle>
                  <CardDescription className="text-xs font-mono">Structured assessment justifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 text-sm leading-relaxed">
                  <div className="space-y-1 bg-void/50 p-3 rounded-lg border border-rim/35">
                    <span className="text-[10px] font-mono text-nova-bright font-bold uppercase block">Technical Depth ({evaluation.technicalDepth}%)</span>
                    <p className="text-xs text-muted-foreground">{evaluation.technicalDepthJustification}</p>
                  </div>

                  <div className="space-y-1 bg-void/50 p-3 rounded-lg border border-rim/35">
                    <span className="text-[10px] font-mono text-pulsar font-bold uppercase block">Project Complexity ({evaluation.projectComplexity}%)</span>
                    <p className="text-xs text-muted-foreground">{evaluation.projectComplexityJustification}</p>
                  </div>

                  <div className="space-y-1 bg-void/50 p-3 rounded-lg border border-rim/35">
                    <span className="text-[10px] font-mono text-sol font-bold uppercase block">JD Alignment ({evaluation.jdAlignment}%)</span>
                    <p className="text-xs text-muted-foreground">{evaluation.jdAlignmentJustification}</p>
                  </div>

                  {evaluation.researchQuality > 10 && (
                    <div className="space-y-1 bg-void/50 p-3 rounded-lg border border-rim/35">
                      <span className="text-[10px] font-mono text-quasar font-bold uppercase block">Research Quality ({evaluation.researchQuality}%)</span>
                      <p className="text-xs text-muted-foreground">{evaluation.researchQualityJustification}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border/40 space-y-3 font-sans">
                    <h5 className="font-bold text-xs font-mono text-muted-foreground uppercase tracking-wider">Overall Assessment</h5>
                    <p className="text-xs text-muted-foreground">{evaluation.overallAssessment}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div className="space-y-1">
                        <span className="font-bold text-pulsar font-mono text-[10px] uppercase block">Candidate Strengths</span>
                        <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-0.5">
                          {evaluation.strengths.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-flare font-mono text-[10px] uppercase block">Areas of Concern</span>
                        <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-0.5">
                          {evaluation.concerns.map((c, idx) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 bg-void/40 border border-dashed border-rim rounded-2xl text-center text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto opacity-30 mb-2" />
                <h4 className="font-bold text-xs font-mono">No AI qualitative evaluation found.</h4>
                <p className="text-[10px] mt-1">Trigger bulk screening or single-rerun options to evaluate vectors.</p>
              </div>
            )}
          </div>

          {/* Right Column: GitHub & Live Interview transcripts */}
          <div className="space-y-6">
            {/* GitHub evaluation */}
            {evaluation && evaluation.githubRepos.length > 0 ? (
              <Card className="bg-card/40 border-border/80">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">GitHub Repository Impact</CardTitle>
                    <CardDescription className="text-xs">Adjusted using exponential decay: recent activity is weighted higher.</CardDescription>
                  </div>
                  <GitBranch className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-3 font-mono">
                  {evaluation.githubRepos.map((repo, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-[#070712] border border-rim rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-left"
                    >
                      <div className="space-y-1 flex-1">
                        <span className="font-bold text-foreground text-xs hover:text-nova-bright transition-colors cursor-default block">
                          {repo.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2.5 text-[9px] text-muted-foreground leading-none">
                          <span className="bg-border/60 text-foreground px-1.5 py-0.5 rounded">{repo.primaryLanguage}</span>
                          <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-sol text-sol" /> {repo.stars}</span>
                          <span className="flex items-center gap-0.5"><GitFork className="h-3 w-3" /> {repo.forks}</span>
                          <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {repo.daysSinceUpdate}d ago</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge className="bg-nova/5 border border-nova/20 text-nova-bright text-[9px] font-black font-mono">
                          Impact: {repo.impactScore.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 bg-void/40 border border-dashed border-rim rounded-2xl text-center text-muted-foreground">
                <GitBranch className="h-8 w-8 mx-auto opacity-30 mb-2" />
                <h4 className="font-bold text-xs font-mono">No GitHub statistics loaded.</h4>
              </div>
            )}

            {/* AI voice interview transcripts */}
            {session && session.transcript.length > 0 ? (
              <Card className="bg-card/40 border-border/80">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Voice AI Interview Transcript</CardTitle>
                    <CardDescription className="text-xs">Recorded during candidate's verbal sandbox simulation.</CardDescription>
                  </div>
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="max-h-80 overflow-y-auto space-y-4 pr-1 text-left">
                  {session.transcript.map((t, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg border text-xs space-y-1 font-sans ${
                        t.role === "ai" 
                          ? "bg-nova/5 border-nova/15 text-foreground self-start ml-0 mr-8" 
                          : "bg-void border-rim text-muted-foreground self-end ml-8 mr-0"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground font-bold">
                        <span>{t.role === "ai" ? "STAR MAP SYSTEM" : "CANDIDATE UPLINK"}</span>
                        <span>{t.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <div className="p-8 bg-void/40 border border-dashed border-rim rounded-2xl text-center text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto opacity-30 mb-2" />
                <h4 className="font-bold text-xs font-mono">No active voice transcripts recorded.</h4>
                <p className="text-[10px] mt-1">Transcript will register automatically when candidate completes their voice interview round.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
