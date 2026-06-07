"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  perPage?: number;
  current: number;
  onChange: (page: number) => void;
}

function generatePageRange(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const range: (number | string)[] = [];
  
  // Always include page 1
  range.push(1);
  
  if (current > 3) {
    range.push("...");
  }
  
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  
  if (current < total - 2) {
    range.push("...");
  }
  
  // Always include last page
  range.push(total);
  
  return range;
}

export default function Pagination({ total, perPage = 12, current, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const pages = generatePageRange(current, totalPages);

  return (
    <motion.nav
      className="pagination"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      {/* Prev */}
      <motion.button
        className="page-btn nav-btn cursor-pointer"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={14} />
        <span>Prev</span>
      </motion.button>

      {/* Page numbers */}
      <div className="page-nums">
        <AnimatePresence mode="popLayout">
          {pages.map((p, i) => p === "..." ? (
            <span key={`ellipsis-${i}`} className="page-ellipsis">···</span>
          ) : (
            <motion.button
              key={p}
              className={`page-btn cursor-pointer ${p === current ? "active" : ""}`}
              onClick={() => onChange(p as number)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {p === current && (
                <motion.div
                  className="page-active-bg"
                  layoutId="pageActive"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>{p}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Next */}
      <motion.button
        className="page-btn nav-btn cursor-pointer"
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Next</span>
        <ChevronRight size={14} />
      </motion.button>
      
      {/* Page info */}
      <span className="page-info">
        {((current - 1) * perPage) + 1}–{Math.min(current * perPage, total)} of {total}
      </span>
    </motion.nav>
  );
}
