"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft, Share2, Heart, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
    const { slug } = useParams();
    const router = useRouter();

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-foreground mb-4">Project Not Found</h1>
                    <button onClick={() => router.back()} className="text-teal-500 font-bold hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-muted selection:bg-teal-500/30">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-card" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent`} />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => router.back()}
                            className="mb-8 flex items-center gap-2 text-sm font-black text-muted hover:text-foreground transition-colors uppercase tracking-[0.2em]"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Projects
                        </button>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                            <div className="max-w-3xl">
                                <div className="inline-block px-4 py-2 rounded-xl bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-teal-500/30 backdrop-blur-md">
                                    {project.category}
                                </div>
                                <h1 className="text-5xl md:text-[80px] font-black text-foreground leading-[0.9] tracking-tighter mb-8">
                                    {project.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                                    {project.desc}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button className="w-16 h-16 rounded-2xl bg-card border-card flex items-center justify-center hover:bg-white/5 transition-all shadow-xl">
                                    <Share2 className="w-6 h-6 text-foreground" />
                                </button>
                                <button className="px-8 py-5 btn-gradient rounded-2xl font-black flex items-center gap-3 shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all">
                                    <Heart className="w-5 h-5 fill-current" /> SUPPORT THIS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Main Content - Left */}
                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <h2 className="text-3xl font-black text-foreground mb-8">About the Initiative</h2>
                            <div className="prose prose-invert max-w-none text-muted text-lg leading-[1.8] space-y-6">
                                <p>{project.fullContent || project.desc}</p>
                                <p>
                                    Our strategy is built on three core pillars: Community Engagement, Sustainable Infrastructure, and
                                    Continuous Monitoring. By working directly with local leaders, we ensure that every project is
                                    culturally sensitive and meets the real needs of the people.
                                </p>
                            </div>
                        </section>

                        {/* Impact Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {project.stats?.map((stat, i) => (
                                <div key={i} className="site-card p-10 rounded-[2.5rem] group hover:bg-teal-500/5 transition-all duration-500">
                                    <div className="text-4xl font-black text-foreground mb-3 group-hover:text-teal-400 transition-colors">{stat.value}</div>
                                    <div className="text-xs text-muted uppercase font-black tracking-widest">{stat.label}</div>
                                </div>
                            )) || (
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="site-card p-10 rounded-[2.5rem] animate-pulse" />
                                    ))
                                )}
                        </div>

                        {/* Timeline Section */}
                        {project.timeline && (
                            <section className="pt-8">
                                <h3 className="text-2xl font-black text-foreground mb-12">Project Journey</h3>
                                <div className="space-y-12 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-white/5">
                                    {project.timeline.map((item, i) => (
                                        <div key={i} className="relative pl-12">
                                            <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-card border-2 border-teal-500 z-10" />
                                            <div>
                                                <div className="text-teal-400 text-xs font-black uppercase tracking-widest mb-1">{item.date}</div>
                                                <div className="text-lg font-bold text-foreground">{item.event}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sticky Sidebar - Right */}
                    <div className="lg:col-span-4">
                        <div className="site-card p-10 rounded-[3rem] sticky top-32">
                            <h3 className="text-2xl font-black text-foreground mb-8">Project Details</h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Location", value: "Rural Bihar, India" },
                                    { label: "Status", value: "Active", icon: <CheckCircle2 className="w-4 h-4 text-teal-500" /> },
                                    { label: "Impact", value: project.impact },
                                    { label: "Started", value: "Jan 2024" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
                                        <span className="text-sm font-bold text-muted">{item.label}</span>
                                        <span className="text-sm font-black text-foreground flex items-center gap-2">
                                            {item.icon} {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 rounded-2xl bg-teal-500/5 border border-teal-500/10">
                                <p className="text-xs text-muted font-bold leading-relaxed">
                                    Join us in making this project even bigger. Your support allows us to scale these
                                    proven models to more communities.
                                </p>
                                <Link href="/donate" className="mt-6 block w-full text-center py-4 bg-teal-500 text-white font-black rounded-xl hover:opacity-90 transition-all shadow-lg animate-pulse">
                                    DONATE NOW
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
