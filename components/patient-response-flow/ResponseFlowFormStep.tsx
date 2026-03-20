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
  inSidebar?: boolean;
}

export function ResponseFlowFormStep({
  values,
  onChange,
  disabled,
  inSidebar = false,
}: ResponseFlowFormStepProps) {
  const campaign = CAMPAIGN_OPTIONS.find((c) => c.id === values.campaign);
  const hasProductName = campaign?.hasProductName ?? false;

  const handleChange = (key: keyof ResponseFlowValues, value: string) => {
    onChange({ ...values, [key]: value });
  };

  const renderInput = (key: keyof ResponseFlowValues, label: string, placeholder: string, helperText?: string, tooltip?: string) => (
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
  );

  const renderTextarea = (key: keyof ResponseFlowValues, label: string, placeholder: string, helperText?: string, tooltip?: string, rows?: number) => (
    <Textarea
      key={key}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      labelTooltip={tooltip}
      value={values[key]}
      onChange={(e) => handleChange(key, e.target.value)}
      rows={rows ?? 3}
      disabled={disabled}
    />
  );

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
          title="Campaign Details"
          subtitle="Update values to populate messaging."
        />
        <div className="space-y-4">
          {/* Row 1: Practice Name | Outreach Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {renderInput("practice_name", "Practice Name", "e.g. Smith Chiropractic")}
            {renderInput("outreach_name", "Outreach Name", "e.g. Dr. Smith")}
          </div>
          {/* Row 2: Address | Phone - full width when in sidebar */}
          <div className={`grid grid-cols-1 gap-4 ${inSidebar ? "" : "sm:grid-cols-2"}`}>
            {renderInput("full_address", "Full Address", "e.g. 123 Main St, City, ST 12345")}
            {renderInput("phone", "Phone", "e.g. (555) 123-4567")}
          </div>
          {/* Row 3: Package Name | Casual Service Name (and Product Name if applicable) - full width when in sidebar */}
          <div className={`grid grid-cols-1 gap-4 ${inSidebar ? "" : hasProductName ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {renderInput("package_name_with_price", "Package Name (with price)", "e.g. $49 New Patient Exam", 'e.g. "$49 New Patient Exam"')}
            {renderInput(
              "package_name_casual",
              "Casual Service Name",
              "e.g. chiropractic adjustment, Softwave treatment",
              'e.g. "chiropractic adjustment", "Softwave treatment"',
              "Used in sentences like: Hi John, have you ever had a ___ before?"
            )}
            {hasProductName && renderInput("product_name", "Product Name", "e.g. Softwave TRT or Trifecta PRO 450")}
          </div>
          {/* Education fields - full width */}
          {renderTextarea("education_short", "Education (short)", "Brief intro sentence for SMS", "One short sentence for the first text message.", undefined, 2)}
          {renderTextarea("education_long", "Education (long)", "Full paragraph for the first email", "Full paragraph introducing your practice and value.")}
        </div>
      </Card>
    </div>
  );
}
