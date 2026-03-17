"use client";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Response Flow";

export function Footer() {
  return (
    <footer className="rounded-t-[4rem] bg-[var(--dark)] text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {APP_NAME}
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Craft personalized SMS and email sequences for your CRM.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-white/80">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              System Operational
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
