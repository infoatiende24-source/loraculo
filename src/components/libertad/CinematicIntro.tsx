"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CinematicIntro() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.035, filter: "blur(5px)" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
        >
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero_l.jpg')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_0%,rgba(0,0,0,0.32)_38%,rgba(0,0,0,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80" />
          {[0, 1, 2, 3, 4, 5, 6].map((light) => (
            <motion.span
              key={light}
              aria-hidden="true"
              className="absolute h-1 w-1 rounded-full bg-[#F6E7AA] shadow-[0_0_14px_3px_rgba(232,212,139,0.42)]"
              style={{ left: `${8 + light * 13}%`, top: `${18 + (light % 4) * 17}%` }}
              animate={{ opacity: [0, 0.95, 0], y: [0, -14, -28], scale: [0.6, 1.4, 0.7] }}
              transition={{ duration: 3.8 + light * 0.2, delay: light * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
              className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8D48B]/55 bg-black/30 backdrop-blur-sm"
            >
              <Sparkles className="h-7 w-7 text-[#E8D48B]" strokeWidth={1.15} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.65 }}
              className="font-[var(--font-cinzel)] text-[10px] tracking-[0.34em] text-[#E8D48B] uppercase sm:text-xs"
            >
              Libertad Molina
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-6 max-w-3xl font-[var(--font-playfair)] text-4xl leading-[1.04] text-[#F8F0DF] sm:text-5xl md:text-6xl"
            >
              Hay momentos en los que<br />el alma pide ser escuchada.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-[#DED5C6] sm:text-base"
            >
              Respira. Este espacio es para volver a ti.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.65 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(false)}
              className="mt-10 rounded-full border border-[#E8D48B]/75 bg-[#0D0B0A]/60 px-8 py-3.5 font-[var(--font-cinzel)] text-xs tracking-[0.18em] text-[#F5E7AC] uppercase backdrop-blur-sm transition-colors hover:bg-[#D4AF37] hover:text-black"
            >
              Entrar
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
