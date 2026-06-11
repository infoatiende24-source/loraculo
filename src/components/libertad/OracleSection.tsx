"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Crown, Lock, Sparkles } from "lucide-react";

/* ── Admin mode ── */
const ADMIN_PASSWORD = "libertad2024admin";
const ADMIN_STORAGE_KEY = "libertad_admin_mode";

/* ── Anti-repetition v2: Advanced memory system ── */
const RECENT_CARDS_STORAGE_KEY = "libertad_recent_cards";
const RECENT_PHRASES_STORAGE_KEY = "libertad_recent_phrases";
const RECENT_CONCLUSIONS_STORAGE_KEY = "libertad_recent_conclusions";
const RECENT_LAYERS_STORAGE_KEY = "libertad_recent_layers";
const RECENT_STYLES_STORAGE_KEY = "libertad_recent_styles";

const getStorageArray = (key: string, max: number): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.slice(0, max) : [];
  } catch {
    return [];
  }
};

const setStorageArray = (key: string, arr: string[], max: number) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(arr.slice(0, max)));
};

const getRecentCards = (): string[] => getStorageArray(RECENT_CARDS_STORAGE_KEY, 15);

const addRecentCard = (cardName: string) => {
  if (typeof window === "undefined") return;
  const recent = getRecentCards();
  const filtered = recent.filter((c) => c !== cardName);
  filtered.unshift(cardName);
  setStorageArray(RECENT_CARDS_STORAGE_KEY, filtered, 15);
};

const getRecentPhrases = (): string[] => getStorageArray(RECENT_PHRASES_STORAGE_KEY, 20);
const addRecentPhrases = (phrases: string[]) => {
  const current = getRecentPhrases();
  setStorageArray(RECENT_PHRASES_STORAGE_KEY, [...phrases, ...current], 20);
};

const getRecentConclusions = (): string[] => getStorageArray(RECENT_CONCLUSIONS_STORAGE_KEY, 10);
const addRecentConclusion = (conclusion: string) => {
  const current = getRecentConclusions();
  setStorageArray(RECENT_CONCLUSIONS_STORAGE_KEY, [conclusion, ...current], 10);
};

const getRecentLayers = (): string[] => getStorageArray(RECENT_LAYERS_STORAGE_KEY, 4);
const getRecentStyles = (): string[] => getStorageArray(RECENT_STYLES_STORAGE_KEY, 4);

const clearRecentCards = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RECENT_CARDS_STORAGE_KEY);
  localStorage.removeItem(RECENT_PHRASES_STORAGE_KEY);
  localStorage.removeItem(RECENT_CONCLUSIONS_STORAGE_KEY);
  localStorage.removeItem(RECENT_LAYERS_STORAGE_KEY);
  localStorage.removeItem(RECENT_STYLES_STORAGE_KEY);
};

const isAdminMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
};

