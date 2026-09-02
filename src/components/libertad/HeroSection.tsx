"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image - Ken Burns zoom-in + subtle continuous drift */}
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 20, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/hero_l.jpg')" }}
        />
      </motion.div>

      {/* Ultra-subtle continuous drift layer */}
      <motion.div
        animate={{
          x: [0, 3, 0, -3, 0],
          y: [0, -2, 0, 2, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[1]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero_l.jpg')" }}
        />
      </motion.div>

      {/* Minimal gradient overlay - only bottom for text readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top gold divider */}
      <div className="absolute top-0 left-0 right-0 z-10 gold-divider" />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center pt-28 pb-24 sm:pt-32 md:pt-28 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mx-auto mb-5 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-black/40 px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-[#D4AF37]" />
          <span className="font-[var(--font-cinzel)] text-[10px] sm:text-xs tracking-[0.22em] gold-text-animated">
            UN ESPACIO PARA VOLVER A TI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-[var(--font-cinzel)] text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-[0.04em] uppercase mb-5"
        >
          <span className="block gold-text-animated drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Hay algo en ti
          </span>
          <span className="block mt-1 silver-text-animated drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            pidiendo ser escuchado
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mx-auto mb-4 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] px-2"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Tarot · Sanación · Guía espiritual
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="silver-text-animated mx-auto mb-10 max-w-3xl text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] px-2"
        >
          A veces no necesitas más ruido ni más opiniones. Necesitas un lugar
          seguro desde el que mirar aquello que tu alma ya sabe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={() => scrollToSection("#oraculo")}
            className="rounded-full bg-gradient-to-r from-[#e95872] via-[#d64f69] to-[#f27d8a] px-6 sm:px-8 py-3 sm:py-3.5 font-[var(--font-cinzel)] text-[11px] sm:text-sm font-bold tracking-[0.1em] text-white shadow-[0_0_28px_rgba(233,88,114,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_38px_rgba(233,88,114,0.55)]"
          >
            ✦ Abrir mi espacio de claridad
          </button>
          <p className="silver-text-animated font-[var(--font-playfair)] text-sm sm:text-base md:text-lg lg:text-xl mt-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            Una primera lectura gratuita para empezar a comprender.
          </p>
        </motion.div>
      </div>

      {/* Scroll-down chevron */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => scrollToSection("#oraculo")}
      >
        <ChevronDown className="w-6 h-6 text-[#D4AF37]/70" />
      </motion.div>

      {/* Bottom gold divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 gold-divider" />
    </section>
  );
}
