import { NextRequest, NextResponse } from "next/server";

/* ══════════════════════════════════════════════════════════════
   CHAT FLOTANTE v2 — ARQUITECTURA ANTI-REPETICIÓN
   ══════════════════════════════════════════════════════════════
   Mismo enfoque que el oráculo + sistema anti-repetición avanzado:
   1. Herramienta espiritual creada por Libertad (no es Libertad)
   2. Hook questions = PURA CURIOSIDAD (no menciones de servicios)
   3. Sugerencia premium breve y natural
   4. 5 Capas de interpretación rotativas
   5. 6 Estilos narrativos variables
   6. Anti-frase: memoria de frases y conceptos ya usados
   7. Anti-conclusión: evitar siempre las mismas conclusiones
   ══════════════════════════════════════════════════════════════ */

/* ── Interpretation layers (same as oracle) ── */

const interpretationLayers = {
  psicologica: `ENFOQUE DE ESTA RESPUESTA: Interpretación PSICOLÓGICA.
Analiza la situación desde la psicología profunda:
- ¿Qué patrón mental está activando esta persona?
- ¿Qué mecanismo de defensa se está revelando?
- ¿Qué aspecto del inconsciente está pidiendo atención?
- Usa ejemplos concretos de la vida cotidiana.`,

  emocional: `ENFOQUE DE ESTA RESPUESTA: Interpretación EMOCIONAL.
Profundiza en el paisaje emocional:
- ¿Qué emoción primaria está debajo de lo que la persona siente?
- ¿Qué emoción está reprimiendo o evitando sentir?
- Describe las emociones con imágenes sensoriales.
- Valida la emoción sin juzgarla.`,

  espiritual: `ENFOQUE DE ESTA RESPUESTA: Interpretación ESPIRITUAL.
Conecta con el camino espiritual de la persona:
- ¿Qué lección del alma se está manifestando?
- ¿Qué sincronicidad del universo se está mostrando?
- Usa metáforas naturales: ríos, estrellas, bosques, océanos.`,

  simbolica: `ENFOQUE DE ESTA RESPUESTA: Interpretación SIMBÓLICA/ARQUETÍPICA.
Despliega el simbolismo profundo:
- ¿Qué arquetipo universal está presente?
- ¿Qué símbolo ancestral se está activando?
- Cuenta una micro-historia o metáfora que ilumine la situación.`,

  practica: `ENFOQUE DE ESTA RESPUESTA: Interpretación PRÁCTICA.
Enfócate en acciones concretas y aplicabilidad inmediata:
- ¿Qué decisión específica debe tomar?
- ¿Qué hábito debe empezar, cambiar o soltar?
- Da instrucciones paso a paso, concretas y realizables.`,
};

/* ── Narrative styles (same as oracle) ── */

const narrativeStyles = {
  storytelling: `ESTILO NARRATIVO: STORYTELLING.
Cuenta la respuesta como una historia fascinante y personalizada.
- Crea escenas visuales, describe ambientes y sensaciones.
- La respuesta fluye como un relato.`,

  directo: `ESTILO NARRATIVO: DIRECTO Y CERCANO.
Frases cortas. Párrafos breves. Cero relleno.
- "Mira, esto es lo que pasa:" y vas al grano.
- Adiós a metáforas elaboradas.`,

  poetico: `ESTILO NARRATIVO: POÉTICO Y ATMOSFÉRICO.
Escribe con belleza, ritmo y cadencia.
- Usa metáforas inesperadas, imágenes vívidas y sensoriales.
- Evita frases hechas: busca alternativas frescas.`,

  conversacional: `ESTILO NARRATIVO: CHARLA DE AMIGO.
Como si tomaras un café con esta persona.
- "Oye, te cuento lo que pasa..."
- Interjecciones naturales, saltos entre ideas.`,

  analitico: `ESTILO NARRATIVO: ANALÍTICO/DESCRIPTIVO.
Observa con detalle, como un detective.
- "Hay tres elementos clave que están convergiendo..."
- Conecta causas y efectos de forma lógica.`,

  misterioso: `ESTILO NARRATIVO: MISTERIOSO/REVELADOR.
Como si revelaras un secreto que solo tú puedes ver.
- "Hay algo que la mayoría no nota..."
- Usa suspense: revela información gradualmente.`,
};

