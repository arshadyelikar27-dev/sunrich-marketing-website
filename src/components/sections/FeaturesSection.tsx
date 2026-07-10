"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Droplets, FlaskConical, Leaf, Zap, Package, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Droplets size={24} />,
    title: "0 PPM Impurities",
    desc: "Our RO + UV dual-purification achieves zero detectable dissolved impurities. No heavy metals. No bacteria. No compromise.",
    color: "from-sky to-crystal",
    iconBg: "bg-aqua/15 text-aqua",
    accent: "#38b2c8",
  },
  {
    icon: <FlaskConical size={24} />,
    title: "pH 7.4 Balanced",
    desc: "Scientifically balanced at pH 7.4 — matching the human body's natural pH for optimal absorption and daily hydration.",
    color: "from-gold/10 to-sky",
    iconBg: "bg-gold/15 text-gold",
    accent: "#e8a020",
  },
  {
    icon: <Zap size={24} />,
    title: "Essential Minerals",
    desc: "Calcium, Magnesium and Potassium re-added after purification at WHO-recommended levels. Pure, but never stripped.",
    color: "from-ocean/6 to-sky",
    iconBg: "bg-ocean/10 text-ocean",
    accent: "#1a3a5c",
  },
  {
    icon: <Package size={24} />,
    title: "BPA-Free Sealed",
    desc: "FDA-approved food-grade PET bottles. Hermetically sealed at the point of filling. No human contact before you open it.",
    color: "from-sky to-crystal",
    iconBg: "bg-aqua/15 text-aqua",
    accent: "#38b2c8",
  },
  {
    icon: <Clock size={24} />,
    title: "Same-Day Delivery",
    desc: "Order before 10 AM, receive by evening. Temperature-controlled delivery vans ensure freshness from our plant to your door.",
    color: "from-silver-light/60 to-crystal",
    iconBg: "bg-silver/30 text-ocean",
    accent: "#1a3a5c",
  },
  {
    icon: <Leaf size={24} />,
    title: "Eco-Responsible",
    desc: "100% recyclable bottles. Carbon-offset logistics. Return our empties for recycling — we take the guilt out of hydration.",
    color: "from-gold/8 to-crystal",
    iconBg: "bg-gold/15 text-gold",
    accent: "#e8a020",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".features-header > *", {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".features-header", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(".feature-card", {
        opacity: 0, y: 50, scale: 0.96, stagger: 0.1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".features-grid", start: "top 78%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding bg-sky/30"
      aria-label="Sunrich water features"
    >
      <div className="container-max">
        {/* Header */}
        <div className="features-header text-center max-w-2xl mx-auto mb-20">
          <span className="pill pill-ocean mb-6">Why Sunrich</span>
          <h2 className="font-display text-display-md text-ocean mb-6">
            Six reasons families
            <br />
            <span className="italic">choose us every day.</span>
          </h2>
          <p className="text-body-lg text-ocean/55 font-light">
            Pure water is not just about removing contaminants. It&apos;s about
            delivering water that actively supports your health, your taste,
            and your conscience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`feature-card premium-card p-8 bg-gradient-to-br ${feature.color} group cursor-default`}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <span className="text-xs font-bold text-ocean/25 tracking-widest uppercase mb-2 block">
                0{i + 1}
              </span>
              <h3 className="font-display text-xl font-semibold text-ocean mb-3 group-hover:text-ocean-mid transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-ocean/55 font-light leading-relaxed">
                {feature.desc}
              </p>
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full"
                style={{ background: `linear-gradient(90deg, ${feature.accent}40, ${feature.accent})` }}
              />
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
