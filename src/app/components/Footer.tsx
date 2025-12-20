"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <Image src="/logo.png" alt="VK SEWA Logo" width={48} height={48} />
              <div className="flex flex-col">
                <span className="font-black text-foreground tracking-tighter text-lg leading-none">VK SEWA</span>
                <span className="text-[10px] text-gradient font-bold tracking-[0.2em] uppercase">Foundation</span>
              </div>
            </div>
            <p className="text-muted leading-relaxed mb-6">
              VK Sewa Foundation is dedicated to creating sustainable social impact through innovation, transparency, and community empowerment.
            </p>
            <div className="text-sm text-muted">
              <div className="font-bold text-foreground mb-1">Registered Office</div>
              <div>PRINCE KUNAL Chandrani Road, Kankarbagh, Sampatchak, Bihar, India, 800020</div>
              <div className="mt-2 text-xs">Registered name approved: VK SEWA FOUNDATION • Ref: SRNAB9647030</div>
            </div>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-card border-card flex items-center justify-center text-muted hover:text-foreground hover:opacity-95 transition-all duration-300">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-20 rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-black uppercase tracking-widest text-sm mb-8">Organization</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Mission', 'Impact Report', 'Team', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted hover:text-gradient transition-colors font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-black uppercase tracking-widest text-sm mb-8">Resources</h4>
            <ul className="space-y-4">
              {['Projects', 'Volunteer', 'Donate', 'Partners', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted hover:text-gradient transition-colors font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-black uppercase tracking-widest text-sm mb-8">Newsletter</h4>
            <p className="text-muted text-sm mb-6">Stay updated with our latest initiatives and impact stories.</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-card border-card rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button className="w-full btn-gradient font-black py-4 rounded-2xl hover:opacity-95 transition-all shadow-lg">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-card flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} VK Sewa Foundation. All rights reserved.
          </div>
          <div className="flex gap-8 text-muted text-sm font-medium">
            <a href="#" className="hover:text-gradient transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gradient transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gradient transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
