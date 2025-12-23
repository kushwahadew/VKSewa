"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme;
        const initialTheme = saved || (document.documentElement.classList.contains("light") ? "light" : "dark");
        setTheme(initialTheme);
        setMounted(true);

        // Sync theme across tabs/iframes
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
                setTheme(e.newValue as Theme);
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        if (theme === "light") {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            document.documentElement.style.colorScheme = "light";
        } else {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
        }
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
