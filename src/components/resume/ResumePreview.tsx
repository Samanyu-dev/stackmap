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
        isFaang && "font-serif leading-relaxed tracking-wide",
        isInternship && "font-sans leading-normal tracking-normal",
        isFresher && "font-sans leading-relaxed text-[11px]",
        isStartup && "font-sans leading-relaxed border-t-8 border-t-violet-600 shadow-2xl"
      )}
    >
      {/* 1. HEADER SECTION */}
      <div className={cn(
        "mb-6 border-b pb-4 border-zinc-200", 
        isFaang && "text-center border-b-2 border-zinc-950 pb-3", 
        isStartup && "border-b border-violet-100 pb-5"
      )}>
        <h1 className={cn(
          "text-2xl font-bold tracking-tight uppercase text-zinc-900", 
          isFaang && "font-serif tracking-normal text-3xl font-semibold normal-case", 
          isStartup && "text-violet-600 text-3xl font-extrabold tracking-tight",
          isFresher && "text-2xl font-black text-zinc-900"
        )}>
          {personal.name || "Student Name"}
        </h1>
        <div className={cn(
          "flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-zinc-600 mt-2 font-light",
          isFaang && "justify-center text-zinc-800 text-[11px]",
          isStartup && "text-zinc-500 gap-x-4",
          isFresher && "text-zinc-700"
        )}>
          {personal.email && (
            <span>
              {isFaang ? "" : "✉ "}{personal.email}
            </span>
          )}
          {personal.phone && (
            <span>
              {isFaang ? " | " : "☎ "}{personal.phone}
            </span>
          )}
          {personal.location && (
            <span>
              {isFaang ? " | " : "📍 "}{personal.location}
            </span>
          )}
          {personal.github && (
            <span className="font-medium text-zinc-900">
              {isFaang ? " | GitHub: " : "⚡ github.com/"}{personal.github.replace("https://github.com/", "").replace("github.com/", "")}
            </span>
          )}
          {personal.linkedin && (
            <span className="font-medium text-zinc-900">
              {isFaang ? " | LinkedIn: " : "💼 linkedin.com/in/"}{personal.linkedin.replace("https://linkedin.com/in/", "").replace("linkedin.com/in/", "")}
            </span>
          )}
        </div>
      </div>

      {/* 2. BODY CONTENT SECTION */}
      {isFresher ? (
        /* ================= FRESHER 2-COLUMN LAYOUT ================= */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column (1/3) - Metadata, Education, Skills, Certifications */}
          <div className="md:col-span-1 space-y-5 border-r border-zinc-100 pr-5">
            {/* Education */}
            {education.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="text-xs font-black uppercase text-zinc-900 tracking-wider border-b border-zinc-200 pb-1">
                  Education
                </h2>
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-bold text-zinc-900 text-[11.5px]">{edu.school}</div>
                    <div className="text-zinc-600 italic text-[10.5px]">{edu.degree}</div>
                    <div className="text-[10px] text-zinc-500 font-medium">{edu.gradDate} • GPA: {edu.gpa}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skillsArray.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase text-zinc-900 tracking-wider border-b border-zinc-200 pb-1">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {skillsArray.map((skill, idx) => (
                    <span key={idx} className="bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && (
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase text-zinc-900 tracking-wider border-b border-zinc-200 pb-1">
                  Certifications
                </h2>
                <ul className="space-y-1.5 text-[10px] text-zinc-700 leading-normal">
                  {certifications.split("\n").filter(Boolean).map((cert, idx) => (
                    <li key={idx} className="list-none border-l-2 border-zinc-300 pl-2">
                      {cert.replace(/^[-*•\s]+/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column (2/3) - Experience, Projects, Achievements */}
          <div className="md:col-span-2 space-y-5">
            {/* Experience */}
            {experience.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase text-zinc-900 tracking-wider border-b border-zinc-200 pb-1">
                  Experience
                </h2>
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-zinc-900 text-sm">{exp.company}</span>
                        <span className="text-zinc-500 italic ml-2">— {exp.role}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold">{exp.duration}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 italic font-medium -mt-0.5">{exp.location}</div>
                    <ul className="list-disc pl-4 text-[10.5px] text-zinc-700 space-y-1 font-light mt-1">
                      {exp.bullets.split("\n").filter(Boolean).map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet.replace(/^[-*•\s]+/, "")}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase text-zinc-900 tracking-wider border-b border-zinc-200 pb-1">
                  Academic Projects
                </h2>
                {projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-zinc-900 text-sm">{proj.title}</span>
                        {proj.role && <span className="text-zinc-500 italic text-[10px] ml-2">({proj.role})</span>}
                      </div>
                      {proj.link && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {proj.link.replace("https://", "")}
                        </span>
                      )}
                    </div>
                    <ul className="list-disc pl-4 text-[10.5px] text-zinc-700 space-y-1 font-light">
                      {proj.desc.split("\n").filter(Boolean).map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet.replace(/^[-*•\s]+/, "")}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {achievements && (
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase text-zinc-900 tracking-wider border-b border-zinc-200 pb-1">
                  Achievements
                </h2>
                <ul className="list-disc pl-4 text-[10.5px] text-zinc-700 space-y-1 font-light">
                  {achievements.split("\n").filter(Boolean).map((ach, idx) => (
                    <li key={idx}>{ach.replace(/^[-*•\s]+/, "")}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= STANDARD SINGLE COLUMN LAYOUTS (FAANG, Internship, Startup) ================= */
        <div className="space-y-5">
          {/* Section rendering order changes based on template. Internship puts Education at the very top. */}
          
          {/* A. EDUCATION */}
          {education.length > 0 && (
            <div>
              <h2 className={cn(
                "text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2 text-zinc-900", 
                isFaang && "border-zinc-800 font-serif tracking-normal text-xs",
                isStartup && "text-violet-600 border-violet-100 font-extrabold text-xs"
              )}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-zinc-900">{edu.school || "University Name"}</span>
                      <p className="text-zinc-600 italic -mt-0.5">{edu.degree || "Degree"}</p>
                    </div>
                    <div className="text-right text-[10px] text-zinc-500 font-medium">
                      <span className="block font-bold text-zinc-700">{edu.gradDate}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* B. SKILLS */}
          {skillsArray.length > 0 && (
            <div>
              <h2 className={cn(
                "text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2 text-zinc-900", 
                isFaang && "border-zinc-800 font-serif tracking-normal text-xs",
                isStartup && "text-violet-600 border-violet-100 font-extrabold text-xs"
              )}>
                Skills
              </h2>
              {isFaang ? (
                /* Traditional plain comma list */
                <p className="text-zinc-800 text-[11px] font-normal leading-relaxed">
                  {skillsArray.join(", ")}
                </p>
              ) : isStartup ? (
                /* Modern colored startup badges */
                <div className="flex flex-wrap gap-1.5">
                  {skillsArray.map((skill, idx) => (
                    <span key={idx} className="bg-violet-50 text-violet-700 border border-violet-100 px-2.5 py-0.5 rounded-full text-[9.5px] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                /* Standard gray tags */
                <div className="flex flex-wrap gap-1">
                  {skillsArray.map((skill, idx) => (
                    <span key={idx} className="bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded text-[10px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* C. EXPERIENCE */}
          {experience.length > 0 && (
            <div>
              <h2 className={cn(
                "text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2 text-zinc-900", 
                isFaang && "border-zinc-800 font-serif tracking-normal text-xs",
                isStartup && "text-violet-600 border-violet-100 font-extrabold text-xs"
              )}>
                Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-zinc-900 text-sm">{exp.company}</span>
                        <span className="text-zinc-500 italic ml-2">— {exp.role}</span>
                      </div>
                      <div className="text-right text-[10px] text-zinc-500 font-bold">
                        <span className="block text-zinc-700">{exp.duration}</span>
                        <span className="font-normal text-zinc-400">{exp.location}</span>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 text-[10.5px] text-zinc-700 space-y-1 font-light leading-relaxed">
                      {exp.bullets.split("\n").filter(Boolean).map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet.replace(/^[-*•\s]+/, "")}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* D. ACADEMIC PROJECTS */}
          {projects.length > 0 && (
            <div>
              <h2 className={cn(
                "text-sm font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2 text-zinc-900", 
                isFaang && "border-zinc-800 font-serif tracking-normal text-xs",
                isStartup && "text-violet-600 border-violet-100 font-extrabold text-xs"
              )}>
                Academic Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-zinc-900 text-sm">{proj.title}</span>
                        {proj.role && <span className="text-zinc-500 italic text-[10px] ml-2">({proj.role})</span>}
                      </div>
                      {proj.link && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {proj.link.replace("https://", "")}
                        </span>
                      )}
                    </div>
                    <ul className="list-disc pl-5 text-[10.5px] text-zinc-700 space-y-1 font-light leading-relaxed">
                      {proj.desc.split("\n").filter(Boolean).map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet.replace(/^[-*•\s]+/, "")}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* E. ACHIEVEMENTS & CERTIFICATIONS */}
          {(achievements || certifications) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {achievements && (
                <div>
                  <h2 className={cn(
                    "text-xs font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2 text-zinc-900", 
                    isFaang && "border-zinc-800 font-serif text-[11px]",
                    isStartup && "text-violet-600 border-violet-100 font-extrabold text-[11px]"
                  )}>
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
                  <h2 className={cn(
                    "text-xs font-bold uppercase border-b border-zinc-300 pb-0.5 tracking-wider mb-2 text-zinc-900", 
                    isFaang && "border-zinc-800 font-serif text-[11px]",
                    isStartup && "text-violet-600 border-violet-100 font-extrabold text-[11px]"
                  )}>
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
      )}
    </div>
  );
}

