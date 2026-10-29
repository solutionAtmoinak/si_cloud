import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

// [PLACEHOLDER] confirm the data-location claim before launch (docs/06-PAGES-AND-CONTENT.md).
const items: { icon: IconName; label: string }[] = [
  { icon: "lock", label: "256-bit encryption" },
  { icon: "map-pin", label: "Data stored in India [PLACEHOLDER: confirm]" },
  { icon: "check", label: "Cancel anytime" },
];

export function TrustRow() {
  return (
    <Container>
      <ul className="glass grid gap-2 rounded-2xl p-3 sm:grid-cols-3 sm:gap-0 sm:p-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-center gap-2.5 px-3 py-2 text-center text-base font-semibold text-ink-900">
            <Icon name={item.icon} size={20} className="shrink-0 text-brand-700" />
            {item.label}
          </li>
        ))}
      </ul>
    </Container>
  );
}
