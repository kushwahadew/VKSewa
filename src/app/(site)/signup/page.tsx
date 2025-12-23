"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signup, isGateUnlocked, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    if (!authLoading && !isGateUnlocked) {
        notFound();
    }

    if (authLoading || !isGateUnlocked) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await signup(email, password);
            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Failed to create account. " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
            <div className="w-full max-w-md site-card p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-foreground font-black text-2xl shadow-lg mb-4">
                        <Image src="/logo.png" alt="VK SEWA Logo" width={64} height={64} />
                    </div>
                    <h1 className="text-2xl font-black text-foreground">Admin Registration</h1>
                    <p className="text-muted text-sm font-bold uppercase tracking-wider">Restricted Access</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-foreground"
                            placeholder="admin@vksewa.org"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-foreground"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-teal-500/25 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Creating Account..." : "Create Admin Account"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-xs text-muted hover:text-foreground transition-colors block mb-2">
                        Already have an account? Login
                    </Link>
                    <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors">
                        ← Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
