import type { IconName } from "@/components/ui/Icon";

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
  // Shown as a small tag, e.g. "Plus and Pro".
  availability?: string;
};

export const homeFeatures: Feature[] = [
  {
    icon: "cloud-upload",
    title: "Automatic backup",
    description: "Pick your folders once. We back them up in the background so you never have to remember.",
  },
  {
    icon: "lock",
    title: "Encrypted storage",
    description: "Your files are encrypted on their way to us and while they are stored.",
  },
  {
    icon: "history",
    title: "Version history",
    description: "Changed a file by mistake? Go back to an earlier version.",
    availability: "Plus and Pro",
  },
  {
    icon: "smartphone",
    title: "Any device, anywhere",
    description: "Open your files from your phone, tablet or computer.",
  },
  {
    icon: "users",
    title: "Shared folders",
    description: "Share a folder with family or your team and keep everything in one place.",
    availability: "Pro",
  },
  {
    icon: "headphones",
    title: "Help when you need it",
    description: "Real people reply to your emails in plain English.",
  },
];

export const featureDetails: Feature[] = [
  {
    icon: "cloud-upload",
    title: "Automatic backup",
    description:
      "Choose the folders you care about and we back them up in the background. New photos and documents are added without any extra taps.",
  },
  {
    icon: "lock",
    title: "Encryption",
    description:
      "Files are encrypted in transit and at rest. Only your signed-in account can open them.",
  },
  {
    icon: "history",
    title: "Version history",
    description:
      "We keep earlier versions of your files, so you can undo a bad edit or a deleted paragraph. Plus keeps 30 days and Pro keeps 90 days.",
    availability: "Plus and Pro",
  },
  {
    icon: "restore",
    title: "Restore anything",
    description:
      "Lost a phone or replaced a laptop? Sign in and download your files again, one by one or a whole folder at a time.",
  },
  {
    icon: "smartphone",
    title: "Device support",
    description:
      "Use CloudVault from any modern browser on your phone or computer. Android and iOS apps are planned for later.",
  },
  {
    icon: "users",
    title: "Shared folders",
    description:
      "Share a folder with family members or colleagues so everyone sees the same files. No more sending large attachments.",
    availability: "Pro",
  },
];

export type UseCase = {
  icon: IconName;
  title: string;
  description: string;
};

export const useCases: UseCase[] = [
  {
    icon: "graduation-cap",
    title: "Students",
    description: "Keep projects, notes and media safe on a budget, with a free month to try.",
  },
  {
    icon: "house",
    title: "Families",
    description: "One safe place for birthdays, trips and every photo in between.",
  },
  {
    icon: "briefcase",
    title: "Small businesses",
    description: "Protect invoices, accounts and shared documents with simple rupee pricing.",
  },
  {
    icon: "camera",
    title: "Photographers",
    description: "Store large shoots with room to grow, and keep older versions of edits.",
  },
];

export const howItWorks: { title: string; description: string }[] = [
  { title: "Open the app", description: "Sign up for your free month and open CloudVault on your phone or computer." },
  { title: "Choose folders", description: "Pick the photos, documents or folders you want to protect." },
  { title: "We back up automatically", description: "Your files are copied in the background. Restore them whenever you need." },
];
