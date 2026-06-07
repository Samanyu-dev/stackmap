"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface StackMapLogoProps {
  size?: number;
  animate?: boolean;
}

export default function StackMapLogo({ size = 36, animate = true }: StackMapLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !containerRef.current) return;
    
    const outerArc = containerRef.current.querySelector(".arc-outer");
    const innerArc = containerRef.current.querySelector(".arc-inner");

    if (outerArc) {
      gsap.to(outerArc, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
      });
    }

    if (innerArc) {
      gsap.to(innerArc, {
        rotation: -360,
        duration: 14,
        repeat: -1,
        ease: "none",
        transformOrigin: "center"
      });
    }
  }, [animate]);

  return (
    <div ref={containerRef} style={{ width: size, height: size, position: "relative" }}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer orbital arc — violet */}
        <g className="arc-outer">
          <path
            d="M 20 4 A 16 16 0 0 1 36 20 A 16 16 0 0 1 20 36"
            stroke="#6E54F7"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Dot at arc end */}
          <circle cx="20" cy="4" r="2" fill="#6E54F7" />
        </g>
        
        {/* Inner orbital arc — cyan */}
        <g className="arc-inner">
          <path
            d="M 20 36 A 11 11 0 0 1 9 20 A 11 11 0 0 1 20 9"
            stroke="#00E5CC"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <circle cx="20" cy="36" r="1.5" fill="#00E5CC" />
        </g>
        
        {/* Center node */}
        <circle cx="20" cy="20" r="3" fill="#6E54F7" />
        <circle
          cx="20"
          cy="20"
          r="5"
          stroke="#6E54F7"
          strokeWidth="0.5"
          opacity="0.4"
          fill="none"
        />
          
        {/* Stack lines — the "map grid" inside */}
        <line x1="16" y1="18" x2="24" y2="18" stroke="rgba(238,238,255,0.3)" strokeWidth="0.8" />
        <line x1="15" y1="20.5" x2="25" y2="20.5" stroke="rgba(238,238,255,0.3)" strokeWidth="0.8" />
        <line x1="16" y1="23" x2="24" y2="23" stroke="rgba(238,238,255,0.3)" strokeWidth="0.8" />
      </svg>
      
      {/* Glow pulse behind logo */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(110,84,247,0.25) 0%, transparent 70%)",
          animation: "logoPulse 3s ease-in-out infinite"
        }}
      />
    </div>
  );
}
