// Demo data only. Nothing here comes from a real account.
import type { IconName } from "@/components/ui/Icon";

export const mockDashboard = {
  userName: "Demo User",
  planName: "Free Trial",
  usedGB: 1.2,
  totalGB: 5,
  trialDaysLeft: 24,
  recentBackups: [
    { id: "b1", name: "Family trip 2026", kind: "Photos", items: 128, sizeLabel: "412 MB", when: "Today, 9:41 AM", icon: "image" },
    { id: "b2", name: "GST invoices", kind: "Documents", items: 34, sizeLabel: "58 MB", when: "Today, 8:05 AM", icon: "file-text" },
    { id: "b3", name: "College project", kind: "Folder", items: 212, sizeLabel: "240 MB", when: "Yesterday, 6:30 PM", icon: "folder" },
    { id: "b4", name: "Phone camera roll", kind: "Photos", items: 96, sizeLabel: "310 MB", when: "Yesterday, 2:12 PM", icon: "image" },
    { id: "b5", name: "Tax documents", kind: "Documents", items: 12, sizeLabel: "24 MB", when: "2 days ago", icon: "file-text" },
  ] satisfies { id: string; name: string; kind: string; items: number; sizeLabel: string; when: string; icon: IconName }[],
} as const;
