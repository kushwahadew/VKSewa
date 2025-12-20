"use client";

import React from "react";

export default function Links() {
  return (
    <div className="min-h-screen text-muted">
      <header className="pt-48 pb-16 text-center max-w-4xl mx-auto px-4">
        <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-teal-400 to-emerald-600 mx-auto mb-10 flex items-center justify-center text-foreground text-5xl font-black shadow-2xl transform hover:rotate-12 transition-transform duration-500">
          VK
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter">
          VK Seva <span className="text-gradient">Connect</span>
        </h1>
        <p className="text-xl text-muted max-w-md mx-auto leading-relaxed">
          Quick access to all our platforms, projects, and ways to support our mission.
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-32">
        <div className="space-y-6">
          {[
            { title: "Official Website", url: "https://vkseva.org", icon: "🌐", color: "from-blue-500/20 to-cyan-500/20" },
            { title: "Latest Projects", url: "/projects", icon: "🚀", color: "from-purple-500/20 to-pink-500/20" },
            { title: "Donate & Support", url: "/donate", icon: "❤️", color: "from-red-500/20 to-orange-500/20" },
            { title: "Volunteer Program", url: "/volunteer", icon: "🤝", color: "from-emerald-500/20 to-teal-500/20" },
            { title: "Annual Report 2024", url: "/reports", icon: "📊", color: "from-amber-500/20 to-yellow-500/20" },
            { title: "Follow on Twitter", url: "https://twitter.com/vkseva", icon: "🐦", color: "from-sky-500/20 to-blue-500/20" },
            { title: "LinkedIn Profile", url: "https://linkedin.com/company/vkseva", icon: "💼", color: "from-indigo-500/20 to-blue-500/20" }
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              className={`flex items-center gap-6 p-6 rounded-[2rem] site-card hover:opacity-95 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <span className="text-3xl relative z-10">{link.icon}</span>
              <span className="flex-1 font-black text-xl text-foreground relative z-10 tracking-tight">{link.title}</span>
              <span className="text-muted group-hover:text-foreground transition-colors relative z-10 text-2xl">→</span>
            </a>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-muted text-xs font-black tracking-widest uppercase mb-8">
            Powered by VK Seva Tech
          </div>
          <div className="flex justify-center gap-10">
            <a href="#" className="text-sm font-bold text-muted hover:text-gradient transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm font-bold text-muted hover:text-gradient transition-colors">Terms of Service</a>
          </div>
        </div>
      </main>
    </div>
  );
}
