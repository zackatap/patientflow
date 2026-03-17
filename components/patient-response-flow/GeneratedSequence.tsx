"use client";

import { useState } from "react";
import type { SequenceItem, ResponseFlowValues } from "@/types/patient-response-flow";
import { Button } from "@/components/ui/Button";

interface GeneratedSequenceProps {
  sequence: SequenceItem[];
  values: ResponseFlowValues;
  isAuthenticated: boolean;
}

export function GeneratedSequence({ sequence, values, isAuthenticated }: GeneratedSequenceProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const exportToGoogleDocs = async () => {
    if (!isAuthenticated) return;
    setExporting(true);
    setExportError(null);
    try {
      const res = await fetch("/api/patient-response-flow/export-google-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setExportError(data.error ?? "Export failed");
        return;
      }
      if (data.webViewLink) window.open(data.webViewLink, "_blank");
    } catch {
      setExportError("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = async (item: SequenceItem, index: number) => {
    if (item.type === "wait") return;
    const text = item.type === "email" && item.subject
      ? `Subject: ${item.subject}\n\n${item.content}`
      : item.content;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      {isAuthenticated && (
        <div className="flex shrink-0 flex-wrap items-center gap-2 pb-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={exportToGoogleDocs}
            disabled={exporting}
            className="shrink-0"
          >
            {exporting ? (
              "Exporting…"
            ) : (
              <>
                <svg className="mr-1.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Export to Google Docs
              </>
            )}
          </Button>
          {exportError && (
            <span className="text-xs text-red-500">{exportError}</span>
          )}
        </div>
      )}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-2">
      {sequence.map((item, index) =>
        item.type === "wait" ? (
          <div key={index} className="flex justify-center">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: "var(--badge-wait-bg)", color: "var(--badge-wait-text)" }}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Wait {item.duration}
            </span>
          </div>
        ) : item.type === "sms" ? (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "var(--badge-sms-bg)", color: "var(--badge-sms-text)" }}
              >
                SMS {item.messageIndex ?? index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(item, index)}
                className="shrink-0 -mr-1"
              >
                {copiedIndex === index ? (
                  <>
                    <svg className="mr-1.5 h-4 w-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#E8F5E9] px-4 py-3 shadow-sm border border-[#C8E6C9]">
                <p className="whitespace-pre-wrap text-sm text-[var(--foreground)]">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "var(--badge-email-bg)", color: "var(--badge-email-text)" }}
              >
                EMAIL {item.messageIndex ?? index + 1}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(item, index)}
                className="shrink-0 -mr-1"
              >
                {copiedIndex === index ? (
                  <>
                    <svg className="mr-1.5 h-4 w-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm">
              {item.subject && (
                <div className="border-b border-[var(--border)] pb-3 mb-3">
                  <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-0.5">Subject</p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {item.subject}
                  </p>
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        )
      )}
      </div>
    </div>
  );
}
