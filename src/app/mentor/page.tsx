"use client";

import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Send, Sparkles, User, Terminal, CalendarRange, ListCheck, HelpCircle } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AiMentorConsole() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello, Alex! I'm your StackMap AI Mentor. I can help recommend career pathways, design custom 7/30/90-day study syllabi, generate mock interview questions, or brainstorm project step-by-steps. What are we studying today?",
      timestamp: "10:00 AM"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    // Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: "user", text: textToSend, timestamp }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        sender: "ai",
        text: data.response || "I apologize, I'm having trouble connecting to my cognitive networks. Let's try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        sender: "ai",
        text: "System offline. Failed to fetch recommendations.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const prompts = [
    { label: "7-Day Study Plan", icon: CalendarRange, text: "Generate a custom 7-day study plan for mastering React Hooks and state management basics. Keep tasks action-oriented." },
    { label: "Mock Interview Qs", icon: HelpCircle, text: "Generate 5 intermediate-level frontend JavaScript and CSS Grid interview questions, with answers hidden in fold details." },
    { label: "Brainstorm Projects", icon: ListCheck, text: "Suggest 3 unique backend NodeJS project ideas containing database relations, and give the step-by-step features checklist for each." },
    { label: "Recommend Pathways", icon: Sparkles, text: "I enjoy algorithmic problem solving and optimization, but I also like visual arts. Recommend a career pathway mapping." }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-4 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span>AI Study Mentor</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Ask questions about roadmaps, generate calendars, or review project setups in real time.
            </p>
          </div>
        </div>

        {/* Chat area and Presets Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden min-h-0">
          {/* Quick templates panel */}
          <div className="hidden lg:block lg:col-span-1 space-y-4 overflow-y-auto">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">AI Prompt Presets</span>
            <div className="space-y-2.5">
              {prompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSend(p.text)}
                  className="w-full text-left p-3.5 rounded-xl border border-border bg-card/40 hover:bg-primary/[0.01] hover:border-primary/30 transition-all flex flex-col space-y-2 group"
                >
                  <div className="flex items-center space-x-2 text-primary">
                    <p.icon className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{p.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-light group-hover:text-foreground transition-colors">
                    {p.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Core Chat Console */}
          <div className="lg:col-span-3 border border-border/80 rounded-2xl flex flex-col justify-between overflow-hidden bg-card/20 backdrop-blur-md">
            {/* Feed area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed border ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground border-primary/20"
                        : "bg-card border-border text-foreground"
                    }`}
                  >
                    {m.sender === "ai" && (
                      <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                        <BrainCircuit className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <p className="whitespace-pre-line text-xs font-light">{m.text}</p>
                      <span className="block text-[9px] mt-2 text-right opacity-60">
                        {m.timestamp}
                      </span>
                    </div>
                    {m.sender === "user" && (
                      <div className="h-7 w-7 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 text-primary-foreground">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2.5 p-4 rounded-2xl border border-border bg-card text-sm text-muted-foreground animate-pulse">
                    <BrainCircuit className="h-5 w-5 animate-spin text-primary" />
                    <span>AI Mentor is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input wrapper */}
            <div className="p-4 border-t border-border/60 bg-card/60 backdrop-blur-md flex gap-2">
              <Input
                type="text"
                placeholder="Ask your mentor something... (e.g. Generate 30-day Devops plan)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
                className="h-11 border-border/80"
              />
              <Button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="h-11 w-11 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
