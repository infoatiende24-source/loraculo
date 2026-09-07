export type TarotCard = {
  id: number;
  name: string;
  image: string;
  aliases?: string[];
};

const majorArcana: Omit<TarotCard, "id">[] = [
  { name: "El Loco", image: "el-loco" },
  { name: "El Mago", image: "el-mago" },
  { name: "La Sacerdotisa", image: "la-sacerdotisa", aliases: ["La Papisa"] },
  { name: "La Emperatriz", image: "la-emperatriz" },
  { name: "El Emperador", image: "el-emperador" },
  { name: "El Sumo Sacerdote", image: "el-sumo-sacerdote", aliases: ["El Hierofante", "El Papa"] },
  { name: "Los Enamorados", image: "los-enamorados", aliases: ["Los Enamorados", "Los Amantes"] },
  { name: "El Carro", image: "el-carro" },
  { name: "La Fuerza", image: "la-fuerza" },
  { name: "El Ermitaño", image: "el-ermitano" },
  { name: "La Rueda de la Fortuna", image: "la-rueda-de-la-fortuna", aliases: ["La Rueda"] },
  { name: "La Justicia", image: "la-justicia" },
  { name: "El Colgado", image: "el-colgado" },
  { name: "La Muerte", image: "la-muerte", aliases: ["Arcano sin Nombre"] },
  { name: "La Templanza", image: "la-templanza" },
  { name: "El Diablo", image: "el-diablo" },
  { name: "La Torre", image: "la-torre" },
  { name: "La Estrella", image: "la-estrella" },
  { name: "La Luna", image: "la-luna" },
  { name: "El Sol", image: "el-sol" },
  { name: "El Juicio", image: "el-juicio" },
  { name: "El Mundo", image: "el-mundo" },
];

const ranks = [
  ["As", "as"],
  ["Dos", "dos"],
  ["Tres", "tres"],
  ["Cuatro", "cuatro"],
  ["Cinco", "cinco"],
  ["Seis", "seis"],
  ["Siete", "siete"],
  ["Ocho", "ocho"],
  ["Nueve", "nueve"],
  ["Diez", "diez"],
  ["Sota", "sota"],
  ["Caballero", "caballero"],
  ["Reina", "reina"],
  ["Rey", "rey"],
] as const;

const suits = ["Bastos", "Copas", "Espadas", "Oros"] as const;

const minorArcana: Omit<TarotCard, "id">[] = suits.flatMap((suit) =>
  ranks.map(([rank, rankSlug]) => {
    const aliases: string[] = [];
    if (rank === "Sota") aliases.push(`Paje de ${suit}`);
    if (suit === "Oros") {
      aliases.push(`${rank} de Pentáculos`, `${rank} de Pentaculos`);
    }
    if (suit === "Bastos") aliases.push(`${rank} de Varas`);

    return {
      name: `${rank} de ${suit}`,
      image: `${rankSlug}-de-${suit.toLowerCase()}`,
      aliases,
    };
  }),
);

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorArcana].map(
  (card, id) => ({
    ...card,
    id,
    image: `/tarot-aprendiz/${String(id).padStart(2, "0")}-${card.image}.webp`,
  }),
);

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const findTarotCard = (reading: string): TarotCard | null => {
  const firstLine = normalize(reading.split("\n")[0] || reading.slice(0, 140));

  return (
    tarotDeck.find((card) =>
      [card.name, ...(card.aliases ?? [])].some((name) =>
        firstLine.includes(normalize(name)),
      ),
    ) ?? null
  );
};
