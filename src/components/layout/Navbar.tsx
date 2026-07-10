"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",    href: "#problem"      },
  { label: "Purity",   href: "#product"      },
  { label: "Features", href: "#features"     },
  { label: "Quality",  href: "#quality"      },
  { label: "Reviews",  href: "#testimonials" },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-sm shadow-ocean/8 py-0"
            : "bg-transparent py-0"
        }`}
      >
        <div className="container-max flex items-center justify-between">

          {/* Left: Logo */}
          <Link href="/" aria-label="Sunrich Agua Home">
            <Image
              src="/sunrich-logo.png"
              alt="Sunrich Agua"
              width={240}
              height={90}
              priority
              className={`h-[55px] sm:h-[70px] md:h-[90px] w-auto object-contain transition-all duration-500 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Center: Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    scrolled
                      ? "text-ocean/70 hover:text-ocean"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Right: CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("#cta")}
              className={`hidden md:inline-flex btn-primary text-sm py-2.5 px-6 ${
                !scrolled
                  ? "bg-white/15 backdrop-blur-sm border-white/30 border text-white shadow-none hover:bg-white/25"
                  : ""
              }`}
            >
              Order Water
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-ocean hover:bg-ocean/5"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[64px] left-4 right-4 z-40 glass rounded-2xl p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4 mb-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-lg font-medium text-ocean w-full text-left py-1 hover:text-aqua transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => handleNavClick("#cta")}
              className="btn-primary w-full justify-center"
            >
              Order Water
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
