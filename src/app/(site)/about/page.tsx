import React, { useEffect } from "react";
import { useSettingsStore } from "@/app/store/settings";

export default function About() {
  const { about, fetchSettings, seedSettings, loading } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
    seedSettings();
  }, [fetchSettings, seedSettings]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-bold text-muted uppercase tracking-widest">Waking up the database...</div>
      </div>
    );
  }

  const { hero, story, mv, values, team } = about;

  return (
    <div className="min-h-screen text-muted">
      <header className="pt-32 pb-24 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-black mb-8 tracking-widest uppercase">
          {hero.badge}
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-foreground leading-tight mb-8 tracking-tighter">
          {hero.title} <span className="text-gradient">{hero.titleGradient}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
          {hero.description}
        </p>
      </header>

      {/* Detailed Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden site-card">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
                style={{ backgroundImage: `url('${story.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-gradient-to-br from-teal-500 to-emerald-600 p-12 rounded-[2rem] shadow-2xl hidden md:block">
              <div className="text-5xl font-black text-foreground mb-2">{story.foundationYear}</div>
              <div className="text-muted font-bold uppercase tracking-widest text-sm">{story.foundationLabel}</div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-10 leading-tight">
              {story.title} <br />
              <span className="text-gradient">{story.titleGradient}</span>
            </h2>
            <div className="space-y-8 text-muted text-lg leading-relaxed">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Icons */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group p-12 md:p-16 rounded-[3rem] site-card hover:opacity-95 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-teal-500/20 transition-all" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-gradient mb-10 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h2 className="text-4xl font-black text-foreground mb-8">{mv.missionTitle}</h2>
              <p className="text-muted leading-relaxed text-xl">
                {mv.missionDesc}
              </p>
            </div>
          </div>
          <div className="group p-12 md:p-16 rounded-[3rem] site-card hover:opacity-95 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-gradient mb-10 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h2 className="text-4xl font-black text-foreground mb-8">{mv.visionTitle}</h2>
              <p className="text-muted leading-relaxed text-xl">
                {mv.visionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Expanded */}
      <section className="max-w-6xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black text-foreground mb-6 tracking-tighter">Our Core Values</h2>
          <p className="text-muted text-xl max-w-2xl mx-auto">The principles that guide every decision we make and every action we take.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] site-card hover:opacity-95 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center text-gradient mb-8 group-hover:opacity-95 transition-all duration-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {/* Since icons are configurable strings, we can handle a few defaults or use a generic one if not found */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon === 'Shield' ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" : value.icon === 'Zap' ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13a3 3 0 100-6 3 3 0 000 6z" : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"} />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-6">{value.title}</h3>
              <p className="text-muted leading-relaxed group-hover:text-muted transition-colors">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="max-w-6xl mx-auto px-4 py-32 border-t border-card">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black text-foreground mb-6 tracking-tighter">The People Behind</h2>
          <p className="text-muted text-xl max-w-2xl mx-auto">A diverse team of dreamers, doers, and change-makers.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group text-center">
              <div className="aspect-square rounded-[2rem] site-card mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 group-hover:opacity-0 transition-opacity duration-500" />
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-card" />
                )}
              </div>
              <h4 className="text-xl font-black text-foreground mb-1">{member.name}</h4>
              <p className="text-gradient text-sm font-bold uppercase tracking-widest">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
