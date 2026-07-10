"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { navItems } from "@/lib/mockData";
import { KPICards } from "./KPICard";
import { InsightChart } from "./InsightChart";
import { DataTable } from "./DataTable";
import { fadeUp, staggerContainer } from "@/lib/animations";

const iconPaths: Record<string, string> = {
  grid: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  "bar-chart": "M18 20V10M12 20V4M6 20v-6",
  database: "M12 2C7.6 2 4 3.6 4 5.5v13C4 20.4 7.6 22 12 22s8-1.6 8-3.5v-13C20 3.6 16.4 2 12 2zM4 12c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5M4 5.5C4 7.4 7.6 9 12 9s8-1.6 8-3.5",
  cpu: "M9 2H7a2 2 0 00-2 2v2M15 2h2a2 2 0 012 2v2M9 22H7a2 2 0 01-2-2v-2m10 4h2a2 2 0 002-2v-2M2 9v2m0 2v2M22 9v2m0 2v2M9 9h6v6H9V9z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
};

const tabs = ["Overview", "Signals", "Reports", "Automations"];

export function DashboardSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [activeNav, setActiveNav] = useState("overview");
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section
      id="dashboard"
      ref={ref}
      className="relative section-py overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border)" }} />

      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <div className="w-full flex justify-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center text-center max-w-3xl w-full"
            style={{ marginBottom: "64px" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "16px" }}>
              <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-tertiary)] antialiased">
                Intelligence Dashboard
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-white tracking-tight antialiased"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "24px" }}
            >
              Your intelligence,{" "}
              <span className="text-gradient">at a glance</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl antialiased">
              A calm, structured workspace where every signal has meaning and every insight drives action.
            </motion.p>
          </motion.div>
        </div>

        {/* Dashboard shell */}
        <motion.div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(124,58,237,0.06)",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1], delay: 0.2 }}
        >
          {/* Top bar */}
          <div
            className="flex items-center gap-2 border-b"
            style={{ borderColor: "var(--border)", background: "rgba(13,17,23,0.7)", padding: "12px 20px" }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-xs text-[var(--text-muted)]">app.xai.ai — Intelligence Workspace</span>
            </div>
          </div>

          {/* App layout */}
          <div className="flex" style={{ minHeight: 560 }}>
            {/* Sidebar */}
            <motion.aside
              className="flex flex-col border-r w-52 flex-shrink-0"
              style={{
                borderColor: "var(--border)",
                background: "rgba(13,17,23,0.5)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Workspace picker */}
              <div className="border-b" style={{ borderColor: "var(--border)", padding: "16px" }}>
                <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] cursor-pointer hover:bg-white/[0.06] transition-colors" style={{ padding: "8px" }}>
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-white"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    X
                  </div>
                  <span className="text-white text-xs font-semibold">Xai Workspace</span>
                  <svg className="ml-auto opacity-40" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col flex-1" style={{ padding: "12px", gap: "4px" }}>
                {navItems.map((item, i) => {
                  const isActive = activeNav === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className="relative flex items-center rounded-lg w-full text-left transition-all duration-200"
                      style={{
                        padding: "8px 12px",
                        gap: "10px",
                        background: isActive ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0)",
                        color: isActive ? "#34d399" : "var(--text-secondary)",
                      }}
                      whileHover={{ background: isActive ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)" }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <div className="w-5 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d={iconPaths[item.icon]} />
                        </svg>
                      </div>
                      <span className="text-[13px] font-semibold tracking-wide">{item.label}</span>
                      {item.badge && (
                        <span
                          className="ml-auto text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md"
                          style={{
                            background: isActive ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)",
                            color: isActive ? "#34d399" : "var(--text-tertiary)",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-emerald-500"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom user */}
              <div style={{ padding: "0 12px 16px 12px" }}>
                <div className="flex items-center gap-2 rounded-lg" style={{ padding: "8px" }}>
                  <img src="https://ui-avatars.com/api/?name=Farhan&background=0D8ABC&color=fff" alt="Farhan" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">Farhan</p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">admin</p>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Main panel */}
            <main className="flex-1 flex flex-col overflow-hidden">
              {/* Tab bar */}
              <div
                className="flex items-center flex-wrap border-b overflow-x-auto hide-scrollbar"
                style={{ borderColor: "var(--border)", padding: "12px 24px", gap: "24px" }}
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="relative text-xs font-medium rounded-lg transition-all duration-200"
                      style={{
                        padding: "8px 16px",
                        color: isActive ? "white" : "var(--text-tertiary)",
                        background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                      }}
                      whileHover={{ color: "#fff", background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)" }}
                    >
                      {tab}
                    </motion.button>
                  );
                })}

                {/* Live indicator */}
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-[var(--text-tertiary)]">Live</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto" style={{ padding: "24px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-8"
                  >
                    {/* KPI Cards */}
                    <KPICards isVisible={isInView} />

                    {/* Chart */}
                    <div
                      className="rounded-xl border"
                      style={{ background: "rgba(13,17,23,0.5)", borderColor: "var(--border)", padding: "24px" }}
                    >
                      <InsightChart />
                    </div>

                    {/* Table */}
                    <div
                      className="rounded-xl border"
                      style={{ background: "rgba(13,17,23,0.5)", borderColor: "var(--border)", padding: "24px" }}
                    >
                      <DataTable />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
