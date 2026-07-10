"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Filter, TestTube, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    icon: <Filter size={20} />,
    label: "7-Stage RO Purification",
    desc: "Sediment filter → Carbon block → RO membrane → UV sterilisation → Mineral cartridge → Taste enhancer → Final polish.",
  },
  {
    icon: <TestTube size={20} />,
    label: "Lab-Tested Every Batch",
    desc: "Every production batch undergoes 28-point lab testing before dispatch. You receive a quality certificate with every order.",
  },
  {
    icon: <Leaf size={20} />,
    label: "Eco-Conscious Packaging",
    desc: "BPA-free recyclable bottles. Carbon-offset delivery. 40% less plastic than industry standard per litre of water delivered.",
  },
];

const puritySteps = [
  { step: "01", title: "Source Water", desc: "Collected from approved underground sources with natural mineral profiles." },
  { step: "02", title: "Pre-Filtration", desc: "Removes large sediment, rust and visible impurities in 3 stages." },
  { step: "03", title: "RO Membrane", desc: "Reverse osmosis removes 99.9% of dissolved salts, bacteria and heavy metals." },
  { step: "04", title: "UV Sterilisation", desc: "Ultraviolet light eliminates any remaining microbial life." },
  { step: "05", title: "Mineral Balance", desc: "Essential minerals added back at scientifically optimal levels." },
  { step: "06", title: "pH Optimisation", desc: "Water adjusted to pH 7.4 — the perfect balance for human health." },
];

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-text > *", {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".product-text", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(".material-item", {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".material-item", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(".purity-step", {
        opacity: 0, x: -30, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".purity-steps", start: "top 78%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="section-padding bg-crystal"
      aria-label="Sunrich purification process"
    >
      <div className="container-max">
        {/* Header */}
        <div className="product-text flex flex-col gap-6 max-w-2xl mb-20">
          <span className="pill pill-ocean self-start">Our Water</span>
          <h2 className="font-display text-display-md text-ocean leading-tight">
            Purity you can taste.
            <br />
            <span className="italic text-ocean-mid">Science you can trust.</span>
          </h2>
          <p className="text-body-lg text-ocean/60 font-light">
            Sunrich water goes through a 7-stage purification journey before
            reaching your family. Every litre is tested, certified and sealed
            for your health and peace of mind.
          </p>
        </div>

        {/* Process cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {stages.map((s, i) => (
            <div
              key={i}
              className="material-item premium-card p-8 bg-gradient-to-br from-sky/50 to-crystal group"
            >
              <div className="w-11 h-11 rounded-2xl bg-ocean/8 flex items-center justify-center text-ocean group-hover:bg-ocean group-hover:text-white transition-all duration-300 mb-5 shrink-0">
                {s.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-ocean mb-2">
                {s.label}
              </h3>
              <p className="text-sm text-ocean/55 font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Purification steps */}
        <div className="border-t border-ocean/8 pt-16">
          <div className="text-center mb-12">
            <h3 className="font-display text-display-sm text-ocean mb-3">
              The journey of every drop.
            </h3>
            <p className="text-ocean/50 text-sm font-light max-w-md mx-auto">
              From source to your glass — six meticulous steps that define the
              Sunrich difference.
            </p>
          </div>

          <div className="purity-steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {puritySteps.map((s) => (
              <div
                key={s.step}
                className="purity-step flex items-start gap-4 p-5 rounded-2xl hover:bg-sky/40 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full gradient-ocean flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ocean mb-1 group-hover:text-aqua transition-colors duration-300">
                    {s.title}
                  </p>
                  <p className="text-xs text-ocean/50 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
