export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "FAQ", href: "/faq" },
];

// OPEN: /signup does not exist until Phase 2. Until then "Start free trial" opens the demo dashboard.
export const trialHref = "/dashboard";

export const headerCta: NavLink = { label: "Start free trial", href: trialHref };

export const footerNav: { heading: string; links: NavLink[] }[] = [
  { heading: "Product", links: primaryNav },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Shipping and Delivery", href: "/shipping-and-delivery" },
    ],
  },
];
