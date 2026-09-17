export type WorkGroupId = "platforms" | "agents" | "systems" | "products" | "sites";

export type WorkGroup = {
  id: WorkGroupId;
  title: string;
  blurb: string;
};

export type WorkLink = {
  label: string;
  /** Absent for private repos — rendered as text instead of a dead link. */
  href?: string;
  external?: boolean;
};

export type WorkItem = {
  title: string;
  group: WorkGroupId;
  /** How open it is — live demo, public repo, private but running. */
  tag: string;
  summary: string;
  detail: string[];
  stack: string;
  links: WorkLink[];
};

export const WORK_STANDFIRST =
  "Everything here is running right now or readable line by line. These are not case studies written after the fact — each one was built against a real manual process we watched, then deployed so it could be used rather than described. Private systems are private only because they hold live commercial data; they are open to a screen share.";

export const WORK_GROUPS: WorkGroup[] = [
  {
    id: "platforms",
    title: "Agent platforms",
    blurb:
      "The machinery that runs the agents at scale — where onboarding a client is a database insert rather than a deployment.",
  },
  {
    id: "agents",
    title: "Agents on WhatsApp",
    blurb:
      "The agents themselves, live and answerable right now. Each one replies the way a good junior staffer would — and hands over the moment a human is needed.",
  },
  {
    id: "systems",
    title: "Operating systems",
    blurb:
      "A CRM records work. An operating system performs it. These unify pipeline, delivery and finance so an LLM agent can actually answer what needs attention today.",
  },
  {
    id: "products",
    title: "Products and tools",
    blurb:
      "Smaller things, shipped for real people — a PWA that survives no signal, a daily automation that tunes itself, and the unglamorous monitoring that keeps WhatsApp senders alive.",
  },
  {
    id: "sites",
    title: "Sites and interfaces",
    blurb:
      "The browser pushed in different directions — a bird that flies across a tourism site, a camera that dives through a 3D mind on scroll, and the site you're reading now.",
  },
];

export type SelectedItem = {
  title: string;
  groupLabel: string;
  line: string;
  action: string;
  href: string;
  external?: boolean;
};

/** The homepage tile, one per group so the breadth is visible above the fold. */
export const SELECTED_WORK: SelectedItem[] = [
  {
    title: "WhatsApp Agent Platform",
    groupLabel: "Agent platform",
    line: "Multi-tenant agents on Cloudflare Workers and Durable Objects — 283 tests against the real runtime.",
    action: "Read the code",
    href: "https://github.com/logiclovingmind/wa-agent-platform",
    external: true,
  },
  {
    title: "Real-estate sales agent",
    groupLabel: "Agent · live",
    line: "Answers an enquiry, qualifies the buyer, books the site visit — in English, Hinglish or Gujarati.",
    action: "Send it a message",
    href: "https://whatsapp-demo-agent.vercel.app",
    external: true,
  },
  {
    title: "DOMINIUS",
    groupLabel: "Internal OS",
    line: "Thirteen modules under one command centre, with two LLM agents built to different trust boundaries.",
    action: "Read the case study",
    href: "https://github.com/logiclovingmind/logiclovingmind/blob/main/dominius-case-study.md",
    external: true,
  },
  {
    title: "Pocket Split",
    groupLabel: "Product · live",
    line: "An offline-first expense splitter that keeps splitting with no bars.",
    action: "Open it",
    href: "https://pocket-split-six.vercel.app",
    external: true,
  },
  {
    title: "Daily Fresh Music",
    groupLabel: "Automation",
    line: "A 23-language daily playlist, tuned by a taste model your likes sharpen.",
    action: "See the repo",
    href: "https://github.com/logiclovingmind/music-xp",
    external: true,
  },
  {
    title: "Scroll-driven 3D site",
    groupLabel: "Interface · live",
    line: "The camera dives through a mind-scene as you scroll — until the frame rate gives out.",
    action: "Scroll it",
    href: "https://project-neon-chi-35.vercel.app",
    external: true,
  },
];

