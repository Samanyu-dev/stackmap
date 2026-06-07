"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("student@stackmap.dev");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email.includes("@") && password.length >= 6) {
      setTimeout(() => {
        localStorage.setItem("stackmap_session", JSON.stringify({ email }));
        
        // Check if user profile already exists, if not, create one
        const existingProfile = localStorage.getItem("stackmap_user_profile");
        if (!existingProfile) {
          const computedName = email.split("@")[0]
            .replace(/[._-]/g, " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
            
          const newUserProfile = {
            id: `user-${Math.random().toString(36).substring(2, 9)}`,
            name: computedName,
            email: email,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
            streak: 1,
            completedTopics: 0,
            completedProjects: 0,
            dsaSolved: 0,
            applicationsSent: 0,
            interviewsScheduled: 0
          };
          localStorage.setItem("stackmap_user_profile", JSON.stringify(newUserProfile));
        }
        
        router.push("/dashboard");
      }, 800);
    } else {
      setLoading(false);
      setError("Please check your input. Password must be at least 6 characters.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] text-white px-4">
      {/* Background visual grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />

      <Card glass className="w-full max-w-md bg-card/60 border-border/80 shadow-2xl relative z-10 text-left">
        <CardHeader className="space-y-2 text-center border-b border-border/40 pb-5">
          <div className="flex justify-center mb-1">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white text-xl">
              S
            </div>
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight">Access Student Console</CardTitle>
          <CardDescription className="text-xs">Enter your details to track study streams.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Badge variant="destructive" className="w-full py-2 justify-center rounded-lg">
                {error}
              </Badge>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Student Email Address</label>
              <Input
                type="email"
                placeholder="student@stackmap.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Password Key</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full font-bold h-11 mt-2">
              {loading ? "Authenticating session..." : "Login to Console"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t border-border/40 pt-4 flex flex-col items-center space-y-3">
          <div className="p-3 bg-secondary/50 rounded-xl border border-border/60 text-xs text-muted-foreground flex items-start space-x-2 leading-relaxed">
            <BrainCircuit className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-foreground">Dynamic Sandbox Credentials:</span>
              <p className="mt-0.5">Enter any valid email and a password of 6+ characters. This will automatically provision a new customizable profile or log you into an existing one.</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
