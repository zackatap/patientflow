import type { ResponseFlowValues, SequenceItem } from "@/types/patient-response-flow";

/**
 * Patient Response Flow sequence template.
 * Uses our placeholders: {{practice_name}}, {{full_address}}, {{phone}},
 * {{package_name_with_price}}, {{package_name_casual}}, {{product_name}}, {{outreach_name}},
 * {{education_short}}, {{education_long}}, {{contact.first_name}} (kept for CRM merge).
 * Sequence: Text 1-10 (SMS), Email 1-7 (interleaved), with wait steps between some messages.
 */
type SequenceMetaItem =
  | { type: "sms"; templateIndex: number }
  | { type: "email"; templateIndex: number }
  | { type: "wait"; duration: string };

const SEQUENCE_META: SequenceMetaItem[] = [
  { type: "sms", templateIndex: 0 },    // Text #1
  { type: "email", templateIndex: 1 },   // Email #1
  { type: "wait", duration: "2 Days" },
  { type: "sms", templateIndex: 2 },    // Text #2
  { type: "wait", duration: "3 Days" },
  { type: "sms", templateIndex: 3 },    // Text #3
  { type: "wait", duration: "2 Days" },
  { type: "sms", templateIndex: 4 },    // Text #4
  { type: "wait", duration: "3 Days" },
  { type: "email", templateIndex: 5 },  // Email #2
  { type: "wait", duration: "2 Days" },
  { type: "sms", templateIndex: 6 },    // Text #5
  { type: "wait", duration: "2 Days" },
  { type: "email", templateIndex: 7 },  // Email #3
  { type: "wait", duration: "1 Day" },
  { type: "sms", templateIndex: 8 },    // Text #6
  { type: "wait", duration: "3 Days" },
  { type: "email", templateIndex: 9 },  // Email #4
  { type: "wait", duration: "2 Days" },
  { type: "sms", templateIndex: 10 },   // Text #7
  { type: "wait", duration: "2 Days" },
  { type: "email", templateIndex: 11 }, // Email #5
  { type: "wait", duration: "4 Days" },
  { type: "sms", templateIndex: 12 },   // Text #8
  { type: "wait", duration: "3 Days" },
  { type: "email", templateIndex: 13 }, // Email #6
  { type: "wait", duration: "8 Days" },
  { type: "sms", templateIndex: 14 },   // Text #9
  { type: "wait", duration: "10 Days" },
  { type: "sms", templateIndex: 15 },   // Text #10
  { type: "wait", duration: "10 Days" },
  { type: "email", templateIndex: 16 }, // Email #7
];

