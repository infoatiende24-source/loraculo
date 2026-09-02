"use client";

import { motion } from "framer-motion";
import { Eye, Gem, MessageCircle, WandSparkles, Sparkles } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const systemItems = [
  { icon: Eye, label: "TAROT" },
  { icon: Gem, label: "SANACIÓN" },
  { icon: MessageCircle, label: "ORÁCULOS" },
  { icon: WandSparkles, label: "TRANSFORMACIÓN" },
];

function GoldFeatureBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="mt-16"
    >
      <div
        className="rounded-2xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, #D4AF37, #E8D48B, #C9A84C, #D4AF37, #E8D48B)",
          backgroundSize: "300% 300%",
          animation: "goldShimmer 4s ease-in-out infinite",
        }}
      >
        <div className="rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-md px-6 py-8 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {systemItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="text-[#D4AF37]"
                >
                  <item.icon className="w-6 h-6" strokeWidth={1.5} />
                </motion.div>
                <span
                  className="font-[var(--font-cinzel)] text-[10px] sm:text-xs tracking-[0.15em] uppercase text-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "goldTextPulse 3s ease-in-out infinite",
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CTAFinalSection() {
  const openOracle = () => {
    const oracleSection = document.querySelector("#oraculo");
    if (oracleSection) {
      oracleSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="contacto"
      className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Radial gold glow background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-[var(--font-cinzel)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase mb-6 section-title-gold"
        >
          TU SIGUIENTE PASO
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#CCCCCC] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Puedes empezar con una primera lectura gratuita o, si ya sabes que
          necesitas acompañamiento, hablar directamente con Libertad.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            onClick={openOracle}
            className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-black font-[var(--font-cinzel)] text-xs sm:text-sm tracking-[0.1em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow duration-300 cursor-pointer"
            style={{ backgroundImage: "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)" }}
          >
            <Sparkles className="mr-2 inline h-4 w-4" /> Abrir el oráculo
          </motion.button>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.42 }}
            whileHover={{ scale: 1.04 }}
            href="https://wa.me/34634451693?text=Hola%20Libertad%2C%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20una%20consulta%20personal%20%E2%9C%A8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#D4AF37]/60 text-[#E8D48B] font-[var(--font-cinzel)] text-xs sm:text-sm tracking-[0.1em] uppercase hover:border-[#E8D48B] hover:bg-[#D4AF37]/10 transition-all duration-300"
          >
            <MessageCircle className="mr-2 inline h-4 w-4" /> Hablar con Libertad
          </motion.a>
        </div>

        {/* Gold Feature Bar — Pre-footer element */}
        <GoldFeatureBar />
      </div>
    </section>
  );
}
