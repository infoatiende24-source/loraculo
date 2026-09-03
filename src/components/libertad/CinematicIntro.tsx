"use client";

import { useEffect, useRef, useState } from "react";

const particles = [
  [12, 21, 1], [19, 68, 0.7], [28, 38, 0.8], [36, 79, 0.55], [44, 16, 0.7],
  [52, 65, 0.65], [61, 31, 0.85], [69, 75, 0.55], [78, 20, 0.8], [88, 55, 0.7],
  [94, 32, 0.5], [7, 51, 0.65], [31, 11, 0.55], [73, 91, 0.6],
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let request = 0;
    const update = () => {
      cancelAnimationFrame(request);
      request = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const scrollLength = section.offsetHeight - window.innerHeight;
        setProgress(clamp((window.scrollY - section.offsetTop) / Math.max(1, scrollLength)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(request);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const signal = clamp((progress - 0.1) / 0.25);
  const portal = clamp((progress - 0.3) / 0.36);
  const reveal = clamp((progress - 0.57) / 0.32);
  const phraseOpacity = clamp(1 - progress * 3.1);
  const invitationOpacity = clamp((progress - 0.38) * 5) * clamp((0.9 - progress) * 7);

  return (
    <section ref={sectionRef} className="relative h-[255svh] bg-[#020202]" aria-label="Introducción cinematográfica de Libertad Molina">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero_l.jpg')", opacity: reveal, transform: `scale(${1.08 - reveal * 0.05})`, transition: "opacity 80ms linear, transform 80ms linear" }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_8%,rgba(0,0,0,0.66)_56%,#020202_100%)]" style={{ opacity: 1 - reveal * 0.72 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/55" style={{ opacity: reveal }} />

        <div className="absolute inset-0" style={{ opacity: signal }}>
          {particles.map(([left, top, size], index) => <span key={index} className="absolute rounded-full bg-[#f5dc8a] shadow-[0_0_10px_rgba(243,203,95,0.9)]" style={{ left: `${left}%`, top: `${top}%`, width: `${size * 3}px`, height: `${size * 3}px`, opacity: 0.3 + ((index % 4) / 7) * signal, transform: `translateY(${(1 - signal) * (index % 3) * 18}px) scale(${0.7 + signal * 0.3})` }} />)}
        </div>

        <div className="absolute left-1/2 top-1/2 h-[88vmin] w-[88vmin] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-[8%] rounded-full border border-[#f5dc8a]/75 shadow-[0_0_24px_6px_rgba(232,183,69,0.2)]" style={{ opacity: portal, transform: `scale(${0.16 + portal * 0.84}) rotate(${portal * 35}deg)` }} />
          <div className="absolute inset-[18%] rounded-full border border-[#d79b3d]/75" style={{ opacity: portal * 0.88, transform: `scale(${0.1 + portal * 0.9}) rotate(${-portal * 54}deg)` }} />
          <div className="absolute inset-[29%] rounded-full border border-[#f6e5a8]/65" style={{ opacity: portal * 0.75, transform: `scale(${0.06 + portal * 0.94}) rotate(${portal * 82}deg)` }} />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,238,166,0.8)_0%,rgba(222,160,51,0.3)_16%,rgba(188,93,111,0.08)_38%,transparent_68%)]" style={{ opacity: portal * 0.9, transform: `scale(${0.1 + portal * 0.92})` }} />
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center" style={{ opacity: phraseOpacity }}>
          <p className="font-[var(--font-playfair)] text-3xl italic text-[#f6ede0] sm:text-5xl">No has llegado aquí<br />por casualidad.</p>
          <div className="mx-auto mt-7 h-px w-14 bg-gradient-to-r from-transparent via-[#e8c96e] to-transparent" />
        </div>

        <div className="absolute bottom-14 left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center" style={{ opacity: invitationOpacity }}>
          <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.42em] text-[#f2d985] uppercase">Libertad Molina</p>
          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl text-[#fff6e4] sm:text-6xl">Vuelve a lo que ya sabes.</h1>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center" style={{ opacity: clamp(1 - progress * 5) }}>
          <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.29em] text-[#f2d985] uppercase">Desliza para abrir</p>
          <span className="mx-auto mt-3 block h-8 w-px animate-pulse bg-gradient-to-b from-[#f2d985] to-transparent" />
        </div>
      </div>
    </section>
  );
}
