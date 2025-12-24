import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";
import { db } from "./firebase";
import { Card } from "@/app/store/cards";

const CARDS_COLLECTION = "cards";
const SETTINGS_COLLECTION = "settings";

export const firestoreService = {
    // Get all cards
    async getCards(): Promise<Card[]> {
        const cardsRef = collection(db, CARDS_COLLECTION);
        const q = query(cardsRef, orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Card[];
    },

    // Add a new card
    async addCard(card: Omit<Card, "id">): Promise<string> {
        const cardsRef = collection(db, CARDS_COLLECTION);
        const docRef = await addDoc(cardsRef, card);
        return docRef.id;
    },

    // Update an existing card
    async updateCard(id: string, patch: Partial<Card>) {
        const cardRef = doc(db, CARDS_COLLECTION, id);
        await updateDoc(cardRef, patch);
    },

    // Delete a card
    async deleteCard(id: string) {
        const cardRef = doc(db, CARDS_COLLECTION, id);
        await deleteDoc(cardRef);
    },

    // --- Settings / CMS ---

    // Get a specific settings document (e.g., 'hero', 'mission')
    async getSettings<T>(id: string): Promise<T | null> {
        const { getDoc } = await import("firebase/firestore");
        const docRef = doc(db, SETTINGS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as T;
        }
        return null;
    },

    // Update settings
    async updateSettings(id: string, data: any) {
        const { setDoc } = await import("firebase/firestore");
        const docRef = doc(db, SETTINGS_COLLECTION, id);
        await setDoc(docRef, data, { merge: true });
    }
};
