import { create } from "zustand";
import { firestoreService } from "@/lib/firestoreService";

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
  badges?: string[];
};

export type CardsState = {
  cards: Card[];
  loading: boolean;
  fetchCards: () => Promise<void>;
  addCard: (card: Omit<Card, "id">) => Promise<void>;
  updateCard: (id: string, patch: Partial<Card>) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  toggleActive: (id: string) => Promise<void>;
  move: (id: string, direction: -1 | 1) => Promise<void>;
  seedIfEmpty: () => Promise<void>;
};

const DEFAULTS: Omit<Card, "id">[] = [
  {
    title: "VK SEWA NIDHI",
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

export const useCardsStore = create<CardsState>((set, get) => ({
  cards: [],
  loading: false,

  fetchCards: async () => {
    if (get().loading) return;
    set({ loading: true });
    try {
      let cards = await firestoreService.getCards();

      // Seed if empty
      if (cards.length === 0) {
        console.log("Seeding Firestore with default cards...");
        for (const item of DEFAULTS) {
          await firestoreService.addCard(item);
        }
        cards = await firestoreService.getCards();
      }

      // Detect and fix gaps
      cards.sort((a, b) => (a.order || 0) - (b.order || 0));
      let needsFix = false;
      const fixed = [];
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const correctOrder = i + 1;
        if (c.order !== correctOrder) {
          needsFix = true;
          await firestoreService.updateCard(c.id, { order: correctOrder });
          fixed.push({ ...c, order: correctOrder });
        } else {
          fixed.push(c);
        }
      }

      set({ cards: needsFix ? fixed : cards, loading: false });
    } catch (err) {
      console.error("Fetch cards failed:", err);
      set({ loading: false });
    }
  },

  addCard: async (card) => {
    try {
      const id = await firestoreService.addCard({ ...card, order: get().cards.length + 1 });
      const newCard = { ...card, id, order: get().cards.length + 1 };
      set((state) => ({ cards: [...state.cards, newCard] }));
    } catch (err) {
      console.error("Add card failed:", err);
    }
  },

  updateCard: async (id, patch) => {
    try {
      const { id: _, ...data } = patch as any;
      await firestoreService.updateCard(id, data);
      set((state) => ({
        cards: state.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      }));
    } catch (err) {
      console.error("Update card failed:", err);
      alert("Failed to update card. Please check your connection.");
    }
  },

  removeCard: async (id) => {
    try {
      console.log("Store: removing card", id);
      await firestoreService.deleteCard(id);

      const remaining = get().cards
        .filter((c) => c.id !== id)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const updated = [];
      for (let i = 0; i < remaining.length; i++) {
        const c = remaining[i];
        const newOrder = i + 1;
        if (c.order !== newOrder) {
          await firestoreService.updateCard(c.id, { order: newOrder });
          updated.push({ ...c, order: newOrder });
        } else {
          updated.push(c);
        }
      }

      set({ cards: updated });
      console.log("Store: card removed and re-indexed");
    } catch (err) {
      console.error("Remove card failed:", err);
      alert("Failed to delete card. See console for details.");
    }
  },

  toggleActive: async (id) => {
    const card = get().cards.find(c => c.id === id);
    if (!card) return;
    try {
      await firestoreService.updateCard(id, { active: !card.active });
      set((state) => ({
        cards: state.cards.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
      }));
    } catch (err) {
      console.error("Toggle active failed:", err);
    }
  },

  move: async (id, direction) => {
    const list = [...get().cards].sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = list.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= list.length) return;

    const a = list[idx];
    const b = list[swapIdx];

    // Swap orders
    const oldAOrder = a.order;
    a.order = b.order;
    b.order = oldAOrder;

    try {
      await firestoreService.updateCard(a.id, { order: a.order });
      await firestoreService.updateCard(b.id, { order: b.order });
      set({ cards: [...list] });
    } catch (err) {
      console.error("Move failed:", err);
    }
  },

  seedIfEmpty: async () => {
    // Deprecated: seeding is now handled in fetchCards
    await get().fetchCards();
  },
}));
