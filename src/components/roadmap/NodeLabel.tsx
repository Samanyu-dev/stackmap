"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { RoadmapNodeData } from "@/store/useRoadmapStore";

interface NodeLabelProps {
  milestone: RoadmapNodeData;
  status: "complete" | "active" | "locked";
  x: number;
  y: number;
  onClick: () => void;
}

export default function NodeLabel({ milestone, status, x, y, onClick }: NodeLabelProps) {
  return (
    <motion.div
      className={`node-label-item ${status} cursor-pointer z-10`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="node-icon">
        {status === "complete" ? (
          <Check className="h-3.5 w-3.5 stroke-[3] text-pulsar" />
        ) : (
          <span>{milestone.order + 1}</span>
        )}
      </div>
      
      <span className="font-sans text-xs font-semibold tracking-wide text-starlight pr-1">
        {milestone.title}
      </span>
      
      <div className={`difficulty-pill ${milestone.difficulty.toLowerCase()}`}>
        {milestone.difficulty}
      </div>
    </motion.div>
  );
}
