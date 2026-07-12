"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { kpiData } from "@/lib/mockData";
import { fadeUp } from "@/lib/animations";

function useCountUp(target: number, duration = 1500, isActive = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isActive]);

  return count;
}

import { SpotlightCard } from "@/components/ui/SpotlightCard";

const kpiIcons: Record<string, React.ReactNode> = {
  "data-points": (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  insights: (
    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  accuracy: (
    <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  latency: (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function KPICard({
  item,
  index,
  isVisible,
}: {
  item: (typeof kpiData)[0];
  index: number;
  isVisible: boolean;
}) {
  const count = useCountUp(item.value, 1800, isVisible);

  const formatted =
    item.unit === "%"
      ? count.toFixed(1) + "%"
      : item.unit === "ms"
      ? count + "ms"
      : count >= 1_000_000
      ? (count / 1_000_000).toFixed(2) + "M"
      : count.toLocaleString();

  const glowColor = item.id === "accuracy" 
    ? "rgba(20, 184, 166, 0.12)"
    : item.id === "latency"
    ? "rgba(52, 211, 153, 0.12)"
    : "rgba(16, 185, 129, 0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <SpotlightCard
        glowColor={glowColor}
        className="border cursor-default h-full !rounded-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            {item.label}
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
            {kpiIcons[item.id]}
          </div>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">{formatted}</span>
          <span
            className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
              item.positive
                ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/10"
                : "text-red-400 bg-red-500/10 border border-red-500/10"
            }`}
          >
            {item.delta}
          </span>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function KPICards({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {kpiData.map((item, i) => (
        <KPICard key={item.id} item={item} index={i} isVisible={isVisible} />
      ))}
    </div>
  );
}
