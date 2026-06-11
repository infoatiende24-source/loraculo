"use client";

import { motion } from "framer-motion";
import { Star, BrainCircuit, ShieldCheck, MoonStar, Clock3, Sparkles } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Libertad tiene un don increíble. Su lectura cambió mi perspectiva completamente. Ahora entiendo muchas cosas que antes me confundían y siento paz interior.",
    name: "María G.",
  },
  {
    quote:
      "La mejor experiencia espiritual que he tenido. Profesional, cálida y profundamente intuitiva. La sanación energética fue transformadora. Lo recomiendo al 100%.",
    name: "Carlos R.",
  },
  {
    quote:
      "Las cartas hablan a través de Libertad. Sentí una conexión inmediata. Su guía me ayudó a tomar una decisión importante en mi vida amorosa.",
    name: "Ana L.",
  },
  {
    quote:
      "Consulté a Libertad en un momento de dudas y su lectura me dio exactamente la claridad que necesitaba. El proceso de Deshielo cambió mi vida por completo.",
    name: "Pedro M.",
  },
  {
    quote:
      "Increíble la precisión de sus lecturas y la profundidad de su sanación energética. Me ayudó a entender mi situación con una claridad que no esperaba.",
    name: "Laura S.",
  },
  {
    quote:
      "Una experiencia transformadora. Libertad no solo lee las cartas, te acompaña en el proceso de sanación. Se nota su experiencia y su corazón. La vela ritualizada fue mágica.",
    name: "David T.",
  },
  {
    quote:
      "Llevaba tiempo buscando a alguien de confianza en el mundo espiritual y por fin la encontré. Profesionalismo y sensibilidad en cada sesión.",
    name: "Isabel F.",
  },
  {
    quote:
      "La lectura de Libertad fue exactamente lo que necesitaba escuchar. Me dio paz y dirección en un momento muy confuso de mi vida. Su energía es única.",
    name: "Roberto P.",
  },
  {
    quote:
      "Cada sesión con Libertad es única. Su conexión con las cartas y su capacidad sanadora son auténticas. Sus mensajes siempre llegan al corazón.",
    name: "Elena M.",
  },
];

const trustBarItems: { icon: LucideIcon; label: string }[] = [
  { icon: BrainCircuit, label: "TECNOLOGÍA\nAVANZADA" },
  { icon: Sparkles, label: "LECTURAS\nPERSONALIZADAS" },
  { icon: ShieldCheck, label: "PRIVACIDAD\nGARANTIZADA" },
  { icon: MoonStar, label: "SABIDURÍA\nESPIRITUAL" },
  { icon: Clock3, label: "DISPONIBLE\n24/7" },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-[#121212]/80 border border-[#D4AF37]/10 p-6 rounded-lg hover:border-[#D4AF37]/25 transition-colors duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-[#D4AF37]"
            fill="#D4AF37"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#CCCCCC] text-sm leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-4" />

      {/* Name */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
            color: "#0A0A0A",
          }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <span className="text-[#F5F5F5] text-sm font-medium">
          {testimonial.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonios"
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
            className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase section-title-gold"
          >
            TESTIMONIOS
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Trust Bar - Moved here from Footer */}
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
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8">
                {trustBarItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
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
                      className="font-[var(--font-cinzel)] text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-center leading-tight"
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
      </div>
    </section>
  );
}
