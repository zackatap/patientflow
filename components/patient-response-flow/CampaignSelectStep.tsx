"use client";

import type { CampaignType } from "@/types/patient-response-flow";
import { CAMPAIGN_OPTIONS } from "@/types/patient-response-flow";
import Image from "next/image";

interface CampaignSelectStepProps {
  selected: CampaignType | "";
  onSelect: (campaign: CampaignType) => void;
}

const CAMPAIGN_IMAGES: Record<CampaignType, string> = {
  pain_device: "/campaigns/shockwave.png",
  wellness: "/campaigns/chiropractic.png",
  decompression: "/campaigns/decompression.png",
  neuropathy: "/campaigns/neuropathy.png",
};

export function CampaignSelectStep({ selected, onSelect }: CampaignSelectStepProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--muted)]">
        Choose the type of campaign you want to craft. This will customize your
        sequence messaging and pre-fill education copy.
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {CAMPAIGN_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`group relative flex min-w-0 flex-1 items-center overflow-hidden rounded-lg border py-2.5 pl-3 pr-20 text-left transition-all duration-150 sm:min-w-[200px] sm:flex-initial sm:py-3 sm:pl-4 sm:pr-24 ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-[var(--border)] bg-[var(--card)]/80 hover:border-[var(--border)]/80 hover:bg-[var(--card-hover)]"
              }`}
            >
              <div className="min-w-0 flex-1 pr-2">
                <div className="truncate text-sm font-medium text-[var(--foreground)]">
                  {opt.label}
                </div>
                <div className="truncate text-xs text-[var(--muted)]">
                  {opt.description}
                </div>
              </div>
              {isSelected && (
                <svg className="h-4 w-4 shrink-0 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              <div className="absolute right-0 top-0 bottom-0 w-20 overflow-hidden rounded-r-lg bg-[var(--input)] sm:w-24">
                <Image
                  src={CAMPAIGN_IMAGES[opt.id]}
                  alt=""
                  fill
                  className="object-cover object-right"
                  sizes="96px"
                />
                {/* Gradient overlay blends image into card background */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-r-lg"
                  style={{
                    background: "linear-gradient(to right, var(--card) 0%, transparent 60%)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
