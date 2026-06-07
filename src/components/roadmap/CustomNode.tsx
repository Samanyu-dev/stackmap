"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { CheckSquare, Square, Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { cn } from "@/lib/utils";

export default function CustomNode({ data }: { data: any }) {
  const { completedNodes, bookmarkedNodes, toggleNodeCompletion, toggleNodeBookmark } = useRoadmapStore();
  
  const isCompleted = !!completedNodes[data.slug];
  const isBookmarked = !!bookmarkedNodes[data.slug];

  const handleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNodeCompletion(data.slug);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNodeBookmark(data.slug);
  };

  return (
    <div
      className={cn(
        "px-4 py-3 shadow-md rounded-xl border w-64 transition-all duration-300 bg-card hover:shadow-lg",
        isCompleted
          ? "border-green-500/50 shadow-green-500/5 bg-green-500/5"
          : "border-border hover:border-primary/50"
      )}
    >
      {/* React Flow Connection Handles */}
      <Handle type="target" position={Position.Top} className="!bg-primary/50" />

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          {/* Completion Checkbox */}
          <button
            onClick={handleCheckbox}
            className={cn(
              "p-0.5 rounded transition-colors duration-150 hover:bg-secondary text-muted-foreground",
              isCompleted && "text-green-500"
            )}
            title="Mark Completed"
          >
            {isCompleted ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
          </button>
          
          <span className="font-semibold text-sm leading-tight text-foreground truncate max-w-[150px]">
            {data.title}
          </span>
        </div>

        {/* Bookmark Toggle */}
        <button
          onClick={handleBookmark}
          className={cn(
            "p-0.5 rounded transition-colors duration-150 hover:bg-secondary text-muted-foreground",
            isBookmarked && "text-primary fill-primary"
          )}
          title="Bookmark Topic"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
        {data.description}
      </p>

      {/* Meta row */}
      <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{data.estimatedTime}</span>
        </div>
        <Badge
          variant={
            data.difficulty === "BEGINNER"
              ? "info"
              : data.difficulty === "INTERMEDIATE"
              ? "warning"
              : "destructive"
          }
          className="px-1.5 py-0 text-[9px] uppercase"
        >
          {data.difficulty}
        </Badge>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-primary/50" />
    </div>
  );
}
