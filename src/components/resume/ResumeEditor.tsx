"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, Sparkles, AlertCircle } from "lucide-react";
import AIBulletImprover from "./AIBulletImprover";

interface ResumeData {
  personal: { name: string; email: string; phone: string; location: string; github: string; linkedin: string };
  education: { school: string; degree: string; gpa: string; gradDate: string }[];
  skills: string;
  projects: { title: string; role: string; desc: string; link: string }[];
  experience: { company: string; role: string; location: string; duration: string; bullets: string }[];
  achievements: string;
  certifications: string;
}

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const [activeForm, setActiveForm] = useState<"personal" | "edu" | "skills" | "exp" | "proj" | "misc">("personal");
  const [saveStatus, setSaveStatus] = useState("");

  const updatePersonal = (field: string, value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { school: "", degree: "", gpa: "", gradDate: "" }]
    });
  };

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, idx) => idx !== index)
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ ...data, education: newEdu });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { company: "", role: "", location: "", duration: "", bullets: "" }]
    });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, idx) => idx !== index)
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    onChange({ ...data, experience: newExp });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [...data.projects, { title: "", role: "", desc: "", link: "" }]
    });
  };

  const removeProject = (index: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_, idx) => idx !== index)
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const newProj = [...data.projects];
    newProj[index] = { ...newProj[index], [field]: value };
    onChange({ ...data, projects: newProj });
  };

  const handleSaveLocal = () => {
    localStorage.setItem("stackmap_resume_profile", JSON.stringify(data));
    setSaveStatus("Profile Saved Locally!");
    setTimeout(() => setSaveStatus(""), 2000);
  };

  const handleApplyAIEnhancement = (improvedText: string, index: number, type: "exp" | "proj") => {
    if (type === "exp") {
      const current = data.experience[index]?.bullets || "";
      const delimiter = current.length > 0 ? "\n" : "";
      updateExperience(index, "bullets", current + delimiter + "• " + improvedText);
    } else {
      const current = data.projects[index]?.desc || "";
      const delimiter = current.length > 0 ? "\n" : "";
      updateProject(index, "desc", current + delimiter + "• " + improvedText);
    }
  };

  const menuItems = [
    { id: "personal", label: "Contact Info" },
    { id: "edu", label: "Education" },
    { id: "skills", label: "Skills Tagging" },
    { id: "exp", label: "Experience" },
    { id: "proj", label: "Projects" },
    { id: "misc", label: "Credentials & Misc" }
  ];

  return (
    <div className="space-y-4 text-left flex flex-col md:flex-row gap-6">
      {/* Editor sub tabs navigation */}
      <div className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 md:w-48 flex-shrink-0 border-b md:border-b-0 md:border-r border-border/60 pr-0 md:pr-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveForm(item.id as any)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg text-left whitespace-nowrap transition-all duration-150 ${
              activeForm === item.id
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}

        <div className="pt-4 hidden md:block">
          <Button size="sm" onClick={handleSaveLocal} className="w-full text-xs font-bold flex items-center justify-center space-x-1.5 h-9">
            <Save className="h-4 w-4" />
            <span>{saveStatus ? "Saved!" : "Save Profile"}</span>
          </Button>
        </div>
      </div>

      {/* Inputs workspaces */}
      <div className="flex-grow space-y-5">
        {/* Personal Details */}
        {activeForm === "personal" && (
          <div className="space-y-4 animate-scale-in">
            <h3 className="font-bold text-sm text-foreground">Contact & Links Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Full Name</label>
                <Input value={personalDetailsField(data, "name")} onChange={(e) => updatePersonal("name", e.target.value)} placeholder="Alex Coder" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Email Address</label>
                <Input type="email" value={personalDetailsField(data, "email")} onChange={(e) => updatePersonal("email", e.target.value)} placeholder="student@stackmap.dev" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Phone Number</label>
                <Input value={personalDetailsField(data, "phone")} onChange={(e) => updatePersonal("phone", e.target.value)} placeholder="+1 (555) 019-2834" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Location</label>
                <Input value={personalDetailsField(data, "location")} onChange={(e) => updatePersonal("location", e.target.value)} placeholder="San Francisco, CA" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">GitHub Repository URL</label>
                <Input value={personalDetailsField(data, "github")} onChange={(e) => updatePersonal("github", e.target.value)} placeholder="https://github.com/alex" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">LinkedIn Profile URL</label>
                <Input value={personalDetailsField(data, "linkedin")} onChange={(e) => updatePersonal("linkedin", e.target.value)} placeholder="https://linkedin.com/in/alex" />
              </div>
            </div>
          </div>
        )}

        {/* Education Form */}
        {activeForm === "edu" && (
          <div className="space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">Education Index</h3>
              <Button size="sm" variant="outline" onClick={addEducation} className="h-8 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add school
              </Button>
            </div>

            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-card/20 space-y-3 relative">
                  <button
                    onClick={() => removeEducation(idx)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-red-400 p-1 rounded"
                    title="Remove School"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">School / University</label>
                      <Input value={edu.school} onChange={(e) => updateEducation(idx, "school", e.target.value)} placeholder="Georgia Institute of Technology" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Degree / Major</label>
                      <Input value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="BS in Computer Science" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">GPA Score (optional)</label>
                      <Input value={edu.gpa} onChange={(e) => updateEducation(idx, "gpa", e.target.value)} placeholder="3.8 / 4.0" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Graduation Date</label>
                      <Input value={edu.gradDate} onChange={(e) => updateEducation(idx, "gradDate", e.target.value)} placeholder="May 2026" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tagging */}
        {activeForm === "skills" && (
          <div className="space-y-4 animate-scale-in">
            <h3 className="font-bold text-sm text-foreground">Skills Catalog</h3>
            <p className="text-xs text-muted-foreground">Provide core technologies separated by commas. (e.g. React, TypeScript, Next.js, Node.js, Prisma, PostgreSQL)</p>
            <textarea
              className="w-full h-32 p-3 text-sm rounded-lg border border-border bg-background"
              placeholder="React, TypeScript, Next.js, Git, HTML, CSS"
              value={data.skills}
              onChange={(e) => onChange({ ...data, skills: e.target.value })}
            />
          </div>
        )}

        {/* Experience Form */}
        {activeForm === "exp" && (
          <div className="space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">Professional & Internship Experience</h3>
              <Button size="sm" variant="outline" onClick={addExperience} className="h-8 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add role
              </Button>
            </div>

            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-card/20 space-y-3 relative">
                  <button
                    onClick={() => removeExperience(idx)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-red-400 p-1 rounded"
                    title="Remove Experience"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Company Name</label>
                      <Input value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} placeholder="Amazon Web Services" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Target Role Title</label>
                      <Input value={exp.role} onChange={(e) => updateExperience(idx, "role", e.target.value)} placeholder="Software Engineer Intern" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Employment Duration</label>
                      <Input value={exp.duration} onChange={(e) => updateExperience(idx, "duration", e.target.value)} placeholder="Jun 2025 - Aug 2025" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Office Location</label>
                      <Input value={exp.location} onChange={(e) => updateExperience(idx, "location", e.target.value)} placeholder="Seattle, WA / Remote" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Bullet Phrasing Description</label>
                    <textarea
                      className="w-full h-24 p-2.5 text-xs rounded-lg border border-border bg-background"
                      placeholder="• Architected microservice handlers saving 10% load latency...&#10;• Orchestrated Docker pipelines for AWS migrations..."
                      value={exp.bullets}
                      onChange={(e) => updateExperience(idx, "bullets", e.target.value)}
                    />
                  </div>

                  {/* Bullet optimizer tool */}
                  <AIBulletImprover
                    onApply={(text) => handleApplyAIEnhancement(text, idx, "exp")}
                    placeholderText="Add plain items (e.g. helped dockerize servers) and optimize to metrics-driven phrase"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Form */}
        {activeForm === "proj" && (
          <div className="space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-foreground">Academic & Showcase Projects</h3>
              <Button size="sm" variant="outline" onClick={addProject} className="h-8 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add project
              </Button>
            </div>

            <div className="space-y-5">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-card/20 space-y-3 relative">
                  <button
                    onClick={() => removeProject(idx)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-red-400 p-1 rounded"
                    title="Remove Project"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Project Title</label>
                      <Input value={proj.title} onChange={(e) => updateProject(idx, "title", e.target.value)} placeholder="E-Commerce System" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Role / Scope</label>
                      <Input value={proj.role} onChange={(e) => updateProject(idx, "role", e.target.value)} placeholder="Sole Developer / Lead Architect" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Repository / Demo Web link</label>
                    <Input value={proj.link} onChange={(e) => updateProject(idx, "link", e.target.value)} placeholder="https://github.com/alex/ecomm" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Project Highlights</label>
                    <textarea
                      className="w-full h-24 p-2.5 text-xs rounded-lg border border-border bg-background"
                      placeholder="• Engineered global state cart widgets using Zustand...&#10;• Configured Prisma migration schemas connected to Postgres..."
                      value={proj.desc}
                      onChange={(e) => updateProject(idx, "desc", e.target.value)}
                    />
                  </div>

                  {/* Bullet optimizer */}
                  <AIBulletImprover
                    onApply={(text) => handleApplyAIEnhancement(text, idx, "proj")}
                    placeholderText="Write plain details (e.g. built cart using zustand) and click optimize"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Credentials & Miscellaneous */}
        {activeForm === "misc" && (
          <div className="space-y-4 animate-scale-in">
            <h3 className="font-bold text-sm text-foreground">Achievements & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Honors & Achievements (1 per line)</label>
                <textarea
                  className="w-full h-40 p-3 text-xs rounded-lg border border-border bg-background"
                  placeholder="• Ranked 1st place in University Hackathon&#10;• Solved 150+ challenges on LeetCode"
                  value={data.achievements}
                  onChange={(e) => onChange({ ...data, achievements: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-semibold">Technical Certifications (1 per line)</label>
                <textarea
                  className="w-full h-40 p-3 text-xs rounded-lg border border-border bg-background"
                  placeholder="• AWS Certified Developer Associate&#10;• Next.js Professional Certification"
                  value={data.certifications}
                  onChange={(e) => onChange({ ...data, certifications: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Utility field extractor
function personalDetailsField(data: ResumeData, field: string) {
  return (data.personal as any)?.[field] || "";
}
