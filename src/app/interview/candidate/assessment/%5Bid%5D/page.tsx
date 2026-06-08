"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowLeft, 
  Database, 
  Code2, 
  CheckCircle2, 
  Play, 
  Terminal, 
  BookOpen,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AssessmentLabPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const { candidates, jobs, uploadTestResults, initialize, isHydrated } = useInterviewStore();

  const [activeTab, setActiveTab] = useState<"mcq" | "sql" | "dsa">("mcq");
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  
  // MCQ state
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  
  // SQL state
  const [sqlCode, setSqlCode] = useState("SELECT name, college, cgpa \nFROM candidates \nWHERE cgpa >= 9.0 \nORDER BY cgpa DESC;");
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [sqlRunning, setSqlRunning] = useState(false);

  // DSA state
  const [dsaCode, setDsaCode] = useState(
`function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < k) return null;
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = k; i < arr.length; i++) {
    tempSum = tempSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}`
  );
  const [dsaRunning, setDsaRunning] = useState(false);
  const [dsaLogs, setDsaLogs] = useState<string[]>([]);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const candidate = candidates.find(c => c.id === candidateId);
  const job = candidate ? jobs.find(j => j.id === candidate.jobId) : null;

  if (!isHydrated || !candidate || !job) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse font-bold">Initiating secure test terminal...</span>
        </div>
      </DashboardLayout>
    );
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleMcqSelect = (qId: string, optIdx: number) => {
    setMcqAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const executeSql = () => {
    setSqlRunning(true);
    setTimeout(() => {
      // Return custom simulated database rows
      setSqlResult([
        { name: "Devika Nair", college: "IIT Madras", cgpa: 9.4 },
        { name: "Sneha Patel", college: "IISc Bangalore", cgpa: 9.6 },
        { name: "Priya Sharma", college: "DTU Delhi", cgpa: 9.1 }
      ]);
      setSqlRunning(false);
    }, 800);
  };

  const executeDsa = () => {
    setDsaRunning(true);
    setDsaLogs(["Spinning container sandbox...", "Evaluating array constraints..."]);
    
    setTimeout(() => {
      try {
        // Run code mockup
        setDsaLogs(prev => [
          ...prev,
          "Executing test case 1: arr = [2, 3, 5, 2, 9, 7, 1], k = 3",
          "Success: expected 18, returned 18",
          "Executing test case 2: arr = [1, 2, 3], k = 4",
          "Success: expected null, returned null",
          "Analyzing time complexity: O(N) sliding window check passed."
        ]);
        setTestsPassed(true);
      } catch (err: any) {
        setDsaLogs(prev => [...prev, `Compilation Error: ${err.message}`]);
        setTestsPassed(false);
      } finally {
        setDsaRunning(false);
      }
    }, 1000);
  };

  const handleFinishAssessment = () => {
    // Generate results: MCQs count + DSA status
    const mcqCorrect = Object.keys(mcqAnswers).length * 28;
    const codingScore = testsPassed ? 92 : 40;
    const finalLaScore = Math.min(mcqCorrect + 10, 100);

    // Call store action using fuzzy name matcher
    uploadTestResults(job.id, [
      { name: candidate.name, testLa: finalLaScore, testCode: codingScore }
    ]);

    router.push("/interview/candidate/dashboard");
  };

  const mcqs = [
    {
      id: "q1",
      question: "Which of the following describes standard behavior of memory allocation in GPU KV-caching?",
      options: [
        "Allocating memory sequentially leads to high memory fragmentation and poor throughput.",
        "KV-caches must be contiguous across GPU blocks to compile attention loops.",
        "CUDA manages fragmentation natively through dynamic thread mapping.",
        "Garbage collectors clear attention caches automatically during token completion."
      ],
      correct: 0
    },
    {
      id: "q2",
      question: "What is the primary benefit of exponential decay models when calculating repository impact scores?",
      options: [
        "It eliminates all older commits, maintaining a small compute boundary.",
        "It weights recent updates higher, reflecting current technical competence without ignoring past projects.",
        "It normalizes repository stars by dividing the commit count linearly.",
        "It guarantees that forks are scored higher than stars across all days."
      ],
      correct: 1
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left max-w-5xl mx-auto font-mono text-xs">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-void border border-rim p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push("/interview/candidate/dashboard")}
              className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <span className="text-muted-foreground">|</span>
            <span className="font-bold text-foreground text-sm font-sans">{job.title} Testing Room</span>
          </div>

          <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between">
            <div className="bg-flare/10 border border-flare/30 text-flare px-3.5 py-1.5 rounded-lg font-bold text-sm">
              Time Left: {formatTime(timeLeft)}
            </div>
            <Button 
              onClick={handleFinishAssessment}
              className="bg-pulsar hover:bg-pulsar-bright text-abyss font-extrabold h-9 text-xs"
            >
              Submit Assessment
            </Button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-rim gap-2 font-sans">
          {[
            { id: "mcq", label: "Logical MCQs", icon: BookOpen },
            { id: "sql", label: "PostgreSQL Executor", icon: Database },
            { id: "dsa", label: "DSA Coding compiler", icon: Code2 }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold cursor-pointer text-xs transition-colors ${
                  active 
                    ? "border-nova-bright text-nova-bright bg-nova/5" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[50vh]">
          {/* MCQ Tab */}
          {activeTab === "mcq" && (
            <div className="space-y-6">
              {mcqs.map((q, idx) => (
                <Card key={q.id} className="bg-card/40 border-border/80">
                  <CardHeader>
                    <div className="flex items-center gap-1.5 text-nova-bright font-bold mb-1">
                      <span>QUESTION {idx + 1} OF {mcqs.length}</span>
                    </div>
                    <CardTitle className="text-sm font-sans text-foreground leading-relaxed">{q.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5 font-sans">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = mcqAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleMcqSelect(q.id, optIdx)}
                          className={`w-full p-4 border rounded-xl text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected 
                              ? "bg-nova/10 border-nova-bright text-foreground shadow-[0_0_15px_rgba(110,84,247,0.1)]" 
                              : "bg-void border-rim text-muted-foreground hover:border-rim-bright hover:text-foreground"
                          }`}
                        >
                          <span className="font-mono bg-[#090915] border border-rim px-2 py-0.5 rounded text-[10px] text-muted-foreground uppercase shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* SQL Tab */}
          {activeTab === "sql" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
              <Card className="bg-card/40 border-border/80 text-left flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-sm">Database Task Details</CardTitle>
                  <CardDescription className="text-[11px] font-sans leading-relaxed">
                    Write a PostgreSQL query to retrieve all candidate rows from colleges where CGPA is 9.0 or greater. Group columns chronologically and sort results in descending order.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <span className="text-[10px] text-muted-foreground uppercase">Script Editor Console:</span>
                  <textarea 
                    rows={10}
                    value={sqlCode}
                    onChange={(e) => setSqlCode(e.target.value)}
                    className="w-full bg-void border border-rim rounded-lg p-3 font-mono text-xs text-foreground focus:outline-none focus:border-pulsar flex-1 resize-none"
                  />
                </CardContent>
                <CardFooter className="border-t border-border/40 pt-4 flex justify-between bg-void/10">
                  <span className="text-[10px] text-muted-foreground">Sandbox driver active.</span>
                  <Button 
                    onClick={executeSql}
                    disabled={sqlRunning}
                    className="bg-pulsar text-abyss hover:bg-pulsar/80 font-extrabold text-xs h-9 flex items-center gap-1.5"
                  >
                    <Play className="h-4 w-4" />
                    <span>{sqlRunning ? "Executing..." : "Execute Query"}</span>
                  </Button>
                </CardFooter>
              </Card>

              {/* SQL Output terminal */}
              <Card className="bg-[#050511] border-rim text-left flex flex-col">
                <CardHeader className="border-b border-rim/60 py-3 bg-void/50">
                  <div className="flex items-center gap-2 text-pulsar">
                    <Terminal className="h-4 w-4" />
                    <CardTitle className="text-xs">SQL Output Console</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 relative min-h-[300px]">
                  {sqlResult ? (
                    <table className="w-full text-left font-mono text-[10px]">
                      <thead>
                        <tr className="bg-[#08081a] border-b border-rim text-muted-foreground">
                          <th className="p-3">name</th>
                          <th className="p-3">college</th>
                          <th className="p-3 text-right">cgpa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rim/45">
                        {sqlResult.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.01]">
                            <td className="p-3 text-foreground font-bold">{row.name}</td>
                            <td className="p-3 text-muted-foreground">{row.college}</td>
                            <td className="p-3 text-right text-foreground">{row.cgpa}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                      <Database className="h-8 w-8 opacity-30 mb-2" />
                      <span>Console output is empty. Run query to inspect mock database execution.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* DSA Tab */}
          {activeTab === "dsa" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
              <Card className="bg-card/40 border-border/80 text-left flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-sm">Subarray Sliding Window Algorithm</CardTitle>
                  <CardDescription className="text-[11px] font-sans leading-relaxed">
                    Given an array of integers and a size K, find the maximum sum of any contiguous subarray of size K. Resolve in O(N) time complexity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <span className="text-[10px] text-muted-foreground uppercase">JavaScript compiler editor:</span>
                  <textarea 
                    rows={12}
                    value={dsaCode}
                    onChange={(e) => setDsaCode(e.target.value)}
                    className="w-full bg-void border border-rim rounded-lg p-3 font-mono text-xs text-foreground focus:outline-none focus:border-nova-bright flex-1 resize-none"
                  />
                </CardContent>
                <CardFooter className="border-t border-border/40 pt-4 flex justify-between bg-void/10">
                  <span className="text-[10px] text-muted-foreground">Syntax compiler ready.</span>
                  <Button 
                    onClick={executeDsa}
                    disabled={dsaRunning}
                    className="bg-nova hover:bg-nova-bright font-bold text-xs h-9 flex items-center gap-1.5"
                  >
                    <Play className="h-4 w-4" />
                    <span>{dsaRunning ? "Running tests..." : "Run Test Scripts"}</span>
                  </Button>
                </CardFooter>
              </Card>

              {/* DSA Compiler Logs output terminal */}
              <Card className="bg-[#050511] border-rim text-left flex flex-col">
                <CardHeader className="border-b border-rim/60 py-3 bg-void/50">
                  <div className="flex items-center gap-2 text-nova-bright">
                    <Terminal className="h-4 w-4" />
                    <CardTitle className="text-xs">Compiler Logs Output</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 space-y-1.5 text-[11px] leading-relaxed max-h-[350px] overflow-y-auto">
                  {dsaLogs.length > 0 ? (
                    dsaLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith("Success") ? "text-pulsar font-bold" : "text-muted-foreground"}>
                        <span>&gt; {log}</span>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-16 text-center">
                      <Terminal className="h-8 w-8 opacity-30 mb-2" />
                      <span>Console outputs will print logs and test results here.</span>
                    </div>
                  )}

                  {testsPassed && (
                    <div className="p-3 bg-pulsar/10 border border-pulsar/30 text-pulsar rounded-lg flex items-center gap-2 mt-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <span className="font-bold">ALL MOCK UNIT TESTS PASSED SUCCESSFULLY! Ready to submit.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
