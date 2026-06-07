"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResumeTemplateSelector from "@/components/resume/ResumeTemplateSelector";
import ResumeEditor from "@/components/resume/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import { FileDown, RefreshCw, Layers, Edit } from "lucide-react";

const defaultResumeProfile = {
  personal: {
    name: "Alex Coder",
    email: "student@stackmap.dev",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    github: "https://github.com/alex",
    linkedin: "https://linkedin.com/in/alex"
  },
  education: [
    { school: "State University", degree: "B.S. in Computer Science", gpa: "3.8 / 4.0", gradDate: "May 2026" }
  ],
  skills: "React, Next.js, TypeScript, JavaScript, Node.js, Express, PostgreSQL, Prisma, Git, Docker",
  projects: [
    {
      title: "Sleek Dark Portfolio Website",
      role: "Sole Developer",
      desc: "• Engineered responsive viewport grids adjusting to mobile devices.\n• Toggleable themes managed via local storage caching.",
      link: "https://github.com/alex/portfolio"
    }
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Software Engineering Intern",
      location: "San Francisco, CA (Hybrid)",
      duration: "Jun 2025 - Aug 2025",
      bullets: "• Collaborated in building core dashboard widgets using Next.js App Router.\n• Refactored database models using Prisma, reducing average API load latency by 15%."
    }
  ],
  achievements: "• Ranked 1st place in regional student hackathon\n• Solved 150+ challenges on LeetCode database tracker",
  certifications: "• Next.js Certified Professional Developer\n• AWS Certified Cloud Practitioner"
};

export default function ResumeBuilderPage() {
  const [data, setData] = useState(defaultResumeProfile);
  const [template, setTemplate] = useState("faang");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load local storage details if configured
    const saved = localStorage.getItem("stackmap_resume_profile");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse local resume profile details", err);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 print:p-0 print:bg-white print:text-black">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-5 print:hidden">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Interactive Resume Builder</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and refine an ATS-friendly developer resume. Optimize bullet points with AI assistance.
            </p>
          </div>
          <Button onClick={handlePrint} className="font-bold flex items-center space-x-1.5 h-10 shadow-md">
            <FileDown className="h-4 w-4" />
            <span>Export PDF / Print</span>
          </Button>
        </div>

        {/* Builder Workspaces Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 print:block">
          {/* Left Panel - Editor forms & Template selector */}
          <div className="space-y-6 print:hidden">
            {/* 1. Selection tab */}
            <Card className="bg-card/45 border-border">
              <CardContent className="pt-6">
                <ResumeTemplateSelector currentTemplate={template} onChange={(t) => setTemplate(t)} />
              </CardContent>
            </Card>

            {/* 2. Detailed Form Inputs workspace */}
            <Card className="bg-card/45 border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-base font-bold flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-primary" />
                  <span>Resume Content Creator</span>
                </CardTitle>
                <CardDescription className="text-xs">Populate fields to dynamically fill out your selected layout.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ResumeEditor data={data} onChange={(updated) => setData(updated)} />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Live Preview Renderer */}
          <div className="relative xl:sticky xl:top-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-3 print:hidden">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                <Layers className="h-4 w-4 mr-1.5 text-primary" /> Real-time Live Document Preview
              </span>
              <span className="text-[10px] text-muted-foreground italic">Changes auto-update below</span>
            </div>
            
            <ResumePreview data={data} template={template} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
