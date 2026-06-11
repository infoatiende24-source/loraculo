"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Oráculo", href: "#oraculo" },
  { label: "Libertad", href: "#libertad" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-lg shadow-black/50"
            : "bg-black/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, "#inicio")}
              className="flex items-center gap-2 group"
            >
              <Image
                src="/logo_libertad.png"
                alt="Logo Libertad Molina"
                width={22}
                height={22}
                className="w-5 h-5 object-contain group-hover:opacity-80 transition-opacity"
              />
              <span
                className="font-[var(--font-cinzel)] text-sm md:text-base font-semibold tracking-[0.2em] gold-gradient-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                LIBERTAD MOLINA
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[#CCCCCC] hover:text-[#D4AF37] transition-colors duration-300 text-xs tracking-[0.15em] uppercase font-[var(--font-cinzel)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, "#contacto")}
                className="inline-flex items-center px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] text-xs tracking-[0.15em] uppercase font-[var(--font-cinzel)] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                CONSULTA GRATIS
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#D4AF37] p-2 hover:text-[#E8D48B] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl tracking-[0.2em] uppercase font-[var(--font-cinzel)] gold-gradient-text hover:text-[#E8D48B] transition-colors"
                style={{
                  backgroundImage: mobileOpen
                    ? "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)"
                    : undefined,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-[var(--font-cinzel)] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              CONSULTA GRATIS
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
