"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Save, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore, Job } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ConfigureJobPage() {
  const router = useRouter();
  const { addJob } = useInterviewStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [weights, setWeights] = useState({
    jdMatch: 25,
    github: 20,
    coding: 20,
    logical: 10,
    project: 10,
    research: 5,
    cgpa: 10
  });

  const handleSliderChange = (field: keyof typeof weights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalSum = Object.values(weights).reduce((a, b) => a + b, 0);
  const isValid = totalSum === 100 && title.trim().length > 0 && description.trim().length > 0;

  const handleSave = () => {
    if (!isValid) return;

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      description,
      createdAt: new Date().toISOString(),
      weightConfig: weights
    };

    addJob(newJob);
    router.push("/interview/recruiter");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
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

        {/* Heading */}
        <div className="border-b border-border/40 pb-5 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-nova-bright mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ROLE DESIGN SYSTEM</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display">Configure Recruiting Funnel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Define role parameters, paste the job description, and custom-tailor evaluation weight proportions.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/40 border-border/80">
              <CardHeader>
                <CardTitle className="text-lg">Role Details</CardTitle>
                <CardDescription className="text-xs">Specify the naming convention and text credentials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground font-mono">Job Posting Title</label>
                  <Input 
                    placeholder="e.g. Senior Machine Learning Engineer" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground font-mono">Job Description (JD)</label>
                  <textarea 
                    rows={8}
                    placeholder="Describe job targets, key libraries, systems, research fields, and preferred qualifications..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#080811] text-foreground text-sm border border-rim rounded-lg p-3 focus:outline-none focus:border-nova-bright transition-colors font-sans"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/40 border-border/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Dimension Weights</CardTitle>
                <CardDescription className="text-xs">Weights must sum up to exactly 100%.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { key: "jdMatch", label: "Semantic JD Match" },
                  { key: "github", label: "GitHub Impact (Decay)" },
                  { key: "coding", label: "Coding Tests" },
                  { key: "logical", label: "Logical Aptitude" },
                  { key: "project", label: "Project Relevance" },
                  { key: "research", label: "Research Quality" },
                  { key: "cgpa", label: "CGPA Percentile" }
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>{label}</span>
                      <span className="text-foreground font-bold">{weights[key as keyof typeof weights]}%</span>
                    </div>
                    <input 
                      type="range"
                      min={0}
                      max={60}
                      step={5}
                      value={weights[key as keyof typeof weights]}
                      onChange={(e) => handleSliderChange(key as keyof typeof weights, parseInt(e.target.value))}
                      className="w-full h-1 bg-void rounded-lg appearance-none cursor-pointer accent-nova hover:accent-nova-bright transition-colors"
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 flex flex-col gap-3 bg-void/20">
                <div className="flex justify-between items-center w-full text-xs font-mono">
                  <span className="text-muted-foreground">Combined Sum:</span>
                  <Badge 
                    variant={totalSum === 100 ? "info" : "destructive"} 
                    className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full"
                  >
                    {totalSum}%
                  </Badge>
                </div>
                {totalSum !== 100 && (
                  <div className="flex items-center gap-1.5 text-red-400 text-[10px] leading-relaxed">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Adjust sliders to balance the remaining {100 - totalSum}% deficit.</span>
                  </div>
                )}
                <Button 
                  disabled={!isValid}
                  onClick={handleSave}
                  className="w-full bg-nova hover:bg-nova-bright font-bold flex items-center justify-center gap-2 mt-2 h-11"
                >
                  <Save className="h-4 w-4" />
                  <span>Finalize Pipeline</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
