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

    // Simulate login redirect directly
    if (email === "student@stackmap.dev" && password === "password") {
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } else {
      setLoading(false);
      setError("Invalid student email or password credential.");
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
              <span className="font-bold text-foreground">Quick Sandbox Credentials:</span>
              <p className="mt-0.5">Use email <code className="text-primary select-all">student@stackmap.dev</code> and password <code className="text-primary select-all">password</code> to bypass login.</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
