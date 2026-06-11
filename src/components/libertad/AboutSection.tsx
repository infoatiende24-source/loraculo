"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const paragraphs = [
  "Desde muy joven sentí que había algo más allá de lo visible. Una presencia, una intuición, una forma de entender la vida que no se podía explicar… pero sí sentir. Mi camino espiritual comenzó como un susurro del alma que con el tiempo se convirtió en mi misión.",
  "El tarot apareció como un lenguaje sagrado. Un puente entre lo que ves y lo que necesitas comprender. No como una herramienta para predecir el futuro, sino como una guía para iluminar los caminos que ya existen dentro de ti. A través de las cartas, he acompañado a cientos de personas en su proceso de autoconocimiento y sanación.",
  "Pero mi trabajo no termina en el tarot. La sanación energética con péndulo hebreo me permitió descubrir que el cuerpo y el alma guardan memorias que necesitan ser liberadas. Cada sesión es un espacio de transformación profunda donde lo viejo se suelta y lo nuevo puede nacer.",
  "Cada lectura, cada sesión de sanación, cada ritual es un espacio único. No hay respuestas automáticas, no hay fórmulas. Solo conexión, intuición y presencia. Me dejo guiar por la energía de las cartas, del péndulo y por la tuya.",
  "Creo un espacio donde puedes soltar tus dudas, entender tus emociones, liberar bloqueos y mirar tu vida desde una perspectiva más clara, más consciente y más alineada contigo. Mi proceso de Deshielo es testimonio de que la transformación real es posible cuando te acompaña alguien que realmente ve tu alma.",
  "Porque la verdadera respuesta nunca está fuera. Está en ti. Y mi misión es ayudarte a verla, a sentirla y a confiar en ella. Hoy, esa conexión también se expande a través del Oráculo de Libertad, para que no tengas que esperar a una sesión para recibir guía. Porque no estás solo en tu proceso.",
  "Nunca lo has estado.",
];

export default function AboutSection() {
  return (
    <section
      id="libertad"
      className="relative py-20 md:py-32 px-4 sm:px-6 bg-[#0A0A0A]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Gold corner accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]" />

              <div
                className="relative aspect-[3/4] rounded-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                  padding: "1px",
                }}
              >
                <Image
                  src="/perfil_libertad.jpeg"
                  alt="Libertad Molina - Mentora Espiritual"
                  fill
                  className="w-full h-full object-cover rounded-xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="font-[var(--font-cinzel)] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 subtitle-gold"
            >
              UN MENSAJE DE LIBERTAD
            </h3>

            <h4
              className="font-[var(--font-playfair)] text-2xl md:text-3xl mb-8 subtitle-gold"
            >
              Más que tarot… una conexión con tu alma.
            </h4>

            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="text-[#CCCCCC] leading-relaxed text-sm md:text-base"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <p className="text-[#999999] text-sm italic mb-1">Con luz,</p>
              <p
                className="font-[var(--font-cinzel)] italic text-xl subtitle-gold"
              >
                Libertad
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
