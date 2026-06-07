"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Map, CheckCircle, Code, ShieldAlert, Sparkles, Brain, GraduationCap } from "lucide-react";
import HeroCanvas from "@/components/landing/HeroCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "DevOps Engineer", "Data Scientist", "AI Engineer", "DSA Preparation"
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#030303] text-white overflow-hidden select-none">
      {/* 3D Particle Constellation Background */}
      <HeroCanvas />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-primary/20">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-gradient">
            StackMap
          </span>
        </div>
        <Link href="/dashboard">
          <Button variant="glass" size="sm" className="border-white/10 hover:bg-white/5">
            Launch Platform
          </Button>
        </Link>
      </header>

      {/* Hero section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <Badge variant="outline" className="px-3.5 py-1 bg-primary/10 border-primary/20 text-primary font-medium flex items-center space-x-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Next-Gen Student Career Architect</span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none"
          >
            Own Your Tech Journey, <br />
            <span className="text-gradient">Step by Step.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            StackMap is an interactive career visualization platform for tech students. 
            Follow custom career roadmaps, log daily progress, manage your internship applications, 
            and learn alongside our real-time AI Mentor.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto font-bold px-8 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/roadmaps">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 px-8">
                Explore Roadmaps
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Accent Roles Tag Carousel Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {roles.map((role) => (
              <span
                key={role}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/5 text-gray-300 backdrop-blur-sm shadow-sm hover:border-primary/20 hover:bg-primary/5 transition-all cursor-default"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl">
          <Card glass hoverGlow className="bg-white/[0.02] border-white/5">
            <CardContent className="pt-6 text-left space-y-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20 text-violet-400">
                <Map className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Interactive Graph Flows</h3>
              <p className="text-sm text-gray-400 font-light">
                Visualize learning pathways through React Flow graphs. Lock, unlock, and check off topics seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card glass hoverGlow className="bg-white/[0.02] border-white/5">
            <CardContent className="pt-6 text-left space-y-3">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Full Placement Trackers</h3>
              <p className="text-sm text-gray-400 font-light">
                Track your internship applications and DSA revision progress. Never miss OA deadlines or HR callbacks.
              </p>
            </CardContent>
          </Card>

          <Card glass hoverGlow className="bg-white/[0.02] border-white/5">
            <CardContent className="pt-6 text-left space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Generative AI Mentor</h3>
              <p className="text-sm text-gray-400 font-light">
                Generate 7, 30, or 90-day custom study calendars, get project step outlines, and mock interview questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-xs text-gray-500 max-w-7xl mx-auto w-full px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1.5">
            <GraduationCap className="h-4 w-4" />
            <span>Built by Students, for Students</span>
          </div>
          <span>&copy; {new Date().getFullYear()} StackMap. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
