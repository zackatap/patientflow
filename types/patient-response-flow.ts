/** Campaign types for the Patient Response Flow. */
export type CampaignType =
  | "pain_device"
  | "wellness"
  | "decompression"
  | "neuropathy";

export const CAMPAIGN_OPTIONS: Array<{
  id: CampaignType;
  label: string;
  description: string;
  education_short: string;
  education_long: string;
  hasProductName: boolean;
}> = [
  {
    id: "pain_device",
    label: "Pain Device / Shockwave",
    description: "Softwave, Shockwave, Laser, Red Light, etc.",
    education_short:
      "Shockwave Therapy jumpstarts your body's own healing process, breaking down damaged tissue and restoring function without surgery.",
    education_long:
      "Shockwave Therapy delivers acoustic sound waves to injured or chronic pain areas, stimulating blood flow, breaking down calcified tissue, and triggering the body's natural regenerative response. It's particularly effective for stubborn conditions like plantar fasciitis, tendonitis, and joint pain that haven't responded to other treatments. Patients heal the underlying issue rather than just managing the discomfort.",
    hasProductName: true,
  },
  {
    id: "wellness",
    label: "Chiropractic",
    description: "Spinal alignment, pain relief, non-invasive",
    education_short:
      "Chiropractic care restores proper spinal alignment, relieving pain at the source without drugs or surgery.",
    education_long:
      "Chiropractic care works by correcting misalignments in the spine that put pressure on nerves and surrounding tissue. When those misalignments are addressed, the body can heal the way it was designed to. It's one of the most widely used non-invasive treatments for back pain, neck pain, headaches, and sciatica, getting to the root cause rather than masking symptoms with medication.",
    hasProductName: false,
  },
  {
    id: "decompression",
    label: "Decompression",
    description: "Spinal decompression for disc issues, sciatica, back pain",
    education_short:
      "Spinal Decompression gently creates space between compressed discs, relieving pressure on nerves without surgery or injections.",
    education_long:
      "When spinal discs become compressed or herniated, they press on nearby nerves, causing radiating pain, sciatica, and limited mobility. Spinal Decompression therapy uses a precisely controlled traction force to gently separate the vertebrae, creating negative pressure that allows bulging discs to retract and nutrients to flow back into the disc. It's a non-surgical approach that gets to the structural root of chronic back and neck pain.",
    hasProductName: false,
  },
  {
    id: "neuropathy",
    label: "Neuropathy",
    description: "Peripheral neuropathy, nerve pain relief",
    education_short:
      "Neuropathy isn't just nerve pain. It's damaged nerves that can actually heal with the right treatment, no medication required.",
    education_long:
      "Peripheral neuropathy causes burning, tingling, and numbness because nerves aren't receiving adequate blood flow and oxygen. Most patients are handed a prescription and told to manage it, but medication doesn't fix the nerve damage, it just masks it. Advanced neuropathy treatments work by stimulating blood flow directly to the affected nerves, triggering the body's own repair process and addressing the root cause.",
    hasProductName: false,
  },
];

/** Form values for the Patient Response Flow. Maps to our placeholders and High Level CRM fields. */
export interface ResponseFlowValues {
  campaign: CampaignType | ""; // "" = none selected (campaign step only)
  practice_name: string;
  full_address: string;
  phone: string;
  demo_name: string;
  package_name_with_price: string;
  package_name_casual: string;
  product_name: string;
  outreach_name: string;
  education_short: string;
  education_long: string;
}

export const defaultResponseFlowValues: ResponseFlowValues = {
  campaign: "", // No selection by default
  practice_name: "",
  full_address: "",
  phone: "",
  demo_name: "John",
  package_name_with_price: "",
  package_name_casual: "",
  product_name: "",
  outreach_name: "",
  education_short: "",
  education_long: "",
};

export type SequenceItem =
  | {
      type: "sms" | "email";
      subject?: string;
      content: string;
      messageIndex?: number;
    }
  | {
      type: "wait";
      duration: string;
    };
