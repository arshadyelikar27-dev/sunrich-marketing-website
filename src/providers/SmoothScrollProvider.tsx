"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Detect touch / small screen — use native scroll there (faster, no lag)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 768;

    // Always refresh ScrollTrigger after layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    gsap.ticker.lagSmoothing(0);

    // On mobile / touch: skip Lenis, native scroll is smoother
    if (isTouchDevice || isMobile || prefersReducedMotion) {
      return () => clearTimeout(refreshTimer);
    }

    // Desktop: smooth wheel scroll via Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 0, // let touch be native
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    return () => {
      clearTimeout(refreshTimer);
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return <>{children}</>;
}
