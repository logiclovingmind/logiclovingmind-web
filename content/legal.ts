import { CONTACT, SITE } from "@/content/site";

/**
 * Privacy and terms. Meta will not approve a WhatsApp Cloud API application
 * without a reachable privacy policy URL, so this is a launch dependency and
 * not paperwork.
 *
 * Two roles run through both documents and the distinction is the whole point
 * of the product: on this website Logic Loving Mind is the data fiduciary,
 * whereas on a deployed system every account is registered to the client, so
 * the client is the fiduciary and Logic Loving Mind is only the processor.
 */
export type LegalSection = {
  heading: string;
  body: readonly string[];
  list?: readonly string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  standfirst: string;
  updated: string;
  sections: readonly LegalSection[];
};

/** Shown on both documents; bump when either one changes materially. */
const UPDATED = "31 July 2026";

export const PRIVACY: LegalDocument = {
  eyebrow: "Privacy",
  title: "What we collect, and what we never touch.",
  standfirst:
    "This policy covers this website and the systems we deploy for clients. The two are governed differently, and the difference matters.",
  updated: UPDATED,
  sections: [
    {
      heading: "Who this is",
      body: [
        `${SITE.name} is a software company in ${SITE.location}, India. We build and deploy systems that run customer conversations. For anything in this policy you can reach us at ${CONTACT.generalEmail}.`,
      ],
    },
    {
      heading: "What this website collects",
      body: [
        "This site has no forms and no accounts. Nothing you type is collected here, because there is nowhere to type it.",
        "The single button on the site opens a WhatsApp conversation with us. If you send that message, we hold your WhatsApp number and what you write for one purpose — to answer you and arrange a demo. It is not sold, rented or shared for advertising, and it is not used to build a marketing list.",
      ],
    },
    {
      heading: "What this website does not do",
      body: [
        "This site sets no cookies. It runs no analytics, no advertising pixels, no session recording and no third-party trackers. Nothing here follows you to another site.",
        "Our hosting provider keeps standard server logs, which include IP addresses, for security and abuse prevention.",
      ],
    },
    {
      heading: "Data inside a deployed system",
      body: [
        "When we deploy a system for a client, the Meta Business account, the WhatsApp Cloud API number, the AI provider accounts and the server are all registered to that client. The conversation data lives in their accounts and their database.",
        "For that data the client is the data fiduciary. We act only as a processor, on their instructions, for as long as they engage us for support. We do not use client conversation data to train models, and we do not reuse it for any other client.",
        "If you are a buyer who has messaged one of our clients on WhatsApp and want your data removed, contact that company directly — they control it. If you cannot reach them, write to us and we will pass the request on.",
      ],
    },
    {
      heading: "Who else processes data",
      body: [
        "Delivering the product means data passes through infrastructure we do not own. On a client deployment these accounts belong to the client and are paid for by them directly:",
      ],
      list: [
        "Meta Platforms — WhatsApp Cloud API message delivery",
        "AI model providers — generating replies to messages",
        "Google Workspace — where a client chooses to sync records to Sheets or Calendar",
        "The client's hosting provider — where the system runs",
        "This website's host — serving these pages",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Applications from this site are kept while the application is open and for as long as we are in contact with you about it. Ask us to delete yours and we will, unless we are required to keep it.",
        "Data inside a deployed system is retained on the client's schedule, in the client's accounts, because it is theirs.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under India's Digital Personal Data Protection Act, 2023 you can ask what personal data we hold about you, ask us to correct it, ask us to erase it and withdraw consent you have given.",
        `Write to ${CONTACT.generalEmail} and we will respond. If your data sits inside a client's deployed system, we will tell you which company controls it.`,
      ],
    },
    {
      heading: "Children",
      body: [
        "This is a business-to-business product. It is not directed at children and we do not knowingly collect data from anyone under 18.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If this policy changes materially we will change the date at the top. Continued use of the site after that means you accept the revision.",
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  eyebrow: "Terms",
  title: "What we are agreeing to.",
  standfirst:
    "These terms cover the use of this website and the engagement that follows from it. Anything signed separately with you takes precedence over anything here.",
  updated: UPDATED,
  sections: [
    {
      heading: "Using this site",
      body: [
        "The pages here describe a product and its pricing. They are an invitation to talk, not a binding offer, and nothing on this site creates a contract on its own.",
        "The words, design, code and system architecture on this site are ours. The brand marks of other companies shown here belong to their owners and appear only to describe what the system runs on.",
      ],
    },
    {
      heading: "What we sell",
      body: [
        "We deploy and support an operating system that runs customer conversations. Scope, price and timeline for any engagement are set out in a separate written proposal, and that document governs the work.",
        "We may decline any engagement without giving a reason.",
      ],
    },
    {
      heading: "Accounts and costs",
      body: [
        "We register the Meta Business account, the WhatsApp Cloud API number, the AI provider accounts and the server in your name. You own them and they stay yours if we stop working together.",
        "Because those accounts are yours, you pay those vendors directly. Meta messaging charges, AI token costs and hosting are billed to you by them, at their price. We add no markup and we do not resell them. Those prices are set by the vendors and can change without notice from us.",
      ],
    },
    {
      heading: "What you are responsible for",
      body: [
        "You are the sender of every message the system delivers under your number. That means you are responsible for:",
      ],
      list: [
        "Having a lawful basis to message the people you upload or route to the system",
        "Complying with Meta's WhatsApp Business Messaging Policy and Commerce Policy",
        "The accuracy of the catalogue, pricing and product details the system quotes",
        "Keeping account credentials secure and telling us promptly if they are exposed",
        "Answering data requests from your own customers, since that data is yours",
      ],
    },
    {
      heading: "What we do not promise",
      body: [
        "The system generates replies using AI models. It can be wrong. It is a layer in front of your team, not a substitute for one, and every commercial commitment to a customer remains yours to confirm.",
        "Unless a signed proposal says otherwise, we do not guarantee any specific volume of leads, conversions or revenue. We do not guarantee uninterrupted service, because the messaging, AI and hosting platforms it depends on are not ours.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "Neither of us is liable to the other for indirect or consequential loss, including lost profit or lost business opportunity.",
        "Our total liability for any claim is capped at the fees you have paid us in the twelve months before the claim. Nothing here limits liability that cannot be limited under Indian law.",
      ],
    },
    {
      heading: "Ending the engagement",
      body: [
        "Either of us can end an ongoing support engagement with 30 days' written notice, unless a signed proposal says otherwise. Fees already paid for a term are not refunded except where that proposal says they are.",
        "When it ends, your accounts, your data and your infrastructure stay with you. We hand over what we hold and remove our access.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have exclusive jurisdiction.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about these terms go to ${CONTACT.generalEmail}. Support requests go to ${CONTACT.supportEmail}.`,
      ],
    },
  ],
};
