"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  Play, 
  Send, 
  Plus, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  CheckSquare,
  Search,
  Upload,
  UserPlus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore, Candidate, PipelineStage } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const { 
    jobs, 
    candidates, 
    evaluations, 
    scores, 
    triggerEvaluation, 
    triggerBulkEvaluation, 
    computeRankings, 
    sendTestLinks, 
    uploadTestResults,
    initialize, 
    isHydrated 
  } = useInterviewStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [topNValue, setTopNValue] = useState("3");
  
  // Custom CSV data input state
  const [csvText, setCsvText] = useState("");
  const [showCsvBox, setShowCsvBox] = useState(false);
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);
  const [csvStatusMsg, setCsvStatusMsg] = useState("");

  useEffect(() => {
    initialize();
  }, [initialize]);

  const job = jobs.find(j => j.id === jobId);

  // Auto ranking on load or candidate state changes
  useEffect(() => {
    if (isHydrated && job) {
      computeRankings(jobId);
    }
  }, [isHydrated, jobId, candidates.length, Object.keys(evaluations).length]);

  if (!isHydrated || !job) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse">Loading job pipelines...</span>
        </div>
      </DashboardLayout>
    );
  }

  const jobCandidates = candidates.filter(c => c.jobId === jobId);

  // Filter candidates by search query
  const filteredCandidates = jobCandidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorted candidates based on composite scores in state
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const scoreA = scores[a.id]?.compositeScore ?? 0;
    const scoreB = scores[b.id]?.compositeScore ?? 0;
    return scoreB - scoreA;
  });

  // Toggle candidate selection
  const toggleSelectCandidate = (id: string) => {
    setSelectedCandidates(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Select all or deselect all
  const toggleAllSelection = () => {
    if (selectedCandidates.length === sortedCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(sortedCandidates.map(c => c.id));
    }
  };

  // Apply Top-N Selection
  const applyTopN = () => {
    const n = parseInt(topNValue) || 3;
    const topCandidates = sortedCandidates.slice(0, n).map(c => c.id);
    setSelectedCandidates(topCandidates);
  };

  // Bulk evaluate
  const handleBulkEvaluate = async () => {
    await triggerBulkEvaluation(jobId);
  };

  // Bulk send tests
  const handleBulkSendTests = async () => {
    if (selectedCandidates.length === 0) return;
    await sendTestLinks(selectedCandidates);
  };

  // Parse CSV mock upload
  const handleCsvSubmit = () => {
    if (!csvText.trim()) return;
    setIsProcessingCsv(true);
    setCsvStatusMsg("Initiating CSV fuzzy name parser...");

    setTimeout(() => {
      try {
        // format: Name, LogicalScore, CodingScore
        const lines = csvText.split("\n");
        const parsedResults: { name: string; testLa: number; testCode: number }[] = [];

        lines.forEach(line => {
          const parts = line.split(",");
          if (parts.length >= 3) {
            const name = parts[0].trim();
            const testLa = parseFloat(parts[1].trim());
            const testCode = parseFloat(parts[2].trim());
            if (name && !isNaN(testLa) && !isNaN(testCode)) {
              parsedResults.push({ name, testLa, testCode });
            }
          }
        });

        if (parsedResults.length === 0) {
          throw new Error("Could not parse any rows. Ensure format is: Name, Logical, Coding");
        }

        uploadTestResults(jobId, parsedResults);
        setCsvStatusMsg(`Successfully linked ${parsedResults.length} test scores using multi-tier name alignment.`);
        setCsvText("");
        setTimeout(() => {
          setShowCsvBox(false);
          setIsProcessingCsv(false);
          setCsvStatusMsg("");
        }, 1500);
      } catch (err: any) {
        setCsvStatusMsg(`Fuzzy parsing failed: ${err.message}`);
        setIsProcessingCsv(false);
      }
    }, 1200);
  };

  // Inject sample CSV automatically
  const injectSampleCsv = () => {
    setCsvText(
      "Devika Nair, 95, 98\n" +
      "arjun mehta, 80, 85\n" +
      "Priya, 72, 60\n" +
      "Sneha P., 99, 90\n" +
      "Rohan Das, 55, 50"
    );
  };

  // Stage styles map
  const stageBadges: Record<PipelineStage, string> = {
    UPLOADED: "bg-void border-rim text-muted-foreground",
    RESUME_PROCESSED: "bg-nova/5 border-nova/20 text-nova-bright",
    EVALUATING: "bg-sol/5 border-sol/20 text-sol animate-pulse",
    EVALUATED: "bg-pulsar/5 border-pulsar/20 text-pulsar",
    RANKED: "bg-pulsar/10 border-pulsar/30 text-pulsar",
    TEST_SENT: "bg-nova/10 border-nova/30 text-nova-bright",
    TEST_COMPLETED: "bg-pulsar/10 border-pulsar/40 text-pulsar",
    SHORTLISTED: "bg-quasar/10 border-quasar/30 text-quasar",
    INTERVIEW_SCHEDULED: "bg-flare/10 border-flare/30 text-flare",
    ERROR: "bg-red-500/10 border-red-500/30 text-red-400"
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/interview/recruiter")}
            className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
        </div>

        {/* Job Header Card */}
        <Card className="bg-card/40 border-border/80 text-left">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{job.title}</h1>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl font-sans">
                  {job.description}
                </p>
              </div>
              <Badge variant="outline" className="text-xs font-mono border-rim self-start whitespace-nowrap">
                Funnels weight sum: 100%
              </Badge>
            </div>

            {/* Weights config badge display */}
            <div className="pt-3 border-t border-border/30 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
              <span className="font-bold text-foreground">Score Matrix:</span>
              <span>JD match: {job.weightConfig.jdMatch}%</span>
              <span>•</span>
              <span>GitHub: {job.weightConfig.github}%</span>
              <span>•</span>
              <span>Coding: {job.weightConfig.coding}%</span>
              <span>•</span>
              <span>Logical: {job.weightConfig.logical}%</span>
              <span>•</span>
              <span>Project: {job.weightConfig.project}%</span>
              <span>•</span>
              <span>Research: {job.weightConfig.research}%</span>
              <span>•</span>
              <span>CGPA: {job.weightConfig.cgpa}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left search */}
          <div className="relative w-full md:max-w-xs text-left">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11"
            />
          </div>

          {/* Right action triggers */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <Button 
              onClick={handleBulkEvaluate}
              className="bg-nova hover:bg-nova-bright font-bold flex items-center gap-1.5 h-11 text-xs"
            >
              <Play className="h-4 w-4" />
              <span>Bulk AI Screening</span>
            </Button>

            <Button 
              variant="outline"
              disabled={selectedCandidates.length === 0}
              onClick={handleBulkSendTests}
              className="border-rim hover:border-nova-bright hover:bg-nova/5 font-bold flex items-center gap-1.5 h-11 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 text-nova-bright" />
              <span>Email Test Links ({selectedCandidates.length})</span>
            </Button>

            <Button 
              variant="outline"
              onClick={() => setShowCsvBox(!showCsvBox)}
              className="border-rim hover:border-pulsar hover:bg-pulsar/5 font-bold flex items-center gap-1.5 h-11 text-xs"
            >
              <Upload className="h-4 w-4 text-pulsar" />
              <span>Upload Test Spreadsheet</span>
            </Button>
          </div>
        </div>

        {/* Dynamic CSV Spreadsheet fuzzy parser drawer */}
        <AnimatePresence>
          {showCsvBox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden text-left"
            >
              <Card className="bg-[#050511] border-rim mt-2">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-mono">Fuzzy Name-Matching Spreadsheet Input</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Paste CSV layout format: <b>Candidate Name, LogicalScore(0-100), CodingScore(0-100)</b></p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={injectSampleCsv}
                      className="text-nova-bright border border-nova/20 text-[10px] h-7 font-mono"
                    >
                      Inject Demo CSV Data
                    </Button>
                  </div>

                  <textarea 
                    rows={4}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder="Devika Nair, 90, 95&#10;Arjun Mehta, 80, 85&#10;Priya Sharma, 70, 65"
                    className="w-full bg-[#030308] border border-rim rounded-lg p-2.5 font-mono text-xs focus:outline-none focus:border-pulsar"
                  />

                  {csvStatusMsg && (
                    <div className="text-[10px] font-mono text-pulsar flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{csvStatusMsg}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-2.5">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowCsvBox(false)}
                      className="text-xs h-9"
                    >
                      Cancel
                    </Button>
                    <Button 
                      disabled={isProcessingCsv || !csvText.trim()}
                      onClick={handleCsvSubmit}
                      className="bg-pulsar hover:bg-pulsar/80 text-abyss font-bold text-xs h-9"
                    >
                      {isProcessingCsv ? "Aligning records..." : "Align & Process Scores"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selection presets (Top N Selector) */}
        <div className="p-4 bg-void/60 border border-rim rounded-xl flex flex-wrap items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4.5 w-4.5 text-nova-bright" />
            <span className="text-xs font-mono text-muted-foreground">Select candidate cohort options:</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span>Select top:</span>
            <input 
              type="number"
              min={1}
              max={100}
              value={topNValue}
              onChange={(e) => setTopNValue(e.target.value)}
              className="w-14 bg-abyss border border-rim rounded px-2 py-1 text-center font-bold text-foreground"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={applyTopN}
              className="border-rim hover:border-nova-bright h-8 text-[11px] font-bold"
            >
              Apply Top-N Select
            </Button>
          </div>
        </div>

        {/* Candidates Table Grid */}
        <Card className="bg-card/40 border-border/80">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left font-mono border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/40 bg-void/50 text-muted-foreground">
                  <th className="p-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedCandidates.length === sortedCandidates.length && sortedCandidates.length > 0}
                      onChange={toggleAllSelection}
                      className="accent-nova scale-110 cursor-pointer"
                    />
                  </th>
                  <th className="p-4 w-16 text-center">Rank</th>
                  <th className="p-4 text-sm font-display font-semibold text-foreground">Candidate & College</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4 text-right">JD Alignment</th>
                  <th className="p-4 text-right">GitHub Impact</th>
                  <th className="p-4 text-right">Coding Labs</th>
                  <th className="p-4 text-right">Logical Aptitude</th>
                  <th className="p-4 text-right text-sm font-bold text-gradient">Composite</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {sortedCandidates.map((c, i) => {
                  const isSelected = selectedCandidates.includes(c.id);
                  const candidateScore = scores[c.id];
                  const rank = candidateScore?.rank || (i + 1);

                  // Set up composite hover tooltip data
                  const breakdownText = candidateScore ? 
                    `Score Breakdown Detail:
• JD match: ${breakdownVal(candidateScore.breakdown.jdMatch, job.weightConfig.jdMatch)}
• GitHub impact: ${breakdownVal(candidateScore.breakdown.github, job.weightConfig.github)}
• Coding test: ${breakdownVal(candidateScore.breakdown.coding, job.weightConfig.coding)}
• Logical aptitude: ${breakdownVal(candidateScore.breakdown.logical, job.weightConfig.logical)}
• Project score: ${breakdownVal(candidateScore.breakdown.project, job.weightConfig.project)}
• Research quality: ${breakdownVal(candidateScore.breakdown.research, job.weightConfig.research)}
• CGPA percentile: ${breakdownVal(candidateScore.breakdown.cgpa, job.weightConfig.cgpa)}
----------------------
Weighted Total: ${candidateScore.compositeScore}%`
                    : "No ranking metrics computed. Run screening evaluation to calculate Z-scores and similarities.";

                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-white/[0.01] transition-colors ${isSelected ? "bg-nova/5" : ""}`}
                    >
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelectCandidate(c.id)}
                          className="accent-nova scale-110 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center font-bold text-sm">
                        {c.pipelineStage === "UPLOADED" ? "-" : `#${rank}`}
                      </td>
                      <td className="p-4 text-left">
                        <div className="flex flex-col gap-0.5">
                          <Link 
                            href={`/interview/recruiter/candidates/${c.id}`} 
                            className="font-bold text-foreground text-sm hover:text-nova-bright transition-colors font-sans hover:underline"
                          >
                            {c.name}
                          </Link>
                          <span className="text-[10px] text-muted-foreground font-mono">{c.college} (CGPA: {c.cgpa})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 items-start">
                          <Badge className={`text-[8.5px] uppercase font-bold border tracking-wider px-2 py-0.5 ${stageBadges[c.pipelineStage] || "bg-void border-rim text-muted-foreground"}`}>
                            {c.pipelineStage}
                          </Badge>
                          <span className="text-[9px] text-muted-foreground font-mono leading-none line-clamp-1 max-w-[150px]" title={c.statusMessage}>
                            {c.statusMessage}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold">
                        {candidateScore ? `${candidateScore.breakdown.jdMatch.raw}%` : "-"}
                      </td>
                      <td className="p-4 text-right">
                        {candidateScore ? `${candidateScore.breakdown.github.raw.toFixed(1)}` : "-"}
                      </td>
                      <td className="p-4 text-right">
                        {c.testResults ? `${c.testResults.testCode}%` : "-"}
                      </td>
                      <td className="p-4 text-right">
                        {c.testResults ? `${c.testResults.testLa}%` : "-"}
                      </td>
                      <td className="p-4 text-right font-bold text-sm text-foreground">
                        {candidateScore ? (
                          <div className="inline-flex items-center gap-1 cursor-help group relative">
                            <span className="text-gradient">{candidateScore.compositeScore}%</span>
                            <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            {/* Hover Tooltip Box */}
                            <div className="hidden group-hover:block absolute bottom-full right-0 bg-[#070714] border border-rim text-muted-foreground p-3 rounded-lg text-[10px] leading-relaxed whitespace-pre font-mono z-50 text-left shadow-2xl w-64 translate-y-[-5px]">
                              {breakdownText}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => triggerEvaluation(c.id)}
                            className="text-nova-bright hover:bg-nova/10 p-1.5 h-8 w-8 rounded-lg border border-border/30"
                            title="Rerun AI Evaluation Pipeline"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </Button>
                          <Link href={`/interview/recruiter/candidates/${c.id}`}>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-pulsar hover:bg-pulsar/10 text-[10px] px-2 h-8 rounded-lg border border-border/30 font-bold"
                            >
                              Details
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Helper to render score (pct) * wt = wt_val
function breakdownVal(dim: { raw: number; normalized: number; weighted: number }, wt: number): string {
  return `${dim.raw.toFixed(0)} (${dim.normalized}%ile) * ${wt}% = ${dim.weighted}`;
}
