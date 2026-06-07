"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable custom cursor styles
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x,
          y,
          duration: 0.08,
          ease: "power2.out"
        });
      }

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x,
          y,
          duration: 0.45,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Expand cursor ring on hover over interactive tags
    const handleHoverEnter = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1.8,
          backgroundColor: "rgba(124, 92, 250, 0.08)",
          borderColor: "#06D6C7", // Change border to cyan
          duration: 0.3
        });
      }
    };

    const handleHoverLeave = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1.0,
          backgroundColor: "rgba(124, 92, 250, 0.03)",
          borderColor: "rgba(124, 92, 250, 0.6)", // Reset to violet
          duration: 0.3
        });
      }
    };

    // Scan the DOM and attach listeners
    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        "button, a, [role='button'], input, textarea, select, .node-label-item, [data-magnetic]"
      );
      interactives.forEach((item) => {
        item.removeEventListener("mouseenter", handleHoverEnter);
        item.removeEventListener("mouseleave", handleHoverLeave);
        item.addEventListener("mouseenter", handleHoverEnter);
        item.addEventListener("mouseleave", handleHoverLeave);
      });
    };

    attachListeners();

    // Use MutationObserver to auto-hook dynamic items (like loading sidebar pages)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="cursor-container hidden md:block">
      <div ref={ringRef} className="cursor-ring pointer-events-none" />
      <div ref={dotRef} className="cursor-dot pointer-events-none" />
    </div>
  );
}
