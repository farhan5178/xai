"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { tableData } from "@/lib/mockData";

const priorityConfig = {
  Critical: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)" },
  High: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  Medium: { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.2)" },
  Low: { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
} as const;

export function DataTable() {
  const [selected, setSelected] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"confidence" | "time">("confidence");

  const sorted = [...tableData].sort((a, b) => {
    if (sortBy === "confidence") return b.confidence - a.confidence;
    return 0;
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Table header */}
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-white text-sm">Latest Insights</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-tertiary)]">Sort:</span>
          {(["confidence", "time"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className="text-xs font-mono px-2 py-1 rounded capitalize transition-colors"
              style={{
                color: sortBy === s ? "#7c3aed" : "var(--text-tertiary)",
                background: sortBy === s ? "rgba(124,58,237,0.1)" : "transparent",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1">
        {sorted.map((row, i) => {
          const pc = priorityConfig[row.priority as keyof typeof priorityConfig];
          const isSelected = selected === row.id;

          return (
            <motion.div
              key={row.id}
              className="rounded-xl border cursor-pointer overflow-hidden"
              style={{
                background: isSelected ? "rgba(124,58,237,0.08)" : "transparent",
                borderColor: isSelected ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)",
              }}
              onClick={() => setSelected(isSelected ? null : row.id)}
              whileHover={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3 px-3 py-2.5">
                {/* ID */}
                <span className="font-mono text-[10px] text-[var(--text-muted)] w-16 flex-shrink-0">
                  {row.id}
                </span>

                {/* Insight text */}
                <span className="text-xs text-[var(--text-secondary)] flex-1 truncate group-hover:text-white">
                  {row.insight}
                </span>

                {/* Confidence */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: pc.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${row.confidence}%` }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                    {row.confidence}%
                  </span>
                </div>

                {/* Priority badge */}
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold flex-shrink-0 border"
                  style={{
                    color: pc.color,
                    background: pc.bg,
                    borderColor: pc.border,
                  }}
                >
                  {row.priority}
                </span>

                {/* Time */}
                <span className="font-mono text-[10px] text-[var(--text-muted)] flex-shrink-0">
                  {row.time}
                </span>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-3 py-3 border-t text-xs text-[var(--text-secondary)]"
                      style={{ borderColor: "rgba(124,58,237,0.2)" }}
                    >
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-[var(--text-tertiary)] font-mono text-[10px] uppercase tracking-wider">Source</span>
                          <p className="text-white mt-0.5">{row.source}</p>
                        </div>
                        <div>
                          <span className="text-[var(--text-tertiary)] font-mono text-[10px] uppercase tracking-wider">Confidence</span>
                          <p className="text-white mt-0.5">{row.confidence}%</p>
                        </div>
                        <div className="flex-1">
                          <span className="text-[var(--text-tertiary)] font-mono text-[10px] uppercase tracking-wider">Recommended action</span>
                          <p className="text-white mt-0.5">Review and escalate to relevant team →</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