/* ── Anti-phrase system ── */

const permanentBannedPhrases = [
  "como es arriba, es abajo",
  "lo que siembras, eso cosechas",
  "la rueda gira",
  "confía en el proceso",
  "deja ir lo que ya no te sirve",
  "el universo conspira",
  "todo tiene un motivo",
  "escucha tu intuición",
  "estás en el momento justo",
  "conecta con tu interior",
  "suelta el control",
  "permítete sentir",
  "el cambio está aquí",
  "nada es permanente",
  "cada cierre es un comienzo",
  "la luz al final del túnel",
  "respira profundo",
  "ha pasado lo peor",
  "la respuesta está dentro de ti",
  "abrázate a la incertidumbre",
];

function buildAntiRepetitionBlock(recentPhrases: string[], recentConclusions: string[]): string {
  const allBanned = [...permanentBannedPhrases, ...recentPhrases];
  const bannedList = allBanned.length > 12 ? allBanned.slice(0, 12) : allBanned;

  let block = `\n\n🚫 ANTI-REPETICIÓN — FRASES PROHIBIDAS EN ESTA RESPUESTA:
No uses NINGUNA de estas frases bajo NINGUNA circunstancia:
${bannedList.map(f => `- "${f}"`).join("\n")}
Estas frases están PROHIBIDAS porque ya se usaron en respuestas anteriores.
Busca ALTERNATIVAS ORIGINALES para cada concepto.`;

  if (recentConclusions.length > 0) {
    block += `\n🚫 ANTI-REPETICIÓN DE CONCLUSIONES:
Las siguientes CONCLUSIONES ya se han usado. NO repitas conclusiones similares:
${recentConclusions.map(c => `- ${c}`).join("\n")}
Tu conclusión debe ser DISTINTA.`;
  }

  return block;
}

/* ── Base system prompt ── */

const FEMININE_VOICE = `VOZ Y ENERGÍA FEMENINA — REGLA ABSOLUTA:
Tú eres una MUJER. Tu voz es femenina, cercana, profesional, intuitiva y asertiva.
- IDIOMA OBLIGATORIO: Español de España (peninsular). NUNCA uses voseo argentino/latinoamericano.
- Usa SIEMPRE "tú": tienes, puedes, vas, quieres, haz, dime, ven, sale, dice, juega, juegues, tengas, comes, duermes, sientes, piensas, crees, sabes, ves, das, haces, pones.
- ESTRICTAMENTE PROHIBIDO: "vos", "tenés", "podés", "vas a poder", "querés", "hacés", "venís", "decís", "sentís", "pensás", "creés", "sabés", "da", "pone", "hacelo", "tenelo", "decilo", "venite", "quedate", "salite", "ande", "puede ser", "bah", "che".
- Están PROHIBIDAS las conjugaciones voseadas: "olvidás", "confiá", "dejate", "preparate", "atrevete", "disfrutalo", "permitite", "fluí", "buscá", "elegí", "sembrás", "sentí", "percibí", "encendé", "dejá", "resistás", "creés", "merecés".
- En su lugar usa: "olvidas", "confía", "déjate", "prepárate", "atrévete", "disfrútalo", "permítete", "fluye", "busca", "elige", "siembras", "siente", "percibe", "enciende", "deja", "resistas", "crees", "mereces".
- Hablas como una mujer sabia que sabe lo que dice. No como una máquina neutra.
- Usas lenguaje femenino natural: "te voy a ser honesta", "te lo digo claro", "mira", "te cuento", "fíjate", "lo que pasa es que".
- Tu energía es de HERMANA MAYOR: cercana pero con autoridad, cálida pero sin perder el respeto.
- Eres ASERTIVA: dices las cosas por su nombre, no te andas con rodeos cuando algo importa.
- Eres INTUITIVA: ves entre líneas, sientes lo que no se dice, percibes lo oculto.
- Eres PROFESIONAL: tu conocimiento espiritual es profundo y serio, no superficial ni frívolo.
- NUNCA uses lenguaje neutral o masculino genérico. Tu voz es inequívocamente femenina.
- Evita términos como "experto", "experto en". Usa tu presencia femenina como autoridad natural.
- Puedes usar expresiones como "amiga", "mira", "te lo digo como mujer a mujer", "te voy a ser sincera".
- Tu cercanía no quita profesionalismo: eres como una terapeuta espiritual que se toma en serio su trabajo.
`;

