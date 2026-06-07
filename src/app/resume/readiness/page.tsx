"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, FileText, CheckCircle2, RefreshCw, Sparkles, BookOpen, ExternalLink } from "lucide-react";
import { AnalysisResult } from "@/lib/resume-analyzer";

export default function ResumeReadinessPage() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jdText.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/resume/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          role,
          resumeText,
          jobDescription: jdText
        })
      });
      const data = await res.json();
      setResult(data);
      if (data && typeof window !== "undefined" && data.overallScore !== undefined) {
        localStorage.setItem("stackmap_resume_score", data.overallScore.toString());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDemoTexts = () => {
    setCompany("Google");
    setRole("Associate Software Engineer");
    setJdText(`We are looking for an Associate Software Engineer who loves React, Next.js, and TypeScript. You should be familiar with relational databases like PostgreSQL, version control (Git), and container systems like Docker. Experience optimizing web performance is a huge plus!`);
    setResumeText(`ALEX CODER
Email: alex@stackmap.dev | GitHub: github.com/alex
Skills: HTML, CSS, JavaScript, React.
Projects: Built a responsive Todo List in HTML/CSS and JavaScript.
Education: BS in Computer Science.`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border/40 pb-5 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">JD Resume Readiness Analyzer</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Compare your resume text directly against a job description. Audit keywords, format standardizations, and missing skills.
            </p>
          </div>
          <Button variant="outline" onClick={loadDemoTexts} className="h-10 text-xs font-semibold">
            Load Demo Match
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/45 border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Analyzer Input Console</span>
                </CardTitle>
                <CardDescription className="text-xs">Paste resume copy and target specifications.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Target Company</label>
                      <Input placeholder="e.g. Stripe" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Target Role</label>
                      <Input placeholder="e.g. Frontend Engineer" value={role} onChange={(e) => setRole(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Job Description Text *</label>
                    <textarea
                      className="w-full h-32 p-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground font-light"
                      placeholder="Paste the target job description text here..."
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">My Resume Text *</label>
                    <textarea
                      className="w-full h-32 p-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground font-light"
                      placeholder="Paste the text copy of your resume here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full font-bold h-11 flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Scanning resume...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Analyze Match Readiness</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Inspection Panel */}
          <div className="lg:col-span-3">
            {result ? (
              <div className="space-y-6 animate-scale-in">
                {/* Scoring overview block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Score circle card */}
                  <Card className="bg-card border-border flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-4">Overall Score</span>
                    <div className="relative h-28 w-28 flex items-center justify-center rounded-full border-4 border-secondary">
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow pointer-events-none" />
                      <span className="text-3xl font-extrabold text-foreground">{result.overallScore}%</span>
                    </div>
                    <div className="mt-4 text-xs font-semibold text-green-400 flex items-center space-x-1 justify-center">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>+{result.estimatedScoreImprovement}% potential fix gain</span>
                    </div>
                  </Card>

                  {/* Rating parameters */}
                  <Card className="bg-card border-border sm:col-span-2 p-6 space-y-3.5">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Scoring Breakdown</span>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>Required Skills Match</span>
                          <span>{result.sectionScores.skills}%</span>
                        </div>
                        <Progress value={result.sectionScores.skills} />
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>Context Keywords Match</span>
                          <span>{result.sectionScores.keywords}%</span>
                        </div>
                        <Progress value={result.sectionScores.keywords} />
                      </div>
                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>Projects & Experience Relevance</span>
                          <span>{result.sectionScores.projects}%</span>
                        </div>
                        <Progress value={result.sectionScores.projects} />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Missing elements tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Missing Skills */}
                  <Card className="bg-card border-border p-5 space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">Missing Core Skills</h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.missingSkills.length > 0 ? (
                        result.missingSkills.map((s: string) => (
                          <Badge key={s} variant="destructive" className="text-[10px] uppercase font-bold">{s}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">All required skills present!</span>
                      )}
                    </div>
                  </Card>

                  {/* Missing Keywords */}
                  <Card className="bg-card border-border p-5 space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400">Missing ATS Keywords</h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.missingKeywords.length > 0 ? (
                        result.missingKeywords.map((k: string) => (
                          <Badge key={k} variant="warning" className="text-[10px] uppercase font-bold">{k}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">All core keywords present!</span>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Audit checklist & study roadmaps */}
                <Card className="bg-card border-border p-5 space-y-4 text-left">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">ATS Format Audit Checklist</h4>
                  <div className="space-y-2.5">
                    {result.improvementChecklist.map((c: any) => (
                      <div key={c.id} className="flex items-start space-x-2.5 text-xs">
                        <CheckCircle2 className={`h-4.5 w-4.5 flex-shrink-0 mt-0.5 ${c.completed ? "text-green-500" : "text-muted-foreground/30"}`} />
                        <span className={c.completed ? "text-foreground" : "text-muted-foreground line-through font-light"}>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Actionable recommendations */}
                <Card className="bg-card border border-primary/20 bg-primary/[0.01] p-5 space-y-4 text-left">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center">
                    <BookOpen className="h-4.5 w-4.5 mr-2 text-primary" /> Recommended Study Steps
                  </h4>
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <span className="font-bold text-foreground">Syllabus Pathways to Enroll:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {result.suggestedRoadmaps.map((r: string) => (
                          <Badge key={r} variant="secondary">{r}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-foreground">Suggested Portfolios to Build:</span>
                      <ul className="list-disc pl-4 mt-1.5 space-y-1 font-light text-muted-foreground">
                        {result.suggestedProjects.map((p: string, idx: number) => {
                          const linkMatch = p.match(/\(Link: (.*?)\)/);
                          const cleanName = p.replace(/\s*\(Link:.*?\)/, "");
                          return (
                            <li key={idx}>
                              {linkMatch ? (
                                <a href={linkMatch[1]} className="text-primary hover:underline font-medium flex items-center inline-flex">
                                  {cleanName} <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                              ) : (
                                <span>{p}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground bg-card/20 h-full flex flex-col justify-center items-center">
                <AlertCircle className="h-10 w-10 opacity-30 mb-3" />
                <h4 className="font-bold text-base">Awaiting analysis parameters</h4>
                <p className="text-xs mt-1 max-w-sm">Provide your target role, resume, and job description texts to begin checking scores.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
