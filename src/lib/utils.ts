type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatStorage(gb: number): string {
  return gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`;
}
