"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Crown,
  Lock,
  BadgeCheck,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";

/* ── Admin mode (shared with OracleSection) ── */
const ADMIN_PASSWORD = "libertad2024admin";
const ADMIN_STORAGE_KEY = "libertad_admin_mode";

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

/* ── Free daily limit ── */
const FREE_CHAT_LIMIT = 1;
const CHAT_STORAGE_KEY = "libertad_whatsapp_chat_count";

const getChatDailyCount = (): number => {
  if (typeof window === "undefined") return 0;
  const today = new Date().toISOString().split("T")[0];
  const stored = localStorage.getItem(CHAT_STORAGE_KEY);
  if (!stored) return 0;
  try {
    const { date, count } = JSON.parse(stored);
    return date === today ? count : 0;
  } catch {
    return 0;
  }
};

const setChatDailyCount = (count: number) => {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(
    CHAT_STORAGE_KEY,
    JSON.stringify({ date: today, count })
  );
};

/* ── Anti-repetition v2: memory system (shared with OracleSection) ── */
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

const getRecentPhrases = (): string[] => getStorageArray(RECENT_PHRASES_STORAGE_KEY, 20);
const getRecentConclusions = (): string[] => getStorageArray(RECENT_CONCLUSIONS_STORAGE_KEY, 10);
const getRecentLayers = (): string[] => getStorageArray(RECENT_LAYERS_STORAGE_KEY, 4);
const getRecentStyles = (): string[] => getStorageArray(RECENT_STYLES_STORAGE_KEY, 4);

const addRecentPhrases = (phrases: string[]) => {
  const current = getRecentPhrases();
  setStorageArray(RECENT_PHRASES_STORAGE_KEY, [...phrases, ...current], 20);
};
const addRecentConclusion = (conclusion: string) => {
  const current = getRecentConclusions();
  setStorageArray(RECENT_CONCLUSIONS_STORAGE_KEY, [conclusion, ...current], 10);
};

/* ── Service catalog ── */
interface ServiceItem {
  emoji: string;
  name: string;
  price: string;
  key: string;
  whatsappMessage: string;
}

/* ── WhatsApp Business number (update with real number) ── */
const WHATSAPP_NUMBER = "34634451693";

const services: ServiceItem[] = [
  {
    emoji: "🃏",
    name: "Pregunta de Tarot",
    price: "Desde 10€",
    key: "pregunta-de-tarot",
    whatsappMessage: encodeURIComponent("¡Hola! Me interesa el servicio de *Pregunta de Tarot* (desde 10€). ¿Podrías darme más información? 💫"),
  },
  {
    emoji: "✨",
    name: "Sanación Energética",
    price: "Desde 80€",
    key: "sanacion-energetica",
    whatsappMessage: encodeURIComponent("¡Hola! Me gustaría agendar una sesión de *Sanación Energética con péndulo hebreo* (desde 80€). ¿Tienes disponibilidad? ✨"),
  },
  {
    emoji: "🦋",
    name: "Deshielo 4 Sesiones",
    price: "280€",
    key: "deshielo-4-sesiones",
    whatsappMessage: encodeURIComponent("¡Hola! Estoy interesada/o en el proceso de *Deshielo 4 Sesiones* de transformación personal (280€ las 4 sesiones). ¿Podrías contarme más? 🦋"),
  },
  {
    emoji: "🕯️",
    name: "Ritual con Vela Personalizado",
    price: "20€",
    key: "ritual-vela-personalizado",
    whatsappMessage: encodeURIComponent("¡Hola! Me gustaría encargar un *Ritual con Vela Personalizado* para mi intención (20€). ¿Cómo es el proceso? 🕯️"),
  },
];

/* ── Tarot card detection ── */
interface TarotCard {
  name: string;
  emoji: string;
}

