"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scenarios = [
  {
    label: "Home",
    headline: "Safe water for your family.",
    bg: "from-sky to-crystal",
    textColor: "text-ocean",
    emoji: "🏡",
    size: "lg:col-span-2 lg:row-span-1",
  },
  {
    label: "Office",
    headline: "Keep your team hydrated.",
    bg: "from-ocean to-ocean-mid",
    textColor: "text-white",
    emoji: "💼",
    size: "lg:col-span-1 lg:row-span-2",
  },
  {
    label: "Gym & Sports",
    headline: "Performance starts with purity.",
    bg: "from-gold/20 to-sky",
    textColor: "text-ocean",
    emoji: "🏋️",
    size: "lg:col-span-1 lg:row-span-1",
  },
  {
    label: "Events",
    headline: "Bulk supply, zero hassle.",
    bg: "from-aqua/20 to-sky",
    textColor: "text-ocean",
    emoji: "🎉",
    size: "lg:col-span-1 lg:row-span-1",
  },
  {
    label: "Restaurants",
    headline: "Serve water you're proud of.",
    bg: "from-silver-light/60 to-crystal",
    textColor: "text-ocean",
    emoji: "🍽️",
    size: "lg:col-span-2 lg:row-span-1",
  },
];

export function LifestyleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".lifestyle-header > *", {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".lifestyle-header", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(".lifestyle-card", {
        opacity: 0, scale: 0.94, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".lifestyle-grid", start: "top 78%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="section-padding bg-crystal"
      aria-label="Where Sunrich fits your life"
    >
      <div className="container-max">
        {/* Header */}
        <div className="lifestyle-header text-center max-w-2xl mx-auto mb-16">
          <span className="pill pill-ocean mb-6">For Every Occasion</span>
          <h2 className="font-display text-display-md text-ocean mb-6">
            Pure water.
            <br />
            <span className="italic text-ocean-mid">Everywhere you need it.</span>
          </h2>
          <p className="text-body-lg text-ocean/55 font-light">
            From your morning glass to bulk event supply — Sunrich delivers
            clean, certified water to every corner of your life.
          </p>
        </div>

        {/* Grid */}
        <div className="lifestyle-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:grid-rows-3">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className={`lifestyle-card group relative rounded-3xl overflow-hidden bg-gradient-to-br ${s.bg} ${s.size} min-h-[200px] cursor-default transition-transform duration-500 hover:scale-[1.02]`}
            >
              <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/5 transition-colors duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 min-h-[200px]">
                <div className="flex items-start justify-between">
                  <span className="pill pill-ocean text-[10px] bg-white/50 border-white/80 text-ocean">
                    {s.label}
                  </span>
                  <span className="text-3xl" role="img" aria-hidden="true">
                    {s.emoji}
                  </span>
                </div>
                <div>
                  <h3 className={`font-display text-display-sm ${s.textColor} leading-tight`}>
                    {s.headline}
                  </h3>
                  <div className="mt-3 w-0 h-0.5 bg-gold group-hover:w-12 transition-all duration-500 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden border-y border-ocean/8 py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8 pr-8">
                {[
                  "Home Delivery", "Office Supply", "Gym Approved",
                  "Event Ready", "Restaurant Grade", "School Safe",
                  "Hotel Partner", "Daily Fresh",
                ].map((text, j) => (
                  <span key={j} className="flex items-center gap-8">
                    <span className="text-xs font-semibold tracking-[0.2em] text-ocean/30 uppercase">{text}</span>
                    <span className="text-gold/50" aria-hidden="true">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
