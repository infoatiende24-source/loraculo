"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ServiceCard {
  title: string;
  image: string;
  description: string;
  buttonText: string;
}

const services: ServiceCard[] = [
  {
    title: "PREGUNTA DE TAROT",
    image: "/servicio_lectura_tarot.png",
    description:
      "Una única pregunta al tarot para recibir claridad inmediata. Las cartas revelan lo que necesitas saber en este momento de tu vida.\n\nTambién disponible consulta completa de 30 minutos para una lectura más profunda y detallada.",
    buttonText: "DESDE 10€",
  },
  {
    title: "SANACIÓN ENERGÉTICA",
    image: "/servicio_sanacion_energetica.png",
    description:
      "Sanación profunda mediante péndulo hebreo. Libera bloqueos energéticos, restaura el equilibrio de tu campo áurico y reconecta con tu esencia más pura.\n\nUna experiencia transformadora que trabaja a nivel físico, emocional y espiritual.",
    buttonText: "DESDE 80€",
  },
  {
    title: "DESHIELO\n4 SESIONES",
    image: "/servicio_dehielo_4_sesiones.png",
    description:
      "Proceso individual de transformación profunda en 4 sesiones. Trabaja las capas de hielo emocional que te bloquean y liberan tu verdadera esencia.\n\nUn viaje guiado de sanación y liberación personal con acompañamiento constante de Libertad.",
    buttonText: "280€ / 4 SESIONES",
  },
  {
    title: "RITUAL CON VELA\nPERSONALIZADO",
    image: "/servicio_ritual_vela.png",
    description:
      "Ritual con vela personalizado para crear una conexión energética y espiritual única. Cada vela se prepara específicamente para tu intención y necesidad.\n\nIdeal para activar la energía del amor, la protección, la abundancia o la sanación.",
    buttonText: "20€",
  },
];

function ServiceCardComponent({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Gold border wrapper using background + padding trick */}
      <div
        className="rounded-xl p-[1.5px] cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C, #D4AF37)",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Inner card content */}
        <div className="rounded-[10px] overflow-hidden bg-[#0A0A0A]">
          <div className="group relative">
            {/* Service image */}
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3
                  className="font-[var(--font-cinzel)] text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase whitespace-pre-line subtitle-gold"
                >
                  {service.title}
                </h3>
              </div>

              {/* Expand hint arrow */}
              {!expanded && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}
            </div>

            {/* Expandable description */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-[#121212] border-t border-[#D4AF37]/15 overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    <p className="text-[#E5E5E5] text-xs sm:text-sm text-center leading-relaxed mb-5 whitespace-pre-line">
                      {service.description}
                    </p>
                    <motion.button
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-full px-6 py-3 rounded-full text-black text-xs sm:text-sm font-[var(--font-cinzel)] tracking-[0.1em] uppercase"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {service.buttonText}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="relative py-20 md:py-32 px-4 sm:px-6 bg-[#0A0A0A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-4 section-title-gold"
          >
            MIS SERVICIOS
          </h2>
          <p
            className="text-sm md:text-base tracking-[0.1em] mb-8 subtitle-gold"
          >
            Lo que el universo tiene preparado para ti
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-[#999999] text-sm leading-relaxed whitespace-pre-line text-center">
              {"Cada servicio está diseñado para darte claridad real en los momentos importantes de tu vida."}
              {"\n"}
              {"No son solo respuestas… son decisiones tomadas con conciencia."}
              {"\n"}
              {"Con el Oráculo de Libertad, una inteligencia espiritual entrenada por Libertad Molina, puedes acceder a guía inmediata, profunda y personalizada cuando lo necesites."}
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCardComponent key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
