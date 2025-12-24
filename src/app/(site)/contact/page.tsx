"use client";

import React, { useEffect } from "react";
import { Mail, MapPin, Phone, Send, Heart, Shield, Zap } from "lucide-react";
import { useSettingsStore } from "@/app/store/settings";

const iconMap: Record<string, any> = {
  Mail, MapPin, Phone, Heart, Shield, Zap
};

export default function Contact() {
  const { contact, fetchSettings, seedSettings, loading } = useSettingsStore();

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

  const { hero, info, support } = contact;

  return (
    <div className="min-h-screen text-muted selection:bg-teal-500/30">
      <header className="pt-28 pb-12 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border-card text-teal-500 text-[10px] font-black mb-6 tracking-widest uppercase animate-fade-in shadow-sm">
          {hero.badge}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4 tracking-tighter">
          {hero.title.split(' ').map((word, i) => i === hero.title.split(' ').length - 1 ? <span key={i} className="text-gradient"> {word}</span> : word + ' ')}
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
          {hero.description}
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Contact Cards - Left */}
          <div className="space-y-6">
            <div className="site-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h2 className="text-2xl font-black text-foreground mb-8">Contact Info</h2>

              <div className="space-y-8">
                {info.map((item, i) => {
                  const Icon = iconMap[item.icon] || Mail;
                  return (
                    <div key={i} className="flex items-center gap-5 group/item">
                      <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                        <a href={item.href} className="text-lg text-foreground font-bold hover:text-teal-500 transition-colors">
                          {item.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="site-card p-8 rounded-3xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20 shadow-lg group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-xl font-black text-foreground">{support.title}</h3>
              </div>
              <p className="text-sm text-muted mb-8 leading-relaxed">{support.description}</p>
              <button className="w-full py-4 btn-gradient text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all">
                {support.btnText}
              </button>
            </div>
          </div>

          {/* Form Area - Right */}
          <div className="site-card p-8 md:p-10 rounded-3xl shadow-xl relative backdrop-blur-md">
            <form action="https://formspree.io/f/mwkajnkl" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] text-muted font-bold uppercase tracking-widest ml-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500/50 outline-none transition-all placeholder:text-muted/30 text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] text-muted font-bold uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500/50 outline-none transition-all placeholder:text-muted/30 text-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-[10px] text-muted font-bold uppercase tracking-widest ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500/50 outline-none transition-all placeholder:text-muted/30 text-sm"
                  placeholder="Subject"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] text-muted font-bold uppercase tracking-widest ml-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-card border-card text-foreground focus:ring-2 focus:ring-teal-500/50 outline-none transition-all resize-none text-sm"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-5 btn-gradient font-black text-base rounded-2xl shadow-xl hover:opacity-95 transform active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                SEND MESSAGE <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 site-card p-4 rounded-3xl shadow-xl overflow-hidden group h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.6322833075635!2d85.11666!3d25.58434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed587270000001%3A0x7000000000000000!2sPRINCE%20KUNAL%20Chandrani%20Road!5e0!3m2!1sen!2sin!4v1703350000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
