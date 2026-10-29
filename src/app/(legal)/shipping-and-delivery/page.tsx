import { LegalPage } from "@/components/marketing/LegalPage";
import { shippingPolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shipping & Delivery | Digital Service | CloudVault",
  description: shippingPolicy.description,
  path: shippingPolicy.path,
});

export default function ShippingPage() {
  return <LegalPage document={shippingPolicy} />;
}
