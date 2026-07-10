# 💧 Sunrich Agua — Premium Drinking Water Experience

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A high-performance, cinematic marketing website built for **Sunrich Agua**, a premium drinking water brand. Designed to deliver a world-class user experience combining storytelling, modern aesthetics, and buttery-smooth animations.

---

## ✨ Features

- 🎬 **Cinematic Hero Animation**: A stunning 189-frame canvas-based image sequence that scrubs frame-by-frame on scroll.
- 🚀 **High Performance**: 
  - Progressive image preloading strategy (no UI blocking).
  - Canvas RAF (Request Animation Frame) throttling for consistent 60fps rendering.
  - `{ alpha: false }` context optimization.
- 📱 **Mobile Optimized**:
  - Dynamically disables heavy JS smooth scrolling on touch devices in favor of native momentum scrolling.
  - Responsive font scaling (`clamp()`) and adaptive layout heights.
- 🎨 **Premium UI/UX**:
  - Glassmorphism effects and deep oceanic gradients.
  - Subtle GSAP scroll-triggered fade and scale animations.
  - Sticky navigation with dynamic color inversion based on scroll depth.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/) (Desktop only)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

---

## 🚀 Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/arshadyelikar27-dev/sunrich-marketing-website.git
cd sunrich-marketing-website
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router layout, page, and globals.css
├── components/           
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, Problem, Features, Product, Lifestyle, CTA
│   └── ui/               # Reusable UI components (Shadcn/Custom)
├── lib/                  # Utilities
└── providers/            # SmoothScrollProvider (Lenis configuration)
public/                   
├── frames/               # 189-frame sequence for the Hero animation
└── sunrich-logo.png      # Brand Logo
```

---

## 💡 Rendering Architecture

The Hero section utilizes an advanced `<canvas>` rendering technique for the scroll-based animation:
1. **Initial Load**: The first 15 frames load immediately for instant Largest Contentful Paint (LCP).
2. **Preload Pipeline**: Remaining frames load silently via `requestIdleCallback` to prevent main-thread blocking.
3. **Hardware Acceleration**: Scales according to `window.devicePixelRatio` ensuring crisp quality on High-DPI/Retina displays.

---

## 📄 License

This project is proprietary and confidential. © 2026 Sunrich Agua. All rights reserved.
