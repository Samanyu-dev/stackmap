"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  AlertCircle,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VoiceInterviewChamber() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const { 
    candidates, 
    jobs, 
    mockSessions, 
    startInterviewSession, 
    submitCandidateAnswer, 
    initialize, 
    isHydrated 
  } = useInterviewStore();

  const [micEnabled, setMicEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [capturedText, setCapturedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionError, setRecognitionError] = useState("");

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    initialize();
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, [initialize]);

  const candidate = candidates.find(c => c.id === candidateId);
  const job = candidate ? jobs.find(j => j.id === candidate.jobId) : null;
  const session = mockSessions[candidateId];

  // Start interview session on load if not already started
  useEffect(() => {
    if (isHydrated && candidate && !session) {
      startInterviewSession(candidateId);
    }
  }, [isHydrated, candidate, session, candidateId, startInterviewSession]);

  // Read AI prompts aloud using TTS (SpeechSynthesis)
  useEffect(() => {
    if (session && soundEnabled && synthRef.current) {
      const lastEntry = session.transcript[session.transcript.length - 1];
      if (lastEntry && lastEntry.role === "ai" && !isSpeakingRef.current) {
        // Stop any current speech
        synthRef.current.cancel();
        
        const utterance = new SpeechSynthesisUtterance(lastEntry.text);
        utterance.onstart = () => { isSpeakingRef.current = true; };
        utterance.onend = () => { 
          isSpeakingRef.current = false; 
          // Automatically start recognition listening once AI stops speaking if mic is enabled!
          if (micEnabled) {
            startSpeechRecognition();
          }
        };
        synthRef.current.speak(utterance);
      }
    }
  }, [session?.transcript.length, soundEnabled]);

  // Set up SpeechRecognition Web API
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setRecognitionError("");
        };

        rec.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setCapturedText(prev => prev ? prev + " " + text : text);
        };

        rec.onerror = (event: any) => {
          console.error("Speech Recognition Error:", event.error);
          if (event.error === "not-allowed") {
            setRecognitionError("Microphone permission denied. Switch to manual keyboard typing.");
            setMicEnabled(false);
          }
        };

        rec.onend = () => {
          // If mic is still enabled, restart recognition after short delay
          if (micEnabled && !isSpeakingRef.current && !isProcessing) {
            // Keep listening
            try {
              recognitionRef.current.start();
            } catch (e) {}
          }
        };

        recognitionRef.current = rec;
      } else {
        setRecognitionError("Web Speech API is not supported in this browser. Please type manually.");
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [micEnabled, isProcessing]);

  const startSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
  };

  const toggleMic = () => {
    if (micEnabled) {
      setMicEnabled(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      setMicEnabled(true);
      setRecognitionError("");
      startSpeechRecognition();
    }
  };

  const toggleSound = () => {
    if (soundEnabled) {
      setSoundEnabled(false);
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    } else {
      setSoundEnabled(true);
    }
  };

  const handleSendResponse = async () => {
    if (!capturedText.trim() || isProcessing) return;
    setIsProcessing(true);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const answer = capturedText;
    setCapturedText("");

    await submitCandidateAnswer(candidateId, answer);
    setIsProcessing(false);
  };

  if (!isHydrated || !candidate || !job || !session) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="font-mono text-xs text-muted-foreground animate-pulse font-bold">Initiating biometric speech channel...</span>
        </div>
      </DashboardLayout>
    );
  }

  const isCompleted = session.status === "COMPLETED";

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto text-left">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/interview/candidate/dashboard")}
            className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>

          <Badge className="bg-[#090912] border border-rim text-muted-foreground font-mono text-[9px] uppercase">
            Turn {session.currentQuestionIndex + 1} of {session.questions.length}
          </Badge>
        </div>

        {/* Dynamic Orb Chamber */}
        <Card className="bg-[#030309] border-border/80 overflow-hidden relative min-h-[320px] flex flex-col justify-center items-center py-8">
          {/* Subtle star field texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {/* Cosmic Orb Visualizer */}
          <div className="relative z-10 flex flex-col items-center space-y-6 select-none">
            <motion.div 
              animate={{ 
                scale: micEnabled && capturedText.length > 0 ? [1, 1.15, 1] : [1, 1.05, 1],
                boxShadow: micEnabled 
                  ? "0 0 50px rgba(0, 229, 204, 0.35)" 
                  : "0 0 35px rgba(110, 84, 247, 0.2)"
              }}
              transition={{ 
                duration: micEnabled ? 0.8 : 3.0, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className={`h-24 w-24 rounded-full flex items-center justify-center border transition-all ${
                micEnabled 
                  ? "bg-pulsar/10 border-pulsar/40 text-pulsar" 
                  : "bg-nova/10 border-nova/40 text-nova-bright"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : micEnabled ? (
                <Mic className="h-8 w-8 text-pulsar" />
              ) : (
                <MicOff className="h-8 w-8 text-nova-bright" />
              )}
            </motion.div>

            <div className="text-center space-y-1">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block">Biometric Transceiver</span>
              <h4 className="font-bold text-sm text-foreground">
                {isCompleted 
                  ? "Transmissions finalized successfully." 
                  : micEnabled 
                  ? "System listening... speak into your microphone" 
                  : "Microphone suspended. Type responses below."
                }
              </h4>
            </div>
          </div>
        </Card>

        {/* Live Conversation log & Fallback input */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs text-left">
          {/* Transcript Log column */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-card/40 border-border/80 h-96 flex flex-col justify-between">
              <CardHeader className="py-3 border-b border-border/40 bg-void/30">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-nova-bright" />
                  <CardTitle className="text-xs">Live Audio Uplink Dialog</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
                {session.transcript.map((t, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-lg border text-xs space-y-1 font-sans max-w-[85%] ${
                      t.role === "ai" 
                        ? "bg-nova/5 border-nova/15 text-foreground mr-auto" 
                        : "bg-void border-rim text-muted-foreground ml-auto"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground font-bold">
                      <span>{t.role === "ai" ? "STAR MAP SYSTEM" : "CANDIDATE ANSWER"}</span>
                      <span>{t.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </CardContent>

              {/* Text Fallback Textarea Editor */}
              {!isCompleted && (
                <div className="p-4 border-t border-border/40 bg-void/20 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground leading-none">
                    <span>Keyboard Response Fallback Box</span>
                    {recognitionError && <span className="text-red-400 font-bold">{recognitionError}</span>}
                  </div>
                  <div className="flex gap-2">
                    <textarea 
                      rows={2}
                      value={capturedText}
                      onChange={(e) => setCapturedText(e.target.value)}
                      placeholder="Translate voice responses or type details manually here..."
                      className="w-full bg-[#050510] text-foreground border border-rim rounded-lg p-2.5 font-sans focus:outline-none focus:border-pulsar resize-none text-xs leading-relaxed"
                    />
                    <Button 
                      disabled={isProcessing || !capturedText.trim()}
                      onClick={handleSendResponse}
                      className="bg-pulsar hover:bg-pulsar-bright text-abyss font-extrabold px-4 shrink-0 flex items-center justify-center"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Settings Console column */}
          <div className="space-y-4">
            <Card className="bg-card/40 border-border/80">
              <CardHeader className="py-3 border-b border-border/40">
                <CardTitle className="text-xs uppercase font-mono text-muted-foreground">Transceiver Controls</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 font-mono">
                <div className="flex justify-between items-center bg-[#070712] p-3 border border-rim rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-foreground">Speech-to-Text</span>
                    <span className="text-[9.5px] text-muted-foreground font-sans">Active microphone detection</span>
                  </div>
                  <Button 
                    onClick={toggleMic}
                    variant="ghost"
                    className={`h-9 w-9 p-0 rounded-lg border ${
                      micEnabled 
                        ? "bg-pulsar/10 border-pulsar/30 text-pulsar hover:bg-pulsar/25" 
                        : "border-rim hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {micEnabled ? <Mic className="h-4.5 w-4.5" /> : <MicOff className="h-4.5 w-4.5" />}
                  </Button>
                </div>

                <div className="flex justify-between items-center bg-[#070712] p-3 border border-rim rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-foreground">Text-to-Speech</span>
                    <span className="text-[9.5px] text-muted-foreground font-sans">Audio synthesized reading</span>
                  </div>
                  <Button 
                    onClick={toggleSound}
                    variant="ghost"
                    className={`h-9 w-9 p-0 rounded-lg border ${
                      soundEnabled 
                        ? "bg-nova/10 border-nova/30 text-nova-bright hover:bg-nova/25" 
                        : "border-rim hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
                  </Button>
                </div>

                {isCompleted && (
                  <div className="pt-2">
                    <Link href={`/interview/candidate/interview/${candidate.id}/feedback`}>
                      <Button className="w-full bg-quasar hover:bg-quasar/80 text-foreground font-black text-xs h-11 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,61,154,0.15)]">
                        <span>Compile Feedback Report</span>
                        <ChevronRight className="h-4.5 w-4.5" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
