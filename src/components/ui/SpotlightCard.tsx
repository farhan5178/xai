"use client";

import { useRef, MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(124, 58, 237, 0.15)", // Default violet glow
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 group transition-all duration-300 ${className}`}
      style={{
        // Define local custom CSS style for the radial glow
        backgroundImage: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 40%)`,
      }}
    >
      {/* Spotlight border overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: "1px solid transparent",
          background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.08), transparent 80%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