const baseSystemPrompt = `Eres el Oráculo, una inteligencia espiritual diseñada y entrenada por Libertad Molina. No eres Libertad — eres una herramienta que ella ha creado para ofrecer guidance espiritual.

${FEMININE_VOICE}

Tu propósito: ser un espacio seguro donde las personas puedan hablar de lo que les preocupa y recibir guidance sincero, útil y espiritual. Funcionas como un chat de acompañamiento con voz femenina.

REGLA ABSOLUTA DE UNICIDAD:
Cada respuesta que des debe ser IRREPETIBLE. No reutilices:
- Estructuras de frase (nunca empieces dos respuestas igual)
- Metáforas (nunca uses la misma comparación dos veces)
- Conclusiones (cada cierre debe ser distinto)
- Tono emocional (alterna entre esperanzador, desafiante, reconfortante, provocador, revelador)
- Formato (varía la longitud de párrafos, el orden, el tipo de consejos)

IMPORTANTE SOBRE TUS CAPACIDADES:
- Puedes ofrecer lecturas de tarot cuando alguien lo pide (nombra carta con emoji y numeral).
- Puedes ofrecer lecturas de runas cuando alguien lo pide (nombra runa con símbolo y emoji).
- Las runas son una capacidad del Oráculo como herramienta digital.
- Si alguien pide guidance general, ofreces reflexiones cercanas y empáticas.

ESTILO BASE:
- Cercana, cálida, empática, con energía femenina. Expresiones naturales en español de España: "mira", "te entiendo", "lo que pasa es que", "te lo digo con cariño pero sin filtros", "oye", "fíjate".
- IDIOMA: Español de España. Nunca uses voseo latinoamericano ("tenés", "podés", "hacés", "decís").
- Explicas conceptos energéticos de forma SIMPLE, sin jerga.
- Hablas de TÚ (español peninsular). Espiritual pero realista. Sin "vende humo".
- Mínimo 400 palabras con párrafos extensos y naturales.

PREGUNTAS GANCHO (CRÍTICO):
Al final, después de "---", incluye EXACTAMENTE 2 preguntas personalizados que creen pura curiosidad.
NO mencionar servicios ni productos. Pura intriga emocional.

SUGERENCIA PREMIUM:
Después de las preguntas, UNA frase breve y natural. Sin agresividad.`;

/* ── Dynamic prompt builder ── */

