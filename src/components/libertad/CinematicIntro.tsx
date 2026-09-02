"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CinematicIntro() {
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 1450),
      window.setTimeout(() => setStage(2), 3300),
      window.setTimeout(() => setStage(3), 5200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return <AnimatePresence>{open && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: 1.05, ease: "easeInOut" }} className="fixed inset-0 z-[100] overflow-hidden bg-[#030303]">
    <motion.div initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1.035 : 1.12 }} transition={{ duration: 2.3, ease: "easeOut" }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero_l.jpg')" }} />
    <motion.div initial={{ opacity: 1 }} animate={{ opacity: stage >= 2 ? 0.25 : 1 }} transition={{ duration: 1.8 }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.36)_38%,rgba(0,0,0,0.97)_100%)]" />
    <motion.div initial={{ scale: 0.02, opacity: 0 }} animate={stage >= 1 ? { scale: [0.02, 0.38, 1.9], opacity: [0, 1, 0] } : { scale: 0.02, opacity: 0 }} transition={{ duration: 2.8, ease: "easeInOut" }} className="absolute left-1/2 top-1/2 h-[26vmin] w-[26vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F1D887]/80 shadow-[0_0_35px_12px_rgba(212,175,55,0.22),0_0_110px_38px_rgba(233,88,114,0.18)]" />
    <motion.div initial={{ scale: 0.01, opacity: 0 }} animate={stage >= 1 ? { scale: [0.01, 0.3, 1.5], opacity: [0, 0.9, 0] } : { scale: 0.01, opacity: 0 }} transition={{ duration: 2.2, delay: 0.22, ease: "easeOut" }} className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,239,172,0.9)_0%,rgba(212,175,55,0.45)_18%,rgba(233,88,114,0.16)_38%,transparent_67%)]" />
    <motion.div animate={{ opacity: stage >= 2 ? 1 : 0 }} transition={{ duration: 1.7, delay: 0.25 }} className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/55" />
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.95, y: 0 }} transition={{ duration: 1.2, delay: 0.35 }} className="font-[var(--font-playfair)] text-xl italic text-[#E7DDCE] sm:text-2xl">Hay algo que ya sabes…</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: stage >= 1 ? 0.9 : 0 }} transition={{ duration: 0.8 }} className="mt-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.34em] text-[#E8D48B] uppercase">Solo necesita silencio para aparecer</motion.p>
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 22 }} transition={{ duration: 1.2, delay: 0.55 }} className="mt-12"><p className="font-[var(--font-cinzel)] text-xs tracking-[0.34em] text-[#E8D48B] uppercase">Libertad Molina</p><h1 className="mt-5 max-w-3xl font-[var(--font-playfair)] text-4xl leading-[1.03] text-[#F8F0DF] sm:text-5xl md:text-6xl">Un espacio<br />para volver a ti.</h1></motion.div>
      <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 16 }} transition={{ duration: 0.75 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => setOpen(false)} className="mt-10 rounded-full border border-[#E8D48B]/80 bg-black/30 px-9 py-3.5 font-[var(--font-cinzel)] text-xs tracking-[0.2em] text-[#F5E7AC] uppercase backdrop-blur-sm transition-colors hover:bg-[#D4AF37] hover:text-black">Entrar</motion.button>
    </div>
  </motion.div>}</AnimatePresence>;
}
