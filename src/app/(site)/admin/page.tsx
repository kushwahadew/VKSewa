"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, notFound } from "next/navigation";
import { useCardsStore, type Card } from "@/app/store/cards";
import { useSettingsStore, type HeroSettings, type MissionSettings, type StatsSettings, type CTASettings, type AboutContent, type ContactContent, type TeamMember, type ContactInfoItem } from "@/app/store/settings";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Layout, Type, BarChart3, MessageSquare, Save, Heart, Shield, Zap, RefreshCw } from "lucide-react";
import ImageUpload from "@/app/components/ImageUpload";
import Link from "next/link";
import FeatureCard from "@/app/components/FeatureCard";

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
          <label className="block text-xs text-muted mb-1 font-bold italic tracking-wider">Title</label>
          <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold italic tracking-wider">Subtitle</label>
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
          <label className="block text-xs text-muted mb-1 font-bold italic tracking-wider">Gradient</label>
          <select className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none" value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })}>
            {gradients.map((g) => (
              <option key={g} value={g} className="bg-background text-foreground">{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold italic tracking-wider">Target Link</label>
          <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 font-bold italic tracking-wider">Active</label>
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
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={!isDirty}
          className={`flex-1 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${isDirty
            ? "btn-gradient shadow-lg hover:-translate-y-0.5"
            : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
            }`}
        >
          {initial?.id ? "Update Card" : "Save Card"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-8 py-3 rounded-xl bg-card border border-white/10 text-muted font-bold hover:bg-white/5 transition-all text-sm md:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function SectionHeading({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading, isGateUnlocked, logout } = useAuth();
  const router = useRouter();
  const { cards, addCard, updateCard, removeCard, toggleActive, move, fetchCards, loading: cardsLoading } = useCardsStore();
  const { hero, mission, stats, cta, about, contact, fetchSettings, seedSettings, updateHero, updateMission, updateStats, updateCTA, updateAbout, updateContact, loading: settingsLoading } = useSettingsStore();

  const [activeTab, setActiveTab] = useState<"cards" | "hero" | "mission" | "stats" | "cta" | "about" | "contact">("cards");
  const [editing, setEditing] = useState<Card | null>(null);

  // Separate states for section editors to handle dirty checks and local updates
  const [heroForm, setHeroForm] = useState<HeroSettings>(hero);
  const [missionForm, setMissionForm] = useState<MissionSettings>(mission);
  const [statsForm, setStatsForm] = useState<StatsSettings>(stats);
  const [ctaForm, setCtaForm] = useState<CTASettings>(cta);
  const [aboutForm, setAboutForm] = useState<AboutContent>(about);
  const [contactForm, setContactForm] = useState<ContactContent>(contact);

  useEffect(() => {
    setHeroForm(hero);
    setMissionForm(mission);
    setStatsForm(stats);
    setCtaForm(cta);
    setAboutForm(about);
    setContactForm(contact);
  }, [hero, mission, stats, cta, about, contact]);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  if (!loading && !isGateUnlocked) {
    notFound();
  }

  useEffect(() => {
    if (!loading && !user && isGateUnlocked) {
      router.push("/");
    }
  }, [user, loading, isGateUnlocked, router]);

  useEffect(() => {
    fetchCards();
    fetchSettings();
    seedSettings();
  }, [fetchCards, fetchSettings, seedSettings]);

  const ordered = useMemo(() => [...cards].sort((a, b) => (a.order || 0) - (b.order || 0)), [cards]);

  if (loading || cardsLoading || settingsLoading || !isGateUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-bold text-muted uppercase tracking-widest">Waking up the database...</div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: "cards", label: "Cards", icon: Layout },
    { id: "hero", label: "Hero", icon: Type },
    { id: "mission", label: "Mission", icon: MessageSquare },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "cta", label: "CTA", icon: Save },
    { id: "about", label: "About Page", icon: MessageSquare },
    { id: "contact", label: "Contact Page", icon: Save },
  ] as const;


  return (
    <div className="min-h-screen pt-24 md:pt-36 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-foreground">Admin Panel</h1>
          <p className="text-[10px] md:text-xs text-muted font-black uppercase tracking-[0.2em] mt-2">VK Sewa Foundation CMS</p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-bold text-muted hover:text-foreground transition-colors">View Website</Link>
          <button
            onClick={() => logout()}
            className="px-4 md:px-6 py-2 md:py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-card border border-card rounded-2xl mb-10 w-full md:w-max mx-auto md:mx-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                ? "bg-teal-500 text-white shadow-xl shadow-teal-500/20"
                : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "cards" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <SectionHeading title="Initiatives Cards" icon={Layout} />
                <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                  <button onClick={() => { if (window.confirm("This will refresh all cards and fix any numbering gaps. Proceed?")) fetchCards() }} className="flex items-center justify-center gap-2 px-5 py-3 bg-card border border-card rounded-xl text-muted font-bold hover:text-foreground hover:border-teal-500/30 transition-all text-sm w-full sm:w-auto"><RefreshCw size={16} /> <span className="xs:inline md:hidden lg:inline">Re-sync</span><span className="hidden md:inline lg:hidden lg:inline">Re-sync Cards</span></button>
                  <button onClick={() => setEditing({} as Card)} className="flex items-center justify-center gap-2 px-5 py-3 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 text-sm w-full sm:w-auto"><Plus size={16} /> Add Card</button>
                </div>
              </div>

              {editing && (
                <div ref={formRef} className="scroll-mt-32">
                  <CardForm
                    initial={editing.id ? editing : undefined}
                    onCancel={() => { console.log("Cancel editing"); setEditing(null); }}
                    onSave={(data) => {
                      console.log("Saving card data:", data);
                      if ((data as Card).id) {
                        const d = data as Card;
                        console.log("Updating existing card:", d.id);
                        updateCard(d.id, d).then(() => setEditing(null)).catch(e => alert("Error updating: " + e.message));
                      } else {
                        console.log("Adding new card");
                        addCard(data as Omit<Card, "id">).then(() => setEditing(null)).catch(e => alert("Error adding: " + e.message));
                      }
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {ordered.map((c) => (
                  <div key={c.id} className={`group relative rounded-3xl overflow-hidden border border-card site-card transition-all hover:shadow-2xl hover:border-teal-500/30 ${c.active ? "" : "opacity-60 grayscale"}`}>
                    {/* Header: Actions & Order */}
                    <div className="p-3 md:p-4 border-b border-card flex flex-col xs:flex-row justify-between items-center gap-4 bg-card/50 backdrop-blur-md">
                      <div className="flex items-center justify-between w-full xs:w-auto gap-4">
                        <div className="flex bg-black/40 rounded-xl p-1 border border-white/5">
                          <button onClick={() => move(c.id, -1)} className="p-1.5 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-all" title="Move Up"><ArrowUp size={16} /></button>
                          <button onClick={() => move(c.id, 1)} className="p-1.5 hover:text-teal-400 hover:bg-white/5 rounded-lg transition-all" title="Move Down"><ArrowDown size={16} /></button>
                        </div>
                        <div className="px-2 md:px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                          <span className="text-[10px] font-black text-teal-500 uppercase tracking-[0.2em]">#{c.order}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => toggleActive(c.id)} className={`p-2 rounded-xl border transition-all ${c.active ? "bg-teal-500/10 border-teal-500/20 text-teal-500" : "bg-muted/10 border-muted/20 text-muted"}`} title={c.active ? "Click to Hide" : "Click to Show"}>
                          {c.active ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button onClick={() => setEditing(c)} className="p-2 bg-card border border-card rounded-xl text-foreground hover:scale-110 hover:border-teal-500/30 transition-all" title="Edit Card"><Edit2 size={18} /></button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Permanently delete "${c.title}"?`)) {
                              console.log("Admin: Triggering removeCard", c.id);
                              try {
                                await removeCard(c.id);
                                alert("Card deleted successfully!");
                              } catch (e: any) {
                                console.error("Admin: Delete error", e);
                                alert("Delete failed: " + e.message);
                              }
                            }
                          }}
                          className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                          title="Delete Card"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Preview Area */}
                    <div className="p-6 bg-black/20">
                      <div className="scale-[0.85] origin-top transition-transform duration-500 group-hover:scale-[0.88]">
                        <FeatureCard
                          index={c.order}
                          title={c.title}
                          subtitle={c.subtitle}
                          gradient={c.gradient}
                          link={c.link}
                          image={c.image}
                          badges={c.badges}
                        />
                      </div>
                    </div>

                    {!c.active && (
                      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                        <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                          <span className="text-sm font-black text-white uppercase tracking-widest">Hidden from Website</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="max-w-4xl">
              <SectionHeading title="Hero Section Settings" icon={Type} />
              <div className="site-card rounded-2xl p-4 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Badge Text</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.badge} onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Main Title</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.title} onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Title Gradient Text</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.titleGradient} onChange={(e) => setHeroForm({ ...heroForm, titleGradient: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Scrolling Announcement</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.announcement || ""} onChange={(e) => setHeroForm({ ...heroForm, announcement: e.target.value })} placeholder="Enter scrolling announcement text..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Description</label>
                    <textarea rows={3} className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Primary Button</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.primaryBtn} onChange={(e) => setHeroForm({ ...heroForm, primaryBtn: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Secondary Button</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={heroForm.secondaryBtn} onChange={(e) => setHeroForm({ ...heroForm, secondaryBtn: e.target.value })} />
                  </div>
                </div>
                <button onClick={() => updateHero(heroForm)} className="w-full md:w-max px-8 py-3 md:py-4 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 transition-transform active:scale-95">Save Hero Changes</button>
              </div>
            </div>
          )}

          {activeTab === "mission" && (
            <div className="max-w-4xl">
              <SectionHeading title="Mission Section Settings" icon={MessageSquare} />
              <div className="site-card rounded-2xl p-4 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Title Prefix</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={missionForm.title} onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Title Gradient</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={missionForm.titleGradient} onChange={(e) => setMissionForm({ ...missionForm, titleGradient: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Mission Image URL</label>
                    <ImageUpload
                      initialValue={missionForm.image}
                      title="Mission Image"
                      onUploadComplete={(url) => setMissionForm({ ...missionForm, image: url })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Experience Value (e.g. 10+)</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={missionForm.experienceYears} onChange={(e) => setMissionForm({ ...missionForm, experienceYears: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Paragraphs (JSON array)</label>
                    <textarea
                      rows={5}
                      className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground font-mono text-sm"
                      value={JSON.stringify(missionForm.paragraphs, null, 2)}
                      onChange={(e) => {
                        try {
                          const val = JSON.parse(e.target.value);
                          if (Array.isArray(val)) setMissionForm({ ...missionForm, paragraphs: val });
                        } catch { }
                      }}
                    />
                  </div>
                </div>
                <button onClick={() => updateMission(missionForm)} className="w-full md:w-max px-8 py-3 md:py-4 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 transition-transform active:scale-95">Save Mission Changes</button>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="max-w-4xl">
              <SectionHeading title="Impact Statistics" icon={BarChart3} />
              <div className="site-card rounded-2xl p-4 md:p-8 space-y-6">
                <div className="space-y-4 md:space-y-6">
                  {statsForm.items.map((stat, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-card rounded-xl bg-card/20">
                      <div>
                        <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Label</label>
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground" value={stat.label} onChange={(e) => {
                          const items = [...statsForm.items]; items[i].label = e.target.value; setStatsForm({ ...statsForm, items });
                        }} />
                      </div>
                      <div>
                        <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Value</label>
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground" value={stat.value} onChange={(e) => {
                          const items = [...statsForm.items]; items[i].value = e.target.value; setStatsForm({ ...statsForm, items });
                        }} />
                      </div>
                      <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Color Class</label>
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-foreground font-mono text-[10px]" value={stat.color} onChange={(e) => {
                          const items = [...statsForm.items]; items[i].color = e.target.value; setStatsForm({ ...statsForm, items });
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => updateStats(statsForm)} className="w-full md:w-max px-8 py-3 md:py-4 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 transition-transform active:scale-95">Save All Stats</button>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="max-w-4xl space-y-12">
              <div>
                <SectionHeading title="About Page - Hero" icon={Type} />
                <div className="site-card rounded-2xl p-4 md:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Badge</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.hero.badge} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, badge: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Title</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.hero.title} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, title: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Title Gradient</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.hero.titleGradient} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, titleGradient: e.target.value } })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Description</label>
                      <textarea rows={3} className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.hero.description} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, description: e.target.value } })} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading title="About Page - Story" icon={MessageSquare} />
                <div className="site-card rounded-2xl p-4 md:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Title</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.story.title} onChange={(e) => setAboutForm({ ...aboutForm, story: { ...aboutForm.story, title: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Title Gradient</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.story.titleGradient} onChange={(e) => setAboutForm({ ...aboutForm, story: { ...aboutForm.story, titleGradient: e.target.value } })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Paragraphs (JSON)</label>
                      <textarea rows={5} className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm font-mono" value={JSON.stringify(aboutForm.story.paragraphs, null, 2)} onChange={(e) => {
                        try {
                          const p = JSON.parse(e.target.value);
                          if (Array.isArray(p)) setAboutForm({ ...aboutForm, story: { ...aboutForm.story, paragraphs: p } });
                        } catch { }
                      }} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Story Image</label>
                      <ImageUpload initialValue={aboutForm.story.image} title="Story Image" onUploadComplete={(url) => setAboutForm({ ...aboutForm, story: { ...aboutForm.story, image: url } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Foundation Year</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.story.foundationYear} onChange={(e) => setAboutForm({ ...aboutForm, story: { ...aboutForm.story, foundationYear: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Foundation Label</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={aboutForm.story.foundationLabel} onChange={(e) => setAboutForm({ ...aboutForm, story: { ...aboutForm.story, foundationLabel: e.target.value } })} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <SectionHeading title="Mission & Vision" icon={Layout} />
                  <div className="site-card rounded-2xl p-4 md:p-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-teal-400 uppercase tracking-widest">Mission</h4>
                        <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" placeholder="Title" value={aboutForm.mv.missionTitle} onChange={(e) => setAboutForm({ ...aboutForm, mv: { ...aboutForm.mv, missionTitle: e.target.value } })} />
                        <textarea rows={4} className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" placeholder="Description" value={aboutForm.mv.missionDesc} onChange={(e) => setAboutForm({ ...aboutForm, mv: { ...aboutForm.mv, missionDesc: e.target.value } })} />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Vision</h4>
                        <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" placeholder="Title" value={aboutForm.mv.visionTitle} onChange={(e) => setAboutForm({ ...aboutForm, mv: { ...aboutForm.mv, visionTitle: e.target.value } })} />
                        <textarea rows={4} className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" placeholder="Description" value={aboutForm.mv.visionDesc} onChange={(e) => setAboutForm({ ...aboutForm, mv: { ...aboutForm.mv, visionDesc: e.target.value } })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading title="Team Members" icon={Layout} />
                <div className="site-card rounded-2xl p-4 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {aboutForm.team.map((m: TeamMember, i: number) => (
                      <div key={i} className="p-4 border border-card rounded-xl bg-card/20 space-y-3">
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-sm" placeholder="Name" value={m.name} onChange={(e) => {
                          const team = [...aboutForm.team]; team[i].name = e.target.value; setAboutForm({ ...aboutForm, team });
                        }} />
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-sm" placeholder="Role" value={m.role} onChange={(e) => {
                          const team = [...aboutForm.team]; team[i].role = e.target.value; setAboutForm({ ...aboutForm, team });
                        }} />
                        <ImageUpload initialValue={m.image} title={`Member ${i + 1}`} onUploadComplete={(url) => {
                          const team = [...aboutForm.team]; team[i].image = url; setAboutForm({ ...aboutForm, team });
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => updateAbout(aboutForm)} className="w-full md:w-max px-8 py-3 md:py-4 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 active:scale-95 transition-transform">Save All About Page Changes</button>
            </div>
          )}

          {activeTab === "cta" && (
            <div className="max-w-4xl">
              <SectionHeading title="CTA Banner Settings" icon={Save} />
              <div className="site-card rounded-2xl p-4 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Title Prefix</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={ctaForm.title} onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Title Gradient</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={ctaForm.titleGradient} onChange={(e) => setCtaForm({ ...ctaForm, titleGradient: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Description</label>
                    <textarea rows={3} className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={ctaForm.description} onChange={(e) => setCtaForm({ ...ctaForm, description: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Primary Button</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={ctaForm.primaryBtn} onChange={(e) => setCtaForm({ ...ctaForm, primaryBtn: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-2">Secondary Button</label>
                    <input className="w-full bg-card border border-card rounded-xl px-4 py-2 md:py-3 text-foreground" value={ctaForm.secondaryBtn} onChange={(e) => setCtaForm({ ...ctaForm, secondaryBtn: e.target.value })} />
                  </div>
                </div>
                <button onClick={() => updateCTA(ctaForm)} className="w-full md:w-max px-8 py-3 md:py-4 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 active:scale-95 transition-transform">Save CTA Changes</button>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="max-w-4xl space-y-12">
              <div>
                <SectionHeading title="Contact Page - Hero" icon={Type} />
                <div className="site-card rounded-2xl p-4 md:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Badge</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={contactForm.hero.badge} onChange={(e) => setContactForm({ ...contactForm, hero: { ...contactForm.hero, badge: e.target.value } })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Title</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={contactForm.hero.title} onChange={(e) => setContactForm({ ...contactForm, hero: { ...contactForm.hero, title: e.target.value } })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Description</label>
                      <textarea rows={3} className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={contactForm.hero.description} onChange={(e) => setContactForm({ ...contactForm, hero: { ...contactForm.hero, description: e.target.value } })} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading title="Contact Info" icon={MessageSquare} />
                <div className="site-card rounded-2xl p-4 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {contactForm.info.map((inf: ContactInfoItem, i: number) => (
                      <div key={i} className="p-4 border border-card rounded-xl bg-card/20 space-y-3">
                        <label className="block text-[10px] font-black text-muted uppercase tracking-widest">{inf.label}</label>
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-sm" value={inf.value} onChange={(e) => {
                          const info = [...contactForm.info]; info[i].value = e.target.value; setContactForm({ ...contactForm, info });
                        }} />
                        <input className="w-full bg-card border border-card rounded-lg px-4 py-2 text-xs font-mono" placeholder="Href" value={inf.href} onChange={(e) => {
                          const info = [...contactForm.info]; info[i].href = e.target.value; setContactForm({ ...contactForm, info });
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading title="Support Cause CTA" icon={Heart} />
                <div className="site-card rounded-2xl p-4 md:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Title</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={contactForm.support.title} onChange={(e) => setContactForm({ ...contactForm, support: { ...contactForm.support, title: e.target.value } })} />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Button Text</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={contactForm.support.btnText} onChange={(e) => setContactForm({ ...contactForm, support: { ...contactForm.support, btnText: e.target.value } })} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] md:text-xs font-black text-muted uppercase tracking-widest mb-1">Description</label>
                      <input className="w-full bg-card border border-card rounded-xl px-4 py-2 text-sm" value={contactForm.support.description} onChange={(e) => setContactForm({ ...contactForm, support: { ...contactForm.support, description: e.target.value } })} />
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => updateContact(contactForm)} className="w-full md:w-max px-8 py-3 md:py-4 btn-gradient rounded-xl text-white font-bold shadow-xl shadow-teal-500/20 active:scale-95 transition-transform">Save All Contact Page Changes</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
