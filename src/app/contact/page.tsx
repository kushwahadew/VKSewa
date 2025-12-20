"use client";

import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen text-muted">
      <header className="pt-48 pb-24 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-black mb-8 tracking-widest uppercase">
          Get in Touch
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-foreground leading-tight mb-8 tracking-tighter">
          Let's <span className="text-gradient">Connect</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
          Have questions or want to collaborate? We'd love to hear from you. Reach out using the form below or through our contact details.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="p-12 rounded-[3rem] site-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <h2 className="text-3xl font-black text-foreground mb-10">Contact Information</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center text-gradient shrink-0 group-hover/item:bg-teal-500 group-hover/item:text-foreground transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase font-black tracking-widest mb-2">Email Us</p>
                    <a href="mailto:contact@vkseva.org" className="text-2xl text-foreground font-black hover:text-gradient transition-colors">contact@vkseva.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-6 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-gradient shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-foreground transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase font-black tracking-widest mb-2">Visit Us (Registered Office)</p>
                    <p className="text-2xl text-foreground font-black leading-tight">PRINCE KUNAL Chandrani Road, Kankarbagh, Sampatchak, <br />Bihar, India, 800020</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group/item">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-gradient shrink-0 group-hover/item:bg-cyan-500 group-hover/item:text-foreground transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase font-black tracking-widest mb-2">Call Us</p>
                    <a href="tel:+919876543210" className="text-2xl text-foreground font-black hover:text-gradient transition-colors">+91 98765 43210</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[3rem] bg-gradient-to-br from-teal-500 to-emerald-600 text-foreground shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6">Support Our Cause</h3>
                <p className="text-lg mb-10 opacity-90 leading-relaxed font-medium">Your contribution can change lives. Join us in our mission to empower communities through technology and compassion.</p>
                <button className="px-10 py-5 btn-gradient font-black rounded-2xl hover:opacity-95 transition-all shadow-xl transform hover:-translate-y-1">
                  DONATE NOW
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="site-card p-12 md:p-16 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            <form action="https://formspree.io/f/mwkajnkl" method="POST" className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-black text-muted uppercase tracking-widest ml-2">Full Name</label>
                  <input type="text" name="name" id="name" required className="w-full px-8 py-5 rounded-2xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-black text-muted uppercase tracking-widest ml-2">Email Address</label>
                  <input type="email" name="email" id="email" required className="w-full px-8 py-5 rounded-2xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="subject" className="text-xs font-black text-muted uppercase tracking-widest ml-2">Subject</label>
                <input type="text" name="subject" id="subject" required className="w-full px-8 py-5 rounded-2xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300" placeholder="How can we help?" />
              </div>
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-black text-muted uppercase tracking-widest ml-2">Message</label>
                <textarea name="message" id="message" rows={6} required className="w-full px-8 py-5 rounded-2xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none duration-300" placeholder="Your message here..."></textarea>
              </div>
              <button type="submit" className="w-full py-6 btn-gradient font-black rounded-2xl hover:opacity-95 transition-all duration-500 shadow-2xl transform hover:-translate-y-1">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
