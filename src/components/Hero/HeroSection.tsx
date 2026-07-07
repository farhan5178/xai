"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => setScrollProg(v));
    return () => unsub();
  }, [smoothProgress]);

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Intelligence Workspace — v2.4
            </div>
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
            <span className="text-gradient">clear intelligence</span>
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
            className="flex items-center gap-4 mt-2 flex-wrap justify-center"
          >
            <motion.a
              href="#dashboard"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
                boxShadow: "0 0 40px rgba(124,58,237,0.35), 0 4px 16px rgba(0,0,0,0.4)",
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: "0 0 60px rgba(124,58,237,0.5), 0 8px 24px rgba(0,0,0,0.5)",
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
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border)",
                background: "rgba(17,24,39,0.5)",
              }}
              whileHover={{ scale: 1.02, color: "#fff", borderColor: "rgba(124,58,237,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              See how it works
            </motion.a>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-8 mt-8 pt-8 border-t flex-wrap justify-center"
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
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs text-[var(--text-tertiary)] font-mono tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center pt-1.5"
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-violet-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
