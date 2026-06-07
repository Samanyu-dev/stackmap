"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companyRoadmaps } from "@/data/company-roadmaps";
import { ChevronRight, ArrowLeft, Calendar, HelpCircle, FileCheck, Layers, BookOpen, ExternalLink, ShieldCheck, CheckSquare, Square } from "lucide-react";

export default function CompanyRoadmapPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const company = companyRoadmaps[slug];

  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const active = localStorage.getItem("stackmap_active_company");
      setIsActive(active === slug);

      const savedCompleted = localStorage.getItem(`stackmap_company_completed_${slug}`);
      if (savedCompleted) {
        try {
          setCompletedSteps(JSON.parse(savedCompleted));
        } catch (e) {}
      }
    }
  }, [slug]);

  if (!company) {
    return (
      <DashboardLayout>
        <div className="text-center py-16 space-y-4">
          <h2 className="text-2xl font-bold">Company Path Not Found</h2>
          <p className="text-sm text-muted-foreground">The requested company preparation path does not exist in our catalog.</p>
          <Link href="/companies">
            <Button>Return to Companies</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleToggleActive = () => {
    if (isActive) {
      localStorage.removeItem("stackmap_active_company");
      setIsActive(false);
    } else {
      localStorage.setItem("stackmap_active_company", slug);
      setIsActive(true);
    }
  };

  const toggleStep = (idx: number) => {
    const updated = { ...completedSteps, [idx]: !completedSteps[idx] };
    setCompletedSteps(updated);
    localStorage.setItem(`stackmap_company_completed_${slug}`, JSON.stringify(updated));
  };

  const progressPercent = company.timeline.length > 0
    ? Math.round((Object.values(completedSteps).filter(Boolean).length / company.timeline.length) * 100)
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6 relative pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/companies" className="hover:text-foreground">Companies</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-semibold">{company.name} Prep</span>
        </div>

        {/* Company Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6 text-left">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{company.name} Prep Roadmap</h1>
              <Badge variant="outline" className="uppercase text-[9px] font-bold">
                {company.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {company.overview}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center">
            <div className="flex flex-wrap gap-1 md:w-48 flex-shrink-0">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Target Roles</span>
              <div className="flex flex-wrap gap-1">
                {company.commonRoles.map(role => (
                  <Badge key={role} variant="secondary" className="text-[10px]">{role}</Badge>
                ))}
              </div>
            </div>
            <Button
              variant={isActive ? "default" : "outline"}
              onClick={handleToggleActive}
              className="font-bold flex items-center space-x-1.5 h-10 w-full sm:w-auto shadow-md"
            >
              {isActive ? (
                <>
                  <ShieldCheck className="h-4.5 w-4.5 text-green-400" />
                  <span>Tracking Progress</span>
                </>
              ) : (
                <>
                  <Calendar className="h-4.5 w-4.5" />
                  <span>Track Prep Progress</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Timeline & Steps */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="p-6 rounded-2xl border border-border bg-card/45 backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-foreground flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" /> Recommended Preparation Timeline
                </h3>
                <span className="text-xs font-bold text-muted-foreground">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden mb-6">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
              
              <div className="space-y-4">
                {company.timeline.map((t, idx) => {
                  const isCompleted = !!completedSteps[idx];
                  return (
                    <div key={idx} className="relative flex gap-3.5 p-4 rounded-xl border border-border/40 bg-background/30 hover:border-primary/20 transition-all items-start">
                      <button
                        onClick={() => toggleStep(idx)}
                        className={`p-0.5 rounded text-muted-foreground flex-shrink-0 mt-0.5 transition-colors ${
                          isCompleted && "text-green-500"
                        }`}
                      >
                        {isCompleted ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
                      </button>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{t.duration}</span>
                          <span className={`text-sm font-bold ${isCompleted ? "text-muted-foreground line-through font-normal" : "text-foreground"}`}>{t.step}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
                          {t.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hiring Process Card */}
            <div className="p-6 rounded-2xl border border-border bg-card/45 backdrop-blur-md space-y-4">
              <h3 className="font-bold text-lg text-foreground flex items-center">
                <Layers className="h-5 w-5 mr-2 text-primary" /> Interview Loop & Rounds
              </h3>
              <div className="space-y-3">
                {company.rounds.map((round, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border bg-background/50 flex gap-3 text-xs leading-relaxed">
                    <span className="font-bold text-primary">{idx + 1}.</span>
                    <div>
                      <span className="font-bold text-foreground block">{round.title}</span>
                      <p className="text-muted-foreground mt-0.5 font-light">{round.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ section */}
            <div className="p-6 rounded-2xl border border-border bg-card/45 backdrop-blur-md space-y-4">
              <h3 className="font-bold text-lg text-foreground flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" /> Frequently Asked Questions
              </h3>
              <div className="space-y-2.5">
                {company.faqs.map((faq, idx) => {
                  const isOpen = !!faqOpen[idx];
                  return (
                    <div key={idx} className="border border-border/80 rounded-xl overflow-hidden bg-background/40">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 flex justify-between items-center text-xs font-bold text-foreground hover:bg-secondary/20 transition-all text-left"
                      >
                        <span>{faq.q}</span>
                        <span>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="p-4 border-t border-border/60 bg-secondary/5 text-xs text-muted-foreground leading-relaxed font-light">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Requirements & Resources */}
          <div className="lg:col-span-1 space-y-6 text-left">
            {/* Online Assessment patterns */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Online Assessment (OA)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 text-xs leading-relaxed font-light text-muted-foreground">
                {company.oaPattern}
              </CardContent>
            </Card>

            {/* Technical focus syllabus */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Technical Syllabus</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-xs">
                {/* DSA topics */}
                <div>
                  <span className="font-bold text-foreground block">Key DSA Subjects:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {company.dsaTopics.map(t => (
                      <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>

                {/* CS Fundamentals */}
                <div>
                  <span className="font-bold text-foreground block">CS Fundamentals Focus:</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {company.csFundamentals.map(f => (
                      <Badge key={f} variant="outline" className="text-[10px]">{f}</Badge>
                    ))}
                  </div>
                </div>

                {/* System design */}
                <div>
                  <span className="font-bold text-foreground block">System Design Tier:</span>
                  <Badge variant="outline" className="mt-2 text-primary border-primary/20 bg-primary/5">{company.systemDesignLevel}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recommended projects */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Target Portfolio Projects</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground font-light">
                {company.recommendedProjects.map((p, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Preparation links */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-bold">Preparation Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-2 text-xs">
                {company.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-2.5 border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary font-medium"
                  >
                    <span>{res.title}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
