"use client";

import { useEffect, useState } from "react";
import styles from "./themetoggle.module.css";

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const init = stored || (prefersDark ? "dark" : "light");
    setTheme(init);
    document.documentElement.dataset.theme = init;
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    document.cookie = `theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={className || styles.iconBtn}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79l1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.22 19.78l1.79-1.79l-1.79-1.79l-1.79 1.79l1.79 1.79zM20 13h3v-2h-3v2zm-2.76-8.16l1.79-1.79l-1.79-1.79l-1.79 1.79l1.79 1.79zM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12zm0-5h2v3h-2V1zm7.78 18.78l1.79-1.79l-1.79-1.79l-1.79 1.79l1.79 1.79z"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M21 12.79A9 9 0 0 1 11.21 3c-.3 0-.6.02-.89.05A7 7 0 1 0 21 12.79z"/></svg>
      )}
    </button>
  );
}
