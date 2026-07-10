"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    number: "01",
    title: "Tap water you can't trust.",
    body: "Chlorine, heavy metals, bacteria, and sediment make ordinary tap water unsafe for daily consumption. What you can't see can harm you.",
  },
  {
    number: "02",
    title: "Plastic bottles. A broken promise.",
    body: "Single-use plastic leeches microplastics into your water and destroys our environment. A stopgap solution that causes its own problem.",
  },
  {
    number: "03",
    title: "No standard. No accountability.",
    body: "Most local water suppliers lack certified testing or consistent quality control. Every refill is a gamble you take with your family's health.",
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".problem-eyebrow", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".problem-eyebrow", start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(".problem-headline", {
        opacity: 0, y: 60, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".problem-headline", start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(".problem-sub", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".problem-sub", start: "top 88%", toggleActions: "play none none none" },
      });
      gsap.from(".problem-card", {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".problem-cards", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(".problem-statement", {
        opacity: 0, y: 40, scale: 0.95, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".problem-statement", start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="gradient-ocean text-white"
      aria-label="The problem with ordinary water"
    >
      {/* Top wave */}
      <div aria-hidden="true" className="relative overflow-hidden h-20">
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,80 C360,0 1080,80 1440,20 L1440,0 L0,0 Z" fill="#f8fbff" />
        </svg>
      </div>

      <div className="section-padding container-max">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="problem-eyebrow pill pill-gold mb-6 text-gold/90 border-gold/30 bg-gold/10">
            The Water Problem
          </p>
          <h2 className="problem-headline font-display text-display-md text-white mb-6">
            Not all water is
            <span className="text-silver/60 italic"> created equal.</span>
          </h2>
          <p className="problem-sub text-body-lg text-white/50 font-light">
            Most families don&apos;t realise what&apos;s in their drinking water.
            Sunrich was built to change that — one pure drop at a time.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="problem-cards grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {problems.map((p) => (
            <div
              key={p.number}
              className="problem-card glass-dark rounded-2xl p-8 group hover:border-white/20 transition-all duration-500"
            >
              <span className="text-xs font-bold text-gold/60 tracking-widest uppercase mb-4 block">
                {p.number}
              </span>
              <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bold statement */}
        <div className="problem-statement text-center py-16 border-t border-white/10">
          <p className="font-display text-display-sm text-white/90 leading-tight max-w-3xl mx-auto">
            &ldquo;Clean water is not a luxury.
            It&apos;s a fundamental{" "}
            <span className="italic text-gold">right of every family.</span>&rdquo;
          </p>
          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          <p className="mt-4 text-sm text-white/30 tracking-widest uppercase font-medium">
            — Sunrich Agua
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div aria-hidden="true" className="relative overflow-hidden h-20">
        <svg viewBox="0 0 1440 80" className="absolute top-0 w-full" preserveAspectRatio="none">
          <path d="M0,0 C360,80 1080,0 1440,60 L1440,80 L0,80 Z" fill="#f8fbff" />
        </svg>
      </div>
    </section>
  );
}
