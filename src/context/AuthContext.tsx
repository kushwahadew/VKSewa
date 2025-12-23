"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import {
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname } from "next/navigation";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isGateUnlocked: boolean;
    login: (email: string, pass: string) => Promise<any>;
    signup: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<void>;
    unlockGate: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isGateUnlocked: false,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
    unlockGate: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGateUnlocked, setIsGateUnlocked] = useState(false);
    const pathname = usePathname();
    const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        const storedGateStatus = sessionStorage.getItem("vk_gate_unlocked");
        if (storedGateStatus === "true") {
            setIsGateUnlocked(true);
        }

        return () => unsubscribe();
    }, []);

    // Auto-logout Logic: If away from /admin for 5 minutes
    useEffect(() => {
        if (!user) return;

        const isAdminPath = pathname?.startsWith('/admin');

        if (isAdminPath) {
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
                logoutTimerRef.current = null;
                console.log("Admin session active: Timer cleared.");
            }
        } else {
            // User moved away from Admin. Start 5-minute timer.
            if (!logoutTimerRef.current) {
                console.log("Away from admin: Starting 5 min logout timer...");
                logoutTimerRef.current = setTimeout(() => {
                    console.log("Session Timeout: Automatically logging out.");
                    logout();
                    setIsGateUnlocked(false);
                    sessionStorage.removeItem("vk_gate_unlocked");
                }, 5 * 60 * 1000); // 5 Minutes
            }
        }

        return () => {
            // Clean up timer on unmount or return to admin
        };
    }, [pathname, user]);

    const login = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signup = (email: string, pass: string) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const logout = async () => {
        await signOut(auth);
        setIsGateUnlocked(false);
        sessionStorage.removeItem("vk_gate_unlocked");
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
    };

    const unlockGate = () => {
        setIsGateUnlocked(true);
        sessionStorage.setItem("vk_gate_unlocked", "true");
    };

    return (
        <AuthContext.Provider value={{ user, loading, isGateUnlocked, login, signup, logout, unlockGate }}>
            {children}
        </AuthContext.Provider>
    );
};
