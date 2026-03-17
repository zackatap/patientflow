"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-[1.25rem] overflow-hidden relative transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed btn-magnetic";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white focus:ring-[var(--accent)] group",
    secondary:
      "bg-[var(--accent-secondary)] text-white hover:opacity-90 focus:ring-[var(--accent-secondary)]",
    ghost:
      "bg-transparent text-[var(--foreground)] hover:bg-[var(--card)] focus:ring-[var(--muted)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      style={{
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      {...props}
    >
      {variant === "primary" && !disabled && !isLoading && (
        <span
          className="absolute inset-0 bg-[var(--accent-hover)] transition-transform duration-300 ease-out -translate-x-full group-hover:translate-x-0"
          aria-hidden
        />
      )}
      <span className="relative z-10">
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 inline"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
