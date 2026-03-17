"use client";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Response Flow";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-center border-b border-[var(--border)] bg-[var(--background)]/95 px-4 sm:px-6 lg:px-8 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <span className="text-lg font-bold text-[var(--foreground)]">
        {APP_NAME}
      </span>
    </header>
  );
}