const TEMPLATES: Array<{ subject?: string; body: string }> = [
  {
    body: `👋 Hey {{demo_name}}, this is {{practice_name}}! Thank you for your interest in scheduling our {{package_name_with_price}}! This is our text line.
We'd love to get you in. {{education_short}} Just reply here to find the perfect time for your appointment! (If you're no longer interested, simply reply "no thanks" to stop).`,
  },
  {
    subject: `Your "{{package_name_with_price}}" is ready!`,
    body: `Hi {{demo_name}},
This is {{outreach_name}} from {{practice_name}}. We are excited to help you!
{{education_long}}
To get you scheduled, simply respond to this email with the best times that work for you!
We can't wait to meet you,
{{outreach_name}} at {{practice_name}}
{{full_address}} / {{phone}}
As always, if this is something you're no longer interested in, just reply with a quick "no thanks" so I know to stop contacting you.`,
  },
  {
    body: `Hi {{demo_name}}, this is {{outreach_name}} from {{practice_name}}! I'd love to help you find a great time for your appointment. Do you prefer mornings or afternoons?`,
  },
  {
    body: `Hey {{demo_name}}! A lot of our new patients find it helpful to hop on a quick call to discuss any questions before coming in. Would a quick phone chat be helpful for you? Just let me know!`,
  },
  {
    body: `Hi {{demo_name}}, have you ever had a {{package_name_casual}} before? If you have any questions prior to scheduling, please feel free to ask here. Otherwise, are you mostly just wanting to learn more at this time, or are you ready to take the next step with what you're dealing with?`,
  },
  {
    subject: `Regarding your {{package_name_with_price}}`,
    body: `Hey it's {{outreach_name}} from {{practice_name}}.
We get patients reaching out quite often who aren't quite ready to take the next steps and are simply looking for more information.
Could you share with me, are you looking to get help right now or simply looking to learn more about {{product_name}}?
Talk soon!
{{outreach_name}} at {{practice_name}}
{{full_address}} / {{phone}}`,
  },
  {
    body: `Hey {{demo_name}}! We are looking forward to meeting you! Let's find a great time for your {{package_name_casual}}. Is there an upcoming day you have availability to come in?`,
  },
  {
    subject: `A quick phone consult`,
    body: `Hey {{demo_name}},
Often, our new patients find it beneficial to hop on the phone with someone and discuss any questions or concerns before coming into the office. Would that be helpful for you? Just let me know, and I can get that set up!
Yours in health,
{{outreach_name}} at {{practice_name}}
{{full_address}} / {{phone}}`,
  },
  {
    body: `Hi, {{demo_name}}! I am online updating our scheduling and saw that you haven't gotten scheduled yet for your {{package_name_casual}}. I would love to help you get scheduled! Do mornings or afternoons work best for you?`,
  },
  {
    subject: `Touching Base 👋`,
    body: `Hey {{demo_name}},
This is {{outreach_name}}, just checking in with regard to the {{package_name_casual}} offer you filled out a few weeks ago. Are you still interested in trying us out?
We would love to help! Respond to this email with your preferred appointment times, or give us a call!
Wishing you wellness,
{{outreach_name}} - {{practice_name}}
{{full_address}} / {{phone}}`,
  },
  {
    body: `Hi {{demo_name}}, this is {{outreach_name}} from {{practice_name}}. I'm so sorry we haven't been able to connect yet. Are you still interested in reserving your {{package_name_casual}} at our office?`,
  },
  {
    subject: `How are you feeling today?`,
    body: `Hi {{demo_name}},
I just wanted to reach out to see if you still wanted to claim the offer for your {{package_name_with_price}}. We know there was a reason you signed up, and we are excited to help you, so if you are still interested, please give us a call at {{phone}}, OR just respond to this email!
Best,
{{outreach_name}} at {{practice_name}}
{{full_address}} / {{phone}}`,
  },
  {
    body: `Hi {{demo_name}}, we'd still love to help if you're ready to schedule your {{package_name_casual}}! Send us a text with your availability when you have a free moment, and we will respond with some options for you.`,
  },
  {
    subject: `Still thinking it over, {{demo_name}}?`,
    body: `Hi {{demo_name}},
It's {{outreach_name}} from {{practice_name}}. Since we haven't been able to get you on the schedule yet, I wanted to ask a quick question.
Are you looking to find relief right now, or are you just doing some early research on how {{product_name}} works?
Either is completely fine; I just want to know how I can best support you right now.
Best,
{{outreach_name}}
{{practice_name}}
{{full_address}} / {{phone}}`,
  },
  {
    body: `I noticed you haven't gotten scheduled yet for your {{package_name_casual}}. Is now a better time?`,
  },
  {
    body: `Hi {{demo_name}}, I'll stop texting you about your {{package_name_casual}}. Our door is always open if you ever become interested again in trying {{product_name}}! Wishing you all the best! -- {{outreach_name}}`,
  },
  {
    subject: `Are you still interested in a {{package_name_casual}}, {{demo_name}}?`,
    body: `I've been trying to help you schedule your first appointment for a few months. I can only assume you are no longer interested in coming in for a visit. Remember, we are always here for you if you ever change your mind!
{{outreach_name}} at {{practice_name}}
{{full_address}} / {{phone}}`,
  },
];

const EMPTY_PLACEHOLDERS: Record<string, string> = {
  practice_name: "[Practice Name]",
  full_address: "[Full Address]",
  phone: "[Phone]",
  demo_name: "{{contact.first_name}}", // GHL custom value when empty
  package_name_with_price: "[Package Name with Price]",
  package_name_casual: "[Package Name (casual)]",
  product_name: "[Product Name]",
  outreach_name: "[Outreach Name]",
  education_short: "[Education (short)]",
  education_long: "[Education (long)]",
};

/**
 * Converts single newlines to double newlines for better paragraph separation.
 */
function addExtraLineBreaks(text: string): string {
  return text.replace(/\n/g, "\n\n");
}

