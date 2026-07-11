"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#", badge: "Hiring!" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Demo", href: "#" },
    { label: "Integrations", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "AI Analytics Guide", href: "#" },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#060606" }}
    >
      {/* Smoky Background Effects */}
      <div 
        className="absolute top-1/3 left-0 w-[800px] h-[800px] -translate-y-1/2 -translate-x-1/2 rounded-full mix-blend-screen pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[1000px] h-[1000px] translate-y-1/4 translate-x-1/4 rounded-full mix-blend-screen pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
      />

      <div className="section-container pt-24 pb-8 relative z-10">
        
        {/* Huge Brand Header */}
        <div className="flex items-start mb-24 md:mb-32">
          <h1 
            className="font-bold tracking-tighter text-white"
            style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 0.8 }}
          >
            Xai
          </h1>
          <svg className="w-8 h-8 md:w-20 md:h-20 ml-2 md:ml-4 text-[#10b981] animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2m15.364-7.071L6.636 19.07m10.728 0L6.636 4.93" />
          </svg>
        </div>

        {/* Links & Information Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-24">
          
          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[16px] font-medium text-white mb-6">
                  {category}
                </h4>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <a href={link.href} className="text-[14px] text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </a>
                      {link.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-[#060606] bg-[#10b981] rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Back to top & Info Text */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 md:gap-16 max-w-[480px]">
            <button 
              onClick={scrollToTop}
              className="flex flex-col items-center gap-3 group shrink-0"
            >
              <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 group-hover:text-white transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </div>
              <span className="text-[12px] text-gray-500 hover:text-gray-300 transition-colors">
                Back to top
              </span>
            </button>

            <p className="text-[17px] text-gray-300 leading-relaxed font-light">
              Xai empowers teams with real-time insights, turning raw data into better decisions
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px] text-gray-500">
          <div className="text-left">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          </div>
          <div className="text-left sm:text-center">
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
          <div className="text-left sm:text-right">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
