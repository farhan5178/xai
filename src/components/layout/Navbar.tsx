"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  const navItems = [
    { label: "Product", href: "#insight-flow" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Intelligence", href: "#wow" },
    { label: "Docs", href: "#" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center transition-all duration-300 min-h-[80px] ${
        scrolled
          ? "bg-[#050810]/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <nav className="section-container flex items-center justify-between w-full">
        {}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group relative z-10"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              }}
            />
            <div className="absolute inset-[2px] rounded-[6px] bg-[var(--bg-base)] flex items-center justify-center">
              <svg 
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="transition-transform duration-[800ms] ease-in-out group-hover:[transform:rotate(360deg)]"
              >
                <path
                  d="M2 7L5.5 3.5L7 5L9 2L12 7L9 10L7 8.5L5.5 10.5L2 7Z"
                  fill="url(#xgrd)"
                  fillRule="evenodd"
                />
                <defs>
                  <linearGradient id="xgrd" x1="2" y1="2" x2="12" y2="12">
                    <stop stopColor="#10b981" />
                    <stop offset="1" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <span className="font-display font-bold text-base tracking-tight text-white transition-all duration-[800ms] ease-in-out group-hover:tracking-[0.1em] group-hover:text-teal-400 group-hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.8)]">
            Xai
          </span>
        </motion.a>

        {}
        <div 
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center"
          style={{ gap: "32px" }}
          onMouseLeave={() => setHoveredNavIndex(null)}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-all duration-200"
              style={{ padding: "8px 16px" }}
              onMouseEnter={() => setHoveredNavIndex(index)}
            >
              <span className="relative z-10">{item.label}</span>
              {hoveredNavIndex === index && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/[0.06] rounded-full border border-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {}
        <div className="flex items-center relative z-10" style={{ gap: "24px" }}>
          <motion.a
            href="#"
            className="hidden md:block text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
          >
            Sign in
          </motion.a>
          
          <motion.a
            href="#dashboard"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-full transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              padding: "10px 24px",
              minHeight: "42px",
              boxShadow: "0 4px 14px rgba(16,185,129,0.4)"
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(16,185,129,0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            Get access
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
