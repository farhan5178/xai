"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <motion.nav
        className="flex items-center justify-between w-full px-6 md:px-12 transition-all duration-500"
        animate={
          scrolled
            ? {
                backgroundColor: "rgba(5, 8, 16, 0.75)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "16px",
                paddingBottom: "16px",
              }
            : {
                backgroundColor: "rgba(5, 8, 16, 0)",
                backdropFilter: "blur(0px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0)",
                paddingTop: "24px",
                paddingBottom: "24px",
              }
        }
      >
        {/* Logo */}
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
          <span className="font-display font-bold text-base tracking-tight text-white">
            Xai
          </span>
        </motion.a>

        {/* Nav links - Perfectly centered */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-medium rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.a
            href="#"
            className="hidden md:block text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
          >
            Sign in
          </motion.a>
          
          <Button
            as="a"
            href="#dashboard"
            color="primary"
            variant="shadow"
            radius="full"
            className="font-semibold text-white px-6"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,1), rgba(79,70,229,1))",
            }}
          >
            Get access
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </motion.nav>
    </motion.header>
  );
}