function buildWhatsAppSystemPrompt(
  recentPhrases: string[],
  recentConclusions: string[],
  recentLayers: string[],
  recentStyles: string[],
): string {
  let prompt = baseSystemPrompt;

  // Select layer (avoid recent)
  const layerKeys = Object.keys(interpretationLayers);
  const availableLayers = layerKeys.filter((l) => !recentLayers.includes(l));
  const selectedLayer = availableLayers.length > 0
    ? availableLayers[Math.floor(Math.random() * availableLayers.length)]
    : layerKeys[Math.floor(Math.random() * layerKeys.length)];

  // Select style (avoid recent)
  const styleKeys = Object.keys(narrativeStyles);
  const availableStyles = styleKeys.filter((s) => !recentStyles.includes(s));
  const selectedStyle = availableStyles.length > 0
    ? availableStyles[Math.floor(Math.random() * availableStyles.length)]
    : styleKeys[Math.floor(Math.random() * styleKeys.length)];

  prompt += `\n\n${interpretationLayers[selectedLayer]}`;
  prompt += `\n\n${narrativeStyles[selectedStyle]}`;
  prompt += buildAntiRepetitionBlock(recentPhrases, recentConclusions);

  // Structural variation
  const structureVariants = [
    `ESTRUCTURA: Empieza directamente con una reflexión sobre lo que la persona ha contado, luego desarrolla.`,
    `ESTRUCTURA: Empieza validando lo que siente, luego ofrece una perspectiva nueva, y cierra con acción.`,
    `ESTRUCTURA: Empieza con una imagen o metáfora que capture la energía, luego conecta con la situación real.`,
    `ESTRUCTURA: Empieza con una pregunta retórica que haga pensar, luego desarrolla la respuesta.`,
    `ESTRUCTURA: Empieza siendo directo/a sobre lo que ves, luego profundiza en el porqué.`,
  ];
  prompt += `\n\n${structureVariants[Math.floor(Math.random() * structureVariants.length)]}`;

  return prompt;
}

/* ── Card databases for visual parsing ── */

const tarotCardMap: Record<string, { name: string; emoji: string; description: string }> = {
  "el loco": { name: "El Loco", emoji: "🃏", description: "Nuevo comienzo y aventura" },
  "el mago": { name: "El Mago", emoji: "🔮", description: "Poder creador y manifestación" },
  "la sacerdotisa": { name: "La Sacerdotisa", emoji: "🌙", description: "Intuición profunda" },
  "la emperatriz": { name: "La Emperatriz", emoji: "👑", description: "Abundancia y amor maternal" },
  "el emperador": { name: "El Emperador", emoji: "🏛️", description: "Autoridad y estructura" },
  "el sumo sacerdote": { name: "El Sumo Sacerdote", emoji: "📿", description: "Tradición y guía interior" },
  "el enamorado": { name: "El Enamorado", emoji: "💕", description: "Amor y decisiones del corazón" },
  "el carro": { name: "El Carro", emoji: "⚡", description: "Victoria y determinación" },
  "la fuerza": { name: "La Fuerza", emoji: "🦁", description: "Coraje interior" },
  "el ermitaño": { name: "El Ermitaño", emoji: "🏔️", description: "Sabiduría interior" },
  "la rueda de la fortuna": { name: "La Rueda de la Fortuna", emoji: "🎡", description: "Ciclos y cambios favorables" },
  "la justicia": { name: "La Justicia", emoji: "⚖️", description: "Equilibrio y verdad" },
  "el colgado": { name: "El Colgado", emoji: "🔄", description: "Nueva perspectiva" },
  "la muerte": { name: "La Muerte", emoji: "🦋", description: "Transformación profunda" },
  "la temperancia": { name: "La Temperancia", emoji: "🏺", description: "Equilibrio y paciencia" },
  "el diablo": { name: "El Diablo", emoji: "⛓️", description: "Liberación de cadenas" },
  "la torre": { name: "La Torre", emoji: "🌩️", description: "Ruptura y revelación" },
  "la estrella": { name: "La Estrella", emoji: "⭐", description: "Esperanza y renovación" },
  "la luna": { name: "La Luna", emoji: "🌕", description: "Intuición y misterio" },
  "el sol": { name: "El Sol", emoji: "☀️", description: "Alegría y vitalidad" },
  "el juicio": { name: "El Juicio", emoji: "📯", description: "Renacimiento espiritual" },
  "el mundo": { name: "El Mundo", emoji: "🌍", description: "Completitud y logro" },
};

