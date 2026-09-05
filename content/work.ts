export type WorkItem = {
  title: string;
  vertical: string;
  summary: string;
  detail: string[];
  href: string;
  hrefLabel: string;
};

export const WORK_STANDFIRST =
  "Every system below is running right now and open to anyone. They are demonstrations, not case studies — each one was built against a real manual process we watched, then deployed so it could be used rather than described.";

export const WORK: WorkItem[] = [
  {
    title: "WhatsApp sales agent",
    vertical: "Real estate",
    summary:
      "Answers a property enquiry in seconds, qualifies the buyer, and books the site visit.",
    detail: [
      "Replies in English, Hinglish or Gujarati — whichever the buyer wrote in.",
      "Captures structured lead data rather than chat transcripts, so the output is a row a sales team can sort.",
      "Writes the site visit straight into Google Calendar and hands off to a human when the conversation needs one.",
    ],
    href: "https://whatsapp-demo-agent.vercel.app",
    hrefLabel: "whatsapp-demo-agent.vercel.app",
  },
  {
    title: "Admissions agent",
    vertical: "Education",
    summary:
      "Handles the enquiry-to-enrolment conversation, including fee collection and paperwork.",
    detail: [
      "Reads payment screenshots, collects the required documents, and generates the completed admission form as a PDF.",
      "Books slots against the institute's real availability.",
    ],
    href: "https://education-ai-lemon.vercel.app",
    hrefLabel: "education-ai-lemon.vercel.app",
  },
  {
    title: "Clinic front desk",
    vertical: "Healthcare",
    summary:
      "Takes appointment requests and answers logistics questions without ever giving medical advice.",
    detail: [
      "A refusal guardrail sits above the model: anything resembling a clinical question is escalated to staff instead of answered.",
      "This is the variant where the safety layer matters more than the conversation quality.",
    ],
    href: "https://akhtar-lifecare-demo.vercel.app",
    hrefLabel: "akhtar-lifecare-demo.vercel.app",
  },
  {
    title: "Salon booking site",
    vertical: "Beauty and wellness",
    summary:
      "A booking-first site for a salon, designed and built end to end.",
    detail: [
      "Service menu, staff and availability are content, not code, so the owner changes them without us.",
    ],
    href: "https://reflection-beauty-salon.vercel.app",
    hrefLabel: "reflection-beauty-salon.vercel.app",
  },
  {
    title: "Pocket Split",
    vertical: "Product",
    summary:
      "An offline-first expense splitter that keeps working with no signal.",
    detail: [
      "Writes queue locally and reconcile when the connection returns, because the moment you split a bill is usually the moment you have no bars.",
      "Installs as an app from the browser.",
    ],
    href: "https://pocket-split-six.vercel.app",
    hrefLabel: "pocket-split-six.vercel.app",
  },
  {
    title: "Scroll-driven 3D site",
    vertical: "Interface",
    summary:
      "A single page where the camera moves through a scene as you scroll.",
    detail: [
      "Built to find out how far a browser can be pushed before the frame rate gives out on mid-range hardware.",
    ],
    href: "https://project-neon-chi-35.vercel.app",
    hrefLabel: "project-neon-chi-35.vercel.app",
  },
];
