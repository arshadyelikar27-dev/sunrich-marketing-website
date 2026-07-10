"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    stars: 5,
    quote:
      "We switched to Sunrich for our home six months ago. The difference in taste was immediate — our kids actually ask for water now instead of juice. That told me everything about the quality.",
    name: "Deepa Nair",
    role: "Homemaker, Kochi",
    initial: "D",
    color: "from-ocean/10 to-sky",
  },
  {
    stars: 5,
    quote:
      "I manage a 200-person office. After switching to Sunrich, sick-day absences dropped noticeably in the first quarter. The team loves the taste and I love the certified quality reports they send with every delivery.",
    name: "Rajesh Menon",
    role: "Operations Manager, Bangalore",
    initial: "R",
    color: "from-gold/10 to-sky",
  },
  {
    stars: 5,
    quote:
      "As a restaurant owner, water quality directly affects my food. Sunrich gives me consistent, tested water every delivery. My chef says he can actually taste the difference in dishes cooked with it.",
    name: "Ananya Krishnan",
    role: "Restaurant Owner, Chennai",
    initial: "A",
    color: "from-aqua/10 to-crystal",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".testimonials-header > *", {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-header", start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(".testimonial-card", {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-grid", start: "top 78%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-sky/30"
      aria-label="Customer testimonials"
    >
      <div className="container-max">
        {/* Header */}
        <div className="testimonials-header text-center max-w-xl mx-auto mb-16">
          <span className="pill pill-ocean mb-6">Real Customers. Real Impact.</span>
          <h2 className="font-display text-display-md text-ocean mb-4">
            Families who made
            <br />
            <span className="italic">the switch.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm text-ocean/60 font-medium">
              4.9 average · 3,800+ verified reviews
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card premium-card p-8 flex flex-col gap-6 bg-gradient-to-br ${t.color}`}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="flex-1">
                <p className="text-ocean/75 text-sm leading-relaxed font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-ocean/8">
                <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center text-white font-display font-bold text-sm shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ocean">{t.name}</p>
                  <p className="text-xs text-ocean/45">{t.role}</p>
                </div>
                <div className="ml-auto">
                  <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-display text-display-sm text-ocean/15 font-bold">3,800+</p>
          <p className="text-sm text-ocean/35 -mt-2 uppercase tracking-widest font-medium">
            Satisfied Families
          </p>
        </div>
      </div>
    </section>
  );
}
