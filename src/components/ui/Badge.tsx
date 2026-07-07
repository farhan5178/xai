"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "violet" | "cyan" | "emerald" | "amber" | "red";
  variant?: "soft" | "solid" | "outline";
  size?: "sm" | "md";
}

const colorMap = {
  violet: {
    soft: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    solid: "bg-violet-600 text-white border-transparent",
    outline: "border-violet-500/40 text-violet-300 bg-transparent",
  },
  cyan: {
    soft: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    solid: "bg-cyan-600 text-white border-transparent",
    outline: "border-cyan-500/40 text-cyan-300 bg-transparent",
  },
  emerald: {
    soft: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    solid: "bg-emerald-600 text-white border-transparent",
    outline: "border-emerald-500/40 text-emerald-300 bg-transparent",
  },
  amber: {
    soft: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    solid: "bg-amber-600 text-white border-transparent",
    outline: "border-amber-500/40 text-amber-300 bg-transparent",
  },
  red: {
    soft: "bg-red-500/10 text-red-300 border-red-500/20",
    solid: "bg-red-600 text-white border-transparent",
    outline: "border-red-500/40 text-red-300 bg-transparent",
  },
};

const sizeMap = {
  sm: "text-[10px] px-2 py-0.5 tracking-wider",
  md: "text-xs px-2.5 py-1 tracking-wide",
};

export function Badge({
  children,
  color = "violet",
  variant = "soft",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-semibold rounded-md border uppercase ${colorMap[color][variant]} ${sizeMap[size]}`}
    >
      {children}
    </span>
  );
}
