"use client";

import React from "react";

export default function About() {
  return (
    <div className="min-h-screen text-muted">
      <header className="pt-48 pb-24 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-black mb-8 tracking-widest uppercase">
          Our Story & Purpose
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-foreground leading-tight mb-8 tracking-tighter">
          Driven by <span className="text-gradient">Compassion</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
          VK Seva Foundation is more than just a non-profit; it's a movement dedicated to redefining social impact through the lens of technology and radical transparency.
        </p>
      </header>

      {/* Detailed Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden site-card">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1931&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-gradient-to-br from-teal-500 to-emerald-600 p-12 rounded-[2rem] shadow-2xl hidden md:block">
              <div className="text-5xl font-black text-foreground mb-2">2014</div>
              <div className="text-muted font-bold uppercase tracking-widest text-sm">Founded</div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-10 leading-tight">
              The Journey of <br />
              <span className="text-gradient">VK Seva</span>
            </h2>
            <div className="space-y-8 text-muted text-lg leading-relaxed">
              <p>
                Founded in 2014, VK Seva Foundation emerged from a collective desire to address the systemic challenges faced by rural communities in India. What started as a small group of volunteers providing weekend literacy classes has grown into a multi-faceted organization impacting thousands of lives.
              </p>
              <p>
                We realized early on that traditional charity models often lacked accountability and long-term sustainability. This led us to integrate technology into our core operations, ensuring that every initiative is data-driven and every donation is traceable.
              </p>
              <p>
                Today, we operate across five states, focusing on education, healthcare, micro-finance, and sustainable agriculture. Our team consists of passionate professionals, tech experts, and dedicated field workers who share a common goal: to build a future where opportunity is not a privilege of the few.
              </p>
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
              <h2 className="text-4xl font-black text-foreground mb-8">Our Mission</h2>
              <p className="text-muted leading-relaxed text-xl">
                To empower underprivileged communities by providing access to quality education, healthcare, and sustainable livelihood opportunities. We believe in creating a world where every individual has the chance to thrive through self-reliance and dignity.
              </p>
            </div>
          </div>
          <div className="group p-12 md:p-16 rounded-[3rem] site-card hover:opacity-95 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-gradient mb-10 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h2 className="text-4xl font-black text-foreground mb-8">Our Vision</h2>
              <p className="text-muted leading-relaxed text-xl">
                A future where technology and compassion work hand-in-hand to eliminate poverty and inequality. We envision a society built on transparency, empathy, and collective action, where every child can dream without boundaries.
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
          {[
            { 
              title: "Transparency", 
              desc: "We maintain radical honesty in our operations. Every rupee donated is tracked, and every project's progress is shared in real-time with our stakeholders.",
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            },
            { 
              title: "Innovation", 
              desc: "We don't just follow best practices; we create them. By leveraging AI, blockchain, and mobile tech, we solve complex social problems more efficiently.",
              icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13a3 3 0 100-6 3 3 0 000 6z"
            },
            { 
              title: "Empathy", 
              desc: "We listen before we act. Our programs are co-created with the communities we serve, ensuring that our solutions are culturally relevant and truly needed.",
              icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            }
          ].map((value, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] site-card hover:opacity-95 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center text-gradient mb-8 group-hover:opacity-95 transition-all duration-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} /></svg>
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
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="group text-center">
              <div className="aspect-square rounded-[2rem] site-card mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 group-hover:opacity-0 transition-opacity duration-500" />
                <div className="w-full h-full bg-card" />
              </div>
              <h4 className="text-xl font-black text-foreground mb-1">Team Member {member}</h4>
              <p className="text-gradient text-sm font-bold uppercase tracking-widest">Role Title</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
