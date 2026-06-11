"use client";

import { Instagram, BrainCircuit, ShieldCheck, MoonStar, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type LucideIcon } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Oráculo", href: "#oraculo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Libertad", href: "#libertad" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const trustBadges = [
  { emoji: "⭐", title: "Guía Real", desc: "Atención personalizada y humana" },
  { emoji: "🛡️", title: "Privado y Seguro", desc: "Tus datos están protegidos" },
  { emoji: "⏰", title: "Respuestas Rápidas", desc: "Orientación cuando la necesitas" },
  { emoji: "❤️", title: "Acompañamiento", desc: "Contigo en cada paso" },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t-0">
      {/* Gold Divider */}
      <div className="gold-divider" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo_libertad.png"
                alt="Logo Libertad Molina"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span
                className="font-[var(--font-cinzel)] text-sm font-semibold tracking-[0.2em]"
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
            </div>
            <p className="text-[#999999] text-xs leading-relaxed mb-3">
              Mentora espiritual, tarot, sanación energética y transformación personal. Guía personalizada que conecta con la sabiduría del universo para tu vida.
            </p>
            <p className="text-[#666666] text-[11px] leading-relaxed">
              📧 yiceia.nihal@gmail.com
            </p>
            <p className="text-[#666666] text-[11px] leading-relaxed">
              🕐 L-V 10:00 - 15:00
            </p>
          </motion.div>

          {/* Column 2 - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className="font-[var(--font-cinzel)] text-xs tracking-[0.15em] uppercase mb-4"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Navegación
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#999999] hover:text-[#D4AF37] transition-colors text-xs tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="font-[var(--font-cinzel)] text-xs tracking-[0.15em] uppercase mb-4"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Confianza
            </h4>
            <ul className="space-y-3">
              {trustBadges.map((badge) => (
                <li key={badge.title} className="flex items-start gap-2">
                  <span className="text-sm">{badge.emoji}</span>
                  <div>
                    <p className="text-[#CCCCCC] text-xs font-medium">
                      {badge.title}
                    </p>
                    <p className="text-[#666666] text-[11px]">{badge.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Social & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              className="font-[var(--font-cinzel)] text-xs tracking-[0.15em] uppercase mb-4"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sígueme
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com/Yiceia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#333333] flex items-center justify-center text-[#999999] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
                aria-label="Instagram @Yiceia"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#333333] flex items-center justify-center text-[#999999] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                T
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-[#333333] flex items-center justify-center text-[#999999] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                Y
              </a>
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="text-[#666666] hover:text-[#999999] transition-colors text-[11px] block"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-[#666666] hover:text-[#999999] transition-colors text-[11px] block"
              >
                Términos de Uso
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#222222] text-center">
          <p className="text-[#666666] text-xs tracking-wider">
            © 2025 Libertad Molina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
