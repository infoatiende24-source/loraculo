"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const revealHero = () => setRevealed(true);
    window.addEventListener("libertad:hero-reveal", revealHero);
    return () => window.removeEventListener("libertad:hero-reveal", revealHero);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="libertad-viewport relative flex items-center justify-center overflow-hidden">
      {/* On phones the hand-off must remain pixel-perfect. The cinematic
          movement is reserved for larger screens so the mobile browser's
          changing viewport cannot reveal a shifted background frame. */}
      <div className="libertad-hero-media absolute inset-0 z-0 sm:hidden" />

      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: revealed ? 1.15 : 1.0 }}
        transition={{ duration: 20, delay: revealed ? 1.05 : 0, ease: "linear" }}
        className="absolute inset-0 z-0 hidden sm:block"
      >
        <div className="libertad-hero-media absolute inset-0 will-change-transform" />
      </motion.div>

      <motion.div
        animate={revealed ? { x: [0, 3, 0, -3, 0], y: [0, -2, 0, 2, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 40, delay: revealed ? 1.05 : 0, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[1] hidden sm:block"
      >
        <div className="libertad-hero-media absolute inset-0" />
      </motion.div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-0 left-0 right-0 z-10 gold-divider" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center pt-28 pb-24 sm:pt-32 md:pt-28 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 18, filter: "blur(8px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-5 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-black/40 px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-[#D4AF37]" />
          <span className="font-[var(--font-cinzel)] text-[10px] sm:text-xs tracking-[0.22em] gold-text-animated">UN ESPACIO PARA VOLVER A TI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(12px)" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-[var(--font-cinzel)] text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-[0.04em] uppercase mb-5"
        >
          <span className="block gold-text-animated drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">Hay algo en ti</span>
          <span className="block mt-1 silver-text-animated drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">pidiendo ser escuchado</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
          animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(7px)" }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mb-4 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] px-2"
          style={{ backgroundImage: "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          Tarot · Sanación · Guía espiritual
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
          animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(7px)" }}
          transition={{ duration: 0.8, delay: 0.68 }}
          className="silver-text-animated mx-auto mb-10 max-w-3xl text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] px-2"
        >
          A veces no necesitas más ruido ni más opiniones. Necesitas un lugar seguro desde el que mirar aquello que tu alma ya sabe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(7px)" }}
          animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 18, filter: "blur(7px)" }}
          transition={{ duration: 0.8, delay: 0.82 }}
          className="flex flex-col items-center gap-4"
        >
          <button onClick={() => scrollToSection("#oraculo")} className="rounded-full bg-gradient-to-r from-[#e95872] via-[#d64f69] to-[#f27d8a] px-6 sm:px-8 py-3 sm:py-3.5 font-[var(--font-cinzel)] text-[11px] sm:text-sm font-bold tracking-[0.1em] text-white shadow-[0_0_28px_rgba(233,88,114,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_38px_rgba(233,88,114,0.55)]">
            ✦ Abrir mi espacio de claridad
          </button>
          <p className="silver-text-animated font-[var(--font-playfair)] text-sm sm:text-base md:text-lg lg:text-xl mt-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Una primera lectura gratuita para empezar a comprender.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1, y: [0, 8, 0] } : { opacity: 0 }}
        transition={revealed ? { opacity: { duration: 0.7, delay: 1 }, y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } } : { duration: 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => scrollToSection("#oraculo")}
      >
        <ChevronDown className="w-6 h-6 text-[#D4AF37]/70" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 gold-divider" />
    </section>
  );
}
