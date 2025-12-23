"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SecretCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SecretCodeModal({ isOpen, onClose }: SecretCodeModalProps) {
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();
    const { unlockGate } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === "ITGenixs") {
            unlockGate();
            router.push("/login"); // This will be our login page
            onClose();
            setCode("");
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-card p-8 rounded-3xl shadow-2xl border border-white/10 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-foreground"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-xl font-bold">Admin Access</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Access Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className={`w-full bg-background border ${error ? "border-red-500 animate-shake" : "border-border"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-2 text-center font-bold">
                                Access Denied
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-foreground text-background font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
}
