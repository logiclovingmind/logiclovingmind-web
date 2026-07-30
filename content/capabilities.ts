export type Definition = { term: string; desc: string };

export const CAPABILITIES: Definition[] = [
  { term: "Response", desc: "Replies instantly, 24/7 — including at 2 a.m." },
  { term: "Conversation", desc: "Natural, human-like exchanges in English." },
  { term: "Qualification", desc: "Qualifies buyers on budget, possession timeline and intent." },
  { term: "Collection", desc: "Collects the customer information your team asks for." },
  { term: "Record", desc: "Stores structured lead data, not chat transcripts." },
  { term: "Booking", desc: "Books site visits into Google Calendar automatically." },
  { term: "Sync", desc: "Synchronizes conversations so the team sees one thread." },
  { term: "Handoff", desc: "Hands humans warm, qualified, structured leads." },
];

export const SPECIALIZATION: Definition[] = [
  {
    term: "Qualification",
    desc: "It asks for budget band, possession timeline, configuration and location preference, in the order a good salesperson would, and it stops when it has enough.",
  },
  {
    term: "Inventory",
    desc: "It answers on real units — tower, floor, facing, carpet area — instead of sending a brochure and hoping.",
  },
  {
    term: "RERA projects",
    desc: "Multiple projects, each with its own inventory, pricing and approvals, held separately so a buyer never gets the wrong project's numbers.",
  },
  {
    term: "Site visits",
    desc: "The close of a property conversation is a visit, not a form fill. The system proposes slots, confirms, and puts it on the calendar.",
  },
  {
    term: "Buyer behaviour",
    desc: "Property buyers go quiet for days, return at midnight, and ask the same three questions. The system is built for that rhythm.",
  },
  {
    term: "Handoff",
    desc: "Your team opens a lead that already has a budget, a timeline and a booked visit. Nobody starts from “hi.”",
  },
];

export const OWNERSHIP = [
  { label: "Meta Business", value: "Yours" },
  { label: "WhatsApp API", value: "Yours" },
  { label: "AI accounts", value: "Yours" },
  { label: "VPS", value: "Yours" },
  { label: "Markup", value: "None" },
];
