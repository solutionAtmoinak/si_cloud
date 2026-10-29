import { FREE_TRIAL } from "@/config/plans";
import { site } from "@/config/site";

export type FaqItem = {
  question: string;
  answer: string;
};

// OPEN: trial card policy, refund terms, GST display and data region are unconfirmed (see docs/02-PRICING.md).
export const faqs: FaqItem[] = [
  {
    question: "What is the free trial?",
    answer: `You get ${FREE_TRIAL.durationDays} days of ${FREE_TRIAL.storageGB} GB storage for free. No credit card is needed to start. Use it to see how backup works before you choose a plan.`,
  },
  {
    question: "What happens when my trial ends?",
    answer: `Your account becomes read-only for ${FREE_TRIAL.readOnlyGraceDays} days. Your files are not deleted during this time, and you can download them or pick a paid plan. We send reminder emails before and after the trial ends.`,
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel whenever you like. Your plan stays active until the end of the period you already paid for. Monthly plans do not get partial refunds for unused days.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "You can ask for a full refund within 7 days of your first paid purchase if you have used less than 1 GB of storage. [PLACEHOLDER: confirm refund policy before launch.]",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "You can pay with UPI, debit and credit cards, netbanking and popular wallets. Payments are handled securely by Razorpay. Payments are not live yet.",
  },
  {
    question: "Are prices inclusive of GST?",
    answer: "Yes. All prices shown on this site include GST, so the amount you see is the amount you pay.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your files are encrypted while they travel to us and while they are stored. Only you can access your account. Read our security page for details.",
  },
  {
    question: "Where is my data stored?",
    answer: "[PLACEHOLDER: confirm storage region.] We plan to keep your data in data centres located in India.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes. An upgrade starts right away and you pay only the difference. A downgrade starts at your next billing date. If you use more storage than the smaller plan allows, you will need to delete some files first.",
  },
  {
    question: "Can I use it on my phone?",
    answer: "Yes. CloudVault is made for phones first. You can back up and view your files from your mobile browser, and apps for Android and iOS are planned.",
  },
  {
    question: "What files can I back up?",
    answer:
      "Photos, videos, documents, PDFs, spreadsheets and most other file types. The only limit is the storage in your plan.",
  },
  {
    question: "How do I contact support?",
    answer: `Email us at ${site.contactEmail} or use the contact page. [PLACEHOLDER: confirm support hours and reply time.]`,
  },
];

// Short list shown on the home page.
export const homeFaqs: FaqItem[] = [faqs[0], faqs[5], faqs[6], faqs[8]];
