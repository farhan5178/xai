import { Variants } from "framer-motion";

export const ease = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  spring: { type: "spring", stiffness: 100, damping: 20 },
  springSnappy: { type: "spring", stiffness: 200, damping: 25 },
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
  out: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease.out },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.out },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.01,
    y: -2,
    transition: { duration: 0.25, ease: ease.smooth },
  },
};
