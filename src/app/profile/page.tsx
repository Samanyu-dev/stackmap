"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { User, Settings, Check, UploadCloud, Target, ShieldCheck, Mail } from "lucide-react";

export default function StudentProfile() {
  const { user } = useRoadmapStore();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState("Frontend Developer");
  const [weeklyGoal, setWeeklyGoal] = useState("5 Topics");
  const [saved, setSaved] = useState(false);

  // Resume states
  const [resumes, setResumes] = useState([
    { name: "v2_SWE_General.pdf", size: "1.2 MB", date: "2026-06-01" },
    { name: "v2_Frontend_Special.pdf", size: "1.4 MB", date: "2026-05-24" }
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border/40 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight">Student Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your active learning targets, upload target resumes, and manage auth credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Account credentials card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/45 border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-bold">General Settings</CardTitle>
                </div>
                <CardDescription className="text-xs">Adjust your personal credentials.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Target Role Pathway</label>
                      <Select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="AI Engineer">AI Engineer</option>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Weekly Learning Goal</label>
                      <Select value={weeklyGoal} onChange={(e) => setWeeklyGoal(e.target.value)}>
                        <option value="3 Topics">3 Topics / week</option>
                        <option value="5 Topics">5 Topics / week</option>
                        <option value="10 Topics">10 Topics / week</option>
                        <option value="15 Topics">15 Topics / week</option>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-border/40 pt-4 mt-2">
                    <Button type="submit">
                      {saved ? "✓ Settings Saved" : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Resume Repository card */}
            <Card className="bg-card/45 border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <UploadCloud className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-bold">Resume Repository</CardTitle>
                </div>
                <CardDescription className="text-xs">Manage resume versions used for internship applications.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="border border-dashed border-border/60 rounded-xl p-6 text-center hover:bg-secondary/10 cursor-pointer transition-all">
                  <UploadCloud className="h-8 w-8 mx-auto opacity-50 text-muted-foreground mb-2" />
                  <h4 className="font-bold text-sm text-foreground">Upload resume file</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Drag PDF here or click to browse. Max size 5MB.</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Uploaded Files</span>
                  {resumes.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-border bg-background/50">
                      <div>
                        <span className="text-xs font-bold text-foreground block">{file.name}</span>
                        <span className="text-[10px] text-muted-foreground">Uploaded: {file.date} • {file.size}</span>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Delete</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Status Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card border-border text-center overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-violet-600 to-indigo-600" />
              <CardContent className="pt-0 -mt-10 space-y-4 pb-6">
                <img
                  className="h-20 w-20 rounded-full border-4 border-card mx-auto ring-2 ring-primary/20"
                  src={user.image}
                  alt={user.name}
                />
                <div>
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <p className="text-xs text-muted-foreground">Student ID: {user.id.substring(0, 8)}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-y border-border/40 py-4">
                  <div>
                    <span className="font-bold block text-primary">{user.streak} days</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Streak</span>
                  </div>
                  <div>
                    <span className="font-bold block text-primary">{user.completedTopics} nodes</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Completed</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-1.5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-semibold">Premium Student Membership verified</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