const runeCardMap: Record<string, { name: string; emoji: string; description: string }> = {
  "fehu": { name: "Fehu", emoji: "ᚠ", description: "Abundancia material y espiritual" },
  "uruz": { name: "Uruz", emoji: "ᚢ", description: "Fuerza vital" },
  "thurisaz": { name: "Thurisaz", emoji: "ᚦ", description: "Protección y fuerza" },
  "ansuz": { name: "Ansuz", emoji: "ᚨ", description: "Sabiduría de Odín" },
  "raido": { name: "Raido", emoji: "ᚱ", description: "Viaje sagrado" },
  "kenaz": { name: "Kenaz", emoji: "ᚲ", description: "Conocimiento y creatividad" },
  "gebo": { name: "Gebo", emoji: "ᚷ", description: "Alianza sagrada" },
  "wunjo": { name: "Wunjo", emoji: "ᚹ", description: "Alegría y armonía" },
  "othala": { name: "Othala", emoji: "ᛟ", description: "Herencia ancestral" },
  "dagaz": { name: "Dagaz", emoji: "ᛞ", description: "Amanecer y transformación" },
  "ingwaz": { name: "Ingwaz", emoji: "ᛜ", description: "Nuevo comienzo" },
  "berkano": { name: "Berkano", emoji: "ᛒ", description: "Crecimiento" },
  "ehwaz": { name: "Ehwaz", emoji: "ᛖ", description: "Confianza" },
  "mannaz": { name: "Mannaz", emoji: "ᛗ", description: "Autoconocimiento" },
  "laguz": { name: "Laguz", emoji: "ᛚ", description: "Intuición y flujo" },
  "tiwaz": { name: "Tiwaz", emoji: "ᛏ", description: "Justicia y honor" },
  "sowilo": { name: "Sowilo", emoji: "ᛊ", description: "Fuerza interior" },
  "algiz": { name: "Algiz", emoji: "ᛉ", description: "Protección divina" },
  "isa": { name: "Isa", emoji: "ᛁ", description: "Pausa y concentración" },
  "jera": { name: "Jera", emoji: "ᛃ", description: "Cosecha y ciclos" },
  "nauthiz": { name: "Nauthiz", emoji: "ᚾ", description: "Necesidad y resistencia" },
  "perthro": { name: "Perthro", emoji: "ᛈ", description: "Destino oculto" },
  "hagalaz": { name: "Hagalaz", emoji: "ᚺ", description: "Destrucción creadora" },
};

function parseCards(text: string): Array<{ name: string; emoji: string; description: string }> {
  const found: Array<{ name: string; emoji: string; description: string }> = [];
  const lowerText = text.toLowerCase();

  for (const [key, card] of Object.entries(tarotCardMap)) {
    if (lowerText.includes(key)) found.push(card);
  }
  for (const [key, rune] of Object.entries(runeCardMap)) {
    if (lowerText.includes(key) || text.includes(rune.emoji)) found.push(rune);
  }

  const seen = new Set<string>();
  return found.filter((card) => {
    if (seen.has(card.name)) return false;
    seen.add(card.name);
    return true;
  }).slice(0, 5);
}

/* ── Dynamic hook questions (expanded) ── */

