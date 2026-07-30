/**
 * Automation Forever. The deposit and the six-month support figure are two
 * separate ₹50,000 amounts — claude.md §4 requires both to be stated together
 * and forbids implying the deposit is credited against support.
 */
export const AUTOMATION_FOREVER = {
  seats: 3,
  seatsLabel: "3 seats",
  contract: [
    { label: "Setup fee", value: "₹0" },
    { label: "Commitment deposit", value: "₹50,000 · refundable" },
    { label: "Pilot", value: "30 days, live" },
    { label: "Outcome 1", value: "30 qualified conversations" },
    { label: "Outcome 2", value: "10 site-visit-intent prospects" },
    { label: "If not met", value: "Deposit returned" },
    { label: "If met · support", value: "₹50,000 / six months" },
  ],
  eligibility: [
    "Minimum 100 leads a month",
    "Minimum 2 people on the sales team",
    "Active WhatsApp communication with buyers",
  ],
  included:
    "30-day live pilot · priority support · direct founder access · case study opportunity",
} as const;
