"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { staggerContainer, fadeUp } from "@/lib/animations";

const DataSphere = dynamic(
  () => import("./DataSphere").then((m) => m.DataSphere),
  { ssr: false }
);

const clusters = [
  { label: "Sales Intelligence", color: "#7c3aed", angle: 0 },
  { label: "Churn Prediction", color: "#06b6d4", angle: 45 },
  { label: "Supply Chain", color: "#10b981", angle: 90 },
  { label: "Financial Signals", color: "#f59e0b", angle: 135 },
  { label: "User Behavior", color: "#ef4444", angle: 180 },
  { label: "NLP Insights", color: "#8b5cf6", angle: 225 },
  { label: "Vision Data", color: "#22d3ee", angle: 270 },
  { label: "Operations", color: "#34d399", angle: 315 },
];

export function WowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [explodeProgress, setExplodeProgress] = useState(0);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawExplode = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);
  const springExplode = useSpring(rawExplode, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const unsub = springExplode.on("change", (v) => setExplodeProgress(Math.max(0, Math.min(1, v))));
    return () => unsub();
  }, [springExplode]);

  const phase = explodeProgress < 0.3 ? "unified" : explodeProgress < 0.7 ? "expanding" : "exploded";

  return (
    <section
      id="wow"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-base)",
        minHeight: "200vh",
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Header text */}
        <motion.div
          className="relative z-10 text-center mb-8 px-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-3">
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-tertiary)]">
              Signature Interaction
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Intelligence,{" "}
            <span className="text-gradient">organized</span>
          </motion.h2>

          {/* Dynamic phase label */}
          <motion.div
            className="mt-3 h-6 flex items-center justify-center"
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-sm text-[var(--text-secondary)]">
              {phase === "unified" && "All intelligence, unified in one sphere →"}
              {phase === "expanding" && "Scroll to watch clusters emerge..."}
              {phase === "exploded" && "8 intelligence domains, organized →"}
            </span>
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <div className="relative w-full" style={{ height: "55vh" }}>
          <DataSphere explodeProgress={explodeProgress} />
        </div>

        {/* Cluster legend — fades in when exploded */}
        <motion.div
          className="relative z-10 flex flex-wrap justify-center gap-2 px-8 mt-4 max-w-2xl"
          animate={{ opacity: explodeProgress > 0.5 ? 1 : 0, y: explodeProgress > 0.5 ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          {clusters.map((c) => (
            <motion.div
              key={c.label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
              style={{
                background: c.color + "12",
                borderColor: c.color + "30",
              }}
              whileHover={{ scale: 1.05, borderColor: c.color + "60" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
              <span className="text-xs font-mono" style={{ color: c.color }}>
                {c.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-32 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                width: `${explodeProgress * 100}%`,
              }}
            />
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
            {Math.round(explodeProgress * 100)}% organized
          </span>
        </div>
      </div>
    </section>
  );
}