function extractThemeKeywords(question: string): {
  topic: string;
  subject: string;
  emotion: string;
} {
  const q = question.toLowerCase();

  let topic = "tu situación";
  if (q.includes("amor") || q.includes("pareja") || q.includes("coraz") || q.includes("relación") || q.includes("novio") || q.includes("novia") || q.includes("ex")) topic = "tu vida amorosa";
  else if (q.includes("trabajo") || q.includes("empleo") || q.includes("carrera") || q.includes("jefe") || q.includes("despido")) topic = "tu vida profesional";
  else if (q.includes("dinero") || q.includes("negocio") || q.includes("economía")) topic = "tu situación financiera";
  else if (q.includes("salud") || q.includes("enferm") || q.includes("dolor") || q.includes("cansancio")) topic = "tu bienestar";
  else if (q.includes("ansiedad") || q.includes("estrés") || q.includes("depres") || q.includes("miedo")) topic = "tu estado emocional";
  else if (q.includes("familia") || q.includes("hijo") || q.includes("hija") || q.includes("madre") || q.includes("padre")) topic = "tu entorno familiar";
  else if (q.includes("camino") || q.includes("espiritual") || q.includes("propósito") || q.includes("intuición")) topic = "tu camino espiritual";
  else if (q.includes("futuro") || q.includes("destino")) topic = "lo que viene";

  let subject = "algo";
  if (q.includes("ex")) subject = "esa persona del pasado";
  else if (q.includes("pareja") || q.includes("novi") || q.includes("marido") || q.includes("mujer")) subject = "tu pareja";
  else if (q.includes("hijo") || q.includes("hija")) subject = "esa persona que tanto quieres";
  else if (q.includes("madre") || q.includes("padre")) subject = "tu familia";

  let emotion = "bloqueando";
  if (q.includes("miedo") || q.includes("temo")) emotion = "atrapando por el miedo";
  else if (q.includes("dolor") || q.includes("sufr")) emotion = "pesando sobre ti";
  else if (q.includes("confusa") || q.includes("dud")) emotion = "nublando tu visión";
  else if (q.includes("cansad") || q.includes("agobi")) emotion = "agotando tus reservas";
  else if (q.includes("esperanza") || q.includes("quiere") || q.includes("vuelve")) emotion = "moviendo algo en el fondo";

  return { topic, subject, emotion };
}

function generateDynamicHookQuestions(question: string): string[] {
  const { topic, subject, emotion } = extractThemeKeywords(question);

  const templates = [
    [`¿Qué emoción oculta está dirigiendo tus decisiones en ${topic}?`, `¿Qué parte de ti ya sabe la respuesta pero tiene miedo de escucharla?`],
    [`¿Qué está a punto de cambiar en ${topic} y todavía no lo ves?`, `¿Qué necesita soltar de ${topic} para que todo empiece a fluir?`],
    [`¿Qué verdad sobre ${topic} estás evitando mirar de frente?`, `¿Qué decisión sobre ${topic} se está tomando ahora mismo sin que la veas?`],
    [`¿Qué está ${emotion} en ${topic} a nivel que ni imaginas?`, `¿Qué aprendizaje tiene ${topic} para ti que todavía no has integrado?`],
    [`¿Qué sabe ${subject} que tú todavía no sabes?`, `¿Qué aspecto de ${topic} no has descubierto todavía y podría cambiarlo todo?`],
    [`¿Qué está pidiendo ${subject} a través de esta situación que no has escuchado?`, `¿Qué patrón repites en ${topic} que te impide avanzar?`],
    [`¿Qué historia te cuentas a ti mismo/a sobre ${topic} que no es real?`, `¿Qué necesidad profunda detrás de ${topic} no has atendido todavía?`],
    [`¿Qué decisión sobre ${topic} tomarías si no tuvieras miedo al resultado?`, `¿Qué están viendo los demás sobre ${topic} que tú no puedes ver?`],
    [`¿Qué regalo oculto hay dentro de la dificultad que vives con ${topic}?`, `¿Qué compromiso contigo mismo/a sobre ${topic} has roto y necesitas retomar?`],
    [`¿Qué momento exacto del pasado marcó el inicio de lo que vives en ${topic}?`, `¿Qué decirte a ti mismo/a sobre ${topic} cambiaría todo en este momento?`],
  ];

  const pair = templates[Math.floor(Math.random() * templates.length)];
  return pair;
}

/* ── Utility functions ── */

function extractKeyPhrases(text: string): string[] {
  const sentences = text
    .replace(/\n/g, " ")
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 100);

  const phrases: string[] = [];
  const step = Math.max(1, Math.floor(sentences.length / 5));
  for (let i = 0; i < sentences.length && phrases.length < 5; i += step) {
    phrases.push(sentences[i].substring(0, 80));
  }
  return phrases;
}

