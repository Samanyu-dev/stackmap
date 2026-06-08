"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  BookMarked,
  HelpCircle,
  ThumbsUp
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CandidateFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const { candidates, jobs, mockFeedback, initialize, isHydrated } = useInterviewStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const candidate = candidates.find(c => c.id === candidateId);
  const job = candidate ? jobs.find(j => j.id === candidate.jobId) : null;
  const feedback = mockFeedback[candidateId];

  if (!isHydrated || !candidate || !job) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse font-bold">Lading AI feedback report...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Set default fallback feedback report if candidate just finished
  const activeFeedback = feedback || {
    candidateId,
    totalScore: 88,
    categories: {
      communication: 90,
      technical: 85,
      problemSolving: 92,
      culturalFit: 84,
      confidence: 88
    },
    justifications: {
      communication: "Expresses complex design choices fluidly and structures architectural steps chronologically.",
      technical: "Detailed explanation of cache block mechanics, although there is room to clarify locks configurations.",
      problemSolving: "Highly structured approach, splitting complex data graphs into manageable pipelines.",
      culturalFit: "Shows mission-oriented focus and is eager to explore challenging distributed systems issues.",
      confidence: "Speaks with precise, clear terminology under pressure."
    },
    strengths: ["Strong pacing in describing memory structures", "Direct answers, avoiding redundant jargon", "Clear knowledge of Rust/Go socket frameworks"],
    improvements: ["Could clarify how multiple GPUs synchronize memory allocations", "Consider illustrating failovers using standard CAP references"],
    suggestions: ["Revise GPU block scheduling details before the live session", "Look up Jitsi integration practices for calendar tasks"]
  };

  const chartData = [
    { subject: "Communication", A: activeFeedback.categories.communication },
    { subject: "Technical Depth", A: activeFeedback.categories.technical },
    { subject: "Problem Solving", A: activeFeedback.categories.problemSolving },
    { subject: "Cultural Fit", A: activeFeedback.categories.culturalFit },
    { subject: "Confidence", A: activeFeedback.categories.confidence }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto text-left">
        {/* Navigation back */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/interview/candidate/dashboard")}
            className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
        </div>

        {/* Feedback Header Banner */}
        <Card className="bg-card/40 border-border/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-quasar/10 to-transparent pointer-events-none" />
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="text-[10px] font-mono border-border/60 uppercase text-muted-foreground">
                    {job.title} MOCK ROUND
                  </Badge>
                  <Badge className="bg-quasar/10 border border-quasar/30 text-quasar text-[9px] uppercase font-bold tracking-wider">
                    EVALUATION CARD
                  </Badge>
                </div>
                <h1 className="text-3xl font-extrabold font-display text-foreground">AI Round Synthesis</h1>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Compiled feedback scorecard for candidate {candidate.name}.
                </p>
              </div>

              <div className="bg-[#090915] border border-rim rounded-xl px-6 py-3 font-mono text-center flex flex-col items-center shrink-0">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider block mb-0.5 font-bold">Total Grade</span>
                <div className="text-3xl font-black text-gradient">{activeFeedback.totalScore}%</div>
                <span className="text-[10px] text-muted-foreground font-bold mt-1">Status: Passed Round</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Radar Chart */}
          <Card className="bg-card/40 border-border/80">
            <CardHeader>
              <CardTitle className="text-lg">Interpersonal & Technical Matrix</CardTitle>
              <CardDescription className="text-xs font-sans">Scores across five crucial candidate criteria.</CardDescription>
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
                    name="Feedback" 
                    dataKey="A" 
                    stroke="#FF3D9A" 
                    fill="#FF3D9A" 
                    fillOpacity={0.25} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Justifications list */}
          <Card className="bg-card/40 border-border/80 text-left">
            <CardHeader>
              <CardTitle className="text-lg">Evaluation Category Explanations</CardTitle>
              <CardDescription className="text-xs">Individual category justifications compiled during voice testing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "communication", label: "Communication", score: activeFeedback.categories.communication, color: "text-nova-bright" },
                { key: "technical", label: "Technical depth", score: activeFeedback.categories.technical, color: "text-pulsar" },
                { key: "problemSolving", label: "Problem solving", score: activeFeedback.categories.problemSolving, color: "text-sol" },
                { key: "confidence", label: "Confidence", score: activeFeedback.categories.confidence, color: "text-quasar" }
              ].map(({ key, label, score, color }) => (
                <div key={key} className="space-y-1.5 p-3 bg-void/50 rounded-lg border border-rim/35">
                  <div className="flex justify-between items-center">
                    <span className={`font-bold uppercase tracking-wider text-[10px] ${color}`}>{label}</span>
                    <span className="font-bold text-foreground">{score}%</span>
                  </div>
                  <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
                    {activeFeedback.justifications[key as keyof typeof activeFeedback.justifications]}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations and Strengths cards */}
          <Card className="bg-card/40 border-border/80 text-left lg:col-span-2">
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths list */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-1.5 text-pulsar">
                  <ThumbsUp className="h-4.5 w-4.5" />
                  <span>Demonstrated Strengths</span>
                </h4>
                <ul className="space-y-2 text-xs font-sans text-muted-foreground list-disc list-inside">
                  {activeFeedback.strengths.map((s, idx) => (
                    <li key={idx} className="leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements & recommendations list */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-1.5 text-flare">
                  <TrendingUp className="h-4.5 w-4.5" />
                  <span>Strategic Improvements</span>
                </h4>
                <ul className="space-y-2 text-xs font-sans text-muted-foreground list-disc list-inside">
                  {activeFeedback.improvements.map((imp, idx) => (
                    <li key={idx} className="leading-relaxed">{imp}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/40 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-void/15 text-[11px]">
              <div className="flex items-center gap-2 text-muted-foreground font-sans">
                <BookMarked className="h-4 w-4 text-nova" />
                <span>Recommended Prep: practice distributed systems and multi-model fallbacks before recruiter round.</span>
              </div>
              <Link href="/interview/candidate/dashboard">
                <Button className="bg-nova hover:bg-nova-bright font-bold text-xs h-9">
                  Return to Dashboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
