"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";

interface AIBulletImproverProps {
  onApply: (text: string) => void;
  placeholderText?: string;
}

export default function AIBulletImprover({ onApply, placeholderText = "e.g. helped build front-end components and fixed bugs" }: AIBulletImproverProps) {
  const [text, setText] = useState("");
  const [optimized, setOptimized] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOptimize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setOptimized("");

    try {
      const res = await fetch("/api/resume/improve-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulletText: text })
      });
      const data = await res.json();
      setOptimized(data.optimizedText || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-xl border border-border/80 bg-secondary/15 text-left space-y-3.5">
      <div className="flex items-center space-x-1.5 text-primary">
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">AI Bullet Point Enhancer</span>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={placeholderText}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-9 text-xs"
        />
        <Button
          type="button"
          size="sm"
          onClick={handleOptimize}
          disabled={loading || !text.trim()}
          className="h-9 text-xs font-semibold px-3 flex-shrink-0"
        >
          {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : "Enhance"}
        </Button>
      </div>

      {optimized && (
        <div className="space-y-2.5 animate-scale-in">
          <div className="p-3 rounded-lg bg-background border border-border/60 text-xs text-foreground leading-relaxed font-light relative group">
            {optimized}
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 text-[10px] px-2.5 flex items-center space-x-1"
            >
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onApply(optimized);
                setText("");
                setOptimized("");
              }}
              className="h-8 text-[10px] px-2.5"
            >
              Apply to Section
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
