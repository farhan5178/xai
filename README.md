# Xai – Intelligence Workspace

> **From raw data → structured intelligence → actionable insight → AI Automations**

A high-fidelity, single-page interactive product experience demonstrating how Xai turns raw data into structured insights. Built to Stripe + Linear + Vercel-level polish with custom 3D motion and purposeful animation architecture.

---

## 🎯 Project Overview

**Xai – Intelligence Workspace** is an interactive product prototype that visually walks users through the intelligence transformation pipeline using animation, geometry, and 3D depth. The experience targets decision-makers — calm, powerful, technically confident.

### The four core experiences:
1. **Hero** — 2,000-particle R3F field that morphs from chaos (raw data) to structured grid (intelligence) as you scroll
2. **Insight Flow** — Three animated stages (Ingest → Analyze → Generate) with hand-coded SVG animations and auto-cycling
3. **Intelligence Dashboard** — Full mock product UI with sidebar nav, KPI cards with count-up, live area chart, and interactive data table
4. **WOW Moment** — A 3D data sphere (distorted icosahedron + particle clusters) that explodes into 8 labeled intelligence domains as you scroll

---

## 🛠 Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animation | Framer Motion 11 + GSAP (scroll triggers) |
| 3D / WebGL | React Three Fiber + Drei (Three.js) |
| Charts | Recharts |
| Fonts | Inter + Space Grotesk + JetBrains Mono (Google Fonts) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd xai-workspace

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Animation & Interaction Decisions

### 1. Particle Morphing (Hero — R3F + Three.js)
**Decision**: 2,000 particles animate between two states — scattered (raw data) and grid-organized (intelligence) — driven purely by scroll progress via Framer Motion's `useScroll`.

**Why**: The transformation metaphor is literal and visceral. Users *feel* order emerging from chaos. Additive blending gives particles an ethereal glow without performance cost.

**Technical detail**: Each particle lerps between its random position and its grid target based on `scrollProgress`. Mouse position (normalized -1 to 1) offsets the entire field for parallax depth.

### 2. Insight Flow Stages (SVG Animation + Framer Motion)
**Decision**: Three hand-coded SVG scenes (no Lottie, no illustrations) with `AnimatePresence` for stage transitions. Auto-cycles every 3.5s when in view.

**Why**: SVG is fully controlled and infinitely customizable. The geometry communicates technical confidence — flowing lines for Ingest, neural graph for Analyze, card reveals for Generate.

**Technical detail**: Each SVG element uses Framer Motion `animate` props with staggered delays. `AnimatePresence mode="wait"` ensures smooth exit before entrance.

### 3. Dashboard State Transitions (Framer Motion Layout)
**Decision**: Framer Motion's `layoutId` prop for the sidebar active indicator and tab underline — they smoothly slide between elements without any manual position calculation.

**Why**: `layout` animations are the most "magic" Framer Motion feature — the browser handles position math, ensuring perfectly smooth transitions even if the DOM structure changes.

### 4. Data Sphere Explosion (R3F Signature WOW)
**Decision**: A sticky-scroll section where `scrollYProgress` (0→1) drives an `explodeProgress` value via `useSpring`. Eight particle clusters morph outward from a central distorted orb.

**Why**: The interaction has clear meaning — AI organizing chaos into structured domains. The spring physics give it weight and naturalness. The camera rig follows the mouse for continuous engagement.

**Technical detail**: Each cluster position is a lerp between `center` (on-sphere) and `explodedCenter` (orbital distance), driven by `explodeProgress`. The central orb scales down as clusters emerge, maintaining visual balance.

### 5. GPU Context Management
**Decision**: The hero particle canvas conditionally unmounts when scrolled out of view (via `useInView`), freeing the WebGL context for the DataSphere section.

**Why**: Browsers limit concurrent WebGL contexts (typically 8-16, but practically fewer). Two simultaneous Three.js canvases risk context loss on lower-end GPUs. This approach ensures each canvas gets full GPU resources when active.

---

## 📐 Design System

### Color Palette
```css
--bg-base: #050810       /* Near-black with blue undertone */
--accent-violet: #7c3aed  /* Primary — deep violet */
--accent-cyan: #06b6d4    /* Secondary — electric cyan */
--accent-emerald: #10b981 /* Positive signals — emerald */
```

### Typography Scale
- **Display**: Space Grotesk 700/800 — authority and clarity
- **Body**: Inter 400/500 — maximum readability
- **Mono**: JetBrains Mono — data, IDs, badges, code

### Animation Principles
1. **Entrance only on viewport entry** — never on page load
2. **GPU-only transforms** — `transform` and `opacity` only, no layout animations
3. **Spring-based interactions** — hover states feel physical, not mechanical
4. **Reduced motion respected** — all animations respect `prefers-reduced-motion`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, providers
│   ├── page.tsx            # Page composition
│   └── globals.css         # Design system tokens + keyframes
├── components/
│   ├── Hero/
│   │   ├── HeroSection.tsx     # Scroll-driven hero
│   │   └── ParticleCanvas.tsx  # R3F particle system
│   ├── InsightFlow/
│   │   └── InsightFlowSection.tsx  # 3-stage animated pipeline
│   ├── Dashboard/
│   │   ├── DashboardSection.tsx    # Shell + layout
│   │   ├── KPICard.tsx             # Count-up KPI cards
│   │   ├── InsightChart.tsx        # Recharts area chart
│   │   └── DataTable.tsx           # Interactive insights table
│   ├── WowMoment/
│   │   ├── WowSection.tsx          # Sticky scroll container
│   │   └── DataSphere.tsx          # R3F 3D orb system
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Badge.tsx
├── lib/
│   ├── animations.ts       # Shared Framer Motion variants
│   └── mockData.ts         # All mock data
└── hooks/
    └── useMousePosition.ts # Mouse tracking for parallax
```

---

## 🔗 Links

- **Live Demo**: [https://xai-lemon.vercel.app/](#)
- **Figma Design**: [https://www.figma.com/design/B4apNz2sWBbggY76YaQ5fS/Xai?node-id=0-1&p=f](#)
- **Video Walkthrough**: [https://drive.google.com/file/d/1RmKpk_lmzEz2EQ4v4F0pMjDDGPkqahcv/view?usp=drive_link](#)
