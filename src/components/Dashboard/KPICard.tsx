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
        <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
          {item.label}
        </div>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="font-display font-bold text-4xl text-white tracking-tight">{formatted}</span>
          <span
            className={`text-sm font-mono font-medium ${
              item.positive ? "text-emerald-400" : "text-red-400"
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
    <div className="grid grid-cols-2 gap-5">
      {kpiData.map((item, i) => (
        <KPICard key={item.id} item={item} index={i} isVisible={isVisible} />
      ))}
    </div>
  );
}
