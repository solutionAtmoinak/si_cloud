import { LegalPage } from "@/components/marketing/LegalPage";
import { refundPolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund & Cancellation Policy | CloudVault Cloud Backup",
  description: refundPolicy.description,
  path: refundPolicy.path,
});

export default function RefundPolicyPage() {
  return <LegalPage document={refundPolicy} />;
}
