"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects = activeCategory === "All Projects"
    ? projects
    : projects.filter(p => p.category === activeCategory);
  return (
    <div className="min-h-screen text-muted">
      <header className="pt-32 pb-24 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-black mb-8 tracking-widest uppercase">
          Making a Difference
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-foreground leading-tight mb-8 tracking-tighter">
          Our <span className="text-gradient">Impact Projects</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
          Explore the initiatives we've launched to create sustainable change in communities across the country. Every project is a step towards a better future.
        </p>
      </header>

      {/* Project Categories Filter Placeholder */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="flex flex-wrap justify-center gap-4">
          {['All Projects', 'Education', 'Healthcare', 'Environment', 'Livelihood'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-black transition-all duration-300 ${activeCategory === cat
                ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                : "btn-outline text-muted hover:text-foreground hover:opacity-95"
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {filteredProjects.map((project, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[3rem] site-card hover:opacity-95 transition-all duration-700 animate-fade-in">
              <div className="h-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-card" />
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 rounded-xl bg-card border-card text-[10px] font-black uppercase tracking-widest text-foreground">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-12">
                <h3 className="text-3xl font-black text-foreground mb-6 group-hover:text-gradient transition-colors">{project.title}</h3>
                <p className="text-muted leading-relaxed mb-10 text-lg group-hover:text-muted transition-colors">{project.desc}</p>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div>
                    <div className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Impact</div>
                    <div className="text-xl font-black text-foreground">{project.impact}</div>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-14 h-14 rounded-2xl bg-card border-card flex items-center justify-center text-foreground group-hover:bg-teal-500 group-hover:text-white transition-all duration-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Map Placeholder */}
      <section className="max-w-6xl mx-auto px-4 py-32 border-t border-white/5">
        <div className="relative rounded-[4rem] overflow-hidden site-card p-16 md:p-32 text-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2033&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter">Global Vision, <br /><span className="text-gradient">Local Impact</span></h2>
            <p className="text-muted text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              We are currently active in 5 states and 200+ villages, but our goal is to reach every corner of the country where help is needed.
            </p>
            <button className="px-12 py-6 btn-gradient font-black rounded-2xl hover:opacity-95 transition-all duration-500 shadow-2xl transform hover:-translate-y-1">
              VIEW IMPACT MAP
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
