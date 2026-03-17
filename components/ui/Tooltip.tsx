"use client";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 px-3 py-2 min-w-[280px] max-w-[420px] rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm text-[var(--foreground)] shadow-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      >
        {content}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[var(--border)]" />
      </div>
    </div>
  );
}
