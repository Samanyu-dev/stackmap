"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, BrainCircuit, User, Building2, Sparkles, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InterviewSelectorPage() {
  return (
    <DashboardLayout>
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
        {/* Floating background lights */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-nova/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pulsar/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-nova/10 border border-nova/20 rounded-full text-xs font-mono text-nova-bright">
            <Sparkles className="h-3.5 w-3.5" />
            <span>NEO-COSMIC RECRUITMENT NETWORK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display leading-tight tracking-tight">
            AI Screening & <br />
            <span className="text-gradient">Interview Console</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Synthesize candidates, evaluate GitHub impact, review automated voice sessions, 
            and practice tech challenges in our synchronized cosmic sandbox.
          </p>
        </motion.div>

        {/* Portal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Recruiter Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="flex"
          >
            <Card className="flex-1 bg-card/40 border-border/80 hover:border-nova-bright/40 hover:shadow-[0_0_30px_rgba(110,84,247,0.15)] transition-all flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-nova/10 to-transparent pointer-events-none" />
              <CardHeader className="space-y-4 pt-8">
                <div className="h-12 w-12 rounded-xl bg-nova/10 border border-nova/20 flex items-center justify-center text-nova-bright group-hover:bg-nova group-hover:text-white transition-all">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Recruiter Portal</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Post roles, configure screening weights, trigger multi-model fallback resumes evaluation, parse test spreadsheets, and schedule calendar interviews.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-8 pt-4">
                <Link href="/interview/recruiter">
                  <Button className="w-full bg-nova hover:bg-nova-bright font-bold flex items-center justify-center gap-2 group-hover:translate-y-[-2px] transition-all">
                    <span>Manage Pipelines</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Candidate Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="flex"
          >
            <Card className="flex-1 bg-card/40 border-border/80 hover:border-pulsar/40 hover:shadow-[0_0_30px_rgba(0,229,204,0.1)] transition-all flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pulsar/10 to-transparent pointer-events-none" />
              <CardHeader className="space-y-4 pt-8">
                <div className="h-12 w-12 rounded-xl bg-pulsar/10 border border-pulsar/20 flex items-center justify-center text-pulsar group-hover:bg-pulsar group-hover:text-abyss transition-all">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Candidate Sandbox</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Test your logic, execute database commands in our live SQL workspace, write solutions in our DSA editor, and engage in voice AI interviews.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-8 pt-4">
                <Link href="/interview/candidate/dashboard">
                  <Button variant="outline" className="w-full border-border/80 hover:border-pulsar hover:bg-pulsar/5 font-bold flex items-center justify-center gap-2 group-hover:translate-y-[-2px] transition-all">
                    <span>Enter Candidate Hub</span>
                    <ArrowRight className="h-4 w-4 text-pulsar" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
