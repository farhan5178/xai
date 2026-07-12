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
    <footer className="bg-[#000000] text-white pt-20 font-sans select-none" style={{ paddingBottom: "80px" }}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight">Xai</h2>
            <p className="text-[#888888] text-[15px] leading-relaxed mb-8 max-w-sm">
              Intelligence Workspace — turning raw data into structured insight for the teams that move fast.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-3 text-[14px] text-[#888888] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="font-medium tracking-wide">Back to top</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:-translate-y-1 relative overflow-hidden">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-y-[1px] transition-transform duration-300">
                  <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" />
                </svg>
              </div>
            </button>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="lg:col-span-6 grid grid-cols-3 gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col">
                <h4 className="font-bold text-white mb-6 text-[14px] tracking-wide">{category}</h4>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[#888888] hover:text-white transition-colors text-[14px]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-[13px] text-[#555555] gap-4">
          <p>© 2026 Xai Intelligence, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[#555555]">
            <div className="flex items-center gap-4">
              <a href="https://github.com/farhan5178" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/farhan-sadik-turjo/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}