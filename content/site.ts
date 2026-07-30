export const SITE = {
  name: "Logic Loving Mind",
  url: "https://logiclovingmind.com",
  positioning:
    "Intelligent operating systems that run customer conversations for real estate companies.",
  location: "HSR Layout, Bangalore",
} as const;

export const CONTACT = {
  salesPhone: "6353980009",
  salesPhoneHref: "tel:6353980009",
  whatsappDemo:
    "https://wa.me/919978445088?text=Show%20me%20the%20live%20demo",
  whatsappDemoLabel: "wa.me/919978445088",
  generalEmail: "hey@logiclovingmind.com",
  supportEmail: "support@logiclovingmind.com",
} as const;

export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/why-real-estate-only", label: "Why real estate only" },
  { href: "/automation-forever", label: "Automation Forever" },
] as const;

/** Kept out of ROUTES so they stay out of the header nav, but still indexed —
 *  Meta will not approve a WhatsApp Cloud API application without a reachable
 *  privacy policy URL. */
export const LEGAL_ROUTES = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const FOUNDERS = [
  { name: "Yasir", scope: "Marketing, sales" },
  { name: "zEi", scope: "Technology, engineering, product" },
] as const;
