import { LegalPage } from "@/components/marketing/LegalPage";
import { privacyPolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | How CloudVault Protects Your Data",
  description: privacyPolicy.description,
  path: privacyPolicy.path,
});

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
