"use client";

import React, { useEffect } from "react";
import FeatureCard from "@/app/components/FeatureCard";
import { InfiniteCards } from "@/app/components/InfiniteCards";
import { useCardsStore } from "@/app/store/cards";
import { useSettingsStore } from "@/app/store/settings";

export default function Home() {
	const { cards, fetchCards, loading: cardsLoading, seedIfEmpty } = useCardsStore();
	const { hero, mission, stats, cta, fetchSettings, seedSettings, loading: settingsLoading } = useSettingsStore();

	useEffect(() => {
		fetchCards();
		seedIfEmpty();
		fetchSettings();
		seedSettings();
	}, [fetchCards, seedIfEmpty, fetchSettings, seedSettings]);

	const active = [...cards]
		.filter((c) => c.active)
		.sort((a, b) => (a.order || 0) - (b.order || 0));

	const loading = cardsLoading || settingsLoading;

	if (loading && (cards.length === 0)) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="flex flex-col items-center gap-6">
					<div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
					<p className="text-muted font-bold animate-pulse text-sm uppercase tracking-widest">Waking up the database...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen text-muted">
			{/* Hero Section */}
			<header className="pt-32 pb-20 text-center max-w-5xl mx-auto px-4">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-medium mb-8 animate-fade-in">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
					</span>
					{hero.badge}
				</div>
				<h1 className="text-6xl md:text-[88px] font-black text-foreground leading-tight tracking-tighter mb-6">
					{hero.title} <br />
					<span className="text-gradient">{hero.titleGradient}</span>
				</h1>
				<p className="mt-4 max-w-3xl mx-auto" style={{ color: "var(--muted)", fontSize: "1.25rem", lineHeight: 1.6 }}>
					{hero.description}
				</p>
				<div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">
					<button style={{ backgroundImage: "var(--accent-gradient)" }} className="px-10 py-5 btn-gradient font-black rounded-2xl shadow-2xl hover:opacity-95 transition-all duration-300 transform hover:-translate-y-1">
						{hero.primaryBtn}
					</button>
					<button className="px-10 py-5 btn-outline text-foreground font-black rounded-2xl hover:bg-white/20 transition-all duration-300 backdrop-blur-xl">
						{hero.secondaryBtn}
					</button>
				</div>
			</header>

			{/* Announcement Bar */}
			{hero.announcement && (
				<div className="w-full bg-teal-500/5 border-y border-teal-500/10 py-3 overflow-hidden whitespace-nowrap group">
					<div className="animate-scroll-slow inline-block group-hover:[animation-play-state:paused]">
						{[...Array(10)].map((_, i) => (
							<span key={i} className="inline-flex items-center mx-8">
								<span className="w-2 h-2 rounded-full bg-teal-500 mr-4 animate-pulse" />
								<span className="text-sm font-black text-foreground uppercase tracking-widest">{hero.announcement}</span>
							</span>
						))}
					</div>
				</div>
			)}

			{/* Cards Section - Auto Scrolling */}
			<section className="py-20 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 mb-12">
					<h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Our Core Initiatives</h2>
					<p className="text-muted text-lg">Discover how we are making a difference across various sectors.</p>
				</div>
				<InfiniteCards items={active} speed="slow" />
			</section>

			{/* Mission Section - Increased Content */}
			<section className="max-w-6xl mx-auto px-4 py-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
					<div>
						<h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
							{mission.title} <br />
							<span className="text-gradient">{mission.titleGradient}</span>
						</h2>
						<div className="space-y-6 text-muted text-lg leading-relaxed">
							{mission.paragraphs?.map((p, i) => (
								<p key={i}>{p}</p>
							))}
						</div>
						<div className="mt-10 grid grid-cols-2 gap-8">
							{mission.items?.map((item, i) => (
								<div key={i}>
									<div className="text-gradient font-black text-2xl mb-2">{item.title}</div>
									<p className="text-sm text-muted">{item.description}</p>
								</div>
							))}
						</div>
					</div>
					<div className="relative">
						<div className="aspect-square rounded-3xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 site-card flex items-center justify-center overflow-hidden">
							<div
								className="absolute inset-0 bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
								style={{ backgroundImage: `url('${mission.image}')` }}
							/>
							<div className="relative z-10 p-12 text-center">
								<div className="text-6xl font-black text-foreground mb-4">{mission.experienceYears}</div>
								<div className="text-xl text-gradient font-bold uppercase tracking-widest">Years of Service</div>
							</div>
						</div>
						{/* Decorative elements */}
						<div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/30 rounded-full blur-3xl" />
						<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl" />
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="max-w-6xl mx-auto px-4 py-24 border-y border-card">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
					{stats.items?.map((stat, i) => (
						<div key={i} className="group">
							<div className={`text-4xl md:text-6xl font-black mb-4 transition-transform duration-500 group-hover:scale-110 ${stat.color}`}>{stat.value}</div>
							<div className="text-xs md:text-sm text-muted uppercase tracking-[0.2em] font-black">{stat.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="max-w-6xl mx-auto px-4 py-32">
				<div className="relative rounded-[3rem] overflow-hidden site-card p-12 md:p-24 text-center">
					<div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/10" />
					<div className="relative z-10">
						<h2 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter">
							{cta.title} <br />
							<span className="text-gradient">{cta.titleGradient}</span>
						</h2>
						<p className="text-muted text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
							{cta.description}
						</p>
						<div className="flex flex-col md:flex-row gap-6 justify-center">
							<button className="px-12 py-6 btn-gradient font-black rounded-2xl shadow-[0_0_50px_-12px_rgba(20,184,166,0.5)] transform hover:-translate-y-1">
								{cta.primaryBtn}
							</button>
							<button className="px-12 py-6 btn-outline text-foreground font-black rounded-2xl hover:bg-card transition-all backdrop-blur-xl">
								{cta.secondaryBtn}
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
