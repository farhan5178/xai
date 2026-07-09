"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { insightFlowStages } from "@/lib/mockData";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Animated SVG for each stage
function IngestVisual() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full max-w-sm">
      {/* Data stream lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <motion.line
            x1={20 + i * 12}
            y1="10"
            x2={20 + i * 12}
            y2="190"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0.1] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}

      {/* Central collector */}
      <motion.rect
        x="80" y="80" width="160" height="40"
        rx="8"
        fill="rgba(6,182,212,0.1)"
        stroke="#06b6d4"
        strokeWidth="1"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <text x="160" y="105" textAnchor="middle" fill="#22d3ee" fontSize="11" fontFamily="monospace">
        Data Ingestion Layer
      </text>

      {/* Connecting arrows from lines to rect */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M ${20 + i * 12} 80 L 80 100`}
          stroke="#06b6d4"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Source labels */}
      {[
        { x: 8, y: 30, label: "API" },
        { x: 18, y: 55, label: "SQL" },
        { x: 28, y: 30, label: "CSV" },
        { x: 38, y: 55, label: "Stream" },
        { x: 48, y: 30, label: "Hook" },
      ].map((item, i) => (
        <motion.text
          key={i}
          x={item.x}
          y={item.y}
          fill="#6b7280"
          fontSize="8"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          {item.label}
        </motion.text>
      ))}

      {/* Output nodes */}
      {[100, 140, 180, 220].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy="160"
          r="8"
          fill="rgba(6,182,212,0.15)"
          stroke="#06b6d4"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 200 }}
        />
      ))}
      {[100, 140, 180, 220].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1="120"
          x2={x}
          y2="152"
          stroke="#06b6d4"
          strokeWidth="1"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

function AnalyzeVisual() {
  const nodes = [
    { cx: 160, cy: 100, r: 12, color: "#7c3aed" },
    { cx: 80, cy: 60, r: 8, color: "#8b5cf6" },
    { cx: 240, cy: 60, r: 8, color: "#8b5cf6" },
    { cx: 60, cy: 140, r: 6, color: "#a78bfa" },
    { cx: 130, cy: 160, r: 6, color: "#a78bfa" },
    { cx: 190, cy: 160, r: 6, color: "#a78bfa" },
    { cx: 260, cy: 140, r: 6, color: "#a78bfa" },
    { cx: 40, cy: 90, r: 4, color: "#c4b5fd" },
    { cx: 280, cy: 90, r: 4, color: "#c4b5fd" },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [1, 7], [2, 6], [2, 8], [3, 4], [4, 5], [5, 6],
  ];

  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full max-w-sm">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#7c3aed"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        />
      ))}

      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={node.color + "30"}
          stroke={node.color}
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: 1,
          }}
          transition={{
            delay: i * 0.1,
            duration: 0.4,
            scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
          }}
        />
      ))}

      {/* AI label */}
      <motion.text
        x="160"
        y="104"
        textAnchor="middle"
        fill="#a78bfa"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        AI
      </motion.text>

      {/* Scanning ring */}
      <motion.circle
        cx="160"
        cy="100"
        r="50"
        stroke="#7c3aed"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="6 4"
        fill="none"
        animate={{ rotate: 360 }}
        style={{ transformOrigin: "160px 100px" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function InsightVisual() {
  const cards = [
    { y: 30, label: "Churn Risk +34%", conf: 97, color: "#f59e0b" },
    { y: 90, label: "Revenue Trend ↑", conf: 94, color: "#10b981" },
    { y: 150, label: "Anomaly: SKU-8821", conf: 88, color: "#ef4444" },
  ];

  return (
    <svg viewBox="0 0 320 200" fill="none" className="w-full max-w-sm">
      {cards.map((card, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.25, duration: 0.5 }}
        >
          <rect x="40" y={card.y} width="240" height="48" rx="8"
            fill={card.color + "10"} stroke={card.color} strokeWidth="1" strokeOpacity="0.4" />
          <text x="58" y={card.y + 20} fill={card.color} fontSize="10" fontFamily="monospace" fontWeight="bold">
            {card.label}
          </text>
          <text x="58" y={card.y + 35} fill="#6b7280" fontSize="8" fontFamily="monospace">
            Confidence: {card.conf}%
          </text>
          {/* Confidence bar */}
          <rect x="200" y={card.y + 22} width="64" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
          <motion.rect
            x="200"
            y={card.y + 22}
            width={0}
            height="4"
            rx="2"
            fill={card.color}
            animate={{ width: (card.conf / 100) * 64 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

const visuals = [IngestVisual, AnalyzeVisual, InsightVisual];
const stageColors = ["cyan", "violet", "emerald"] as const;

export function InsightFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const isInView = useInView(sectionRef, { once: false, margin: "-20% 0px" });

  // Auto-cycle stages
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % insightFlowStages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView]);

  const stage = insightFlowStages[activeStage];
  const Visual = visuals[activeStage];
  const colorKey = stageColors[activeStage];

  const colorVars = {
    cyan: {
      accent: "#06b6d4",
      bg: "rgba(6,182,212,0.08)",
      border: "rgba(6,182,212,0.2)",
      badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      glow: "rgba(6,182,212,0.15)",
    },
    violet: {
      accent: "#7c3aed",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.2)",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
      glow: "rgba(124,58,237,0.15)",
    },
    emerald: {
      accent: "#10b981",
      bg: "rgba(16,185,129,0.08)",
      border: "rgba(16,185,129,0.2)",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      glow: "rgba(16,185,129,0.15)",
    },
  };

  const c = colorVars[colorKey];

  return (
    <section
      id="insight-flow"
      ref={sectionRef}
      className="relative section-py overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Glow behind active */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        animate={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)` }}
        transition={{ duration: 0.8 }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto w-full"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-tertiary)]">
              How it works
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            The intelligence{" "}
            <span className="text-gradient">pipeline</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-lg">
            Three stages. One continuous loop. Zero manual effort.
          </motion.p>
        </motion.div>

        {/* Stage selector tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {insightFlowStages.map((s, i) => {
            const isActive = i === activeStage;
            const col = colorVars[stageColors[i]];
            return (
              <motion.button
                key={s.id}
                onClick={() => setActiveStage(i)}
                className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
                style={{
                  color: isActive ? col.accent : "var(--text-secondary)",
                  background: isActive ? col.bg : "rgba(255,255,255,0)",
                  borderColor: isActive ? col.border : "var(--border)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-mono text-xs mr-2 opacity-60">{s.number}</span>
                {s.title}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    layoutId="stage-indicator"
                    style={{ background: col.accent }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Main content panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[420px]">
          {/* Left: Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div>
                <div className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: c.accent }}>
                  Stage {stage.number}
                </div>
                <h3
                  className="font-display font-bold text-white mb-2"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  {stage.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-base italic">{stage.subtitle}</p>
              </div>

              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {stage.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {stage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono border"
                    style={{
                      background: c.bg,
                      borderColor: c.border,
                      color: c.accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress bar to next stage */}
              <div className="flex items-center gap-3">
                {insightFlowStages.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-0.5 rounded-full cursor-pointer"
                    style={{
                      flex: i === activeStage ? 3 : 1,
                      background: i === activeStage ? c.accent : "var(--border)",
                    }}
                    onClick={() => setActiveStage(i)}
                    animate={{ flex: i === activeStage ? 3 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id + "-visual"}
              className="relative rounded-2xl p-8 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${c.bg} 0%, rgba(13,17,23,0.9) 100%)`,
                border: `1px solid ${c.border}`,
                minHeight: 280,
                boxShadow: `0 0 60px ${c.glow}`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Visual />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