const TAROT_CARDS: Record<string, string> = {
  "El Mago": "🎩",
  "La Sacerdotisa": "🌙",
  "La Emperatriz": "👑",
  "El Emperador": "🏰",
  "El Hierofante": "⛪",
  "Los Enamorados": "💕",
  "El Carro": "⚔️",
  "La Justicia": "⚖️",
  "El Ermitaño": "🏔️",
  "La Rueda de la Fortuna": "🎡",
  "La Fuerza": "🦁",
  "El Colgado": "🌀",
  "La Muerte": "🥀",
  "La Templanza": "🏺",
  "El Diablo": "😈",
  "La Torre": "⛈️",
  "La Estrella": "⭐",
  "La Luna": "🌕",
  "El Sol": "☀️",
  "El Juicio": "📯",
  "El Mundo": "🌍",
  "El Loco": "🤡",
  "As de Bastos": "🔥",
  "As de Copas": "💧",
  "As de Espadas": "🗡️",
  "As de Oros": "💰",
  "Dos de Copas": "🤝",
  "Tres de Copas": "🎉",
  "Cuatro de Copas": "🥱",
  "Cinco de Copas": "😢",
  "Seis de Copas": "👭",
  "Siete de Copas": "💭",
  "Ocho de Copas": "🚶",
  "Nueve de Copas": "🌶️",
  "Diez de Copas": "🌈",
  "Sota de Copas": "👩",
  "Caballo de Copas": "🐴",
  "Rey de Copas": "🤴",
  "Reina de Copas": "👸",
};

const detectTarotCards = (text: string): TarotCard[] => {
  const found: TarotCard[] = [];
  for (const [name, emoji] of Object.entries(TAROT_CARDS)) {
    if (text.toLowerCase().includes(name.toLowerCase())) {
      found.push({ name, emoji });
    }
  }
  return found;
};

/* ── Types ── */
interface SuggestedQuestion {
  id: number;
  text: string;
}

interface HookQuestion {
  id: number;
  text: string;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestedQuestions?: SuggestedQuestion[];
  hookQuestions?: HookQuestion[];
  isPaywall?: boolean;
  tarotCards?: TarotCard[];
}

let messageIdCounter = 0;
const getNextId = () => ++messageIdCounter;
let suggestionIdCounter = 0;
const getNextSuggestionId = () => ++suggestionIdCounter;
let hookIdCounter = 0;
const getNextHookId = () => ++hookIdCounter;

const initialMessages: Message[] = [
  {
    id: getNextId(),
    text: "✨ ¡Bienvenida al consultorio espiritual de Libertad Molina\nTarot · Sanación · Transformación · Oráculos\n\nHazme tu pregunta y el universo te responderá 🦋",
    isBot: true,
    timestamp: new Date(),
  },
];

/* ── Hook question generator (pure curiosity — NO service mentions) ── */
const generateHookQuestions = (
  responseText: string
): HookQuestion[] => {
  const t = responseText.toLowerCase();
  const isLove =
    t.includes("amor") || t.includes("pareja") || t.includes("coraz") || t.includes("relación") || t.includes("ex");
  const isMoney =
    t.includes("dinero") || t.includes("trabajo") || t.includes("abundancia") ||
    t.includes("carrera") || t.includes("empleo") || t.includes("negocio");
  const isSpiritual =
    t.includes("camino") || t.includes("espiritual") || t.includes("propósito") ||
    t.includes("bloqueo") || t.includes("energía") || t.includes("intuición");
  const isEmotional =
    t.includes("miedo") || t.includes("ansiedad") || t.includes("estrés") ||
    t.includes("dolor") || t.includes("cansancio") || t.includes("agobio");

  const curiosityPools: Record<string, string[]> = {
    love: [
      "¿Qué siente realmente esa persona por ti en este momento, debajo de lo que te muestra?",
      "¿Qué está bloqueando esa conexión sin que ninguno de los dos lo vea?",
      "¿Qué decisión se está tomando sobre vuestra relación sin que lo sepas?",
      "¿Qué verdad oculta sobre tu vida amorosa estás evitando mirar?",
    ],
    money: [
      "¿Qué oportunidad concreta se está abriendo para ti ahora mismo y no la estás viendo?",
      "¿Qué decisión sobre tu carrera se está tomando sin que tú lo sepas?",
      "¿Qué está bloqueando tu prosperidad a un nivel que ni imaginas?",
      "¿Qué cambio silencioso se está preparando en tu vida profesional?",
    ],
    spiritual: [
      "¿Qué emoción oculta está dirigiendo tus decisiones sin que te des cuenta?",
      "¿Qué parte de ti ya sabe la respuesta pero tiene miedo de escucharla?",
      "¿Qué patrón antiguo se está repitiendo en tu vida sin que lo veas?",
      "¿Qué está a punto de revelarse que cambiaría tu perspectiva completamente?",
    ],
    emotional: [
      "¿Qué emoción no expresada está pesando más de lo que imaginas?",
      "¿Qué parte de ti necesita atención y la estás ignorando?",
      "¿Qué está pidiendo tu cuerpo a gritos que no le estás escuchando?",
      "¿Qué necesitas soltar para que todo empiece a fluir?",
    ],
    general: [
      "¿Qué aspecto de tu situación no has descubierto todavía y podría cambiarlo todo?",
      "¿Qué verdad estás evitando mirar de frente?",
      "¿Qué está a punto de cambiar en tu vida y todavía no lo ves?",
      "¿Qué decisión se está cocinando ahora mismo sin que la veas?",
    ],
  };

  let pool: string[];
  if (isLove) pool = curiosityPools.love;
  else if (isMoney) pool = curiosityPools.money;
  else if (isSpiritual) pool = curiosityPools.spiritual;
  else if (isEmotional) pool = curiosityPools.emotional;
  else pool = curiosityPools.general;

  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2).map((text) => ({
    id: getNextHookId(),
    text,
  }));
};