function replacePlaceholders(
  text: string,
  values: Record<string, string>,
  useEmptyPlaceholders: boolean = false
): string {
  let result = text;
  for (const [key, value] of Object.entries(values)) {
    const str = (value ?? "").trim();
    const replacement = useEmptyPlaceholders && !str
      ? (EMPTY_PLACEHOLDERS[key] ?? `[${key}]`)
      : (value ?? "");
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), replacement);
  }
  return result;
}

/** Returns the full sequence with templates (placeholders intact). */
export function getSequenceWithTemplates(): SequenceItem[] {
  let smsCount = 0;
  let emailCount = 0;
  return SEQUENCE_META.map((item) => {
    if (item.type === "wait") {
      return { type: "wait" as const, duration: item.duration };
    }
    const t = TEMPLATES[item.templateIndex];
    if (item.type === "sms") {
      smsCount++;
      return {
        type: "sms" as const,
        subject: t.subject,
        content: t.body,
        messageIndex: smsCount,
      };
    }
    emailCount++;
    return {
      type: "email" as const,
      subject: t.subject,
      content: t.body,
      messageIndex: emailCount,
    };
  });
}

/** Product-name phrases: with product (pain_device) vs without (other campaigns). */
const PRODUCT_PHRASE_REPLACEMENTS: Array<{
  templateIndex: number;
  withProduct: string;
  withoutProduct: string;
}> = [
  {
    templateIndex: 5,
    withProduct: "simply looking to learn more about {{product_name}}?",
    withoutProduct: "simply gathering more information?",
  },
  {
    templateIndex: 13,
    withProduct: "or are you just doing some early research on how {{product_name}} works?",
    withoutProduct: "or are you still in the research phase?",
  },
  {
    templateIndex: 15,
    withProduct: "if you ever become interested again in trying {{product_name}}!",
    withoutProduct: "if you ever decide to take the next step!",
  },
];

/**
 * Merges ResponseFlowValues into the sequence templates.
 * {{contact.first_name}} is left as-is for CRM merge.
 * For campaigns without product_name, uses fixed phrases instead of falling back to package_name_casual.
 */
export function mergeValuesIntoSequence(
  values: ResponseFlowValues
): SequenceItem[] {
  const hasProductName =
    values.campaign === "pain_device" && !!values.product_name?.trim();

  const valueMap: Record<string, string> = {
    practice_name: values.practice_name ?? "",
    full_address: values.full_address ?? "",
    phone: values.phone ?? "",
    demo_name: values.demo_name ?? "",
    package_name_with_price: values.package_name_with_price ?? "",
    package_name_casual: values.package_name_casual ?? "",
    product_name: hasProductName ? (values.product_name ?? "") : "",
    outreach_name: values.outreach_name ?? "",
    education_short: values.education_short ?? "",
    education_long: values.education_long ?? "",
  };

  const useEmptyPlaceholders = true;
  let smsCount = 0;
  let emailCount = 0;

  return SEQUENCE_META.map((item) => {
    if (item.type === "wait") {
      return { type: "wait" as const, duration: item.duration };
    }
    let body = TEMPLATES[item.templateIndex].body;
    let subject = TEMPLATES[item.templateIndex].subject;

    // Apply campaign-specific product phrase replacements
    for (const { templateIndex, withProduct, withoutProduct } of PRODUCT_PHRASE_REPLACEMENTS) {
      if (item.templateIndex === templateIndex) {
        body = body.replace(withProduct, hasProductName ? withProduct : withoutProduct);
        break;
      }
    }

    if (item.type === "sms") {
      smsCount++;
      return {
        type: "sms" as const,
        subject: subject
          ? replacePlaceholders(subject, valueMap, useEmptyPlaceholders)
          : undefined,
        content: addExtraLineBreaks(
          replacePlaceholders(body, valueMap, useEmptyPlaceholders)
        ),
        messageIndex: smsCount,
      };
    }
    emailCount++;
    return {
      type: "email" as const,
      subject: subject
        ? replacePlaceholders(subject, valueMap, useEmptyPlaceholders)
        : undefined,
      content: addExtraLineBreaks(
        replacePlaceholders(body, valueMap, useEmptyPlaceholders)
      ),
      messageIndex: emailCount,
    };
  });
}
