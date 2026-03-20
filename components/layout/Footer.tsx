"use client";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Response Flow";

export function Footer() {
  return (
    <footer className="rounded-t-[4rem] bg-[var(--dark)] text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Automated Practice CTA */}
        <div className="mb-12 rounded-[2rem] border border-white/15 bg-white/5 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            From Automated Practice
          </p>
          <h3 className="mt-2 font-serif text-lg text-white sm:text-xl">
            <span className="font-bold">Practice owners:</span>{" "}
            <span className="font-light tracking-[.5px]">Grow with paid ads, automations & systems</span>
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Ready to scale? Check out our latest offer or explore how we help practices grow.
          </p>
          <div className="mt-4 flex flex-wrap gap-6">
            <a
              href="https://offer.automatedpractice.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white underline decoration-white/60 underline-offset-2 transition-colors hover:decoration-white"
            >
              View latest offer →
            </a>
            <a
              href="https://automatedpractice.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white underline decoration-white/60 underline-offset-2 transition-colors hover:decoration-white"
            >
              automatedpractice.com
            </a>
          </div>
        </div>
        <div>
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
