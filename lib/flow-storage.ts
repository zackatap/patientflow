import type { ResponseFlowValues } from "@/types/patient-response-flow";

const STORAGE_KEY = "patient-flow-draft";

export function saveFlowValues(values: ResponseFlowValues): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // ignore
  }
}

export function loadFlowValues(): ResponseFlowValues | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ResponseFlowValues;
  } catch {
    return null;
  }
}
