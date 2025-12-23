"use client";

import React, { useEffect } from "react";
import FeatureCard from "@/app/components/FeatureCard";
import { InfiniteCards } from "@/app/components/InfiniteCards";
import { useCardsStore } from "@/app/store/cards";

export default function Home() {
	const { cards, seedIfEmpty } = useCardsStore();

	useEffect(() => {
		seedIfEmpty();
	}, [seedIfEmpty]);

	const active = [...cards]
		.filter((c) => c.active)
		.sort((a, b) => (a.order || 0) - (b.order || 0));

	return (
		<div className="min-h-screen text-muted">
			{/* Hero Section */}
			<header className="pt-32 pb-20 text-center max-w-5xl mx-auto px-4">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-card text-foreground text-sm font-medium mb-8 animate-fade-in">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
					</span>
					Empowering Communities with Purpose & Technology
				</div>
				<h1 className="text-6xl md:text-[88px] font-black text-foreground leading-tight tracking-tighter mb-6">
					Transforming Lives <br />
					<span className="text-gradient">Through Innovation</span>
				</h1>
				<p className="mt-4 max-w-3xl mx-auto" style={{ color: "var(--muted)", fontSize: "1.25rem", lineHeight: 1.6 }}>
					VK Sewa Foundation is a non-profit organization dedicated to bridging the gap between resources and rural needs through transparent, technology-driven social impact initiatives.
				</p>
				<div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">
					<button style={{ backgroundImage: "var(--accent-gradient)" }} className="px-10 py-5 btn-gradient font-black rounded-2xl shadow-2xl hover:opacity-95 transition-all duration-300 transform hover:-translate-y-1">
						EXPLORE OUR MISSION
					</button>
					<button className="px-10 py-5 btn-outline text-foreground font-black rounded-2xl hover:bg-white/20 transition-all duration-300 backdrop-blur-xl">
						VIEW IMPACT REPORT
					</button>
				</div>
			</header>

			{/* Cards Section - Auto Scrolling */}
			<section className="py-20 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 mb-12">
					<h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Our Core Initiatives</h2>
					<p className="text-muted text-lg">Discover how we are making a difference across various sectors.</p>
				</div>
				<InfiniteCards items={active} speed="normal" />
			</section>

			{/* Mission Section - Increased Content */}
			<section className="max-w-6xl mx-auto px-4 py-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
					<div>
						<h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
							Why We Do <br />
							<span className="text-gradient">What We Do</span>
						</h2>
						<div className="space-y-6 text-muted text-lg leading-relaxed">
							<p>
								At VK Sewa Foundation, we believe that every individual deserves access to basic necessities and opportunities for growth. Our journey started with a simple observation: the vast disparity in resources between urban and rural India.
							</p>
							<p>
								We leverage modern technology to ensure that every rupee donated reaches its intended destination. Our transparent tracking systems and community-led approach make us a trusted partner for social change.
							</p>
							<p>
								From micro-finance to digital literacy, our programs are designed to be sustainable and scalable. We don't just provide aid; we build ecosystems that empower people to help themselves.
							</p>
						</div>
						<div className="mt-10 grid grid-cols-2 gap-8">
							<div>
								<div className="text-gradient font-black text-2xl mb-2">Transparency</div>
								<p className="text-sm text-muted">Real-time tracking of every project and donation.</p>
							</div>
							<div>
								<div className="text-gradient font-black text-2xl mb-2">Sustainability</div>
								<p className="text-sm text-muted">Long-term solutions that create lasting impact.</p>
							</div>
						</div>
					</div>
					<div className="relative">
						<div className="aspect-square rounded-3xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 site-card flex items-center justify-center overflow-hidden">
							<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
							<div className="relative z-10 p-12 text-center">
								<div className="text-6xl font-black text-foreground mb-4">10+</div>
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
					{[
						{ label: "Lives Impacted", value: "50,000+", color: "text-teal-400" },
						{ label: "Villages Reached", value: "200+", color: "text-emerald-400" },
						{ label: "Volunteers", value: "1,500+", color: "text-cyan-400" },
						{ label: "Projects", value: "12+", color: "text-blue-400" }
					].map((stat, i) => (
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
							Be the Change <br />
							<span className="text-gradient">You Wish to See</span>
						</h2>
						<p className="text-muted text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
							Your contribution, no matter how small, can spark a revolution in someone's life. Join us in our mission to create a more equitable world.
						</p>
						<div className="flex flex-col md:flex-row gap-6 justify-center">
							<button className="px-12 py-6 btn-gradient font-black rounded-2xl shadow-[0_0_50px_-12px_rgba(20,184,166,0.5)] transform hover:-translate-y-1">
								DONATE NOW
							</button>
							<button className="px-12 py-6 btn-outline text-foreground font-black rounded-2xl hover:bg-card transition-all backdrop-blur-xl">
								BECOME A VOLUNTEER
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
