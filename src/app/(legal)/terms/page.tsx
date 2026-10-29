import { LegalPage } from "@/components/marketing/LegalPage";
import { termsOfService } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | CloudVault Cloud Backup in India",
  description: termsOfService.description,
  path: termsOfService.path,
});

export default function TermsPage() {
  return <LegalPage document={termsOfService} />;
}
