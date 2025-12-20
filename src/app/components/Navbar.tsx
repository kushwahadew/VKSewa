"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Links", href: "/links" },
  ];

  return (
    <>
      <nav className="fixed top-6 inset-x-0 z-50 max-w-5xl mx-auto px-4">
          <div className="site-nav backdrop-blur-2xl rounded-3xl h-20 px-4 md:px-8 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-foreground font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Image src="/logo.png" alt="VK SEWA Logo" width={48} height={48} />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-foreground text-lg leading-none">VK SEWA</span>
              <span className="text-[10px] text-muted font-bold tracking-[0.2em] uppercase">Foundation</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="px-5 py-2.5 rounded-xl text-sm font-bold text-muted hover:text-foreground hover:bg-card transition-all duration-300">
                {item.name}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <ThemeToggle />
            <Link href="/donate" className="px-6 py-3 rounded-2xl btn-gradient font-black text-sm shadow-xl transform hover:-translate-y-0.5">
              DONATE
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded-md bg-card border-card text-muted hover:opacity-95 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-60">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-md site-card backdrop-blur-3xl rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-foreground font-black text-lg shadow-lg">
                  <Image src="/logo.png" alt="VK SEWA Logo" width={40} height={40} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-foreground text-sm">VK SEWA</span>
                  <span className="text-[10px] text-gradient font-bold uppercase">Foundation</span>
                </div>
              </Link>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md bg-card border-card">
                <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-foreground font-bold site-card hover:opacity-95 transition">
                  {item.name}
                </Link>
              ))}

              <Link href="/donate" onClick={() => setOpen(false)} className="mt-4 block text-center px-4 py-3 rounded-2xl btn-gradient font-black">
                DONATE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
