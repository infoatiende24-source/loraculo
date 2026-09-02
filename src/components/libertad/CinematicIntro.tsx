"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function LegacyCinematicIntro() {
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

const stars = [
  [8, 18, 1], [16, 76, 0.7], [25, 31, 0.9], [31, 65, 0.55], [42, 14, 0.75],
  [53, 25, 0.6], [60, 78, 0.9], [70, 19, 0.65], [79, 57, 0.8], [90, 27, 0.7],
  [95, 73, 0.55], [5, 49, 0.65], [37, 89, 0.5], [73, 91, 0.65],
];

export default function CinematicIntro() {
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 1250),
      window.setTimeout(() => setStage(2), 3150),
      window.setTimeout(() => setStage(3), 5800),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return <AnimatePresence>{open && <motion.section initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.018, filter: "blur(2px)" }} transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[100] overflow-hidden bg-[#030202]" aria-label="Bienvenida a Libertad Molina">
    <motion.div initial={{ opacity: 0, scale: 1.18 }} animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1.025 : 1.18 }} transition={{ duration: 3.4, ease: "easeOut" }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero_l.jpg')" }} />
    <motion.div animate={{ opacity: stage >= 2 ? 0.58 : 1 }} transition={{ duration: 2.3 }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(13,10,8,0.12)_0%,rgba(3,2,2,0.94)_69%)]" />
    <motion.div animate={{ opacity: stage >= 2 ? 1 : 0 }} transition={{ duration: 2.1, delay: 0.35 }} className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/55" />
    <div className="absolute inset-0 opacity-60">{stars.map(([left, top, size], index) => <motion.i key={index} animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.35, 0.7] }} transition={{ duration: 2.1 + (index % 3) * 0.55, delay: index * 0.12, repeat: Infinity }} className="absolute block rounded-full bg-[#f9e6a7] shadow-[0_0_9px_rgba(248,211,113,0.85)]" style={{ left: `${left}%`, top: `${top}%`, width: `${size * 3}px`, height: `${size * 3}px` }} />)}</div>
    <motion.div animate={stage >= 1 ? { opacity: [0, 1, 0], scale: [0.06, 0.75, 2.4], rotate: [0, 58, 112] } : { opacity: 0, scale: 0.06 }} transition={{ duration: 3.65, ease: [0.65, 0, 0.35, 1] }} className="absolute left-1/2 top-1/2 h-[36vmin] w-[36vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f7dfa0]/90 shadow-[0_0_28px_8px_rgba(244,202,91,0.42),0_0_105px_30px_rgba(183,99,123,0.25)]"><span className="absolute inset-[11%] rounded-full border border-[#fff2ba]/50" /><span className="absolute inset-[22%] rounded-full border border-[#d8a94b]/70" /></motion.div>
    <motion.div animate={stage >= 1 ? { opacity: [0, 0.85, 0], scale: [0.04, 0.8, 2.05] } : { opacity: 0, scale: 0.04 }} transition={{ duration: 3.1, delay: 0.22, ease: "easeOut" }} className="absolute left-1/2 top-1/2 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,246,195,0.92)_0%,rgba(234,192,77,0.48)_13%,rgba(173,82,112,0.22)_31%,transparent_65%)]" />
    <motion.div animate={stage >= 1 ? { opacity: [0, 0.62, 0], scaleX: [0.1, 1.3, 2.2] } : { opacity: 0, scaleX: 0.1 }} transition={{ duration: 2.7, delay: 0.35, ease: "easeInOut" }} className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[#ffeeb2] to-transparent shadow-[0_0_22px_5px_rgba(245,207,110,0.7)]" />
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"><motion.p initial={{ opacity: 0, y: 14, letterSpacing: "0.12em" }} animate={{ opacity: stage < 2 ? 1 : 0, y: 0, letterSpacing: "0.2em" }} transition={{ duration: 1.15, delay: 0.28 }} className="font-[var(--font-cinzel)] text-[10px] uppercase text-[#f1d887] sm:text-xs">Cierra los ojos un instante</motion.p><motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: stage < 2 ? 0.96 : 0, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="mt-5 max-w-xl font-[var(--font-playfair)] text-3xl italic leading-tight text-[#f7efe2] sm:text-5xl">Lo que buscas no está lejos.</motion.h1><motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 28 }} transition={{ duration: 1.5, delay: 0.45, ease: "easeOut" }} className="mt-5"><p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.42em] text-[#f1d887] uppercase sm:text-xs">Libertad Molina</p><div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#edd37f] to-transparent" /><h2 className="mt-6 max-w-3xl font-[var(--font-playfair)] text-4xl leading-[1.02] text-[#fff6e6] sm:text-6xl md:text-7xl">Un espacio para<br />volver a ti.</h2><p className="mt-6 font-[var(--font-playfair)] text-base italic text-[#eadfce] sm:text-lg">Tu verdad ya conoce el camino.</p></motion.div><motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 16 }} transition={{ duration: 0.8 }} whileHover={{ scale: 1.055, boxShadow: "0 0 30px rgba(245,210,118,0.35)" }} whileTap={{ scale: 0.98 }} onClick={() => setOpen(false)} className="mt-10 rounded-full border border-[#ebd282]/85 bg-black/25 px-9 py-3.5 font-[var(--font-cinzel)] text-[11px] tracking-[0.22em] text-[#fff0b9] uppercase backdrop-blur-md transition-colors hover:bg-[#e6c56b] hover:text-[#17120a]">Entrar</motion.button></div>
  </motion.section>}</AnimatePresence>;
}
