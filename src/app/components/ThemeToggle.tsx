"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-3 py-2 w-[46px] h-[38px] rounded-lg border border-card" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="px-3 py-2 rounded-lg bg-transparent border border-card text-muted hover:bg-card hover:text-foreground transition"
    >
      {theme === "light" ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent-from)' }}><path d="M12 3.1a1 1 0 011 1V6a1 1 0 11-2 0V4.1a1 1 0 011-1zM12 18a6 6 0 100-12 6 6 0 000 12zM4.2 5.5a1 1 0 010 1.4L3 8.1a1 1 0 01-1.4-1.4l1.2-1.2a1 1 0 011.4 0zM20.4 18.5a1 1 0 010 1.4l-1.2 1.2a1 1 0 01-1.4-1.4l1.2-1.2a1 1 0 011.4 0zM20.9 6.1a1 1 0 00-1.4 0L18.2 7.4a1 1 0 001.4 1.4l1.3-1.3a1 1 0 000-1.4zM6.1 18.9a1 1 0 00-1.4 1.4l1.3 1.3a1 1 0 001.4-1.4l-1.3-1.3z" /></svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
      )}
    </button>
  );
}
