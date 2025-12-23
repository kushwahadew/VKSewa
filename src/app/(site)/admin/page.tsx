"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, notFound } from "next/navigation";
import { useCardsStore, type Card } from "@/app/store/cards";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import ImageUpload from "@/app/components/ImageUpload";
import Link from "next/link";

const gradients = [
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-orange-400 to-red-500",
  "from-pink-500 to-rose-500",
];

function CardForm({ onSave, onCancel, initial }: { onSave: (card: Omit<Card, "id"> | Card) => void; onCancel: () => void; initial?: Partial<Card>; }) {
  const [form, setForm] = useState<Omit<Card, "id">>({
    title: "",
    subtitle: "",
    icon: "Shield",
    gradient: gradients[0],
    link: "/dashboard/user",
    image: "",
    active: true,
    order: 0,
    badges: ["", "", "", ""],
  });

  const [originalForm, setOriginalForm] = useState<string>("");

  useEffect(() => {
    const defaultForm = {
      title: "",
      subtitle: "",
      icon: "Shield",
      gradient: gradients[0],
      link: "/dashboard/user",
      image: "",
      active: true,
      order: 0,
      badges: ["", "", "", ""],
    };

    if (initial) {
      const { id, ...rest } = (initial as Card) || {};
      const newForm = {
        title: rest.title || "",
        subtitle: rest.subtitle || "",
        icon: rest.icon || "Shield",
        gradient: rest.gradient || gradients[0],
        link: rest.link || "/dashboard/user",
        image: rest.image || "",
        active: rest.active ?? true,
        order: rest.order || 0,
        badges: rest.badges && rest.badges.length ? rest.badges.slice(0, 4) : ["", "", "", ""],
      };
      setForm(newForm);
      setOriginalForm(JSON.stringify(newForm));
    } else {
      setForm(defaultForm);
      setOriginalForm(JSON.stringify(defaultForm));
    }
  }, [initial]);

  const isDirty = JSON.stringify(form) !== originalForm;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(initial?.id ? ({ ...(initial as Card), ...form }) : form);
      }}
      className="space-y-4 site-card rounded-2xl p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1 font-bold">Title</label>
          <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold">Subtitle</label>
          <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-muted mb-2 font-bold uppercase tracking-wider">Card Hero Image</label>
          <ImageUpload
            initialValue={form.image}
            title={form.title}
            onUploadComplete={(url) => setForm({ ...form, image: url })}
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold">Gradient</label>
          <select className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none" value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })}>
            {gradients.map((g) => (
              <option key={g} value={g} className="bg-background text-foreground">{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold">Target Link</label>
          <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold">Active</label>
          <select className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none" value={String(form.active)} onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}>
            <option value="true" className="bg-background text-foreground">Visible</option>
            <option value="false" className="bg-background text-foreground">Hidden</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {form.badges!.map((b: string, i: number) => (
          <input key={i} placeholder={`Badge ${i + 1}`} className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={b} onChange={(e) => {
            const next = [...(form.badges || [])]; next[i] = e.target.value; setForm({ ...form, badges: next });
          }} />
        ))}
      </div>
      <div className="flex gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={!isDirty}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${isDirty
            ? "btn-gradient shadow-lg hover:-translate-y-0.5"
            : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
            }`}
        >
          {initial?.id ? "Update Card" : "Save Card"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 rounded-xl bg-card border border-white/10 text-muted font-bold hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminPage() {
  const { user, loading, isGateUnlocked, logout } = useAuth();
  const router = useRouter();
  const { cards, addCard, updateCard, removeCard, toggleActive, move, seedIfEmpty } = useCardsStore();
  const [editing, setEditing] = useState<Card | null>(null);

  if (!loading && !isGateUnlocked) {
    notFound();
  }

  useEffect(() => {
    if (!loading && !user && isGateUnlocked) {
      router.push("/");
    }
  }, [user, loading, isGateUnlocked, router]);

  useEffect(() => { seedIfEmpty(); }, [seedIfEmpty]);

  const ordered = useMemo(() => [...cards].sort((a, b) => (a.order || 0) - (b.order || 0)), [cards]);

  if (loading || !isGateUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-bold text-muted">Loading Secure Environment...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-36 p-8">
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel • VK Sewa Foundation</h1>
          <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">Management Dashboard</p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-bold text-muted hover:text-foreground transition-colors">Back to site</Link>
          <button
            onClick={() => logout()}
            className="px-6 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Homepage Cards</h2>
          <button onClick={() => setEditing({} as Card)} className="flex items-center gap-2 px-4 py-2 btn-gradient rounded-lg text-foreground"><Plus size={18} />Add Card</button>
        </div>

        {editing && (
          <CardForm
            initial={editing.id ? editing : undefined}
            onCancel={() => setEditing(null)}
            onSave={(data) => {
              if ((data as Card).id) {
                const d = data as Card; updateCard(d.id, d); setEditing(null);
              } else {
                addCard(data as Omit<Card, "id">); setEditing(null);
              }
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordered.map((c) => (
            <div key={c.id} className={`relative rounded-2xl overflow-hidden border-card ${c.active ? "" : "opacity-50 grayscale"}`}>
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button onClick={() => toggleActive(c.id)} title="Toggle Visibility" className="p-2.5 bg-card border border-card rounded-xl text-foreground hover:scale-110 transition-all shadow-lg">{c.active ? <Eye size={18} /> : <EyeOff size={18} className="text-muted" />}</button>
                <button onClick={() => setEditing(c)} title="Edit Card" className="p-2.5 bg-card border border-card rounded-xl text-foreground hover:scale-110 transition-all shadow-lg"><Edit2 size={18} /></button>
                <button onClick={() => removeCard(c.id)} title="Delete Card" className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"><Trash2 size={18} /></button>
                <button onClick={() => move(c.id, -1)} title="Move Up" className="p-2.5 bg-card border border-card rounded-xl text-foreground hover:scale-110 transition-all shadow-lg"><ArrowUp size={18} /></button>
                <button onClick={() => move(c.id, 1)} title="Move Down" className="p-2.5 bg-card border border-card rounded-xl text-foreground hover:scale-110 transition-all shadow-lg"><ArrowDown size={18} /></button>
              </div>
              {/* preview card */}
              <iframe title={c.title} className="w-full h-[540px] pointer-events-none" src={`/card-preview?id=${encodeURIComponent(c.id)}`}></iframe>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
