"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clipboard, Check, HelpCircle, MessageSquare } from "lucide-react";

interface SuggestionProps {
  bullets: string[];
  interviewPoints: string[];
}

export default function ResumeBulletSuggestions({ bullets, interviewPoints }: SuggestionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {/* Resume Bullet suggestions */}
      <Card className="bg-card/45 border-border">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-sm font-bold flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Resume Phrasing Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5 space-y-4">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Add these to your resume profile experience/projects list:</p>
          <div className="space-y-3">
            {bullets.map((bullet, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-border bg-background/50 space-y-2.5 relative group">
                <p className="text-xs text-foreground font-light leading-relaxed pr-10">
                  {bullet}
                </p>
                <button
                  onClick={() => handleCopy(bullet, idx)}
                  className="absolute right-3 top-3 p-1.5 rounded-lg border hover:bg-secondary text-muted-foreground hover:text-foreground"
                  title="Copy phrasing"
                >
                  {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Clipboard className="h-3.5 w-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview talking points */}
      <Card className="bg-card/45 border-border">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-sm font-bold flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Interview Talking Points</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5 space-y-4">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Be prepared to explain these design parameters during interviews:</p>
          <div className="space-y-3.5">
            {interviewPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs leading-relaxed">
                <HelpCircle className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
                <span className="font-light text-muted-foreground">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
