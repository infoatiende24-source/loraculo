"use client";

import { useEffect, useRef, useState } from "react";

const frames = [
  "/intro/libertad-frame-01.svg",
  "/intro/libertad-frame-02.svg",
  "/intro/libertad-frame-03.svg",
  "/intro/libertad-frame-04.svg",
  "/intro/libertad-frame-05.svg",
  "/hero_l.jpg",
];

export default function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameRequest = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frameRequest);
      frameRequest = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const start = section.offsetTop;
        const distance = section.offsetHeight - window.innerHeight;
        setProgress(Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(distance, 1))));
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frameRequest);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const framePosition = progress * (frames.length - 1);
  const baseFrame = Math.floor(framePosition);
  const blend = framePosition - baseFrame;
  const titleOpacity = Math.max(0, Math.min(1, (progress - 0.42) * 4.5)) * Math.max(0, Math.min(1, (0.96 - progress) * 14));

  return (
    <section ref={sectionRef} className="relative h-[260svh] bg-[#030202]" aria-label="Introducción cinematográfica Libertad Molina">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#030202]">
        {frames.map((src, index) => {
          const opacity = index === baseFrame ? 1 - blend : index === baseFrame + 1 ? blend : 0;
          return (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center will-change-opacity"
              style={{ backgroundImage: `url('${src}')`, opacity, transition: "opacity 70ms linear" }}
              aria-hidden="true"
            />
          );
        })}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,transparent_34%,rgba(0,0,0,0.76)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.5)_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-14 text-center sm:pb-16" style={{ opacity: titleOpacity }}>
          <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.42em] text-[#f2d681] uppercase sm:text-xs">Libertad Molina</p>
          <h1 className="mt-5 max-w-3xl font-[var(--font-playfair)] text-4xl leading-[1.03] text-[#fff5e1] sm:text-6xl md:text-7xl">Vuelve a lo que ya sabes.</h1>
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#efd782] to-transparent" />
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center" style={{ opacity: Math.max(0, 1 - progress * 6) }}>
          <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.31em] text-[#f3dc92] uppercase">Desliza para abrir el portal</p>
          <span className="mx-auto mt-3 block h-8 w-px animate-pulse bg-gradient-to-b from-[#f3dc92] to-transparent" />
        </div>
      </div>
    </section>
  );
}
