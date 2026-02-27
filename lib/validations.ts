import { z } from "zod";

export const auditFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number").optional().or(z.literal("")),
  carriers: z.array(z.string()).min(1, "Please select at least one carrier"),
  monthlySpend: z.string().min(1, "Please select your monthly shipping spend"),
  message: z.string().optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

export const carrierOptions = [
  { value: "ups", label: "UPS" },
  { value: "fedex", label: "FedEx" },
  { value: "usps", label: "USPS" },
  { value: "dhl", label: "DHL" },
  { value: "other", label: "Other" },
];

export const calculatorSchema = z.object({
  length: z.number().min(1, "Required").max(120, "Max 120 in"),
  width: z.number().min(1, "Required").max(120, "Max 120 in"),
  height: z.number().min(1, "Required").max(120, "Max 120 in"),
  weight: z.number().min(0.1, "Required").max(150, "Max 150 lbs"),
  originZip: z.string().regex(/^\d{5}$/, "Enter 5-digit ZIP"),
  destinationZip: z.string().regex(/^\d{5}$/, "Enter 5-digit ZIP"),
});

export type CalculatorFormData = z.infer<typeof calculatorSchema>;

export const spendRanges = [
  { value: "", label: "Select monthly spend" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-plus", label: "$100,000+" },
];
