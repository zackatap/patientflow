import { TextareaHTMLAttributes, forwardRef } from "react";
import { Tooltip } from "./Tooltip";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  labelTooltip?: string;
}

const InfoIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, labelTooltip, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <div className="mb-1.5 flex items-center gap-1.5">
            <label className="text-sm font-medium text-[var(--foreground)]">
              {label}
            </label>
            {labelTooltip && (
              <Tooltip content={labelTooltip}>
                <span className="cursor-help text-[var(--muted)] hover:text-[var(--foreground)]">
                  <InfoIcon />
                </span>
              </Tooltip>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          className={`w-full rounded-[1rem] bg-[var(--input)] border border-[var(--border)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-y min-h-[80px] ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-sm text-[var(--muted)]">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-[var(--error)]">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
