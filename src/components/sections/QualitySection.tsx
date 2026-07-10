"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Recycle, ShieldCheck, TestTube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "28",   label: "Quality Checkpoints",  icon: <TestTube size={18} /> },
  { value: "BIS",  label: "ISI Certified",         icon: <Award size={18} /> },
  { value: "100%", label: "Recyclable Packaging",  icon: <Recycle size={18} /> },
  { value: "WHO",  label: "Guideline Compliant",   icon: <ShieldCheck size={18} /> },
];

const certifications = [
  "BIS / ISI Certified",
  "FSSAI Approved",
  "WHO Standards",
  "ISO 9001:2015",
  "FDA Grade Materials",
  "pH 7.4 Verified",
  "Zero Bacteria",
  "Heavy Metal Free",
];

export function QualitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".quality-header > *", {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".quality-header", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(".stat-card", {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".stats-grid", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(".cert-badge", {
        opacity: 0, scale: 0.88, stagger: 0.07, duration: 0.7, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".cert-badges", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(".quality-side > *", {
        opacity: 0, x: 40, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".quality-side", start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quality"
      className="gradient-ocean text-white"
      aria-label="Quality and certifications"
    >
      {/* Top wave */}
      <div aria-hidden="true" className="relative overflow-hidden h-20 -mt-px">
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,80 C480,0 960,80 1440,30 L1440,0 L0,0 Z" fill="#f8fbff" />
        </svg>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <div className="quality-header mb-12">
              <span className="pill pill-gold mb-6">Our Standards</span>
              <h2 className="font-display text-display-md text-white mb-6">
                Certified pure.
                <br />
                <span className="italic text-gold">Proven safe.</span>
              </h2>
              <p className="text-body-lg text-white/55 font-light max-w-lg">
                Sunrich holds every major water quality certification in India.
                Every batch is independently lab-tested and documented before
                it reaches your home.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-grid grid grid-cols-2 gap-4 mb-12">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-card glass-dark rounded-2xl p-6 group hover:border-gold/30 transition-all duration-400"
                >
                  <div className="text-gold/60 mb-3 group-hover:text-gold transition-colors duration-300">
                    {stat.icon}
                  </div>
                  <div className="font-display text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Cert Badges */}
            <div className="cert-badges flex flex-wrap gap-2.5">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="cert-badge glass-dark text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 hover:border-gold/40 hover:text-gold transition-all duration-300"
                >
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="quality-side flex flex-col gap-8">
            {[
              {
                title: "Independent Lab Testing",
                body: "Every production batch is sent to a NABL-accredited third-party lab. Results are published on our website. No hiding, no shortcuts.",
              },
              {
                title: "Source Monitoring",
                body: "Our water source is monitored 24/7 with digital sensors. Any quality deviation automatically triggers a production halt.",
              },
              {
                title: "Sustainable Operations",
                body: "Solar-powered purification plant. Zero liquid discharge facility. Carbon-offset delivery fleet. Clean water, clean conscience.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-dark rounded-2xl p-7 group hover:border-white/20 transition-all duration-400"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div aria-hidden="true" className="relative overflow-hidden h-20">
        <svg viewBox="0 0 1440 80" className="absolute top-0 w-full" preserveAspectRatio="none">
          <path d="M0,20 C480,100 960,0 1440,60 L1440,80 L0,80 Z" fill="#f8fbff" />
        </svg>
      </div>
    </section>
  );
}
