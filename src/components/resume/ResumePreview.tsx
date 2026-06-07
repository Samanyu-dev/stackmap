"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ResumeData {
  personal: { name: string; email: string; phone: string; location: string; github: string; linkedin: string };
  education: { school: string; degree: string; gpa: string; gradDate: string }[];
  skills: string;
  projects: { title: string; role: string; desc: string; link: string }[];
  experience: { company: string; role: string; location: string; duration: string; bullets: string }[];
  achievements: string;
  certifications: string;
}

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const { personal, education, skills, projects, experience, achievements, certifications } = data;

  // Split skills/bullets
  const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);

  // Template Styles
  const isFaang = template === "faang";
  const isInternship = template === "internship";
  const isFresher = template === "fresher";
  const isStartup = template === "startup";

  return (
    <div
      className={cn(
        "w-full bg-white text-black shadow-xl p-8 border border-zinc-200 min-h-[840px] text-left text-xs transition-all duration-300 rounded-xl overflow-hidden",
        isFaang && "font-serif leading-relaxed",
        (isInternship || isFresher) && "font-sans leading-normal",
        isStartup && "font-sans leading-relaxed border-l-8 border-l-violet-600"
      )}
    >
      {/* 1. HEADER SECTION */}
      <div className={cn("text-center mb-6", isStartup && "text-left mb-6 border-b border-zinc-200 pb-4")}>
        <h1 className={cn("text-2xl font-bold tracking-tight uppercase", isFaang && "font-serif tracking-normal text-3xl", isStartup && "text-violet-600 text-3xl")}>
          {personal.name || "Student Name"}
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 text-[10px] text-zinc-600 mt-2 font-light">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.github && (
            <span className="font-medium text-zinc-950">
              • GitHub: {personal.github.replace("https://", "")}
            </span>
          )}
          {personal.linkedin && (
            <span className="font-medium text-zinc-950">
              • LinkedIn: {personal.linkedin.replace("https://", "")}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* 2. EDUCATION SECTION (Top for Internship / Faang) */}
        {education.length > 0 && (
          <div>
            <h2 className={cn("text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2", isStartup && "text-violet-600 border-zinc-150")}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-zinc-900">{edu.school || "University Name"}</span>
                    <p className="text-zinc-600 italic">{edu.degree || "B.S. in Computer Science"}</p>
                  </div>
                  <div className="text-right text-[10px] text-zinc-500">
                    <span className="block font-bold">{edu.gradDate || "May 2026"}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SKILLS SECTION */}
        {skillsArray.length > 0 && (
          <div>
            <h2 className={cn("text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2", isStartup && "text-violet-600 border-zinc-150")}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-zinc-700">
              {skillsArray.map((skill, idx) => (
                <span key={idx} className={cn("bg-zinc-100 px-2 py-0.5 rounded text-[10px] text-zinc-950 font-medium", isFaang && "bg-transparent p-0 text-zinc-800")}>
                  {skill}{isFaang && idx < skillsArray.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4. WORK EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <div>
            <h2 className={cn("text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2", isStartup && "text-violet-600 border-zinc-150")}>
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-zinc-900">{exp.company || "Company Name"}</span>
                      <span className="text-zinc-500 italic ml-2">— {exp.role || "Software Intern"}</span>
                    </div>
                    <div className="text-right text-[10px] text-zinc-500">
                      <span className="block font-bold">{exp.duration || "Jun 2025 - Present"}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>
                  </div>
                  <ul className="list-disc pl-5 text-[10.5px] text-zinc-700 space-y-1 font-light">
                    {exp.bullets.split("\n").filter(Boolean).map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet.replace(/^[-*•\s]+/, "")}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROJECTS SECTION */}
        {projects.length > 0 && (
          <div>
            <h2 className={cn("text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2", isStartup && "text-violet-600 border-zinc-150")}>
              Academic Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-zinc-900">{proj.title || "Project Title"}</span>
                      {proj.role && <span className="text-zinc-500 italic text-[10px] ml-2">({proj.role})</span>}
                    </div>
                    {proj.link && (
                      <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[200px]">
                        {proj.link.replace("https://", "")}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc pl-5 text-[10.5px] text-zinc-700 space-y-1 font-light">
                    {proj.desc.split("\n").filter(Boolean).map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet.replace(/^[-*•\s]+/, "")}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. ACHIEVEMENTS & CERTIFICATIONS */}
        {(achievements || certifications) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements && (
              <div>
                <h2 className={cn("text-xs font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2", isStartup && "text-violet-600 border-zinc-150")}>
                  Achievements
                </h2>
                <ul className="list-disc pl-5 text-[10.5px] text-zinc-700 space-y-1 font-light">
                  {achievements.split("\n").filter(Boolean).map((ach, idx) => (
                    <li key={idx}>{ach.replace(/^[-*•\s]+/, "")}</li>
                  ))}
                </ul>
              </div>
            )}

            {certifications && (
              <div>
                <h2 className={cn("text-xs font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2", isStartup && "text-violet-600 border-zinc-150")}>
                  Certifications
                </h2>
                <ul className="list-disc pl-5 text-[10.5px] text-zinc-700 space-y-1 font-light">
                  {certifications.split("\n").filter(Boolean).map((cert, idx) => (
                    <li key={idx}>{cert.replace(/^[-*•\s]+/, "")}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
