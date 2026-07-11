"use client";

import { motion } from "framer-motion";

type FooterLink = {
  label: string;
  href: string;
};

const footerLinks: Record<string, FooterLink[]> = {
  "Quick Links": [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact", href: "#" },
  ],
  "Product": [
    { label: "Intelligence", href: "#" },
    { label: "Dashboard", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Live Demo", href: "#" },
  ],
  "Resources": [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Whitepapers", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
  ],
};

const socialIcons = [
  {
    name: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Twitter",
    path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
  },
  {
    name: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  },
  {
    name: "Instagram",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5h-11a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
  },
  {
    name: "YouTube",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z",
  },
];

export function Footer() {
  return (
    <footer
      className="relative pt-24 pb-16 border-t"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top 5-Column Grid */}
        {/* mb-24 দিয়ে নিচের বটম বার থেকে মেইন গ্রিডের দূরত্ব বাড়ানো হয়েছে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 animate-spin-slow" style={{ color: "var(--accent-emerald)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2m15.364-7.071L6.636 19.07m10.728 0L6.636 4.93" />
              </svg>
              <span className="font-display font-bold text-2xl tracking-tight text-white">Xai</span>
            </div>

            <div className="flex flex-col gap-4 text-[14px] text-gray-400">
              <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-gray-500 group-hover:text-[#3b82f6] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                hello@xai.com
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-gray-500 group-hover:text-[#3b82f6] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                +1 (555) XAI-VISION
              </div>
              <div className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer group">
                <svg className="w-4 h-4 text-gray-500 group-hover:text-[#3b82f6] transition-colors mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="leading-relaxed">123 Innovation Drive,<br />San Francisco</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-2 flex flex-col">
              <h4 className="font-semibold text-[14px] uppercase tracking-wider text-gray-200 mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-[14px] text-gray-400 hover:text-white transition-colors duration-200 block"
                      whileHover={{ x: 2 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Stay Updated & Follow Us */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-semibold text-[14px] uppercase tracking-wider text-gray-200 mb-4">
              Stay Updated
            </h4>
            <p className="text-[14px] text-gray-400 leading-relaxed mb-5">
              Get the latest AI insights and updates.
            </p>

            {/* Input Group Fixed: overflow-hidden সরিয়ে বাটনটিকে রিলেটিভ পজিশন দেওয়া হয়েছে */}
            <div className="relative flex items-center w-full mb-8 border border-white/10 focus-within:border-[#3b82f6]/50 rounded-full bg-white/[0.03] p-1 transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-white placeholder-gray-500 text-[14px] outline-none pl-4 pr-12 py-2"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#3b82f6] hover:bg-[#2563eb] w-9 h-9 rounded-full text-white transition-colors flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <h4 className="font-semibold text-[14px] uppercase tracking-wider text-gray-200 mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  aria-label={icon.name}
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#3b82f6] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border border-white/5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-[13px] text-gray-500">
            © 2026 Xai Intelligence, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
            <a href="#" className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}