"use client";

import React, { useState, useEffect } from "react";
import { X, Bookmark, ExternalLink, FileText, BookOpen, HelpCircle, Save } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRoadmapStore, RoadmapNodeData } from "@/store/useRoadmapStore";
import { cn } from "@/lib/utils";

interface RoadmapSidebarProps {
  node: RoadmapNodeData | null;
  onClose: () => void;
}

export default function RoadmapSidebar({ node, onClose }: RoadmapSidebarProps) {
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
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-card border-l border-border shadow-2xl z-50 flex flex-col transition-all duration-300 transform translate-x-0 animate-slide-in">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant={isCompleted ? "default" : "outline"}
            size="sm"
            onClick={() => toggleNodeCompletion(node.slug)}
            className={cn(isCompleted && "bg-green-500 hover:bg-green-600 text-white")}
          >
            {isCompleted ? "✓ Completed" : "Mark Complete"}
          </Button>

          <button
            onClick={() => toggleNodeBookmark(node.slug)}
            className={cn(
              "p-2 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground transition-colors",
              isBookmarked && "text-primary fill-primary border-primary/20"
            )}
            title="Bookmark"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg border hover:bg-secondary text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Details Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <Badge variant="outline" className="mb-2">
            {node.difficulty} • {node.estimatedTime}
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight">{node.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {node.description}
          </p>
        </div>

        {/* Prerequisites */}
        {node.prerequisites.length > 0 && (
          <div className="rounded-xl bg-secondary/50 p-3.5 border border-border/40">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
              Prerequisites
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {node.prerequisites.map((req) => (
                <Badge key={req} variant="secondary">
                  {req.replace("-", " ")}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Learning Resources */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-primary" /> Curated Learning Resources
          </h3>
          <div className="space-y-2">
            {node.resources.map((res) => (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  {res.type === "YOUTUBE" ? (
                    <YoutubeIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                  ) : res.type === "DOCUMENTATION" ? (
                    <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  ) : (
                    <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {res.title}
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase">
                  {res.type.toLowerCase()}
                </Badge>
              </a>
            ))}
          </div>
        </div>

        {/* Project Ideas */}
        {node.projectIdeas && node.projectIdeas.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center">
              <Save className="h-4 w-4 mr-2 text-primary" /> Suggested Practice Projects
            </h3>
            <div className="space-y-2">
              {node.projectIdeas.map((project, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-border/80 bg-background/50 text-sm leading-relaxed"
                >
                  <span className="font-bold text-primary mr-1">Idea {idx + 1}:</span>
                  {project}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interview Prep */}
        {node.interviewQuestions && node.interviewQuestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-primary" /> Topic Interview Prep
            </h3>
            <div className="space-y-2">
              {node.interviewQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-border bg-background text-sm flex items-start space-x-2.5"
                >
                  <span className="font-bold text-muted-foreground">Q.</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Pad */}
        <div className="space-y-3 border-t border-border pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              My Learning Notes
            </h3>
            <Button size="sm" onClick={handleSaveNote} className="h-8">
              {saved ? "Saved!" : "Save Notes"}
            </Button>
          </div>
          <textarea
            className="w-full h-32 p-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            placeholder="Jot down quick reminders, code snippets, syntax templates, or bookmark keys..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
