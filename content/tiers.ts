export type Hue = "izi" | "eon" | "omni";

export type SpecRow = { label: string; value: string };

export type Tier = {
  slug: Hue;
  name: string;
  positioning: string;
  era: string;
  brandMessage: string;
  etymology: string;
  /** Numeric price in INR for JSON-LD offers. null = custom pricing. */
  setupInr: number | null;
  spec: SpecRow[];
};

export const TIERS: Tier[] = [
  {
    slug: "izi",
    name: "IZI",
    positioning: "Standard · Fire",
    era: "Fire · 3000 BCE",
    brandMessage: "Ignite your business.",
    etymology:
      "Sumerian for fire. It sounds like “easy” because the first deployment should be. WhatsApp Cloud API, the conversation agent, Logic Loving Mind OS on your VPS, calendar booking.",
    setupInr: 150000,
    spec: [
      { label: "Setup", value: "₹1.5 lakh" },
      { label: "Support", value: "₹1 lakh / year" },
      { label: "Users", value: "5–15" },
      { label: "Conversations", value: "100–500 / day" },
      { label: "Messages", value: "1,000–3,000 / day" },
      { label: "Language", value: "English" },
    ],
  },
  {
    slug: "eon",
    name: "EON",
    positioning: "Premium · Electricity",
    era: "Electricity · 1879",
    brandMessage: "Enter a new era, power your business.",
    etymology:
      "Named for the era electricity opened. Everything in IZI plus a branded OS, dashboard, sales pipeline, analytics, audit logs, live WhatsApp sync, human handoff, inventory across multiple RERA projects, VPN-secured deployment, daily backups, two-factor authentication.",
    setupInr: 450000,
    spec: [
      { label: "Setup", value: "₹4.5 lakh" },
      { label: "Priority support", value: "₹3.5 lakh" },
      { label: "Users", value: "30–100" },
      { label: "Conversations", value: "500–2,000 / day" },
      { label: "Messages", value: "20,000–50,000 / day" },
      { label: "Security", value: "VPN · 2FA · backups" },
    ],
  },
  {
    slug: "omni",
    name: "OMNI",
    positioning: "Enterprise · Intelligent systems",
    era: "Intelligent systems · Now",
    brandMessage: "All. Every. Universal.",
    etymology:
      "Latin for all. Everything in EON with unlimited users, unlimited scalability, enterprise security, and implementation and support built to your operation.",
    setupInr: null,
    spec: [
      { label: "Pricing", value: "Custom" },
      { label: "Users", value: "Unlimited" },
      { label: "Scalability", value: "Unlimited" },
      { label: "Security", value: "Enterprise" },
      { label: "Implementation", value: "Custom" },
      { label: "Support", value: "Custom" },
    ],
  },
];

/** The progression that gives each tier its name. design.md §5 era labels. */
export const PROGRESSION = [
  {
    hue: "izi" as Hue,
    era: "Fire · 3000 BCE",
    title: "Heat became a tool",
    body: "Work that took a day took an hour. The first time output stopped tracking effort.",
  },
  {
    hue: "eon" as Hue,
    era: "Electricity · 1879",
    title: "Power became continuous",
    body: "Machines ran through the night. Availability stopped being a human schedule.",
  },
  {
    hue: "omni" as Hue,
    era: "Intelligent systems · Now",
    title: "Judgement became repeatable",
    body: "A conversation is answered, qualified and recorded the same way every time.",
  },
];

/** Comparison rows. `true` renders a filled square, `false` an em dash. */
export type ComparisonRow = {
  label: string;
  izi: string | boolean;
  eon: string | boolean;
  omni: string | boolean;
  mono?: boolean;
};

export const COMPARISON: ComparisonRow[] = [
  { label: "Setup", izi: "₹1.5 lakh", eon: "₹4.5 lakh", omni: "Custom", mono: true },
  { label: "Support", izi: "₹1 lakh / year", eon: "₹3.5 lakh", omni: "Custom", mono: true },
  { label: "Users", izi: "5–15", eon: "30–100", omni: "Unlimited", mono: true },
  { label: "Conversations / day", izi: "100–500", eon: "500–2,000", omni: "Unlimited", mono: true },
  { label: "Messages / day", izi: "1,000–3,000", eon: "20,000–50,000", omni: "Unlimited", mono: true },
  { label: "WhatsApp Cloud API setup", izi: true, eon: true, omni: true },
  { label: "AI conversation agent", izi: true, eon: true, omni: true },
  { label: "Logic Loving Mind OS", izi: true, eon: true, omni: true },
  { label: "VPS deployment", izi: true, eon: true, omni: true },
  { label: "Google Calendar booking", izi: true, eon: true, omni: true },
  { label: "Custom branded OS", izi: false, eon: true, omni: true },
  { label: "Advanced dashboard", izi: false, eon: true, omni: true },
  { label: "Sales pipeline", izi: false, eon: true, omni: true },
  { label: "Analytics and audit logs", izi: false, eon: true, omni: true },
  { label: "Live WhatsApp synchronization", izi: false, eon: true, omni: true },
  { label: "Human handoff", izi: false, eon: true, omni: true },
  { label: "Inventory management", izi: false, eon: true, omni: true },
  { label: "Multiple RERA project support", izi: false, eon: true, omni: true },
  { label: "VPN-secured deployment · 2FA · daily backups", izi: false, eon: true, omni: true },
  { label: "Enterprise security · custom implementation", izi: false, eon: false, omni: true },
];