export const WORK: WorkItem[] = [
  {
    title: "WhatsApp Agent Platform",
    group: "platforms",
    tag: "Public · Live",
    summary:
      "The flagship: a multi-tenant platform that runs a WhatsApp AI agent for every client from one codebase and one webhook.",
    detail: [
      "Cloudflare Workers + Durable Objects hold per-conversation state — debouncing, duplicate suppression, a human-handoff lock and a 24-hour window alarm.",
      "Seventeen Postgres tables with row-level security on every one, defined across 45 forward-only migrations.",
      "Credentials AES-GCM encrypted at rest with versioned key rotation; a safety escalation layer detects distress and escalates instead of replying.",
      "283 tests run against the real Workers runtime, not a mock.",
    ],
    stack: "TypeScript · Cloudflare Workers · Durable Objects · Supabase Postgres · React",
    links: [
      { label: "github.com/logiclovingmind/wa-agent-platform", href: "https://github.com/logiclovingmind/wa-agent-platform", external: true },
      { label: "Live dashboard — app.logiclovingmind.com", href: "https://app.logiclovingmind.com", external: true },
    ],
  },
  {
    title: "AGENT SaaS",
    group: "platforms",
    tag: "Private",
    summary:
      "The single-to-multi-tenant step: one shared deployment where each customer pastes their own WhatsApp credentials and goes live.",
    detail: [
      "A tenant signs up through a self-serve wizard and connects Google Calendar via OAuth — no per-client droplet, no per-client .env.",
      "Meta calls one webhook and events route by phone number; CRM data is scoped by tenant_id with a 14-day trial then manual billing.",
    ],
    stack: "Node/Express · SQLite · WhatsApp Cloud API · Google Calendar OAuth",
    links: [{ label: "Private — installed per client, open to a screen share" }],
  },
  {
    title: "Real Estate Suite",
    group: "platforms",
    tag: "Private",
    summary:
      "A whole client deployment in a box: WhatsApp agent, CRM and calendar on a single droplet behind one Caddy, wired by one .env.",
    detail: [
      "Onboarding is fill the .env, paste the Apps Script, run one command — the Apps Script stays inside the client's Google account.",
      "Deploy scripts install Node, Caddy and fail2ban, generate secrets and provision HTTPS automatically.",
    ],
    stack: "Node/Express · React · SQLite · Caddy · DigitalOcean",
    links: [{ label: "Private — installed per client, open to a screen share" }],
  },
  {
    title: "Real-estate sales agent",
    group: "agents",
    tag: "Live demo",
    summary:
      "Qualifies a property enquiry in seconds, captures the lead as structured data and books the site visit into a calendar.",
    detail: [
      "Replies in English, Hinglish or Gujarati — whichever the buyer wrote in.",
      "Output is a structured lead record a sales team can sort, not a chat transcript.",
      "Books straight into Google Calendar and goes permanently silent on the thread once a human takes over.",
    ],
    stack: "Node 20 · better-sqlite3 · gpt-4o-mini (AICredits) · WhatsApp Cloud API · Google Apps Script",
    links: [
      { label: "Try it — whatsapp-demo-agent.vercel.app", href: "https://whatsapp-demo-agent.vercel.app", external: true },
      { label: "github.com/logiclovingmind/real-estate-whatsapp-agent", href: "https://github.com/logiclovingmind/real-estate-whatsapp-agent", external: true },
    ],
  },
  {
    title: "Admissions agent",
    group: "agents",
    tag: "Live demo",
    summary:
      "Carries a prospective student from enquiry to enrolled — including fee collection, paperwork and the completed admission form.",
    detail: [
      "Reads payment screenshots, collects the required documents and generates the finished admission form as a PDF.",
      "Books slots against the institute's real availability; scores leads HOT / WARM / COLD and takes Whisper voice notes.",
    ],
    stack: "Node 20 · Express · Whisper · Google Sheets logging · WhatsApp Cloud API",
    links: [
      { label: "Try it — education-ai-lemon.vercel.app", href: "https://education-ai-lemon.vercel.app", external: true },
    ],
  },
  {
    title: "Clinic front desk",
    group: "agents",
    tag: "Live demo",
    summary:
      "Takes appointment requests and answers logistics questions without ever giving medical advice.",
    detail: [
      "A refusal guardrail sits above the model: anything resembling a clinical question is escalated to staff instead of answered.",
      "The variant where the safety layer matters more than the conversation quality.",
    ],
    stack: "Node 20 · Express · WhatsApp Cloud API · escalation guardrail",
    links: [
      { label: "Try it — akhtar-lifecare-demo.vercel.app", href: "https://akhtar-lifecare-demo.vercel.app", external: true },
    ],
  },
  {
    title: "Salon booking site",
    group: "agents",
    tag: "Live demo",
    summary:
      "A booking-first site for a salon, designed and built end to end.",
    detail: [
      "Service menu, staff and availability are content, not code, so the owner changes them without us.",
    ],
    stack: "Next.js · Content-driven pages · booking flow",
    links: [
      { label: "View — reflection-beauty-salon.vercel.app", href: "https://reflection-beauty-salon.vercel.app", external: true },
    ],
  },
  {
    title: "Ten-vertical adaptation engine",
    group: "agents",
    tag: "Template",
    summary:
      "The same agent architecture reconfigured across real estate, driving school, pathology lab, salon, spa, gym, education, automobile, clinic and tourism.",
    detail: [
      "Only a business/config and a data/catalog file change per client — no source code changes, documented end to end.",
      "Education ships the live admissions agent; clinic ships the medical-advice refusal guardrail; every vertical logs its leads into the client's own Google Sheet.",
    ],
    stack: "Config-driven Node agents · WhatsApp Cloud API · Google Sheets · vercel.json deploys",
    links: [
      { label: "github.com/logiclovingmind/real-estate-whatsapp-agent-template", href: "https://github.com/logiclovingmind/real-estate-whatsapp-agent-template", external: true },
    ],
  },
  {
    title: "DOMINIUS",
    group: "systems",
    tag: "Private · Daily use",
    summary:
      "The studio's own command centre — thirteen modules from lead and pipeline to delivery and finance, with two LLM agents of deliberately different trust.",
    detail: [
      "Maya, the customer-facing WhatsApp qualifier, is given four tools and a hard-silence handoff — the consequence is a typed function I wrote, not a sentence the model produced.",
      "A finance agent reads the same codebase with far more latitude, because the only person it can mislead is the owner.",
      "85 commits in eight weeks, 11,792 lines of TypeScript; session state in Upstash Redis over REST, finances in a human-editable Google Sheet mirrored to Redis.",
    ],
    stack: "Next.js 16 · React 19 · Upstash Redis · Google Sheets / Apps Script · OpenAI-compatible",
    links: [
      { label: "Read the engineering case study", href: "https://github.com/logiclovingmind/logiclovingmind/blob/main/dominius-case-study.md", external: true },
      { label: "dominius.logiclovingmind.com", href: "https://dominius.logiclovingmind.com", external: true },
    ],
  },
  {
    title: "IZI — CRM Standard",
    group: "systems",
    tag: "Public",
    summary:
      "Brokerage operations software for 5–20 agent shops, built to the constraint that it runs on a $6 / 1GB droplet.",
    detail: [
      "SQLite in WAL mode, one Node process, no Docker — static files behind Caddy with systemd.",
      "Access control enforced at the query layer rather than the UI; WhatsApp-agent intake is the reason it exists.",
      "English and Kannada interfaces, 37 tests, a documented operator guidebook.",
    ],
    stack: "Node 22 · better-sqlite3 (WAL) · React 18 · Caddy · systemd",
    links: [
      { label: "github.com/logiclovingmind/crm-standard", href: "https://github.com/logiclovingmind/crm-standard", external: true },
    ],
  },
  {
    title: "IZI OS",
    group: "systems",
    tag: "Private",
    summary:
      "The IZI tier rebuilt to one prescriptive spec — the product principle is a CRM records work, an operating system performs it.",
    detail: [
      "A Today screen that acts rather than lists; a colour-coded conversation wall; a pipeline with provenance chips; RAG over property brochures.",
      "Aggressive AI-cost engineering: one structured LLM call per turn, rules gates, three model lanes, token logging.",
      "Deliberately no Google Calendar — offline-capable PWA with .ics files instead.",
    ],
    stack: "Node 20 ESM · better-sqlite3 · React/Vite PWA · VAPID web push",
    links: [{ label: "Private — one instance per client, open to a screen share" }],
  },
  {
    title: "EON — Private Fortress",
    group: "systems",
    tag: "Private",
    summary:
      "A Postgres operating system for brokerages that refuse to expose their lead data to the public internet.",
    detail: [
      "Invisible to the internet — VPN-only (Tailscale/WireGuard), one dedicated VPS per client, nothing but a hardened webhook receiver public.",
      "Every read, edit and export audit-logged into an INSERT-only table; TOTP two-factor with QR enrolment.",
      "Encrypted restic backups, cost-sheet PDF generation, duplicate detection and one-click agent offboarding.",
    ],
    stack: "Node/Express · PostgreSQL 16 · TOTP 2FA · Tailscale/WireGuard · restic",
    links: [{ label: "Private — VPN-only by design, open to a screen share" }],
  },
  {
    title: "Pocket Split",
    group: "products",
    tag: "Live",
    summary:
      "An offline-first expense splitter that keeps working with no signal — because the moment you split a bill is usually the moment you have no bars.",
    detail: [
      "Writes locally to IndexedDB and reconciles when the connection returns; live sync over Supabase Realtime.",
      "Installs as an app from the browser; split modes from equal to exact, percent and shares.",
    ],
    stack: "React 19 · Dexie/IndexedDB · Supabase Realtime · PWA",
    links: [
      { label: "Open — pocket-split-six.vercel.app", href: "https://pocket-split-six.vercel.app", external: true },
      { label: "github.com/logiclovingmind/pocket-split", href: "https://github.com/logiclovingmind/pocket-split", external: true },
    ],
  },
  {
    title: "Daily Fresh Music",
    group: "products",
    tag: "Public · Daily use",
    summary:
      "A Python daily automation that publishes a fresh playlist of newly released music across 23 languages, tuned by what you like.",
    detail: [
      "Scores new releases against a self-tuning per-language taste model; Liked songs sharpen it automatically.",
      "Runs free and keyless on a Mac via a launchd job — shipped and in daily use, not demoed.",
    ],
    stack: "Python · ytmusicapi · launchd",
    links: [
      { label: "github.com/logiclovingmind/music-xp", href: "https://github.com/logiclovingmind/music-xp", external: true },
    ],
  },
  {
    title: "Clear Reports",
    group: "products",
    tag: "In progress",
    summary:
      "Cloud pathology-lab reporting for Indian labs, engineered to run entirely on free tiers.",
    detail: [
      "The browser talks to Supabase directly — Row-Level Security carries the tenant boundary, so it lives in the database, not the app code.",
      "Report PDFs rendered in-browser from a print stylesheet, so storage stays near zero.",
      "Two-step pathologist signature gate on release; amendments supersede rather than rewrite released reports.",
    ],
    stack: "React 19 · Supabase (Postgres + RLS) · Cloudflare Pages",
    links: [{ label: "Private — deployment in progress, open to a screen share" }],
  },
  {
    title: "WhatsApp Sender Health",
    group: "products",
    tag: "Public",
    summary:
      "An early-warning monitor that reads the status webhooks a business already receives and scores the signals Meta uses to throttle senders.",
    detail: [
      "Tracks ecosystem throttling, read-rate decline, undeliverable-rate climbs and template-rejection streaks before the quality rating flips.",
      "A synthetic replay harness measures ~61 hours of warning lead time versus observed enforcement — predicted, not reported.",
    ],
    stack: "TypeScript · tsx · better-sqlite3 · zero runtime deps",
    links: [
      { label: "github.com/logiclovingmind/wa-sender-health", href: "https://github.com/logiclovingmind/wa-sender-health", external: true },
    ],
  },
  {
    title: "Second Brain",
    group: "products",
    tag: "Private",
    summary:
      "The studio's Obsidian vault — the PARA method, a quantified CODE workflow and a sync script that owns your notes forever.",
    detail: [
      "Everything worth keeping arrives in an inbox and is filed by project, area, resource or archive.",
      "A plain-Markdown system that generates other things — briefs, plans, this portfolio's copy — instead of siloing notes.",
    ],
    stack: "Obsidian · Markdown · shell",
    links: [{ label: "Private — personal vault, open to a screen share" }],
  },
  {
    title: "SAHAS Tourism",
    group: "sites",
    tag: "Delivered",
    summary:
      "A website for a two-founder adventure outfit, built around a three.js Indian Roller bird that flies between sections trailing glowing dust.",
    detail: [
      "The bird reveals headlines letter by letter, then perches in the gutter — with strict no-flash, no-JS and no-invented-price fallbacks from the owner.",
      "Zero stock imagery and zero invented testimonials; real trip inventory only.",
    ],
    stack: "Static HTML/CSS/JS · Three.js r161 · vendored GLB · no build step",
    links: [
      { label: "github.com/logiclovingmind/sahas-tourism-site", href: "https://github.com/logiclovingmind/sahas-tourism-site", external: true },
      { label: "sahastourism.com", href: "https://www.sahastourism.com", external: true },
    ],
  },
  {
    title: "Scroll-driven 3D site",
    group: "sites",
    tag: "Live",
    summary:
      "A single page where the camera dives through a 3D mind-scene as you scroll — built to find out how far a browser can be pushed before the frame rate gives out.",
    detail: [
      "A 720vh scroll runway with a cinematic boot, ray-marched effects and scroll-linked narrative chapters.",
      "Deterministic fallbacks: a photo path for anything that cannot run WebGL, and a design that still works as a page.",
    ],
    stack: "React 19 · React Three Fiber · drei · GSAP · WebGL",
    links: [
      { label: "Open — project-neon-chi-35.vercel.app", href: "https://project-neon-chi-35.vercel.app", external: true },
      { label: "github.com/logiclovingmind/llm-webgl-site", href: "https://github.com/logiclovingmind/llm-webgl-site", external: true },
    ],
  },
  {
    title: "This site",
    group: "sites",
    tag: "Live",
    summary:
      "The site you're reading — one monochrome surface, with a bespoke motion layer built directly rather than pulled from a library.",
    detail: [
      "A continuous background field runs edge to edge across the whole document, so scrolling reads as one surface instead of stacked bands.",
      "Privacy and terms pages are a hard requirement for Meta WhatsApp Business API approval, not an afterthought.",
    ],
    stack: "Next.js 16 · React 19 · Tailwind CSS 4 · Vercel",
    links: [
      { label: "github.com/logiclovingmind/logiclovingmind-web", href: "https://github.com/logiclovingmind/logiclovingmind-web", external: true },
    ],
  },
];