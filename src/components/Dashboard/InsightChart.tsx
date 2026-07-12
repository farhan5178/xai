"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartData } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useState } from "react";

const metrics = [
  { key: "insights", label: "Insights", color: "#7c3aed" },
  { key: "anomalies", label: "Anomalies", color: "#06b6d4" },
  { key: "processed", label: "Processed", color: "#10b981" },
] as const;

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border p-3 text-sm"
      style={{
        background: "rgba(13,17,23,0.95)",
        borderColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        padding: "12px 16px",
      }}
    >
      <p className="font-mono text-xs text-[var(--text-tertiary)] mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[var(--text-secondary)] capitalize">{entry.dataKey}:</span>
          <span className="font-mono font-semibold text-white ml-auto pl-4">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export function InsightChart() {
  const [activeMetric, setActiveMetric] = useState<string>("insights");

  const metric = metrics.find((m) => m.key === activeMetric)!;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-display font-semibold text-white text-sm">Activity Timeline</h4>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Last 24 hours</p>
        </div>
        <div className="flex items-center gap-1">
          {metrics.map((m) => (
            <motion.button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className="px-3 py-1 rounded-lg text-xs font-mono border transition-all duration-200"
              style={{
                padding: "6px 14px",
                ...(activeMetric === m.key
                  ? {
                      background: m.color + "20",
                      borderColor: m.color + "40",
                      color: m.color,
                    }
                  : {
                      background: "rgba(255,255,255,0)",
                      borderColor: "var(--border)",
                      color: "var(--text-tertiary)",
                    })
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {m.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metric.color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "#4b5563", fontSize: 9, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#4b5563", fontSize: 9, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={metric.color}
              strokeWidth={2}
              fill="url(#chartGrad)"
              dot={false}
              activeDot={{ r: 4, fill: metric.color, stroke: "var(--bg-base)", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