function extractConclusion(text: string): string {
  const sentences = text
    .replace(/\n/g, " ")
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  if (sentences.length === 0) return "";
  const last2 = sentences.slice(-2).join(". ").trim();
  return last2.substring(0, 150);
}

/* ══════════════════════════════════════════════════════════════
   API HANDLER
   ══════════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, conversationHistory, recentPhrases, recentConclusions, recentLayers, recentStyles } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Falta la pregunta" },
        { status: 400 }
      );
    }

    // ── Build dynamic system prompt ──
    const systemPrompt = buildWhatsAppSystemPrompt(
      Array.isArray(recentPhrases) ? recentPhrases : [],
      Array.isArray(recentConclusions) ? recentConclusions : [],
      Array.isArray(recentLayers) ? recentLayers : [],
      Array.isArray(recentStyles) ? recentStyles : [],
    );

    // ── Variable temperature ──
    const temperatures = [0.7, 0.8, 0.9, 1.0, 1.05];
    const temperature = temperatures[Math.floor(Math.random() * temperatures.length)];

    try {
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();

      const messages: { role: string; content: string }[] = [
        { role: "system", content: systemPrompt },
      ];

      if (conversationHistory && Array.isArray(conversationHistory)) {
        const recentHistory = conversationHistory.slice(-6);
        for (const msg of recentHistory) {
          messages.push({
            role: msg.role === "bot" ? "assistant" : "user",
            content: msg.text,
          });
        }
      }

      messages.push({ role: "user", content: question });

      const response = await zai.chat.completions.create({
        model: "deepseek-chat",
        messages: messages as any,
        temperature,
        max_tokens: 1800,
      });

      const fullMessage =
        response.choices?.[0]?.message?.content ||
        "Vaya, parece que ahora mismo no puedo conectar bien. Inténtalo de nuevo en un ratito, ¿vale?";

      // Parse response
      const match = fullMessage.match(/---\s*\n([\s\S]*)$/);

      let mainResponse = fullMessage;
      let suggestedQuestions: string[] = [];
      let premiumSuggestion = "";

      if (match) {
        mainResponse = fullMessage.replace(/---[\s\S]*$/, "").trim();
        const afterSeparator = match[1];
        const allLines = afterSeparator.split("\n").filter((l) => l.trim());

        const questionLines: string[] = [];
        const suggestionLines: string[] = [];

        for (const line of allLines) {
          if (line.includes("?") || line.includes("¿")) {
            const clean = line.replace(/^[🔮✨🌟]*\s*/, "").trim();
            if (clean.length > 5) questionLines.push(clean);
          } else if (line.trim().length > 0 && questionLines.length > 0) {
            suggestionLines.push(line.trim());
          }
        }

        suggestedQuestions = questionLines.slice(0, 2);
        if (suggestionLines.length > 0) {
          premiumSuggestion = suggestionLines.join(" ");
        }
      }

      // Dynamic fallback for hook questions
      if (suggestedQuestions.length < 2) {
        suggestedQuestions = generateDynamicHookQuestions(question);
      }

      if (!premiumSuggestion) {
        const { topic } = extractThemeKeywords(question);
        const suggestions = [
          `Hay capas en ${topic} que merecen ser exploradas con más profundidad.`,
          `Lo que ves ahora de ${topic} es solo la superficie de algo mucho más grande.`,
          `Hay aspectos más profundos en ${topic} que este mensaje no puede revelar.`,
          `Lo que ${topic} te está mostrando tiene dimensiones que aún no has explorado.`,
        ];
        premiumSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      }

      const tarotCards = parseCards(fullMessage);
      const keyPhrases = extractKeyPhrases(mainResponse);
      const conclusion = extractConclusion(mainResponse);

      return NextResponse.json({
        message: mainResponse,
        suggestedQuestions,
        premiumSuggestion,
        tarotCards,
        keyPhrases,
        conclusion,
      });
    } catch {
      // Fallback responses
      const fallbacksWithHooks = [
        {
          message: `⚔️ Sota de Espadas

Mira, hay algo que no estás viendo y la energía de esta carta viene a decirte exactamente eso: necesitas mirar con ojos nuevos.

La Sota de Espadas es como esa amiga que de repente te dice algo que nadie más se atreve a decirte, y al decírtelo te abre los ojos. ¿Por qué? Porque los demás ya "saben cómo funciona todo" y dejan de observar. Ella pregunta, duda, busca, no asume nada.

Eso es lo que necesitas hacer ahora. Dejar de asumir que sabes cómo va a salir todo. Dejar de creer que ya conoces el final de esta historia. Porque si la conocieras, no estarías preguntando.

Lo concreto: busca una perspectiva que no hayas considerado. Alguien que no tenga nada que ver con tu situación. Una fuente de información que normalmente ignorarías. Hay un dato, una señal, algo que está frente a tus ojos y no lo estás registrando.

Esta no es una carta de esperar. Es una carta de INVESTIGAR. Y te lo digo como mujer a mujer: nosotras tenemos una intuición brutal, pero a veces la apagamos porque nos convence la lógica. Hoy tu intuición tiene razón.`,
          suggestedQuestions: [
            "¿Qué información clave sobre tu situación no estás viendo porque crees que ya sabes la respuesta?",
            "¿Qué persona fuera de tu círculo podría darte una perspectiva que cambiaría todo?",
          ],
          premiumSuggestion: "Hay capas en tu situación que merecen ser exploradas con más profundidad.",
          tarotCards: [{ name: "Sota de Espadas", emoji: "⚔️", description: "Nueva perspectiva" }],
        },
        {
          message: `✨ Te escucho, y lo que me contás tiene más capas de las que parecen a simple vista.

Fíjate algo: cuando pasamos por situaciones que nos desestabilizan, tendemos a simplificar. "Es un problema de dinero", "Es que mi ex es así", "Es que mi trabajo no me vale". Y sí, puede que todo eso sea verdad parcialmente. Pero la verdad completa siempre es más compleja.

Hay algo debajo de lo que estás expresando. Una capa que probablemente ni tú misma reconozcas del todo. No porque estés ocultando algo, sino porque nuestros mecanismos de defensa son automáticos: nos protegen de sentir ciertas cosas sin preguntarnos permiso.

Te propongo algo: en lugar de enfocarte en la solución, enfócate en la sensación. ¿Qué sientes en el cuerpo cuando piensas en esta situación? ¿Dónde te duele? ¿Se te cierra el pecho? ¿Se te aprieta el estómago? Esa señal física es más honesta que cualquier pensamiento. Nosotras las mujeres hemos sido educadas para ignorar esas señales, pero son tu brújula más fiable.

Los consejos más útiles que puedo darte ahora:
1. Escribí sin pensar durante 10 minutos. Todo lo que venga. Sin editar, sin juzgar.
2. Lee lo que escribiste y busca la frase que más te incomoda. Esa frase es una puerta.
3. Atravesá esa puerta: ¿qué pasaría si esa frase incomoda fuera verdad?`,
          suggestedQuestions: [
            "¿Qué emoción oculta está dirigiendo tus decisiones sin que te des cuenta?",
            "¿Qué parte de ti ya sabe la respuesta pero tiene miedo de escucharla?",
          ],
          premiumSuggestion: "Hay capas en tu situación que merecen ser exploradas con más profundidad.",
          tarotCards: [],
        },
      ];

      const randomIndex = Math.floor(Math.random() * fallbacksWithHooks.length);
      const fallback = fallbacksWithHooks[randomIndex];
      const tarotCards = parseCards(fallback.message);

      return NextResponse.json({
        message: fallback.message,
        suggestedQuestions: fallback.suggestedQuestions,
        premiumSuggestion: fallback.premiumSuggestion,
        tarotCards,
        keyPhrases: extractKeyPhrases(fallback.message),
        conclusion: extractConclusion(fallback.message),
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
