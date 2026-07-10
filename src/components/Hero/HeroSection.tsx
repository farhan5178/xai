"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

const ParticleCanvas = dynamic(
  () => import("./ParticleCanvas").then((m) => m.ParticleCanvas),
  { ssr: false }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProg, setScrollProg] = useState(0);
  const isInView = useInView(sectionRef, { margin: "200px 0px" });

  const { scrollYProgress, scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const words = ["structured intelligence", "actionable insights", "AI automations"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const rawProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => setScrollProg(v));
    return () => unsub();
  }, [smoothProgress]);

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollTextOpacity = useTransform(scrollY, [0, 30], [1, 0]);


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)", minHeight: "100vh", paddingTop: "120px", paddingBottom: "60px" }}
    >
      {/* Particle canvas - only mount when section is visible to save GPU context */}
      {isInView && <ParticleCanvas scrollProgress={scrollProg} />}

      {/* Background radial glows */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center section-container"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Pill badge */}
          <motion.div variants={fadeIn}>
            <motion.div 
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden group cursor-default"
              style={{ padding: "8px 24px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse relative z-10" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-white/70 group-hover:text-white transition-colors duration-300 relative z-10 uppercase">
                Intelligence Workspace <span className="text-emerald-400 mx-1">—</span> v2.4
              </span>
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            <span className="text-white">From </span>
            <span className="text-gradient">raw data</span>
            <br />
            <span className="text-white">to </span>
            <span className="relative inline-block overflow-hidden" style={{ verticalAlign: "bottom", height: "1.15em" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="text-gradient block whitespace-nowrap"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-[var(--text-secondary)] max-w-xl text-lg leading-relaxed"
          >
            Xai transforms any data source into structured insight — automatically, continuously,
            and with the confidence of a senior analyst.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-5 mt-4 flex-wrap justify-center"
          >
            <motion.a
              href="#dashboard"
              className="flex items-center justify-center gap-2 font-display font-semibold text-white text-sm rounded-full"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669, #14b8a6)",
                boxShadow: "0 0 30px rgba(16,185,129,0.35), 0 4px 12px rgba(0,0,0,0.4)",
                padding: "12px 28px",
                minHeight: "48px",
              }}
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow: "0 0 50px rgba(16,185,129,0.5), 0 6px 16px rgba(0,0,0,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Explore the workspace
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>

            <motion.a
              href="#insight-flow"
              className="flex items-center justify-center gap-2 font-display font-semibold text-sm border rounded-full"
              style={{
                color: "var(--text-secondary)",
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(17,24,39,0.5)",
                padding: "12px 28px",
                minHeight: "48px",
                backdropFilter: "blur(12px)",
              }}
              whileHover={{ scale: 1.02, color: "#fff", borderColor: "rgba(16,185,129,0.5)", background: "rgba(16,185,129,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              See how it works
            </motion.a>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-8 mt-12 pt-8 border-t flex-wrap justify-center mb-24"
            style={{ borderColor: "var(--border)" }}
          >
            {[
              { value: "2.8B+", label: "Data points processed daily" },
              { value: "98.6%", label: "Model accuracy" },
              { value: "<42ms", label: "Time to insight" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-display font-bold text-2xl text-white">{stat.value}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{ opacity: scrollTextOpacity }} className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span 
            className="text-[10px] text-[var(--text-tertiary)] font-mono tracking-[0.25em] uppercase"
          >
            Scroll to explore
          </span>
        <motion.div
          className="w-[22px] h-[36px] rounded-full border border-[rgba(255,255,255,0.2)] flex items-start justify-center pt-1.5"
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-emerald-400"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      </motion.div>
    </section>
  );
}
