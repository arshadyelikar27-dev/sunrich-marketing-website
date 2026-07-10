"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Droplets, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        opacity: 0, y: 50, stagger: 0.15, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".cta-content", start: "top 78%", toggleActions: "play none none none" },
      });
      gsap.from(".cta-visual", {
        opacity: 0, y: 60, scale: 0.9, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: ".cta-visual", start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden"
      aria-label="Order Sunrich water"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-ocean" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-aqua/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      <div className="relative z-10 container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="cta-content flex flex-col gap-8">
            <span className="pill pill-gold self-start">Start Today</span>

            <h2 className="font-display text-display-lg text-white leading-tight">
              Your family deserves
              <br />
              <span className="italic text-gold">pure water. Daily.</span>
            </h2>

            <p className="text-body-lg text-white/55 font-light max-w-md">
              Join 3,800+ families and businesses who trust Sunrich Agua for
              their daily hydration. First delivery free. No contracts.
              Cancel anytime.
            </p>

            {/* Pricing */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                {[
                  { size: "500ml × 24", price: "₹180", label: "Crate" },
                  { size: "1L × 12",    price: "₹220", label: "Crate" },
                  { size: "20L Jar",    price: "₹55",  label: "Refill" },
                ].map((p) => (
                  <div key={p.size} className="glass-dark rounded-xl px-5 py-4 hover:border-gold/30 transition-colors duration-300">
                    <p className="text-xs text-white/40 uppercase tracking-wide">{p.size}</p>
                    <p className="font-display text-2xl font-bold text-white mt-1">{p.price}</p>
                    <p className="text-xs text-white/30">{p.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 font-medium">
                ✓ Free delivery · ✓ First order free · ✓ No commitment
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="btn-primary text-ink font-bold shadow-2xl shadow-gold/30"
                style={{ background: "linear-gradient(135deg, #e8a020, #f5c842)", color: "#0d2240" }}
              >
                <Droplets size={18} />
                Order Now — Free First Delivery
              </button>
              <button className="btn-ghost-white group">
                Talk to us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-5 pt-2">
              {["🔒 Secure Payment", "🚚 Same-Day Delivery", "🔬 Lab Certified", "↩️ Free Returns"].map((t) => (
                <span key={t} className="text-xs text-white/40 font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div className="cta-visual relative flex items-center justify-center">
            {/* Ripple rings decoration */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: `${ring * 35}%`,
                    height: `${ring * 35}%`,
                    animation: `glow-pulse ${2 + ring}s ease-in-out infinite`,
                    animationDelay: `${ring * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Logo centered */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              <Image
                src="/sunrich-logo.png"
                alt="Sunrich Agua"
                width={280}
                height={100}
                className="h-20 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 40px rgba(56,178,200,0.4))" }}
              />
              <div className="glass-dark rounded-2xl px-8 py-5 text-center">
                <p className="font-display text-3xl font-bold text-white">7-Stage</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">Pure Purification</p>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                {[
                  { val: "BIS", label: "Certified" },
                  { val: "pH 7.4", label: "Balanced" },
                  { val: "0 PPM", label: "Impurities" },
                ].map((s) => (
                  <div key={s.val} className="glass-dark rounded-xl p-3 text-center">
                    <p className="font-display text-lg font-bold text-gold">{s.val}</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-wide mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
