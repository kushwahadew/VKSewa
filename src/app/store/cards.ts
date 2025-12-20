"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Card = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  link: string;
  image?: string;
  active: boolean;
  order?: number;
  badges?: string[]; // optional small highlight texts
};

export type CardsState = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  addCard: (card: Omit<Card, "id">) => void;
  updateCard: (id: string, patch: Partial<Card>) => void;
  removeCard: (id: string) => void;
  toggleActive: (id: string) => void;
  move: (id: string, direction: -1 | 1) => void;
  seedIfEmpty: () => void;
};

const DEFAULTS: Card[] = [
  {
    id: "1",
    title: "VK SEVA NIDHI",
    subtitle: "Empowering rural communities through micro-finance and savings.",
    icon: "Shield",
    gradient: "from-teal-500 to-emerald-500",
    link: "#",
    image: "",
    active: true,
    order: 1,
    badges: [
      "SAVINGS - 8% Annually",
      "MICRO LOANS - Easy EMI",
      "RURAL GROWTH - Community Led",
      "TRANSPARENT - Tech Driven"
    ],
  },
  {
    id: "2",
    title: "VK EDUCATION",
    subtitle: "Digital literacy and quality education for every child.",
    icon: "Briefcase",
    gradient: "from-blue-500 to-cyan-500",
    link: "#",
    image: "",
    active: true,
    order: 2,
    badges: [
      "DIGITAL LABS - 50+ Schools",
      "SCHOLARSHIPS - 1000+ Kids",
      "SKILL DEV - Youth Focused",
      "FREE RESOURCES - Open Access"
    ],
  },
  {
    id: "3",
    title: "VK HEALTHCARE",
    subtitle: "Bringing medical facilities to the doorstep of remote villages.",
    icon: "Shield",
    gradient: "from-violet-500 to-purple-500",
    link: "#",
    active: true,
    order: 3,
    badges: [
      "MOBILE CLINICS - 24/7",
      "FREE CHECKUPS - Weekly",
      "MEDICINE BANK - Subsidized",
      "HEALTH CAMPS - Monthly"
    ],
  },
  {
    id: "4",
    title: "VK AGRO TECH",
    subtitle: "Sustainable farming practices and market access for farmers.",
    icon: "Shield",
    gradient: "from-orange-400 to-red-500",
    link: "#",
    active: true,
    order: 4,
    badges: [
      "ORGANIC FARMING - Training",
      "MARKET LINK - Direct Sale",
      "SOIL TESTING - Free Labs",
      "SEED BANK - Native Crops"
    ],
  },
  {
    id: "5",
    title: "VK WOMEN EMPOWER",
    subtitle: "Self-help groups and vocational training for rural women.",
    icon: "Shield",
    gradient: "from-pink-500 to-rose-500",
    link: "#",
    active: true,
    order: 5,
    badges: [
      "SHG GROUPS - 500+",
      "SKILL TRAINING - Tailoring",
      "FINANCIAL INDEPENDENCE",
      "LEADERSHIP PROGRAMS"
    ],
  },
  {
    id: "6",
    title: "VK CLEAN WATER",
    subtitle: "Providing safe drinking water and sanitation facilities.",
    icon: "Shield",
    gradient: "from-cyan-400 to-blue-600",
    link: "#",
    active: true,
    order: 6,
    badges: [
      "RO PLANTS - 20+ Villages",
      "SANITATION - 1000+ Toilets",
      "WATER TESTING - Regular",
      "HYGIENE AWARENESS"
    ],
  },
];

export const useCardsStore = create<CardsState>()(
  persist(
    (set, get) => ({
      cards: [],
      setCards: (cards) => set({ cards }),
      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards,
            { ...card, id: crypto.randomUUID(), order: state.cards.length + 1 },
          ],
        })),
      updateCard: (id, patch) =>
        set((state) => ({
          cards: state.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      removeCard: (id) =>
        set((state) => ({ cards: state.cards.filter((c) => c.id !== id) })),
      toggleActive: (id) =>
        set((state) => ({
          cards: state.cards.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
        })),
      move: (id, direction) =>
        set((state) => {
          const list = [...state.cards].sort((a, b) => (a.order || 0) - (b.order || 0));
          const idx = list.findIndex((c) => c.id === id);
          if (idx < 0) return { cards: state.cards };
          const swapIdx = idx + direction;
          if (swapIdx < 0 || swapIdx >= list.length) return { cards: state.cards };
          const a = list[idx];
          const b = list[swapIdx];
          [a.order, b.order] = [b.order, a.order];
          return { cards: list };
        }),
      seedIfEmpty: () => {
        const has = get().cards.length > 0;
        if (!has) set({ cards: DEFAULTS });
      },
    }),
    { name: "vkseva-cards" }
  )
);
