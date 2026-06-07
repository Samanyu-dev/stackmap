"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useTrackerStore, DSAProblem } from "@/store/useTrackerStore";
import { Code2, Plus, Search, ExternalLink, Trash2, Check, Star, RefreshCcw } from "lucide-react";

export default function DsaTracker() {
  const { dsaProblems, addDsaProblem, updateDsaProblem, deleteDsaProblem } = useTrackerStore();

  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("ALL");
  const [filterTopic, setFilterTopic] = useState<string>("ALL");
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LeetCode");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("BEGINNER");
  const [status, setStatus] = useState<"TODO" | "ATTEMPTED" | "SOLVED">("SOLVED");
  const [attempts, setAttempts] = useState(1);
  const [solutionLink, setSolutionLink] = useState("");
  const [confidence, setConfidence] = useState(3);

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addDsaProblem({
      title,
      platform,
      topic,
      difficulty,
      status,
      attempts,
      solutionLink: solutionLink || undefined,
      confidenceLevel: confidence
    });

    // Reset
    setTitle("");
    setAttempts(1);
    setSolutionLink("");
    setConfidence(3);
    setShowAddForm(false);
  };

  const filteredProblems = dsaProblems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.topic.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = filterDifficulty === "ALL" || p.difficulty === filterDifficulty;
    const matchesTopic = filterTopic === "ALL" || p.topic === filterTopic;
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const getDsaDifficultyBadge = (diff: DSAProblem["difficulty"]) => {
    switch (diff) {
      case "BEGINNER": return <Badge variant="info">EASY</Badge>;
      case "INTERMEDIATE": return <Badge variant="warning">MEDIUM</Badge>;
      case "ADVANCED": return <Badge variant="destructive">HARD</Badge>;
    }
  };

  const uniqueTopics = Array.from(new Set(dsaProblems.map(p => p.topic)));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">DSA & Interview Prep Tracker</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Build problem-solving muscle. Record complexity patterns, solution links, and schedule revision logs.
            </p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="font-bold flex items-center space-x-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Log DSA Problem</span>
          </Button>
        </div>

        {/* Modal dialog form */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-scale-in">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="text-lg font-bold">Record Code Challenge</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>✕</Button>
              </div>

              <form onSubmit={handleAddProblem} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Problem Title *</label>
                  <Input placeholder="e.g. Reverse Linked List" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Coding Platform</label>
                    <Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                      <option value="LeetCode">LeetCode</option>
                      <option value="GeeksforGeeks">GeeksforGeeks</option>
                      <option value="Codeforces">Codeforces</option>
                      <option value="HackerRank">HackerRank</option>
                      <option value="InterviewBit">InterviewBit</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Topic Category</label>
                    <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
                      <option value="Arrays">Arrays</option>
                      <option value="Strings">Strings</option>
                      <option value="LinkedLists">LinkedLists</option>
                      <option value="Trees">Trees & Graphs</option>
                      <option value="Heaps">Heaps</option>
                      <option value="Dynamic Programming">Dynamic Programming</option>
                      <option value="Recursion">Recursion / Backtracking</option>
                      <option value="Sorting">Sorting / Searching</option>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Difficulty</label>
                    <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)}>
                      <option value="BEGINNER">EASY</option>
                      <option value="INTERMEDIATE">MEDIUM</option>
                      <option value="ADVANCED">HARD</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Log Status</label>
                    <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                      <option value="SOLVED">SOLVED</option>
                      <option value="ATTEMPTED">ATTEMPTED</option>
                      <option value="TODO">TODO</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Attempts count</label>
                    <Input type="number" min={1} value={attempts} onChange={(e) => setAttempts(parseInt(e.target.value) || 1)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Confidence Score (1-5)</label>
                    <Select value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value) || 3)}>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Weak</option>
                      <option value="3">3 - Ok</option>
                      <option value="4">4 - Good</option>
                      <option value="5">5 - Excellent</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Solution link URL</label>
                    <Input placeholder="e.g. GitHub snippet URL" value={solutionLink} onChange={(e) => setSolutionLink(e.target.value)} />
                  </div>
                </div>

                <div className="flex gap-2 justify-end border-t border-border/40 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button type="submit">Log Problem</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="h-10 text-xs w-36">
              <option value="ALL">All Difficulties</option>
              <option value="BEGINNER">Easy</option>
              <option value="INTERMEDIATE">Medium</option>
              <option value="ADVANCED">Hard</option>
            </Select>

            <Select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className="h-10 text-xs w-36">
              <option value="ALL">All Topics</option>
              {uniqueTopics.map(top => (
                <option key={top} value={top}>{top}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Problems Matrix/Table */}
        <div className="border border-border/60 rounded-2xl overflow-hidden bg-card/20 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="p-4">Challenge Title</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Topic</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((prob) => (
                    <tr key={prob.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{prob.title}</div>
                        {prob.attempts > 1 && (
                          <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                            {prob.attempts} attempts
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{prob.platform}</Badge>
                      </td>
                      <td className="p-4 text-xs text-muted-foreground font-semibold">
                        {prob.topic}
                      </td>
                      <td className="p-4">
                        {getDsaDifficultyBadge(prob.difficulty)}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            prob.status === "SOLVED"
                              ? "success"
                              : prob.status === "ATTEMPTED"
                              ? "warning"
                              : "outline"
                          }
                          className="text-[10px] uppercase font-bold"
                        >
                          {prob.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-3.5 w-3.5 ${
                                idx < prob.confidenceLevel
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        {prob.solutionLink && (
                          <a
                            href={prob.solutionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border hover:bg-secondary text-muted-foreground hover:text-foreground"
                            title="View Solution"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => deleteDsaProblem(prob.id)}
                          className="p-2 rounded-lg border hover:bg-red-500/10 text-muted-foreground hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      <Code2 className="h-10 w-10 mx-auto opacity-40 mb-3" />
                      <h4 className="font-bold">No coding challenges logged</h4>
                      <p className="text-xs mt-1">Add problems using the CTA button above to track your interview readiness.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
