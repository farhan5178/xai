"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, useState } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const base =
    "relative inline-flex items-center gap-2 font-semibold rounded-xl overflow-hidden cursor-pointer font-display transition-all duration-200 select-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: "text-white",
    ghost: "text-[var(--text-secondary)] hover:text-white",
    outline: "border border-[var(--border)] text-[var(--text-primary)] hover:border-[rgba(124,58,237,0.5)]",
  };

  return (
    <motion.button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={
        variant === "primary"
          ? {
              background: isHovered
                ? "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 50%, #06b6d4 100%)"
                : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0891b2 100%)",
            }
          : variant === "outline"
          ? { background: "rgba(17,24,39,0.8)" }
          : {}
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
          animate={isHovered ? { opacity: 1, x: ["-100%", "100%"] } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