const setAdminMode = (on: boolean) => {
  if (typeof window === "undefined") return;
  if (on) {
    localStorage.setItem(ADMIN_STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
};

/* ── Daily limit helpers ── */
const getDailyCount = (key: string): number => {
  if (typeof window === "undefined") return 0;
  const today = new Date().toISOString().split("T")[0];
  const stored = localStorage.getItem(key);
  if (!stored) return 0;
  try {
    const { date, count } = JSON.parse(stored);
    return date === today ? count : 0;
  } catch {
    return 0;
  }
};

const setDailyCount = (key: string, count: number) => {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(key, JSON.stringify({ date: today, count }));
};

/* ── Daily messages (30+) — Voz femenina, cercana, intuitiva, asertiva. Español de España ── */
const dailyMessages = [
  {
    title: "El Universo Conspira a Tu Favor",
    message:
      "Hoy el universo te recuerda algo que a veces olvidas: cada desafío que te ha puesto en el camino era una puerta disfrazada. Eres más fuerte de lo que crees, y lo que parece obstáculo es exactamente lo que necesitas para crecer. Confía en ti.",
    emoji: "🌟",
  },
  {
    title: "Confía en Tu Intuición",
    message:
      "Esa voz interior que escuchas no es casualidad, amiga. Hoy es el día de escucharla con más fuerza y actuar según lo que sientes, no solo lo que piensas. Tu intuición femenina es una de tus herramientas más poderosas. No la silencies.",
    emoji: "🔮",
  },
  {
    title: "Un Ciclo Se Cierra",
    message:
      "Algo que comenzó hace tiempo llega a su punto final. Y aunque a veces nos cuesta soltar, te digo algo: cerrar ciclos no es perder, es hacer espacio para lo nuevo. Celebra el camino recorrido y prepárate, porque lo que viene tiene fuerza.",
    emoji: "🎡",
  },
  {
    title: "Luz en la Oscuridad",
    message:
      "Incluso en los momentos más difíciles, hay una luz dentro de ti que nunca se apaga. Hoy esa luz brilla con más intensidad. Déjate guiar por ella. No necesitas tener todas las respuestas para dar el siguiente paso.",
    emoji: "✨",
  },
  {
    title: "El Poder del Ahora",
    message:
      "El pasado ya fue, el futuro aún no llega. Lo único real es este momento, y en este momento eres suficiente. Vive hoy con plenitud y vas a ver cómo las piezas se van acomodando. Te lo prometo.",
    emoji: "⏳",
  },
  {
    title: "Amor Propio Primero",
    message:
      "Antes de buscar amor fuera, mírate al espejo. Eres completa, eres suficiente, eres merecedora. Hoy el universo te pide que te trates como tratarías a la mujer que más amas. Porque esa mujer eres tú.",
    emoji: "❤️",
  },
  {
    title: "Transformación Interior",
    message:
      "Como la mariposa que deja su capullo, estás pasando por una transformación profunda. Puede que no lo veas ahora, pero todo lo que estás viviendo tiene un propósito. Confía en el proceso: la belleza que está germinando dentro de ti va a dejar a todos sin palabras.",
    emoji: "🦋",
  },
  {
    title: "Conexión Ancestral",
    message:
      "Hoy tus ancestros caminan contigo. Siente esa fuerza de las mujeres que vinieron antes que tú, que lucharon, que amaron, que resistieron. No estás sola en este viaje. La fuerza de las tuyas te sostiene.",
    emoji: "🏛️",
  },
  {
    title: "Abundancia en Camino",
    message:
      "El universo es generoso con quienes confían. Hoy abre los ojos a las oportunidades que te rodean. La abundancia no es solo dinero: es amor, es salud, es paz interior. Ya está aquí, solo necesitas verla.",
    emoji: "💰",
  },
  {
    title: "Coraje para Avanzar",
    message:
      "El miedo es solo una sombra del ego. Tu alma conoce el camino. Hoy da un paso hacia lo que te da miedo y descubre que al otro lado está tu libertad. La mujer que hay en ti es más valiente de lo que imagina.",
    emoji: "🦁",
  },
  {
    title: "Equilibrio y Armonía",
    message:
      "Busca el equilibrio en todas las áreas de tu vida. Como la balanza del destino, cuando todo está en armonía, la claridad llega naturalmente. Hoy prioriza lo que realmente importa y suelta lo que te desgasta sin aportar.",
    emoji: "⚖️",
  },
  {
    title: "Semillas del Futuro",
    message:
      "Todo lo que siembras hoy dará frutos mañana. Elige tus pensamientos con cuidado, pues son las semillas de lo que estás creando. Pon intención en lo que haces hoy y el universo se encargará del resto.",
    emoji: "🌱",
  },
  {
    title: "Libertad Interior",
    message:
      "La verdadera libertad no está fuera, está dentro. Hoy libera las cadenas invisibles que te atan — esas creencias que te contaron de pequeña y que ya no te sirven. Siente cómo tu alma se expande cuando te permites ser quien realmente eres.",
    emoji: "🕊️",
  },
  {
    title: "Sabiduría Ancestral",
    message:
      "Las runas antiguas guardan secretos para ti. Hoy la sabiduría milenaria fluye hacia tu vida, trayendo respuestas que tu alma siempre conoció. Escucha esa voz antigua que habla desde dentro. Tiene cosas importantes que decirte.",
    emoji: "ᛟ",
  },
  {
    title: "Renacimiento",
    message:
      "Cada amanecer es una oportunidad de nacer de nuevo. Hoy el sol te invita a dejar atrás lo viejo y abrazar la versión más auténtica de ti. No tienes que ser perfecta: tienes que ser real. Eso es lo que te hace poderosa.",
    emoji: "🌅",
  },
  {
    title: "Protección Divina",
    message:
      "Estás rodeada de protección. Nunca has estado desprotegida, aunque a veces lo sientas así. Hoy percibe esa presencia cálida que te cuida en cada paso. Confía: estás siendo guiada, incluso cuando no lo entiendes.",
    emoji: "👼",
  },
  {
    title: "Verdad que Libera",
    message:
      "Hay una verdad que necesitas escuchar. No la que te dicen, sino la que late en tu pecho. Hoy el universo te pide honestidad contigo misma. Mírate sin filtros, con cariño pero con valentía. La verdad puede doler, pero siempre libera.",
    emoji: "💎",
  },
  {
    title: "Paciencia Fértil",
    message:
      "Lo que está creciendo necesita tiempo. No apresures lo que se está cocinando con amor. La espera no es pasividad: es confianza. Lo que merece la pena, merece la espera. Y créeme: va a valer la pena.",
    emoji: "🌿",
  },
  {
    title: "Encuentro Fatídico",
    message:
      "Alguien o algo importante está a punto de cruzar tu camino. Mantén los ojos y el corazón abiertos. El destino tiene una sorpresa preparada para ti, y esta vez va a ser buena. Presta atención a las señales de hoy.",
    emoji: "💫",
  },
  {
    title: "Fuerza Inquebrantable",
    message:
      "Has superado cosas que ni imaginabas posibles. Hoy recuerda tu fuerza. Eres más poderosa de lo que crees y más valiente de lo que sientes. Todo lo que has vivido te ha preparado para este momento. No lo desperdicies.",
    emoji: "💪",
  },
  {
    title: "Sincronicidad",
    message:
      "Hoy las señales del universo están en todas partes. Presta atención a los números que se repiten, las palabras que escuchas por casualidad, los encuentros inesperados. Nada es casualidad. El universo te está hablando.",
    emoji: "🔢",
  },
  {
    title: "Sanación Profunda",
    message:
      "Un proceso de sanación está activo en tu vida. Permite que las heridas se cierren y que la luz entre donde antes había sombra. No tengas prisa: la sanación profunda no se apresura. Se honra.",
    emoji: "🤍",
  },
  {
    title: "Nuevos Horizontes",
    message:
      "El horizonte se expande ante ti. Nuevas posibilidades, nuevos caminos, nuevos sueños. Hoy es el día de mirar más allá de lo conocido y atreverte a soñar en grande. El mundo es más amplio de lo que te han hecho creer.",
    emoji: "🌄",
  },
  {
    title: "Gratitud Transformadora",
    message:
      "La gratitud es la llave que abre todas las puertas. Hoy da gracias por lo que tienes, por la mujer que fuiste y por la que estás a punto de llegar a ser. La gratitud cambia la frecuencia de todo lo que te rodea.",
    emoji: "🙏",
  },
  {
    title: "Fuego Interior",
    message:
      "Hay una pasión dormida dentro de ti que pide despertar. Hoy enciende ese fuego y deja que te guíe hacia lo que realmente te hace vibrar. No pidas permiso para brillar. Simplemente brilla.",
    emoji: "🔥",
  },
  {
    title: "Agua que Fluye",
    message:
      "Como el río que no se detiene, deja que tu energía fluya. No resistas lo que sientes, déjalo moverse y transformarte. La resistencia es lo que nos causa dolor, no el cambio. Fluye con la vida hoy.",
    emoji: "🌊",
  },
  {
    title: "Tierra Sagrada",
    message:
      "Conecta con la tierra hoy. Camina descalza, respira profundo, siente la energía del planeta que te sostiene. Estás arraigada a algo más grande que tú. Tu cuerpo es tu templo: trátalo como tal.",
    emoji: "🌍",
  },
  {
    title: "Viento del Cambio",
    message:
      "Un viento de cambio sopla a tu favor. No lo resistas, déjate llevar y confía en que te lleva exactamente donde necesitas estar. A veces lo mejor que podemos hacer es soltar el timón y confiar en la corriente.",
    emoji: "🌬️",
  },
  {
    title: "Estrella Fugaz",
    message:
      "Pide un deseo hoy. El universo está escuchando con especial atención. Las estrellas se alinean para hacer realidad lo que tu corazón anhela. Pero ojo: pide con el corazón abierto, sin limitaciones. Atrévete a pedir grande.",
    emoji: "⭐",
  },
  {
    title: "Paz Interior",
    message:
      "Hoy el regalo del universo para ti es la paz. En medio del caos, vas a encontrar un espacio de calma que no esperabas. Disfrútalo, lo mereces. La paz no se busca: se permite. Hoy permítete estar en paz.",
    emoji: "☮️",
  },
  {
    title: "Magia Cotidiana",
    message:
      "La magia no está solo en los rituales, está en cada momento. Hoy abre los ojos a la magia de lo cotidiano y vas a ver que los milagros te rodean. Una sonrisa, un abrazo, un amanecer: eso también es magia. Y es tuya.",
    emoji: "✨",
  },
];

/* ── Tab definitions ── */
type TabKey = "tarot" | "runas" | "chat" | "daily";

const tabs = [
  { key: "tarot" as TabKey, label: "TAROT", emoji: "🃏", icon: "🃏" },
  { key: "runas" as TabKey, label: "RUNAS", emoji: "ᛟ", icon: "ᛟ" },
  { key: "chat" as TabKey, label: "CHAT", emoji: "💬", icon: "💬" },
  { key: "daily" as TabKey, label: "DÍA", emoji: "🌟", icon: "🌟" },
];

const FREE_LIMIT = 1;
const STORAGE_KEYS: Record<string, string> = {
  tarot: "libertad_oracle_tarot_count",
  runas: "libertad_oracle_runas_count",
  chat: "libertad_oracle_chat_count",
};

export default function OracleSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("tarot");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [premiumSuggestion, setPremiumSuggestion] = useState<string>("");
  const [dailyCounts, setDailyCounts] = useState<Record<string, number>>({
    tarot: 0,
    runas: 0,
    chat: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [adminMode, setAdminModeState] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Theme management
  useEffect(() => {
    const stored = localStorage.getItem("libertad_theme");
    if (stored === "light") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("libertad_theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  useEffect(() => {
    setMounted(true);
    setAdminModeState(isAdminMode());
    setDailyCounts({
      tarot: getDailyCount(STORAGE_KEYS.tarot),
      runas: getDailyCount(STORAGE_KEYS.runas),
      chat: getDailyCount(STORAGE_KEYS.chat),
    });
  }, []);

  const handleSubmit = useCallback(
    async (type: "tarot" | "runas" | "chat", questionText?: string) => {
      const q = questionText || question;
      if (!q.trim() || loading) return;

      // Admin password check
      if (q.trim().toLowerCase() === ADMIN_PASSWORD) {
        setAdminMode(true);
        setAdminModeState(true);
        clearRecentCards();
        setQuestion("");
        return;
      }
      if (q.trim().toLowerCase() === "salir admin") {
        setAdminMode(false);
        setAdminModeState(false);
        setQuestion("");
        return;
      }

      if (!adminMode && dailyCounts[type] >= FREE_LIMIT) return;

      setLoading(true);
      setResult(null);
      setSuggestedQuestions([]);

      try {
        const recentCards = getRecentCards();
        const recentPhrases = getRecentPhrases();
        const recentConclusions = getRecentConclusions();
        const recentLayers = getRecentLayers();
        const recentStyles = getRecentStyles();
        const res = await fetch("/api/oracle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            question: q.trim(),
            recentCards,
            recentPhrases,
            recentConclusions,
            recentLayers,
            recentStyles,
          }),
        });

        if (!res.ok) throw new Error("Error en la consulta");

        const data = await res.json();
        setResult(data.message);
        setSuggestedQuestions(data.suggestedQuestions || []);
        setPremiumSuggestion(data.premiumSuggestion || "");

        // Extract card name from first line and add to recent cards
        if (type === "tarot" || type === "runas") {
          const firstLine = (data.message || "").split("\n")[0] || "";
          const dashIdx = firstLine.indexOf(" - ");
          if (dashIdx > 0) {
            const cardName = firstLine
              .substring(0, dashIdx)
              .trim()
              .replace(/^[^a-zA-Z\u00C0-\u017F]+/, "")
              .trim();
            if (cardName) addRecentCard(cardName);
          }
        }

        // ── Anti-repetition: store phrases and conclusions from this reading ──
        if (data.keyPhrases && Array.isArray(data.keyPhrases)) {
          addRecentPhrases(data.keyPhrases);
        }
        if (data.conclusion && data.conclusion.length > 10) {
          addRecentConclusion(data.conclusion);
        }

        if (!adminMode) {
          const newCount = dailyCounts[type] + 1;
          setDailyCount(STORAGE_KEYS[type], newCount);
          setDailyCounts((prev) => ({ ...prev, [type]: newCount }));
        }
      } catch {
        setResult(
          "Vaya, parece que ahora mismo no puedo conectar bien. Inténtalo de nuevo en un ratito, ¿vale? ✨"
        );
        setSuggestedQuestions([
          "¿Qué aspecto de tu situación no has descubierto todavía y podría cambiarlo todo?",
          "¿Qué decisión se está cocinando ahora mismo sin que la veas?",
        ]);
        setPremiumSuggestion("Hay aspectos más profundos en tu situación que una sola lectura no puede revelar.");
      } finally {
        setLoading(false);
        if (!questionText) {
          setQuestion("");
        }
      }
    },
    [question, loading, dailyCounts, adminMode]
  );

  const remaining = (type: string) =>
    adminMode ? 999 : Math.max(0, FREE_LIMIT - (dailyCounts[type] ?? 0));

  // Listen for tab switch events from CTAFinalSection
  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail as TabKey);
        setResult(null);
        setQuestion("");
        setSuggestedQuestions([]);
      }
    };
    window.addEventListener("oracle-switch-tab", handleSwitchTab);
    return () =>
      window.removeEventListener("oracle-switch-tab", handleSwitchTab);
  }, []);

  const getDailyMessage = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return dailyMessages[dayOfYear % dailyMessages.length];
  };

  const dailyMessage = getDailyMessage();

  if (!mounted) return null;

  return (
    <section id="oraculo" className="relative py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-4 section-title-gold"
          >
            ORÁCULO DE LIBERTAD
          </h2>
          <p
            className="text-sm md:text-base tracking-[0.1em] subtitle-gold"
          >
            Inteligencia espiritual entrenada por Libertad Molina
          </p>
        </motion.div>

        {/* Gold Border Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="p-[1px] rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C, #D4AF37)",
            }}
          >
            <div className="bg-[#0A0A0A] rounded-2xl p-4 sm:p-6 md:p-8">
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setResult(null);
                      setQuestion("");
                      setSuggestedQuestions([]);
                    }}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-[var(--font-cinzel)] text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                      activeTab === tab.key
                        ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        : "bg-[#1A1A1A] text-[#999999] border border-[#333333] hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                    }`}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* TAROT & RUNAS & CHAT tabs */}
                  {(activeTab === "tarot" ||
                    activeTab === "runas" ||
                    activeTab === "chat") && (
                    <div>
                      {/* Free count indicator / Admin mode */}
                      <div className="flex items-center justify-center gap-2 mb-6">
                        {adminMode ? (
                          <>
                            <Crown
                              className="w-4 h-4 text-[#D4AF37]"
                              fill="#D4AF37"
                            />
                            <span className="text-xs text-[#D4AF37] tracking-wider font-semibold">
                              MODO ADMIN — Acceso ilimitado activado
                            </span>
                          </>
                        ) : (
                          <>
                            <Star
                              className="w-4 h-4 text-[#D4AF37]"
                              fill="#D4AF37"
                            />
                            <span className="text-xs text-[#999999] tracking-wider">
                              {remaining(activeTab) > 0 ? (
                                <>
                                  Gratuito:{" "}
                                  <span className="text-[#D4AF37]">
                                    {remaining(activeTab)} consulta
                                    {remaining(activeTab) > 1 ? "s" : ""} disponible
                                    {remaining(activeTab) > 1 ? "s" : ""}
                                  </span>{" "}
                                  hoy
                                </>
                              ) : (
                                <span className="text-[#D4AF37]/60">
                                  Límite gratuito alcanzado hoy
                                </span>
                              )}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Input */}
                      <div className="mb-6">
                        <textarea
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder={
                            activeTab === "tarot"
                              ? "Escribe tu pregunta para el tarot..."
                              : activeTab === "runas"
                                ? "Escribe tu pregunta para las runas..."
                                : "Escribe tu pregunta espiritual..."
                          }
                          rows={3}
                          className="w-full bg-[#1A1A1A] border border-[#333333] rounded-xl px-4 py-3 text-[#F5F5F5] placeholder-[#666666] resize-none focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm"
                          disabled={loading}
                        />
                      </div>

                      {/* Submit Button - always visible to allow admin password entry */}
                      <div className="flex flex-col items-center gap-3 mb-6">
                        <button
                          onClick={() =>
                            handleSubmit(
                              activeTab as "tarot" | "runas" | "chat"
                            )
                          }
                          disabled={
                            !question.trim() ||
                            loading ||
                            (remaining(activeTab) <= 0 &&
                              question.trim().toLowerCase() !== ADMIN_PASSWORD &&
                              question.trim().toLowerCase() !== "salir admin")
                          }
                          className={`px-8 py-3 rounded-full font-[var(--font-cinzel)] text-sm tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2 ${
                            question.trim() &&
                            !loading &&
                            (remaining(activeTab) > 0 ||
                              question.trim().toLowerCase() === ADMIN_PASSWORD ||
                              question.trim().toLowerCase() === "salir admin")
                              ? "bg-[#D4AF37] text-black hover:bg-[#E8D48B] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                              : "bg-[#222222] text-[#666666] cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          {activeTab === "tarot"
                            ? "SACAR CARTA"
                            : activeTab === "runas"
                              ? "SACAR RUNA"
                              : "CONSULTAR"}
                        </button>

                        {/* Paywall CTA when limit reached and not admin */}
                        {remaining(activeTab) <= 0 && !adminMode && (
                          <a
                            href="#servicios"
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-[var(--font-cinzel)] text-xs tracking-[0.15em] uppercase transition-all duration-300"
                            style={{
                              backgroundImage:
                                "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                              color: "#0A0A0A",
                            }}
                          >
                            <Crown className="w-3.5 h-3.5" />
                            Ver planes premium
                          </a>
                        )}
                      </div>

                      {/* Premium options (visual only) */}
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {[2, 3, 4, 5].map((n) => (
                          <motion.button
                            key={n}
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: n * 0.2,
                            }}
                            disabled
                            className="px-4 py-2 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]/50 text-xs tracking-wider cursor-not-allowed relative"
                          >
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider">
                              PLAN PREMIUM
                            </span>
                            {n} {n === 1 ? "carta" : "cartas"}
                          </motion.button>
                        ))}
                      </div>

                      {/* Result */}
                      <AnimatePresence mode="wait">
                        {loading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-8"
                          >
                            <div className="inline-flex items-center gap-3">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full"
                              />
                              <span className="text-[#D4AF37] text-sm tracking-wider">
                                Consultando al universo...
                              </span>
                            </div>
                          </motion.div>
                        )}
                        {result && !loading && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Main result card */}
                            <div className="bg-[#121212]/80 border border-[#D4AF37]/15 rounded-xl p-6">
                              <div className="whitespace-pre-line text-[#CCCCCC] leading-relaxed text-sm md:text-base">
                                {result}
                              </div>
                            </div>

                            {/* ── STEP 2: Hook Questions (Pure Curiosity) ── */}
                            <AnimatePresence>
                              {suggestedQuestions.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: 0.3,
                                  }}
                                  className="mt-6"
                                >
                                  <div className="text-center mb-4">
                                    <span
                                      className="text-xs tracking-[0.2em] uppercase"
                                      style={{ color: "#D4AF37" }}
                                    >
                                      ¿Quieres saber más?
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {suggestedQuestions.map((sq, i) => (
                                      <motion.button
                                        key={i}
                                        initial={{ opacity: 0, x: i === 0 ? -15 : 15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.15 }}
                                        disabled={
                                          loading ||
                                          remaining(activeTab) <= 0
                                        }
                                        onClick={() => {
                                          if (
                                            remaining(activeTab) > 0 &&
                                            !loading
                                          ) {
                                            setQuestion(sq);
                                            handleSubmit(
                                              activeTab as
                                                | "tarot"
                                                | "runas"
                                                | "chat",
                                              sq
                                            );
                                          }
                                        }}
                                        className="group text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                        style={{
                                          background:
                                            "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))",
                                          border:
                                            "1px solid rgba(212,175,55,0.15)",
                                        }}
                                        onMouseEnter={(e) => {
                                          if (
                                            remaining(activeTab) > 0 &&
                                            !loading
                                          ) {
                                            e.currentTarget.style.borderColor =
                                              "rgba(212,175,55,0.4)";
                                            e.currentTarget.style.background =
                                              "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))";
                                            e.currentTarget.style.transform =
                                              "translateY(-2px)";
                                            e.currentTarget.style.boxShadow =
                                              "0 4px 15px rgba(212,175,55,0.15)";
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.borderColor =
                                            "rgba(212,175,55,0.15)";
                                          e.currentTarget.style.background =
                                            "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))";
                                          e.currentTarget.style.transform =
                                            "translateY(0)";
                                          e.currentTarget.style.boxShadow =
                                            "none";
                                        }}
                                      >
                                        <div className="flex items-start gap-2">
                                          <span className="text-[#D4AF37] mt-0.5 text-sm">
                                            🔮
                                          </span>
                                          <span className="text-[#BBBBBB] text-[13px] leading-relaxed group-hover:text-[#D4AF37] transition-colors">
                                            {sq}
                                          </span>
                                        </div>
                                        {remaining(activeTab) > 0 && (
                                          <div className="mt-2 ml-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] text-[#D4AF37]/70 tracking-wider uppercase">
                                              Click para consultar
                                            </span>
                                            <Send className="w-3 h-3 text-[#D4AF37]/70" />
                                          </div>
                                        )}
                                        {remaining(activeTab) <= 0 && (
                                          <div className="mt-2 ml-6 flex items-center gap-1">
                                            <Lock className="w-3 h-3 text-[#666]" />
                                            <span className="text-[10px] text-[#666] tracking-wider">
                                              Premium
                                            </span>
                                          </div>
                                        )}
                                      </motion.button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* ── STEP 3: Premium Suggestion (Emotional Bridge) ── */}
                            {premiumSuggestion && !adminMode && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="text-center mt-5 text-[#888888] text-xs italic tracking-wider"
                                style={{ color: "rgba(212,175,55,0.6)" }}
                              >
                                {premiumSuggestion}
                              </motion.p>
                            )}

                            {/* ── STEP 4: Premium CTA (Natural Conversion) ── */}
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.9 }}
                              className="mt-6 text-center"
                            >
                              <div className="flex flex-col items-center gap-3">
                                <p className="text-xs text-[#999999] tracking-wider">
                                  Lecturas más profundas · Mayor claridad · Tarot, runas y más
                                </p>
                                <a
                                  href="https://wa.me/34634451693?text=Hola%20Libertad,%20me%20gustar%C3%ADa%20suscribirme%20a%20lecturas%20premium%20%E2%9C%A8"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-[var(--font-cinzel)] text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-105"
                                  style={{
                                    backgroundImage:
                                      "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C, #D4AF37)",
                                    backgroundSize: "200% 200%",
                                    animation: "shimmer 3s ease-in-out infinite",
                                    color: "#0A0A0A",
                                    boxShadow:
                                      "0 0 25px rgba(212,175,55,0.3)",
                                  }}
                                >
                                  <Crown className="w-4 h-4" />
                                  Explorar lecturas premium
                                  <Crown className="w-4 h-4" />
                                </a>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* DAILY MESSAGE tab */}
                  {activeTab === "daily" && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <Star
                          className="w-4 h-4 text-[#D4AF37]"
                          fill="#D4AF37"
                        />
                        <span className="text-xs text-[#D4AF37] tracking-[0.15em] uppercase">
                          Gratis · Se renueva cada día
                        </span>
                      </div>

                      {/* Message Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-lg mx-auto"
                      >
                        <div
                          className="p-[1px] rounded-xl"
                          style={{
                            background:
                              "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                          }}
                        >
                          <div className="bg-[#121212] rounded-xl p-8 relative overflow-hidden">
                            {/* Decorative corner elements */}
                            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#D4AF37]/30" />
                            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#D4AF37]/30" />
                            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#D4AF37]/30" />
                            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#D4AF37]/30" />

                            {/* Emoji */}
                            <div className="text-5xl mb-6">
                              {dailyMessage.emoji}
                            </div>

                            {/* Title */}
                            <h3
                              className="font-[var(--font-cinzel)] text-lg md:text-xl tracking-[0.1em] uppercase mb-4 subtitle-gold"
                            >
                              {dailyMessage.title}
                            </h3>

                            {/* Message */}
                            <p className="text-[#CCCCCC] leading-relaxed text-sm md:text-base">
                              {dailyMessage.message}
                            </p>

                            {/* Date */}
                            <div className="mt-6 pt-4 border-t border-[#D4AF37]/10">
                              <span className="text-xs text-[#666666] tracking-wider">
                                {new Date().toLocaleDateString("es-ES", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: theme === "dark"
              ? "linear-gradient(135deg, #E8D48B, #D4AF37)"
              : "linear-gradient(135deg, #D4AF37, #9A7B1A)",
            color: theme === "dark" ? "#0A0A0A" : "#FFFFFF",
            boxShadow: theme === "dark"
              ? "0 0 15px rgba(212,175,55,0.3)"
              : "0 2px 10px rgba(0,0,0,0.15)",
          }}
          title={theme === "dark" ? "Cambiar a modo luminoso" : "Cambiar a modo oscuro"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
    </section>
  );
}
