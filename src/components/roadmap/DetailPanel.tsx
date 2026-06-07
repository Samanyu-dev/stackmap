"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, ExternalLink, FileText, BookOpen, HelpCircle, Save, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRoadmapStore, RoadmapNodeData } from "@/store/useRoadmapStore";
import { cn } from "@/lib/utils";

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.387.508a3.003 3.003 0 00-2.11 2.11C0 8.025 0 12 0 12s0 3.975.503 5.837a3.003 3.003 0 002.11 2.11c1.862.508 9.387.508 9.387.508s7.525 0 9.387-.508a3.003 3.003 0 002.11-2.11c.503-1.862.503-5.837.503-5.837s0-3.975-.503-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface DetailPanelProps {
  node: RoadmapNodeData | null;
  onClose: () => void;
  totalNodes: number;
}

const Section = ({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) => (
  <motion.div
    initial={{ y: 15, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, type: "spring", stiffness: 80, damping: 15 }}
    className="space-y-3"
  >
    <h3 className="section-title text-[9px] font-mono text-muted-foreground uppercase tracking-widest border-b border-rim/35 pb-1">
      {title}
    </h3>
    {children}
  </motion.div>
);

export default function DetailPanel({ node, onClose, totalNodes }: DetailPanelProps) {
  const {
    completedNodes,
    bookmarkedNodes,
    nodeNotes,
    toggleNodeCompletion,
    toggleNodeBookmark,
    saveNodeNote
  } = useRoadmapStore();

  const [noteText, setNoteText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (node) {
      setNoteText(nodeNotes[node.slug] || "");
      setSaved(false);
    }
  }, [node, nodeNotes]);

  if (!node) return null;

  const isCompleted = !!completedNodes[node.slug];
  const isBookmarked = !!bookmarkedNodes[node.slug];

  const handleSaveNote = () => {
    saveNodeNote(node.slug, noteText);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.slug}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="detail-panel shadow-2xl relative flex flex-col h-full bg-void border-l border-rim overflow-y-auto"
      >
        {/* Panel Header */}
        <motion.div
          className="flex items-start justify-between pb-5 border-b border-rim gap-4"
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="milestone-number bg-surface border-rim text-nova-bright font-mono font-bold">
              {node.order + 1}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold italic text-starlight leading-snug">
                {node.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "difficulty-pill text-[9px] font-mono",
                  node.difficulty === "BEGINNER" && "beginner",
                  node.difficulty === "INTERMEDIATE" && "intermediate",
                  node.difficulty === "ADVANCED" && "advanced"
                )}>
                  {node.difficulty}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/80">
                  {node.estimatedTime}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleNodeBookmark(node.slug)}
              className={cn(
                "p-2 rounded-lg border border-rim bg-deep hover:bg-surface text-muted-foreground transition-all cursor-pointer",
                isBookmarked && "text-nova-bright border-nova/25 bg-nova/5 fill-nova-bright"
              )}
              title="Bookmark Topic"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-rim bg-deep hover:bg-surface text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Prerequisites */}
        {node.prerequisites && node.prerequisites.length > 0 && (
          <Section title="Prerequisites" delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {node.prerequisites.map((p, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 text-[10px] font-mono rounded bg-deep border border-rim text-muted-foreground/80 uppercase"
                >
                  {p.replace("-", " ")}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Learning Resources */}
        {node.resources && node.resources.length > 0 && (
          <Section title="Curated Learning Resources" delay={0.25}>
            <div className="space-y-2">
              {node.resources.map((r, idx) => (
                <motion.a
                  key={r.id || idx}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card bg-deep border-rim cursor-pointer group"
                  initial={{ x: 15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + idx * 0.05 }}
                  whileHover={{ x: 4, borderColor: "rgba(110,84,247,0.3)" }}
                >
                  {r.type === "YOUTUBE" ? (
                    <YoutubeIcon className="h-4.5 w-4.5 text-red-500 flex-shrink-0" />
                  ) : r.type === "DOCUMENTATION" ? (
                    <FileText className="h-4.5 w-4.5 text-pulsar flex-shrink-0" />
                  ) : (
                    <ExternalLink className="h-4.5 w-4.5 text-nova flex-shrink-0" />
                  )}
                  <span className="text-[12.5px] font-sans text-text-secondary line-clamp-1 group-hover:text-nova-bright transition-colors">
                    {r.title}
                  </span>
                  <span className="resource-type-badge font-mono text-[8px] tracking-wider uppercase border border-rim/35">
                    {r.type.toLowerCase()}
                  </span>
                </motion.a>
              ))}
            </div>
          </Section>
        )}

        {/* Practice Projects */}
        {node.projectIdeas && node.projectIdeas.length > 0 && (
          <Section title="Suggested Practice Projects" delay={0.35}>
            <div className="space-y-2">
              {node.projectIdeas.map((project, idx) => (
                <motion.div
                  key={idx}
                  className="project-card bg-deep border-rim"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35 + idx * 0.05 }}
                >
                  <span className="idea-label font-mono text-[9px] text-pulsar font-semibold uppercase tracking-wider">
                    Project Idea {idx + 1}
                  </span>
                  <p className="text-[13px] text-text-secondary leading-relaxed mt-1 font-sans">
                    {project}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Interview Prep */}
        {node.interviewQuestions && node.interviewQuestions.length > 0 && (
          <Section title="Topic Interview Prep" delay={0.45}>
            <div className="space-y-1">
              {node.interviewQuestions.map((q, idx) => (
                <motion.div
                  key={idx}
                  className="interview-q border-b border-rim/25"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.45 + idx * 0.04 }}
                >
                  <span className="q-mark font-mono text-nova">Q.</span>
                  <p className="text-[13px] text-text-secondary leading-relaxed font-sans">
                    {q}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Notes editor */}
        <Section title="My Learning Notes" delay={0.55}>
          <div className="space-y-3">
            <textarea
              className="notes-area bg-deep border-rim font-mono text-[12px] text-starlight placeholder:text-muted/40 focus:border-nova/55"
              placeholder="Jot down quick reminders, code snippets, syntax templates..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <button
              onClick={handleSaveNote}
              className="save-btn font-mono text-[11px] uppercase tracking-wider bg-nova hover:bg-nova-bright w-full flex items-center justify-center gap-2 cursor-pointer shadow-lg py-2.5"
            >
              <Save className="h-4 w-4" />
              <span>{saved ? "Saved" : "Save Notes"}</span>
            </button>
          </div>
        </Section>

        {/* Mark Complete */}
        <motion.div 
          className="mt-auto pt-6 border-t border-rim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => toggleNodeCompletion(node.slug)}
            className={cn(
              "complete-btn bg-nova/8 border-nova/30 text-nova-bright hover:bg-nova/15 transition-all font-mono tracking-wider text-[11px] uppercase cursor-pointer",
              isCompleted && "completed bg-pulsar/8 border-pulsar/30 text-pulsar hover:bg-pulsar/12"
            )}
          >
            <div className="complete-glow animate-pulse-glow" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isCompleted ? (
                <>
                  <Check className="h-4.5 w-4.5 stroke-[3] text-pulsar" />
                  <span>Topic Mastered</span>
                </>
              ) : (
                "Mark as Complete"
              )}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
