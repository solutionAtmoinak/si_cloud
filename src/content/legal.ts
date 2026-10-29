import { FREE_TRIAL } from "@/config/plans";

// Structure only. Final legal wording must be written and reviewed by a qualified lawyer before launch.
export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  path: string;
  intro: string;
  sections: LegalSection[];
};

const placeholderNote = "[PLACEHOLDER: lawyer to write final wording.]";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How CloudVault collects, uses and protects your personal data, your rights under India's DPDP Act 2023 and how to contact our grievance officer.",
  path: "/privacy",
  intro: "This page explains what personal data we collect, why we collect it and the choices you have.",
  sections: [
    {
      heading: "What data we collect",
      bullets: ["Account details such as name, email address and phone number", "Files you choose to back up", "Billing details handled by our payment partner", "Basic usage and device information"],
    },
    { heading: "Why we collect it", paragraphs: [`[PLACEHOLDER: list each purpose, for example providing the service, billing, support and security. ${placeholderNote}]`] },
    { heading: "How long we keep it", paragraphs: ["[PLACEHOLDER: retention periods for account data, files and billing records.]"] },
    {
      heading: "Who we share data with",
      bullets: ["Razorpay, for payments (from Phase 3)", "[PLACEHOLDER: email provider]", "[PLACEHOLDER: hosting and storage provider]"],
    },
    {
      heading: "Your rights under the DPDP Act 2023",
      bullets: ["Access the personal data we hold about you", "Correct or update your data", "Erase your data and delete your account", "Withdraw consent", "Make a complaint"],
    },
    {
      heading: "Grievance officer",
      paragraphs: ["Name: [PLACEHOLDER]", "Email: [PLACEHOLDER]", "Address: [PLACEHOLDER]"],
    },
  ],
};

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description:
    "The terms for using CloudVault: your account, acceptable use, free trial and billing, suspension and termination, liability and governing law in India.",
  path: "/terms",
  intro: "These terms describe the rules for using CloudVault.",
  sections: [
    { heading: "The service", paragraphs: ["CloudVault is a cloud backup service that stores files you choose to upload. [PLACEHOLDER: final service description.]"] },
    { heading: "Your account", paragraphs: [`[PLACEHOLDER: account rules, age limit and security responsibilities. ${placeholderNote}]`] },
    { heading: "Acceptable use", bullets: ["No illegal content", "No malware or abuse of the service", "[PLACEHOLDER: remaining acceptable use rules]"] },
    {
      heading: "Free trial and billing",
      bullets: [
        `One free trial per account: ${FREE_TRIAL.durationDays} days and ${FREE_TRIAL.storageGB} GB`,
        "Paid plans are billed monthly or yearly in Indian rupees, inclusive of GST",
        "[PLACEHOLDER: renewal, upgrade, downgrade and cancellation terms. Must match the refund policy.]",
      ],
    },
    { heading: "Suspension and termination", paragraphs: [`[PLACEHOLDER: when we may suspend or end an account. ${placeholderNote}]`] },
    { heading: "Limitation of liability", paragraphs: [`[PLACEHOLDER: ${placeholderNote}]`] },
    { heading: "Governing law", paragraphs: ["These terms are governed by the laws of India. Courts at [PLACEHOLDER: city] have jurisdiction."] },
  ],
};

export const refundPolicy: LegalDocument = {
  title: "Refund and Cancellation Policy",
  description:
    "How cancellation and refunds work at CloudVault: the refund window, who is eligible, how to ask for a refund and how long processing takes. Prices are in INR.",
  path: "/refund-policy",
  intro: "This page explains how to cancel your plan and when you can get a refund.",
  sections: [
    {
      heading: "Cancellation",
      bullets: [
        "You can cancel anytime from your account",
        "Your access continues until the end of the period you paid for",
        "Monthly plans do not get partial refunds for unused time",
      ],
    },
    {
      heading: "Refund window and eligibility",
      paragraphs: ["A full refund is available within 7 days of your first paid purchase if your storage use is below 1 GB. [PLACEHOLDER: business to confirm this policy.]"],
    },
    { heading: "How to request a refund", paragraphs: ["[PLACEHOLDER: steps to request a refund, for example by emailing support with your account email.]"] },
    { heading: "Processing time", paragraphs: ["[PLACEHOLDER: how long a refund takes to reach the original payment method.]"] },
  ],
};

export const shippingPolicy: LegalDocument = {
  title: "Shipping and Delivery",
  description:
    "CloudVault is a digital service with no physical shipping. Learn when your plan is activated after payment and who to contact if activation fails.",
  path: "/shipping-and-delivery",
  intro: "CloudVault is a digital service. Nothing is shipped to you.",
  sections: [
    { heading: "Service delivery", paragraphs: ["Your plan is activated instantly after we confirm your payment. You can start using your storage right away."] },
    { heading: "No physical shipment", paragraphs: ["There are no physical goods, delivery charges or delivery times."] },
    { heading: "Activation problems", paragraphs: ["If your plan is not active after payment, contact us. [PLACEHOLDER: support contact and expected response time.]"] },
  ],
};
