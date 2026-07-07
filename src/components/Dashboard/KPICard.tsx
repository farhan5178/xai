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

  return (
    <motion.div
      className="rounded-xl p-5 border group cursor-default"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{
        borderColor: "rgba(124,58,237,0.35)",
        boxShadow: "0 0 30px rgba(124,58,237,0.1), 0 4px 20px rgba(0,0,0,0.4)",
        y: -2,
      }}
    >
      <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
        {item.label}
      </div>
      <div className="flex items-end gap-3">
        <span className="font-display font-bold text-3xl text-white">{formatted}</span>
        <span
          className={`text-xs font-mono pb-1 ${
            item.positive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {item.delta}
        </span>
      </div>
    </motion.div>
  );
}

export function KPICards({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {kpiData.map((item, i) => (
        <KPICard key={item.id} item={item} index={i} isVisible={isVisible} />
      ))}
    </div>
  );
}
