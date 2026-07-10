"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ArrowDown, Droplets } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 189;

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const sizeRef      = useRef({ w: 0, h: 0 });
  const lastIdxRef   = useRef(0);
  const rafRef       = useRef<number>(0);
  const pendingRef   = useRef<number>(0);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);

  // Responsive section height — less scroll on mobile
  const [sectionHeight, setSectionHeight] = useState(500);

  useEffect(() => {
    const updateHeight = () =>
      setSectionHeight(window.innerWidth < 768 ? 280 : 500);
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    /* ── Draw frame — cover-fit ─────────────────────────────── */
    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img?.complete || img.naturalWidth === 0) return;

      const { w, h } = sizeRef.current;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const x = (w - img.naturalWidth  * scale) / 2;
      const y = (h - img.naturalHeight * scale) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      lastIdxRef.current = index;
    };

    /* ── RAF-throttled draw (max 60fps, no duplicate frames) ── */
    const scheduleFrame = (index: number) => {
      pendingRef.current = index;
      if (rafRef.current) return; // already queued
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(pendingRef.current);
        rafRef.current = 0;
      });
    };

    /* ── Resize (High-DPI Support & iOS Fix) ─────────────────── */
    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Prevent resize triggering on iOS URL bar hide/show (only resize if width changes or significant height change)
      if (lastW === w && Math.abs(lastH - h) < 150) return;
      lastW = w;
      lastH = h;

      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { w, h };
      
      // Set actual canvas hardware pixels
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      
      // Normalize drawing coordinates to use CSS pixels
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      scheduleFrame(lastIdxRef.current);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* ── Progressive image loading ───────────────────────────── */
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const loadImage = (i: number) => {
      if (images[i]?.src) return; // already loading
      const img = new window.Image();
      const num = String(i + 1).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.jpg`;
      img.decoding = "async"; // non-blocking decode
      img.onload = () => {
        images[i] = img;
        if (i === 0) scheduleFrame(0);
      };
      images[i] = img;
    };

    // Priority 1: first 15 frames immediately (initial view)
    for (let i = 0; i < 15; i++) loadImage(i);

    // Priority 2: next 35 frames after 150ms (early scroll)
    const t1 = setTimeout(() => {
      for (let i = 15; i < 50; i++) loadImage(i);
    }, 150);

    // Priority 3: rest during idle time (won't block UI)
    const loadRemaining = (start: number) => {
      const end = Math.min(start + 15, TOTAL_FRAMES);
      for (let i = start; i < end; i++) loadImage(i);
      if (end < TOTAL_FRAMES) {
        const id = requestIdleCallback
          ? requestIdleCallback(() => loadRemaining(end))
          : setTimeout(() => loadRemaining(end), 80);
        return id;
      }
    };
    const t2 = setTimeout(() => loadRemaining(50), 400);

    /* ── ScrollTrigger — frame scrub ──────────────────────────── */
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 0.1, // tighter scrub for iOS momentum scrolling
      onUpdate: (self) => {
        const idx = Math.min(
          Math.round(self.progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );
        scheduleFrame(idx);
      },
    });

    /* ── Text fade on scroll ──────────────────────────────────── */
    const textEl = textRef.current;
    if (textEl) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "18% top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          textEl.style.opacity     = String(Math.max(0, 1 - p * 3));
          textEl.style.transform   = `translateY(${-p * 60}px)`;
          textEl.style.pointerEvents = p > 0.25 ? "none" : "auto";
        },
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, []);

  const scrollToNext = () =>
    document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ height: `${sectionHeight}vh` }}
      className="relative"
      aria-label="Hero — Sunrich Agua pure drinking water"
    >
      {/* ── Sticky viewport ──────────────────────────────────── */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* Canvas — frame animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "contents" }}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,20,50,0.35) 0%, rgba(5,20,50,0.08) 45%, rgba(5,20,50,0.55) 100%)",
          }}
        />

        {/* ── Content ──────────────────────────────────────────── */}
        <div
          ref={textRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 sm:gap-6 max-w-3xl w-full"
          >
            {/* Headline */}
            <h1 className="font-display text-display-xl text-white leading-none drop-shadow-2xl">
              Pure Water.
              <br />
              <em className="not-italic italic" style={{ color: "rgba(100,200,255,0.9)" }}>
                Every Drop.
              </em>
            </h1>

            {/* Subline */}
            <p className="text-base sm:text-body-lg text-white/75 font-light max-w-sm sm:max-w-md drop-shadow-lg px-2">
              Naturally purified. Mineral balanced. Delivered fresh
              to your home and office — every single day.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              <button
                onClick={() =>
                  document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary shadow-2xl shadow-ocean/40 text-sm sm:text-base px-5 sm:px-8 py-3"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  color: "white",
                }}
              >
                <Droplets size={15} />
                Order Now
              </button>
              <button onClick={scrollToNext} className="btn-ghost-white text-sm sm:text-base px-5 sm:px-8 py-3">
                Discover More
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-3 pt-5 border-t w-full"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {[
                { value: "7-Stage", label: "Purification" },
                { value: "pH 7.4",  label: "Balanced"     },
                { value: "0 PPM",   label: "Impurities"   },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-0.5">
                  <span className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow">
                    {s.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/50 font-semibold tracking-widest uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────── */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/45">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 hover:text-white/80 transition-colors group"
            aria-label="Scroll to discover more"
          >
            <span className="text-[9px] font-bold tracking-[0.28em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-white/20 relative overflow-hidden rounded-full">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-sky-300 to-transparent animate-scroll-line rounded-full" />
            </div>
            <ArrowDown size={12} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
