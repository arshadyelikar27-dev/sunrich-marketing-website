import Link from "next/link";
import { Mail, Phone, Globe, AtSign } from "lucide-react";

const footerLinks = {
  "Our Water":  ["Purification Process", "Quality Standards", "Lab Reports", "Certifications"],
  "Delivery":   ["Home Delivery", "Office Supply", "Event Orders", "Restaurant Plan"],
  "Company":    ["About Us", "Sustainability", "Careers", "Press & Media"],
  "Support":    ["FAQ", "Contact Us", "Delivery Zones", "Returns Policy"],
};

const socials = [
  { icon: <Globe size={18} />,  href: "#", label: "Website"   },
  { icon: <AtSign size={18} />, href: "#", label: "Instagram" },
  { icon: <Phone size={18} />,  href: "#", label: "Call Us"   },
  { icon: <Mail size={18} />,   href: "#", label: "Email"     },
];

export function Footer() {
  return (
    <footer className="gradient-ocean text-white" role="contentinfo">
      <div className="container-max pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="w-32 h-12 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sunrich-logo.png"
                alt="Sunrich Agua"
                className="h-12 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Pure drinking water. Certified, tested, and delivered fresh
              to your home and office every day.
            </p>
            <div className="flex gap-3 mt-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-5">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-light"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-light">
            © {new Date().getFullYear()} Sunrich Agua. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-white/25 hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
