"use client";

import type { CampaignType } from "@/types/patient-response-flow";
import { CAMPAIGN_OPTIONS } from "@/types/patient-response-flow";
import { Card } from "@/components/ui/Card";

interface CampaignSelectStepProps {
  selected: CampaignType;
  onSelect: (campaign: CampaignType) => void;
}

export function CampaignSelectStep({ selected, onSelect }: CampaignSelectStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-[var(--muted)]">
        Choose the type of campaign you want to craft. This will customize your
        sequence messaging and pre-fill education copy.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {CAMPAIGN_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              selected === opt.id
                ? "border-[var(--accent)] bg-[var(--accent)]/10"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--card-hover)]"
            }`}
          >
            <div className="font-semibold text-[var(--foreground)]">
              {opt.label}
            </div>
            <div className="mt-1 text-sm text-[var(--muted)]">
              {opt.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
