"use client";

import React from "react";

export default function Donate() {
  return (
    <div className="min-h-screen text-muted">
      <header className="pt-48 pb-24 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-black mb-8 tracking-widest uppercase">
          Support Our Mission
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-foreground leading-tight mb-8 tracking-tighter">
          Make a <span className="text-gradient">Difference</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
          Your contribution helps us provide education, healthcare, and sustainable livelihood to those who need it most. Every rupee counts.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            { amount: "₹500", label: "Basic Support", desc: "Provides school supplies for one child for a month.", icon: "📚" },
            { amount: "₹2000", label: "Health Hero", desc: "Covers a full medical checkup and medicines for a family.", icon: "🏥" },
            { amount: "₹5000", label: "Community Builder", desc: "Supports vocational training for one woman.", icon: "🏗️" }
          ].map((plan, i) => (
            <div key={i} className="p-12 rounded-[3rem] site-card hover:opacity-95 transition-all duration-500 text-center group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-teal-500/10 transition-all" />
              <div className="text-5xl mb-6">{plan.icon}</div>
              <div className="text-4xl font-black text-foreground mb-2 group-hover:text-gradient transition-colors">{plan.amount}</div>
              <div className="text-xs font-black text-gradient uppercase tracking-[0.2em] mb-6">{plan.label}</div>
              <p className="text-muted text-sm mb-10 leading-relaxed">{plan.desc}</p>
              <button className="w-full py-5 rounded-2xl btn-gradient font-black transition-all duration-300 transform hover:-translate-y-1">
                SELECT PLAN
              </button>
            </div>
          ))}
        </div>

        <div className="site-card p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-12 text-center tracking-tighter">Custom Donation</h2>
          <div className="max-w-xl mx-auto space-y-10 relative z-10">
            <div className="space-y-4">
              <label className="block text-xs font-black text-muted uppercase tracking-widest ml-4">Enter Amount (INR)</label>
              <div className="relative">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-3xl font-black text-teal-500">₹</span>
                <input type="number" className="w-full pl-16 pr-8 py-8 rounded-3xl bg-card border-card text-foreground text-4xl font-black focus:ring-2 focus:ring-teal-500 outline-none transition-all" placeholder="1000" />
              </div>
            </div>
            <button className="w-full py-8 btn-gradient font-black text-xl rounded-3xl hover:opacity-95 transition-all duration-500 shadow-2xl transform hover:-translate-y-1">
              PROCEED TO SECURE PAYMENT
            </button>
            <div className="flex items-center justify-center gap-4 text-muted">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              <p className="text-sm font-bold text-muted">Secure 256-bit SSL Encrypted Payment</p>
            </div>
            <p className="text-center text-xs text-muted font-bold leading-relaxed">
              All donations are tax-exempt under Section 80G of the Income Tax Act. <br />
              A digital receipt will be sent to your email address immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
