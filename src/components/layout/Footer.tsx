"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Product: [
    { label: "Intelligence", href: "#" },
    { label: "Dashboard", href: "#" },
    { label: "API", href: "#" },
    { label: "Integrations", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-24 pb-10 px-10 md:px-16 lg:px-20 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand & Intro */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-xl font-bold mb-6">Xai</h2>
            <p className="text-[#a1a1aa] text-[15px] leading-relaxed mb-8 max-w-sm">
              Intelligence Workspace — turning raw data into structured insight for the teams that move fast.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#24b47e] hover:bg-[#1f9d6e] text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
            >
              Explore the workspace
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col">
                <h4 className="font-semibold text-white mb-6 text-[15px]">{category}</h4>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[#a1a1aa] hover:text-white transition-colors text-[15px]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-[14px] text-[#71717a] gap-4">
          <p>© 2026 Xai Intelligence, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#24b47e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#24b47e]"></span>
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}