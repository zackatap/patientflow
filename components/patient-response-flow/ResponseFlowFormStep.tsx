"use client";

import type { ResponseFlowValues } from "@/types/patient-response-flow";
import { CAMPAIGN_OPTIONS } from "@/types/patient-response-flow";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardHeader } from "@/components/ui/Card";

interface ResponseFlowFormStepProps {
  values: ResponseFlowValues;
  onChange: (values: ResponseFlowValues) => void;
  disabled?: boolean;
}

const BASE_FIELDS: Array<{
  key: keyof ResponseFlowValues;
  label: string;
  placeholder: string;
  helperText?: string;
  tooltip?: string;
  multiline?: boolean;
}> = [
  { key: "practice_name", label: "Practice Name", placeholder: "e.g. Smith Chiropractic" },
  { key: "full_address", label: "Full Address", placeholder: "e.g. 123 Main St, City, ST 12345" },
  {
    key: "phone",
    label: "Phone",
    placeholder: "e.g. (555) 123-4567",
  },
  {
    key: "package_name_with_price",
    label: "Package Name (with price)",
    placeholder: "e.g. $49 New Patient Exam",
  },
  {
    key: "package_name_casual",
    label: "Casual Service Name",
    placeholder: "e.g. chiropractic adjustment, Softwave treatment",
    helperText: 'e.g. "chiropractic adjustment", "Softwave treatment"',
    tooltip:
      "Used in sentences like: Hi John, have you ever had a ___ before?",
  },
  { key: "outreach_name", label: "Outreach Name", placeholder: "e.g. Dr. Smith" },
  {
    key: "education_short",
    label: "Education (short)",
    placeholder: "Brief intro sentence for SMS",
    helperText: "One short sentence for the first text message.",
    multiline: true,
  },
  {
    key: "education_long",
    label: "Education (long)",
    placeholder: "Full paragraph for the first email",
    helperText: "Full paragraph introducing your practice and value.",
    multiline: true,
  },
];

export function ResponseFlowFormStep({
  values,
  onChange,
  disabled,
}: ResponseFlowFormStepProps) {
  const campaign = CAMPAIGN_OPTIONS.find((c) => c.id === values.campaign);
  const hasProductName = campaign?.hasProductName ?? false;
  const fields = hasProductName
    ? [
        ...BASE_FIELDS.slice(0, 6),
        {
          key: "product_name" as keyof ResponseFlowValues,
          label: "Product Name",
          placeholder: "e.g. Softwave TRT or Trifecta PRO 450",
          helperText: undefined as string | undefined,
          tooltip: undefined as string | undefined,
          multiline: false as boolean,
        },
        ...BASE_FIELDS.slice(6),
      ]
    : BASE_FIELDS;

  const handleChange = (key: keyof ResponseFlowValues, value: string) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <Input
          label="Demo Name"
          placeholder="e.g. John"
          helperText="Remove to show GHL Custom Value in your sequence"
          value={values.demo_name}
          onChange={(e) => handleChange("demo_name", e.target.value)}
          disabled={disabled}
        />
      </Card>

      <Card>
        <CardHeader
          title="Practice Details"
          subtitle="Update values to populate messaging."
        />
        <div className="space-y-4">
          {fields.map(({ key, label, placeholder, helperText, tooltip, multiline }) =>
            multiline ? (
              <Textarea
                key={key}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                labelTooltip={tooltip}
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                rows={key === "education_short" ? 2 : 3}
                disabled={disabled}
              />
            ) : (
              <Input
                key={key}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                labelTooltip={tooltip}
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                disabled={disabled}
              />
            )
          )}
        </div>
      </Card>
    </div>
  );
}
