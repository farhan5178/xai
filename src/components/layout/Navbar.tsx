"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <motion.nav
        className="flex items-center gap-8 px-6 py-3 rounded-2xl transition-all duration-500"
        animate={
          scrolled
            ? {
                backgroundColor: "rgba(13,17,23,0.85)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              }
            : {
                backgroundColor: "rgba(13,17,23,0)",
                backdropFilter: "blur(0px)",
                borderColor: "rgba(255,255,255,0)",
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
              }
        }
        style={{ border: "1px solid transparent" }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group"
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
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7L5.5 3.5L7 5L9 2L12 7L9 10L7 8.5L5.5 10.5L2 7Z"
                  fill="url(#xgrd)"
                  fillRule="evenodd"
                />
                <defs>
                  <linearGradient id="xgrd" x1="2" y1="2" x2="12" y2="12">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <span
            className="font-display font-bold text-base tracking-tight text-white"
          >
            Xai
          </span>
        </motion.a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-medium rounded-xl text-[var(--text-secondary)] hover:text-white transition-colors duration-200 relative group"
              whileHover={{ color: "#fff" }}
            >
              <span className="relative z-10">{item.label}</span>
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-200"
              />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#"
            className="hidden md:block text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
            whileHover={{ color: "#fff" }}
          >
            Sign in
          </motion.a>
          <motion.a
            href="#dashboard"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Get access
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </motion.nav>
    </motion.header>
  );
}
