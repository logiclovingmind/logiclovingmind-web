export const SITE = {
  name: "Logic Loving Mind",
  url: "https://logiclovingmind.com",
  tagline: "Next Era is NOW",
  /** The word the headline lands on. Set in the bold weight, and the beat the
   *  opening sequence is timed to. */
  taglineAccent: "NOW",
  positioning:
    "Logic Loving Mind helps businesses move from manual work to intelligent systems.",
  location: "Bangalore",
} as const;

export const CONTACT = {
  salesPhone: "6353980009",
  salesPhoneHref: "tel:6353980009",
  whatsappDemo: "https://wa.me/919978445088?text=Book%20a%20demo",
  generalEmail: "hey@logiclovingmind.com",
  supportEmail: "support@logiclovingmind.com",
} as const;

/** Unlinked from the primary surface but still indexed — Meta will not approve
 *  a WhatsApp Cloud API application without a reachable privacy policy URL. */
export const LEGAL_ROUTES = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