/* ── Component ── */
export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dailyUsed, setDailyUsed] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [adminMode, setAdminModeState] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const catalogShownRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    setAdminModeState(isAdminMode());
    setDailyUsed(getChatDailyCount());
  }, []);

  // Expose open function globally
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-whatsapp-chat", handleOpenChat);
    return () => window.removeEventListener("open-whatsapp-chat", handleOpenChat);
  }, []);

  // Show notification dot after 2s
  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show catalog after initial message settles
  useEffect(() => {
    if (isOpen && !catalogShownRef.current) {
      const timer = setTimeout(() => {
        setShowCatalog(true);
        catalogShownRef.current = true;
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showCatalog, scrollToBottom]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const remaining = adminMode ? 999 : Math.max(0, FREE_CHAT_LIMIT - dailyUsed);

  const addPaywallMessage = () => {
    const paywallMsg: Message = {
      id: getNextId(),
      text: "",
      isBot: true,
      timestamp: new Date(),
      isPaywall: true,
    };
    setMessages((prev) => [...prev, paywallMsg]);
  };

  const handleAIResponse = async (questionText: string, allMsgs: Message[]) => {
    const history = allMsgs
      .filter((m) => !m.isPaywall && m.text)
      .slice(-6)
      .map((m) => ({
        role: m.isBot ? "bot" : "user",
        text: m.text,
      }));

    const recentPhrases = getRecentPhrases();
    const recentConclusions = getRecentConclusions();
    const recentLayers = getRecentLayers();
    const recentStyles = getRecentStyles();
    const res = await fetch("/api/whatsapp-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: questionText,
        conversationHistory: history,
        recentPhrases,
        recentConclusions,
        recentLayers,
        recentStyles,
      }),
    });

    if (!res.ok) throw new Error("Error en la consulta");

    const data = await res.json();
    if (!adminMode) {
      const newCount = dailyUsed + 1;
      setChatDailyCount(newCount);
      setDailyUsed(newCount);
    }

    const cards = detectTarotCards(data.message);
    const hooks = generateHookQuestions(data.message);

    // ── Anti-repetition: store phrases and conclusions ──
    if (data.keyPhrases && Array.isArray(data.keyPhrases)) {
      addRecentPhrases(data.keyPhrases);
    }
    if (data.conclusion && data.conclusion.length > 10) {
      addRecentConclusion(data.conclusion);
    }

    const botMessage: Message = {
      id: getNextId(),
      text: data.message,
      isBot: true,
      timestamp: new Date(),
      tarotCards: cards.length > 0 ? cards : undefined,
      hookQuestions: hooks,
      suggestedQuestions: data.suggestedQuestions?.map(
        (q: string) => ({
          id: getNextSuggestionId(),
          text: q,
        })
      ) || [],
    };

    setMessages((prev) => [...prev, botMessage]);

    if (!adminMode && dailyUsed + 1 >= FREE_CHAT_LIMIT) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const reminderMsg: Message = {
        id: getNextId(),
        text: "⭐ Esta era tu consulta gratuita de hoy.\nDesbloquea consultas ilimitadas con un plan de suscripción.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reminderMsg]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    // Admin password check
    if (input.trim().toLowerCase() === ADMIN_PASSWORD) {
      setAdminMode(true);
      setAdminModeState(true);
      setMessages((prev) => [...prev, {
        id: getNextId(),
        text: "✅ Modo admin activado. Tienes acceso ilimitado a todas las consultas. Escribe 'salir admin' para desactivarlo.",
        isBot: true,
        timestamp: new Date(),
      }]);
      setInput("");
      return;
    }
    if (input.trim().toLowerCase() === "salir admin") {
      setAdminMode(false);
      setAdminModeState(false);
      setMessages((prev) => [...prev, {
        id: getNextId(),
        text: "🔒 Modo admin desactivado. Vuelve a los límites gratuitos.",
        isBot: true,
        timestamp: new Date(),
      }]);
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: getNextId(),
      text: input.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);
    setShowNotification(false);
    setShowCatalog(false);

    if (!adminMode && dailyUsed >= FREE_CHAT_LIMIT) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTyping(false);
      addPaywallMessage();
      return;
    }

    try {
      await handleAIResponse(input.trim(), newMessages);
    } catch {
      const errorMsg: Message = {
        id: getNextId(),
        text: "Vaya, parece que ahora mismo no puedo conectar bien. Inténtalo de nuevo en un ratito, ¿vale? ✨",
        isBot: true,
        timestamp: new Date(),
        hookQuestions: [
          { id: getNextHookId(), text: "¿Qué aspecto de tu situación no has descubierto todavía y podría cambiarlo todo?" },
          { id: getNextHookId(), text: "¿Qué decisión se está cocinando ahora mismo sin que la veas?" },
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (questionText: string) => {
    if (isTyping) return;

    const userMessage: Message = {
      id: getNextId(),
      text: questionText,
      isBot: false,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);
    setShowCatalog(false);

    if (dailyUsed >= FREE_CHAT_LIMIT) {
      setTimeout(() => {
        setIsTyping(false);
        addPaywallMessage();
      }, 1000);
      return;
    }

    (async () => {
      try {
        await handleAIResponse(questionText, newMessages);
      } catch {
        const errorMsg: Message = {
          id: getNextId(),
          text: "Vaya, parece que no puedo conectar ahora. Inténtalo en un ratito, ¿vale? ✨",
          isBot: true,
          timestamp: new Date(),
          hookQuestions: [
            { id: getNextHookId(), text: "¿Qué emoción oculta está dirigiendo tus decisiones sin que te des cuenta?" },
            { id: getNextHookId(), text: "¿Qué parte de ti ya sabe la respuesta pero tiene miedo de escucharla?" },
          ],
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsTyping(false);
      }
    })();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Button - Golden WhatsApp (KEEP GOLD) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              delay: 2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={() => {
              setIsOpen(true);
              setShowNotification(false);
            }}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
              boxShadow:
                "0 4px 25px rgba(212, 175, 55, 0.5), 0 0 50px rgba(212, 175, 55, 0.15)",
            }}
            aria-label="Abrir chat con Libertad Molina"
          >
            <Image
              src="/whatsapp_dorado.png"
              alt="WhatsApp"
              width={36}
              height={36}
              className="w-9 h-9"
            />

            <AnimatePresence>
              {showNotification && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center"
                  style={{
                    animation: "pulse-gold 1.5s ease-in-out infinite",
                    boxShadow: "0 0 10px rgba(239, 68, 68, 0.6)",
                  }}
                >
                  <span className="text-white text-[9px] font-bold">1</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 2.5, duration: 0.3 }}
            className="fixed bottom-8 right-24 z-50 rounded-lg px-4 py-2.5 text-xs whitespace-nowrap pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(232,212,139,0.1))",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "#D4AF37",
            }}
          >
            Consulta gratis con Libertad Molina
            <div
              className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
              style={{
                background: "rgba(212,175,55,0.15)",
                borderRight: "1px solid rgba(212, 175, 55, 0.3)",
                borderTop: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window - WhatsApp Business Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] md:w-[420px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              boxShadow:
                "0 12px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.3), 0 0 30px rgba(212,175,55,0.1)",
            }}
          >
            {/* Header - Golden Premium Gradient */}
            <div
              className="px-4 py-3 flex items-center gap-3 relative flex-shrink-0 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #8B6914 0%, #D4AF37 30%, #F5E6A3 50%, #D4AF37 70%, #8B6914 100%)",
                backgroundSize: "200% 200%",
              }}
            >
              {/* Shimmer overlay */}
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
              {/* Avatar with profile photo */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30">
                  <Image
                    src="/perfil_libertad.png"
                    alt="Libertad Molina"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                  style={{
                    background: "#FFD700",
                    borderColor: "#8B6914",
                    boxShadow: "0 0 6px rgba(255,215,0,0.6)",
                  }}
                />
              </div>

              {/* Name + subtitle */}
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-bold text-[15px] tracking-wide truncate">
                    LIBERTAD MOLINA
                  </p>
                  {/* Verified business badge */}
                  <BadgeCheck
                    className="w-4 h-4 text-[#FFD700] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-white/80 text-[11px] tracking-wide">
                    Mentora Espiritual
                  </span>
                  <span className="text-white/40">·</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] inline-block" style={{ boxShadow: "0 0 4px rgba(255,215,0,0.5)" }} />
                    <span className="text-white/80 text-[11px]">
                      En línea
                    </span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1.5 relative z-10 rounded-full hover:bg-white/10"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body - WhatsApp dark wallpaper */}
            <div
              className="max-h-[500px] min-h-[350px] overflow-y-auto scroll-smooth px-3 py-3 space-y-1.5 flex-1"
              style={{
                background:
                  "linear-gradient(180deg, #0c0c0c 0%, #0f0d08 30%, #111110 60%, #0c0c0c 100%)",
              }}
            >
              {/* Subtle wallpaper pattern overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: "30px 30px",
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Messages container (relative for z-index above wallpaper) */}
              <div className="relative z-10">
                {/* Today separator */}
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-[1px] bg-white/10" />
                  <span className="text-[10px] tracking-wider uppercase text-white/30 px-2">
                    HOY
                  </span>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>

                {/* Messages */}
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                    >
                      {msg.isPaywall ? (
                        /* Paywall message */
                        <div className="max-w-[85%]">
                          <div
                            className="rounded-xl p-4 text-center"
                            style={{
                              background: "rgba(31, 44, 52, 0.9)",
                              border: "1px solid rgba(212, 175, 55, 0.2)",
                            }}
                          >
                            <Crown
                              className="w-6 h-6 mx-auto mb-2"
                              style={{ color: "#D4AF37" }}
                            />
                            <p
                              className="text-sm font-semibold tracking-wider uppercase mb-1"
                              style={{
                                backgroundImage:
                                  "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              Límite diario alcanzado
                            </p>
                            <p className="text-white/50 text-xs mb-3 leading-relaxed">
                              Tu consulta gratuita de hoy ha sido utilizada.
                              Desbloquea consultas ilimitadas con un plan
                              premium.
                            </p>
                            <a
                              href="#servicios"
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-black text-xs tracking-wider uppercase font-semibold transition-transform hover:scale-105"
                              style={{
                                backgroundImage:
                                  "linear-gradient(135deg, #E8D48B, #D4AF37, #C9A84C)",
                              }}
                            >
                              <Crown className="w-3.5 h-3.5" />
                              Ver planes de suscripción
                            </a>
                          </div>
                        </div>
                      ) : (
                        /* Normal message bubble */
                        <div
                          className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                            msg.isBot
                              ? "rounded-tl-sm rounded-tr-lg rounded-br-lg rounded-bl-lg"
                              : "rounded-tr-sm rounded-tl-lg rounded-bl-lg rounded-br-lg"
                          }`}
                          style={
                            msg.isBot
                              ? {
                                  background: "#1a1917", border: "1px solid rgba(212,175,55,0.08)",
                                  color: "#E9EDEF",
                                }
                              : {
                                  background: "linear-gradient(135deg, #8B6914 0%, #D4AF37 100%)",
                                  color: "#E9EDEF",
                                }
                          }
                        >
                          {/* Tarot cards row */}
                          {msg.isBot && msg.tarotCards && msg.tarotCards.length > 0 && (
                            <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-none">
                              {msg.tarotCards.map((card, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                  transition={{ delay: idx * 0.15, duration: 0.4 }}
                                  className="flex-shrink-0 relative"
                                  style={{ perspective: "600px" }}
                                >
                                  <div
                                    className="w-[80px] h-[120px] rounded-lg flex flex-col items-center justify-center text-center p-1.5 relative overflow-hidden"
                                    style={{
                                      background:
                                        "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                                      border: "2px solid #D4AF37",
                                      boxShadow:
                                        "0 2px 10px rgba(212, 175, 55, 0.3)",
                                    }}
                                  >
                                    {/* Inner decorative border */}
                                    <div
                                      className="absolute inset-1 rounded-md"
                                      style={{
                                        border: "1px solid rgba(212, 175, 55, 0.3)",
                                      }}
                                    />
                                    <span className="text-2xl mb-1 relative z-10">
                                      {card.emoji}
                                    </span>
                                    <span
                                      className="text-[9px] leading-tight font-semibold relative z-10"
                                      style={{
                                        color: "#D4AF37",
                                        textShadow:
                                          "0 0 4px rgba(212, 175, 55, 0.4)",
                                      }}
                                    >
                                      {card.name}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          <p className="whitespace-pre-line text-[13px]">
                            {msg.text}
                          </p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-0.5 ${
                              msg.isBot ? "text-white/30" : "text-white/30"
                            }`}
                          >
                            <span className="text-[9px]">
                              {msg.timestamp.toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          {/* Hook questions */}
                          {msg.isBot && msg.hookQuestions && msg.hookQuestions.length > 0 && (
                            <div className="mt-2.5 space-y-1.5 border-t border-white/5 pt-2.5">
                              {msg.hookQuestions.map((hook) => (
                                <button
                                  key={hook.id}
                                  onClick={() =>
                                    handleSuggestedQuestion(hook.text)
                                  }
                                  disabled={isTyping}
                                  className="w-full text-left px-3 py-2 rounded-lg text-[11px] transition-all duration-200 cursor-pointer disabled:opacity-40 group"
                                  style={{
                                    background: "rgba(212,175,55,0.08)",
                                    border: "1px solid rgba(212,175,55,0.15)",
                                    color: "#D4AF37",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(212,175,55,0.15)";
                                    e.currentTarget.style.borderColor =
                                      "rgba(212,175,55,0.35)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(212,175,55,0.08)";
                                    e.currentTarget.style.borderColor =
                                      "rgba(212,175,55,0.15)";
                                  }}
                                >
                                  {hook.text}
                                </button>
                              ))}

                              {/* Premium bridge — emotional, not aggressive */}
                              {!adminMode && (
                              <div
                                className="flex items-center justify-between px-3 py-2 rounded-lg mt-1"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))",
                                  border:
                                    "1px solid rgba(212, 175, 55, 0.15)",
                                }}
                              >
                                <div className="flex items-center gap-1.5">
                                  <Star
                                    className="w-3 h-3 flex-shrink-0"
                                    style={{ color: "#D4AF37" }}
                                  />
                                  <span
                                    className="text-[10px] font-medium italic"
                                    style={{ color: "rgba(212,175,55,0.7)" }}
                                  >
                                    Lecturas más profundas · Mayor claridad
                                  </span>
                                </div>
                                <a
                                  href="#servicios"
                                  onClick={() => setIsOpen(false)}
                                  className="text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase transition-transform hover:scale-105 flex-shrink-0"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #D4AF37, #C9A84C)",
                                    color: "#0A0A0A",
                                  }}
                                >
                                  PREMIUM
                                </a>
                              </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Service Catalog */}
                <AnimatePresence>
                  {showCatalog && messages.length <= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="mb-2 text-center">
                        <span className="text-[10px] tracking-widest uppercase text-white/25 px-3 py-1 rounded-full inline-block"
                          style={{
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          🏪 Catálogo de servicios
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {services.map((svc, idx) => (
                          <motion.a
                            key={svc.key}
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${svc.whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.08, duration: 0.3 }}
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer no-underline"
                            style={{
                              background: "rgba(26,25,23,0.8)",
                              border: "1px solid rgba(212,175,55,0.1)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(26,25,23,1)";
                              e.currentTarget.style.borderColor =
                                "rgba(0, 168, 132, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(26,25,23,0.8)";
                              e.currentTarget.style.borderColor =
                                "rgba(212,175,55,0.1)";
                            }}
                          >
                            <span className="text-xl flex-shrink-0">
                              {svc.emoji}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-white/90 text-[12px] font-medium leading-tight">
                                {svc.name}
                              </p>
                              <p className="text-[#D4AF37] text-[10px] mt-0.5 font-medium">
                                {svc.price}
                              </p>
                            </div>
                            <svg
                              className="w-4 h-4 text-white/20 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-[#D4AF37]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Suggested Questions */}
                <AnimatePresence>
                  {messages.length > 0 &&
                    !isTyping &&
                    messages[messages.length - 1].isBot &&
                    messages[messages.length - 1].suggestedQuestions &&
                    messages[messages.length - 1].suggestedQuestions!.length >
                      0 &&
                    remaining > 0 &&
                    !showCatalog && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1.5 pt-1"
                      >
                        <p className="text-[10px] text-center tracking-wider uppercase text-white/20">
                          Quizás también deseas saber...
                        </p>
                        {messages[
                          messages.length - 1
                        ].suggestedQuestions!.map((sq) => (
                          <motion.button
                            key={sq.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sq.id * 0.08 }}
                            onClick={() => handleSuggestedQuestion(sq.text)}
                            disabled={isTyping}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-[11px] transition-all duration-200 cursor-pointer disabled:opacity-50 group"
                            style={{
                              background: "rgba(212,175,55,0.06)",
                              border: "1px solid rgba(212,175,55,0.12)",
                              color: "#D4AF37",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(212,175,55,0.14)";
                              e.currentTarget.style.borderColor =
                                "rgba(212,175,55,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(212,175,55,0.06)";
                              e.currentTarget.style.borderColor =
                                "rgba(212,175,55,0.12)";
                            }}
                          >
                            <span className="mr-1.5">🔮</span>
                            {sq.text}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>

                {/* Typing indicator - green dots */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-tl-sm rounded-tr-lg rounded-br-lg rounded-bl-lg px-4 py-3 flex gap-1.5 bg-[#1a1917]">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="w-2 h-2 rounded-full bg-[#D4AF37]"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Footer / Input area - Gold premium style */}
            <div
              className="px-3 py-2.5 flex items-center gap-2 flex-shrink-0"
              style={{
                background: "#1a1917",
                borderTop: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  remaining > 0
                    ? "Escribe tu pregunta..."
                    : "Suscríbete para consultar..."
                }
                disabled={isTyping || remaining <= 0}
                className="flex-1 rounded-full px-4 py-2.5 text-sm text-[#E9EDEF] placeholder-[#667781] focus:outline-none disabled:opacity-40 text-[13px] transition-colors"
                style={{
                  background: "#111110",
                  border: "1px solid rgba(212,175,55,0.12)",
                }}
              />
              {remaining <= 0 ? (
                <button
                  disabled
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-not-allowed bg-[#111110]"
                  aria-label="Suscripción requerida"
                >
                  <Lock className="w-4 h-4 text-[#D4AF37]/40" />
                </button>
              ) : (
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{
                    background:
                      input.trim() && !isTyping
                        ? "linear-gradient(135deg, #D4AF37, #F5E6A3)"
                        : "#111110",
                    boxShadow:
                      input.trim() && !isTyping
                        ? "0 0 12px rgba(212,175,55,0.4)"
                        : "none",
                  }}
                  aria-label="Enviar mensaje"
                >
                  <Send
                    className="w-4 h-4 transition-colors"
                    style={{
                      color:
                        input.trim() && !isTyping
                          ? "#0A0A0A"
                          : "#667781",
                      transform: "rotate(0deg)",
                    }}
                  />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
