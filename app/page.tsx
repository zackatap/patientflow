"use client";

import { useState, useEffect, useRef } from "react";
import type { ResponseFlowValues, CampaignType } from "@/types/patient-response-flow";
import {
  defaultResponseFlowValues,
  CAMPAIGN_OPTIONS,
} from "@/types/patient-response-flow";
import { CampaignSelectStep } from "@/components/patient-response-flow/CampaignSelectStep";
import { ResponseFlowFormStep } from "@/components/patient-response-flow/ResponseFlowFormStep";
import { GeneratedSequence } from "@/components/patient-response-flow/GeneratedSequence";
import { mergeValuesIntoSequence } from "@/lib/patient-response-flow-templates";
import { loadFlowValues, saveFlowValues } from "@/lib/flow-storage";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SAVE_DEBOUNCE_MS = 800;

type FlowStep = "campaign" | "form" | "live";

export default function PatientResponseFlowPage() {
  const [step, setStep] = useState<FlowStep>("campaign");
  const [values, setValues] = useState<ResponseFlowValues>(defaultResponseFlowValues);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedRef = useRef(false);
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const sequence = mergeValuesIntoSequence(values);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    const saved = loadFlowValues();
    if (saved && saved.campaign) {
      setValues(saved);
      setStep("live");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const shouldSave = step === "form" || step === "live";
    if (!shouldSave) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveFlowValues(values);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
      saveTimeoutRef.current = null;
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      if (shouldSave) saveFlowValues(values);
    };
  }, [values, step]);

  useEffect(() => {
    if (step !== "form" && step !== "live") return;
    const onBeforeUnload = () => saveFlowValues(valuesRef.current);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [step]);

  const handleCampaignSelect = (campaign: CampaignType) => {
    const opt = CAMPAIGN_OPTIONS.find((c) => c.id === campaign);
    setValues((prev) => ({
      ...prev,
      campaign,
      education_short: opt?.education_short ?? prev.education_short,
      education_long: opt?.education_long ?? prev.education_long,
    }));
    if (step === "campaign") setStep("form");
  };

  const handleSaveAndContinue = () => {
    saveFlowValues(values);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
    setStep("live");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[var(--muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Patient Response Flow
        </h1>
        <p className="mt-1 text-[var(--muted)]">
          Craft personalized SMS and email sequences for your CRM.
        </p>
      </div>

      <div
        className={
          step !== "campaign"
            ? "sticky top-0 z-10 -mx-1 bg-[var(--background)] px-1 pb-4 pt-1"
            : ""
        }
      >
        <Card>
          <CardHeader
            title={
              step === "campaign"
                ? "1. Choose Your Campaign"
                : "Campaign"
            }
            subtitle={
              step === "campaign"
                ? "Select the type of campaign to get started"
                : undefined
            }
          />
          <CampaignSelectStep
            selected={values.campaign}
            onSelect={handleCampaignSelect}
          />
        </Card>
      </div>

      {step === "form" && (
        <>
          <ResponseFlowFormStep
            values={values}
            onChange={setValues}
            disabled={loading}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={handleSaveAndContinue}>
              Save & View Sequence
            </Button>
          </div>
        </>
      )}

      {step === "live" && (
        <>
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("form")}
            >
              ← Edit details
            </Button>
          </div>
          <div className="grid w-full gap-6 lg:grid-cols-[1fr_2fr] lg:items-stretch">
            <div className="flex min-w-0 flex-col space-y-6">
              {saveStatus !== "idle" && (
                <p className="text-sm text-[var(--muted)]">
                  {saveStatus === "saving" ? "Saving…" : "Saved"}
                </p>
              )}
              <ResponseFlowFormStep
                values={values}
                onChange={setValues}
                disabled={loading}
              />
            </div>
            <Card className="flex min-w-0 flex-col">
              <CardHeader
                title="Generated Sequence"
                subtitle="Copy each message for your CRM"
              />
              <GeneratedSequence
                sequence={sequence}
                values={values}
                isAuthenticated={false}
              />
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
