"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCardsStore, type Card } from "../store/cards";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";

const gradients = [
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-orange-400 to-red-500",
  "from-pink-500 to-rose-500",
];

function CardForm({ onSave, initial }: { onSave: (card: Omit<Card, "id"> | Card) => void; initial?: Partial<Card>; }) {
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

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = (initial as Card) || {};
      setForm({
        title: rest.title || "",
        subtitle: rest.subtitle || "",
        icon: rest.icon || "Shield",
        gradient: rest.gradient || gradients[0],
        link: rest.link || "/dashboard/user",
        image: rest.image || "",
        active: rest.active ?? true,
        order: rest.order || 0,
        badges: rest.badges && rest.badges.length ? rest.badges.slice(0, 4) : ["", "", "", ""],
      });
    }
  }, [initial]);

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
          <label className="block text-xs text-muted mb-1">Title</label>
          <input className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Subtitle</label>
          <input className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={form.subtitle} onChange={(e)=>setForm({...form,subtitle:e.target.value})} required />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Image URL</label>
          <input className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Gradient</label>
          <select className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={form.gradient} onChange={(e)=>setForm({...form,gradient:e.target.value})}>
            {gradients.map((g)=> (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Target Link</label>
          <input className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={form.link} onChange={(e)=>setForm({...form,link:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Active</label>
          <select className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={String(form.active)} onChange={(e)=>setForm({...form,active:e.target.value==="true"})}>
            <option value="true">Visible</option>
            <option value="false">Hidden</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {form.badges!.map((b, i)=> (
          <input key={i} placeholder={`Badge ${i+1}`} className="w-full bg-black/20 border border-card rounded-lg px-4 py-2 text-foreground" value={b} onChange={(e)=>{
            const next = [...(form.badges||[])]; next[i]=e.target.value; setForm({...form,badges:next});
          }} />
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-6 py-2 rounded-lg btn-gradient font-medium">{initial?.id ? "Update" : "Add"} Card</button>
      </div>
    </form>
  );
}

export default function AdminPage(){
  const { cards, addCard, updateCard, removeCard, toggleActive, move, seedIfEmpty } = useCardsStore();
  const [editing, setEditing] = useState<Card | null>(null);

  useEffect(()=>{ seedIfEmpty(); }, [seedIfEmpty]);

  const ordered = useMemo(()=> [...cards].sort((a,b)=> (a.order||0)-(b.order||0)), [cards]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-foreground p-8">
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel • VK Sewa Foundation</h1>
        <a href="/" className="text-gradient hover:underline">Back to site</a>
      </header>
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Homepage Cards</h2>
          <button onClick={()=> setEditing({} as Card)} className="flex items-center gap-2 px-4 py-2 btn-gradient rounded-lg text-foreground"><Plus size={18}/>Add Card</button>
        </div>

        {editing && (
          <CardForm
            initial={editing.id ? editing : undefined}
            onSave={(data)=>{
              if ((data as Card).id){
                const d = data as Card; updateCard(d.id, d); setEditing(null);
              } else {
                addCard(data as Omit<Card, "id">); setEditing(null);
              }
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordered.map((c)=> (
            <div key={c.id} className={`relative rounded-2xl overflow-hidden border-card ${c.active?"":"opacity-50 grayscale"}`}>
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button onClick={()=>toggleActive(c.id)} className="p-2 bg-black/50 rounded-lg">{c.active ? <Eye size={16}/> : <EyeOff size={16}/>}</button>
                <button onClick={()=>setEditing(c)} className="p-2 bg-black/50 rounded-lg"><Edit2 size={16}/></button>
                <button onClick={()=>removeCard(c.id)} className="p-2 bg-black/50 rounded-lg"><Trash2 size={16}/></button>
                <button onClick={()=>move(c.id,-1)} className="p-2 bg-black/50 rounded-lg"><ArrowUp size={16}/></button>
                <button onClick={()=>move(c.id,1)} className="p-2 bg-black/50 rounded-lg"><ArrowDown size={16}/></button>
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
