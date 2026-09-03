"use client";

import { useEffect, useRef, useState } from "react";

const sparks = [
  [10, 24], [18, 71], [25, 41], [33, 18], [40, 76], [49, 28], [58, 66],
  [67, 19], [74, 49], [83, 73], [91, 33], [6, 52], [96, 58],
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function CinematicIntro() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(true);
  const touchY = useRef<number | null>(null);
  const closing = progress >= 0.98;

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    let unlockTimer: number | undefined;
    const advance = (amount: number) => {
      setProgress((current) => {
        const next = clamp(current + amount);
        if (next >= 1 && unlockTimer === undefined) {
          unlockTimer = window.setTimeout(() => setActive(false), 550);
        }
        return next;
      });
    };
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      advance(event.deltaY / 950);
    };
    const touchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null;
    };
    const touchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (touchY.current === null || currentY === undefined) return;
      const delta = touchY.current - currentY;
      if (Math.abs(delta) > 2) {
        event.preventDefault();
        advance(delta / 560);
        touchY.current = currentY;
      }
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: false });
    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
    };
  }, [active]);

  if (!active) return null;

  const signal = clamp((progress - 0.08) / 0.24);
  const portal = clamp((progress - 0.26) / 0.45);
  const reveal = clamp((progress - 0.68) / 0.27);
  const phraseOpacity = clamp(1 - progress * 3.2);
  const promptOpacity = clamp(1 - progress * 4);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#020202]" aria-label="Apertura de Libertad Molina">
      <div className="absolute inset-0 bg-cover bg-[position:50%_30%] sm:bg-center" style={{ backgroundImage: "url('/hero_l.jpg')", opacity: reveal, transform: `scale(${1.14 - reveal * 0.14})`, transition: "opacity 120ms linear, transform 120ms linear" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_12%,rgba(0,0,0,0.78)_70%,#020202_100%)]" style={{ opacity: 1 - reveal * 0.76 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/55" style={{ opacity: reveal }} />

      <div className="absolute inset-0" style={{ opacity: signal }}>
        {sparks.map(([left, top], index) => <i key={index} className="absolute h-1 w-1 rounded-full bg-[#f6dc8a] shadow-[0_0_10px_rgba(244,201,90,0.95)]" style={{ left: `${left}%`, top: `${top}%`, opacity: 0.35 + (index % 3) * 0.18, transform: `scale(${0.5 + signal * 0.8})` }} />)}
      </div>

      <div className="absolute left-1/2 top-1/2 h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[6%] rounded-full border border-[#f4d982]/80 shadow-[0_0_32px_8px_rgba(228,177,55,0.18)]" style={{ opacity: portal, transform: `scale(${0.06 + portal * 0.94}) rotate(${portal * 45}deg)` }} />
        <div className="absolute inset-[18%] rounded-full border border-[#d9a649]/75" style={{ opacity: portal * 0.9, transform: `scale(${0.04 + portal * 0.96}) rotate(${-portal * 62}deg)` }} />
        <div className="absolute inset-[30%] rounded-full border border-[#fff0b5]/55" style={{ opacity: portal * 0.72, transform: `scale(${0.02 + portal * 0.98}) rotate(${portal * 80}deg)` }} />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,244,184,0.95)_0%,rgba(231,184,65,0.38)_15%,rgba(191,99,117,0.12)_33%,transparent_66%)]" style={{ opacity: portal * 0.86, transform: `scale(${0.08 + portal * 0.96})` }} />
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center" style={{ opacity: phraseOpacity }}>
        <p className="font-[var(--font-playfair)] text-3xl italic leading-tight text-[#f8eee0] sm:text-5xl">Hay respuestas que nacen<br />en silencio.</p>
        <div className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-[#eed47b] to-transparent" />
      </div>

      <div className="absolute bottom-12 left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center" style={{ opacity: reveal * clamp((0.96 - progress) * 18) }}>
        <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.42em] text-[#f2d883] uppercase">Libertad Molina</p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl text-[#fff5e0] sm:text-6xl">Vuelve a ti.</h1>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center" style={{ opacity: promptOpacity }}>
        <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[#f0d583] uppercase">Desliza para abrir</p>
        <span className="mx-auto mt-3 block h-8 w-px animate-pulse bg-gradient-to-b from-[#f0d583] to-transparent" />
      </div>

      <div className="absolute inset-0 bg-black" style={{ opacity: closing ? (progress - 0.98) * 50 : 0, transition: "opacity 120ms linear" }} />
    </div>
  );
}
