"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const footerLinks = {
  Product: ["Intelligence", "Dashboard", "API", "Integrations"],
  Company: ["About", "Careers", "Blog", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
        }}
      />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-8 h-8">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
                />
                <div className="absolute inset-[2px] rounded-[6px] bg-[var(--bg-surface)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7L5.5 3.5L7 5L9 2L12 7L9 10L7 8.5L5.5 10.5L2 7Z"
                      fill="url(#fgrd)"
                      fillRule="evenodd"
                    />
                    <defs>
                      <linearGradient id="fgrd" x1="2" y1="2" x2="12" y2="12">
                        <stop stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-base text-white">Xai</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mb-6">
              Intelligence Workspace — turning raw data into structured insight for the teams that move fast.
            </p>
            <div className="flex items-center gap-1 p-1 rounded-xl border w-fit" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent text-xs text-white px-3 py-2 outline-none w-44 placeholder:text-[var(--text-muted)]"
              />
              <motion.button
                className="px-3 py-2 rounded-lg text-xs font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Join waitlist
              </motion.button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-white"
                      whileHover={{ x: 2 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between mt-14 pt-8 border-t flex-wrap gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 Xai Intelligence, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[var(--text-muted)] font-mono">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
