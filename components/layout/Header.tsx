"use client";

import { useEffect, useState } from "react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Response Flow";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-4 z-30 -translate-x-1/2 transition-all duration-300 ${
        scrolled
          ? "rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-6 py-2.5 backdrop-blur-xl shadow-lg"
          : "rounded-full bg-transparent px-6 py-2.5"
      }`}
    >
      <span
        className={`text-lg font-bold transition-colors ${
          scrolled ? "text-[var(--foreground)]" : "text-[var(--foreground)]"
        }`}
      >
        {APP_NAME}
      </span>
    </header>
  );
}
