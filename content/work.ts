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
  /** A real UI screenshot, where the system has a reachable public interface. */
  image?: { src: string; alt: string };
};

export const WORK_STANDFIRST =
  "Every project on this page is running in production or available to read in full. We build each system from a manual process we have watched in a real business, then deploy it so it does real work. A few are private because they hold live customer data; for those we do a screen share.";

export const WORK_GROUPS: WorkGroup[] = [
  {
    id: "platforms",
    title: "Agent platforms",
    blurb:
      "The platforms that run the agents. A new client is added to a running system, not set up as a separate deployment.",
  },
  {
    id: "agents",
    title: "Agents on WhatsApp",
    blurb:
      "WhatsApp agents that are live today. Each one responds like a trained team member and hands the conversation to a human the moment one is needed.",
  },
  {
    id: "systems",
    title: "Operating systems",
    blurb:
      "These go beyond a CRM. Each system brings pipeline, delivery and finance together in one interface, and lets an AI assistant answer questions about the whole business.",
  },
  {
    id: "products",
    title: "Products and tools",
    blurb:
      "Standalone tools we built and use, from an expense app that works offline to a daily music automation and a monitor that keeps WhatsApp senders healthy.",
  },
  {
    id: "sites",
    title: "Sites and interfaces",
    blurb:
      "Websites and interface work, including a tourism site built around a flying bird, a scroll-driven 3D experience and this site itself.",
  },
];

export const WORK: WorkItem[] = [
  {
    title: "WhatsApp Agent Platform",
    group: "platforms",
    tag: "Public · Live",
    summary:
      "One platform that runs a WhatsApp AI agent for all its clients from a single codebase and a single webhook.",
    detail: [
      "Cloudflare Workers and Durable Objects hold the per-conversation state. They handle debouncing, duplicate suppression, a human handoff lock and a 24-hour window alarm.",
      "Seventeen Postgres tables, each protected by row-level security, defined across 45 forward-only migrations.",
      "Client credentials are encrypted with AES-GCM and rotated by version. A safety layer escalates distress signals instead of replying.",
      "283 tests run against the real Workers runtime, not a mock.",
    ],
    stack: "TypeScript · Cloudflare Workers · Durable Objects · Supabase Postgres · React",
    image: { src: "/work/wa-platform.jpg", alt: "The WhatsApp agent platform desk" },
    links: [
      { label: "github.com/logiclovingmind/wa-agent-platform", href: "https://github.com/logiclovingmind/wa-agent-platform", external: true },
      { label: "Live dashboard: app.logiclovingmind.com", href: "https://app.logiclovingmind.com", external: true },
    ],
  },
  {
    title: "AGENT SaaS",
    group: "platforms",
    tag: "Private",
    summary:
      "A shared deployment where each customer connects their own WhatsApp credentials and goes live without their own server.",
    detail: [
      "A tenant signs up through a self-serve wizard and connects Google Calendar through OAuth. There is no per-client installation.",
      "Meta sends all messages to one webhook and events are routed by phone number. CRM data is scoped by tenant, with a 14-day trial and simple billing.",
    ],
    stack: "Node/Express · SQLite · WhatsApp Cloud API · Google Calendar OAuth",
    links: [{ label: "Private. Open to a screen share." }],
  },
  {
    title: "Real Estate Suite",
    group: "platforms",
    tag: "Private",
    summary:
      "A complete client deployment in one place: WhatsApp agent, CRM and calendar on a single server, connected by one configuration file.",
    detail: [
      "To onboard a client, we fill in one configuration file, install one Apps Script and run one command. The Apps Script stays inside the client's Google account.",
      "Deploy scripts install Node, Caddy and fail2ban, generate secrets and set up HTTPS automatically.",
    ],
    stack: "Node/Express · React · SQLite · Caddy · DigitalOcean",
    links: [{ label: "Private. Open to a screen share." }],
  },
  {
    title: "Real-estate sales agent",
    group: "agents",
    tag: "Live demo",
    summary:
      "Qualifies a property enquiry in seconds, captures the lead as structured data and books the site visit into a calendar.",
    detail: [
      "Responds in English, Hinglish or Gujarati, matching the language the buyer writes in.",
      "The output is a structured lead record the sales team can sort, not a chat transcript.",
      "Books appointments into Google Calendar and stops replying once a human has taken over.",
    ],
    stack: "Node 20 · better-sqlite3 · gpt-4o-mini (AICredits) · WhatsApp Cloud API · Google Apps Script",
    links: [
      { label: "Live demo: whatsapp-demo-agent.vercel.app", href: "https://whatsapp-demo-agent.vercel.app", external: true },
      { label: "github.com/logiclovingmind/real-estate-whatsapp-agent", href: "https://github.com/logiclovingmind/real-estate-whatsapp-agent", external: true },
    ],
  },
  {
    title: "Admissions agent",
    group: "agents",
    tag: "Live demo",
    summary:
      "Takes a prospective student from enquiry to enrolment, including fee collection and paperwork.",
    detail: [
      "Reads payment screenshots, collects the required documents and generates a completed admission form as a PDF.",
      "Books time slots against the institute's real availability. It scores leads HOT, WARM or COLD and accepts voice notes via Whisper.",
    ],
    stack: "Node 20 · Express · Whisper · Google Sheets logging · WhatsApp Cloud API",
    links: [
      { label: "Live demo: education-ai-lemon.vercel.app", href: "https://education-ai-lemon.vercel.app", external: true },
    ],
  },
  {
    title: "Clinic front desk",
    group: "agents",
    tag: "Live demo",
    summary:
      "Takes appointment requests and answers logistics questions without ever giving medical advice.",
    detail: [
      "A refusal guardrail sits above the model. Anything that looks like a clinical question is escalated to staff instead of answered.",
      "This is the variant where the safety layer matters more than the conversation quality.",
    ],
    stack: "Node 20 · Express · WhatsApp Cloud API · escalation guardrail",
    image: { src: "/work/clinic-front-desk.jpg", alt: "The Akhtar Lifecare clinic front-desk site" },
    links: [
      { label: "Live demo: akhtar-lifecare-demo.vercel.app", href: "https://akhtar-lifecare-demo.vercel.app", external: true },
    ],
  },
  {
    title: "Salon booking site",
    group: "agents",
    tag: "Live demo",
    summary:
      "A booking-first website for a salon, designed and built end to end.",
    detail: [
      "The service menu, staff and availability are content rather than code, so the owner can change them without us.",
    ],
    stack: "Next.js · Content-driven pages · booking flow",
    image: { src: "/work/salon-booking.jpg", alt: "The Reflection Beauty Salon booking site" },
    links: [
      { label: "Website: reflection-beauty-salon.vercel.app", href: "https://reflection-beauty-salon.vercel.app", external: true },
    ],
  },
  {
    title: "Ten-vertical adaptation engine",
    group: "agents",
    tag: "Template",
    summary:
      "The same agent architecture adapted for real estate, driving schools, pathology labs, salons, spas, gyms, education, automobiles, clinics and tourism.",
    detail: [
      "Only a configuration file and a catalogue file change per client. No source code changes are needed.",
      "Education ships as a live admissions agent and the clinic variant includes the medical advice guardrail. Every vertical logs leads into the client's own Google Sheet.",
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
      "The studio's own command centre. Thirteen modules cover leads, pipeline, delivery and finance, and two AI agents work with different permissions on purpose.",
    detail: [
      "Maya, the customer-facing WhatsApp assistant, has four tools and a handoff that goes silent permanently. Each consequence is a typed function we wrote, not a sentence the model produced.",
      "A finance agent reads the same system with much more latitude, because the only person it can mislead is the owner.",
      "85 commits in eight weeks and 11,792 lines of TypeScript. Sessions are stored in Upstash Redis and finances in a Google Sheet, mirrored to Redis for reads.",
    ],
    stack: "Next.js 16 · React 19 · Upstash Redis · Google Sheets / Apps Script · OpenAI-compatible",
    image: { src: "/work/dominius.jpg", alt: "The DOMINIUS command centre" },
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
      "Operations software for brokerage teams of 5 to 20 agents, built to run on a low-cost server.",
    detail: [
      "SQLite in WAL mode, one Node process and no Docker. Static files are served behind Caddy with systemd.",
      "Access control is enforced in the query layer, not the interface. The WhatsApp agent feeds leads straight into it.",
      "Available in English and Kannada, with 37 tests and an operator guide.",
    ],
    stack: "Node 22 · better-sqlite3 (WAL) · React 18 · Caddy · systemd",
    image: { src: "/work/crm-standard.jpg", alt: "The IZI operating system dashboard" },
    links: [
      { label: "github.com/logiclovingmind/crm-standard", href: "https://github.com/logiclovingmind/crm-standard", external: true },
    ],
  },
  {
    title: "IZI OS",
    group: "systems",
    tag: "Private",
    summary:
      "A rebuild of the IZI tier against a single written specification.",
    detail: [
      "A Today screen that acts rather than lists, a colour-coded conversation wall, a pipeline with provenance chips and search over property brochures.",
      "The AI cost is engineered down: one structured call per turn, rules gates, three model options and token logging.",
      "It deliberately avoids Google Calendar, using an offline-capable PWA with .ics files instead.",
    ],
    stack: "Node 20 ESM · better-sqlite3 · React/Vite PWA · VAPID web push",
    links: [{ label: "Private. One instance per client; open to a screen share." }],
  },
  {
    title: "EON — Private Fortress",
    group: "systems",
    tag: "Private",
    summary:
      "A Postgres operating system for brokerages that will not expose their lead data to the public internet.",
    detail: [
      "It is invisible to the internet. It runs on a private network (Tailscale or WireGuard) on a dedicated server per client, with only a hardened webhook receiver public.",
      "Every read, edit and export is written to an append-only audit table. TOTP two-factor authentication is enforced with QR enrolment.",
      "Backups are encrypted with restic. It also generates cost-sheet PDFs and lets you switch off an agent in one step.",
    ],
    stack: "Node/Express · PostgreSQL 16 · TOTP 2FA · Tailscale/WireGuard · restic",
    links: [{ label: "Private by design. Open to a screen share." }],
  },
  {
    title: "Pocket Split",
    group: "products",
    tag: "Live",
    summary:
      "An offline-first expense splitter that keeps working with no signal.",
    detail: [
      "Writes locally to IndexedDB and reconciles when the connection returns. Live sync runs over Supabase Realtime.",
      "Installs as an app from the browser. Split modes cover equal, exact, percent and shares.",
    ],
    stack: "React 19 · Dexie/IndexedDB · Supabase Realtime · PWA",
    image: { src: "/work/pocket-split.jpg", alt: "The Pocket Split expense app" },
    links: [
      { label: "Live demo: pocket-split-six.vercel.app", href: "https://pocket-split-six.vercel.app", external: true },
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
      "Scores new releases against a taste model that retunes itself per language. Songs you like sharpen it automatically.",
      "Runs for free and without keys on a Mac through a launchd job. It is in daily use, not a demo.",
    ],
    stack: "Python · ytmusicapi · launchd",
    image: { src: "/work/music-xp.jpg", alt: "The Music XP explorer dashboard" },
    links: [
      { label: "github.com/logiclovingmind/music-xp", href: "https://github.com/logiclovingmind/music-xp", external: true },
    ],
  },
  {
    title: "Clear Reports",
    group: "products",
    tag: "In progress",
    summary:
      "Cloud reporting software for pathology labs in India, built to run on free tiers.",
    detail: [
      "The browser talks to Supabase directly. Row-level security holds the boundary between tenants, so it lives in the database rather than the app.",
      "Report PDFs are rendered in the browser from a print stylesheet, keeping storage near zero.",
      "A report is released only after a two-step pathologist signature. Amendments replace the report instead of editing it.",
    ],
    stack: "React 19 · Supabase (Postgres + RLS) · Cloudflare Pages",
    links: [{ label: "Private. Deployment in progress; open to a screen share." }],
  },
  {
    title: "WhatsApp Sender Health",
    group: "products",
    tag: "Public",
    summary:
      "A monitor that reads the status webhooks a business already receives and scores the signals Meta uses to throttle senders.",
    detail: [
      "It tracks ecosystem throttling, declining read rates, rising undeliverable rates and repeated template rejections before the quality rating changes.",
      "A synthetic replay harness measures about 61 hours of warning lead time compared with observed enforcement.",
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
      "A personal knowledge base in Obsidian, built on the PARA method.",
    detail: [
      "Everything worth keeping arrives in an inbox and is filed by project, area, resource or archive.",
      "It is plain Markdown with a sync script, so the notes stay yours and can be used to produce other things.",
    ],
    stack: "Obsidian · Markdown · shell",
    links: [{ label: "Private. Personal vault; open to a screen share." }],
  },
  {
    title: "SAHAS Tourism",
    group: "sites",
    tag: "Delivered",
    summary:
      "A website for a two-founder adventure company, built around a three.js Indian Roller bird that flies between sections.",
    detail: [
      "The bird reveals headlines letter by letter and then perches in the gutter. It has strict fallbacks: no flash, no JavaScript, and nothing depends on the animation.",
      "The site uses real trip inventory only. No stock imagery, no invented testimonials and no invented prices.",
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
      "A single page where the camera moves through a 3D mind-scene as you scroll.",
    detail: [
      "A 720vh scroll runway with a cinematic intro, ray-marched effects and scroll-linked chapters.",
      "It includes a fallback for devices that cannot run WebGL, so the content still works as a regular page.",
    ],
    stack: "React 19 · React Three Fiber · drei · GSAP · WebGL",
    image: { src: "/work/scroll-3d.jpg", alt: "The scroll-driven 3D site" },
    links: [
      { label: "Live demo: project-neon-chi-35.vercel.app", href: "https://project-neon-chi-35.vercel.app", external: true },
      { label: "github.com/logiclovingmind/llm-webgl-site", href: "https://github.com/logiclovingmind/llm-webgl-site", external: true },
    ],
  },
  {
    title: "This site",
    group: "sites",
    tag: "Live",
    summary:
      "The site you are reading. A single monochrome surface with a custom motion layer built without an animation library.",
    detail: [
      "A continuous background field runs across the whole document, so scrolling reads as one surface rather than stacked bands.",
      "The privacy and terms pages are a requirement for Meta WhatsApp Business API approval, not an afterthought.",
    ],
    stack: "Next.js 16 · React 19 · Tailwind CSS 4 · Vercel",
    image: { src: "/work/this-site.jpg", alt: "The logiclovingmind.com homepage" },
    links: [
      { label: "github.com/logiclovingmind/logiclovingmind-web", href: "https://github.com/logiclovingmind/logiclovingmind-web", external: true },
    ],
  },
];

export type SelectedItem = {
  title: string;
  groupLabel: string;
  line: string;
  action: string;
  href: string;
  external?: boolean;
  /** Real UI screenshot when one exists; otherwise a cover is rendered. */
  image?: { src: string; alt: string };
};

/** Homepage tiles, one per group so the breadth is visible above the fold. */
export const SELECTED_WORK: SelectedItem[] = [
  {
    title: "WhatsApp Agent Platform",
    groupLabel: "Agent platform",
    line: "Runs a WhatsApp AI agent for all its clients from one codebase and one webhook. 283 tests against the real runtime.",
    action: "Read the code",
    href: "https://github.com/logiclovingmind/wa-agent-platform",
    external: true,
    image: { src: "/work/wa-platform.jpg", alt: "The WhatsApp agent platform desk" },
  },
  {
    title: "IZI — CRM Standard",
    groupLabel: "Operating system",
    line: "Brokerage operations software built to run on a low-cost server, with agent intake feeding leads straight in.",
    action: "Use the repo",
    href: "https://github.com/logiclovingmind/crm-standard",
    external: true,
    image: { src: "/work/crm-standard.jpg", alt: "The IZI operating system dashboard" },
  },
  {
    title: "Clinic front desk",
    groupLabel: "Agent · live",
    line: "Takes appointments and answers logistics questions, and gives no medical advice even when asked.",
    action: "Try the demo",
    href: "https://akhtar-lifecare-demo.vercel.app",
    external: true,
    image: { src: "/work/clinic-front-desk.jpg", alt: "The Akhtar Lifecare clinic front-desk site" },
  },
  {
    title: "Salon booking site",
    groupLabel: "Agent · live",
    line: "A booking-first site where the menu, staff and availability belong to the owner, not the code.",
    action: "Visit the site",
    href: "https://reflection-beauty-salon.vercel.app",
    external: true,
    image: { src: "/work/salon-booking.jpg", alt: "The Reflection Beauty Salon booking site" },
  },
  {
    title: "Pocket Split",
    groupLabel: "Product · live",
    line: "An offline-first expense splitter that works with no signal.",
    action: "Open it",
    href: "https://pocket-split-six.vercel.app",
    external: true,
    image: { src: "/work/pocket-split.jpg", alt: "The Pocket Split expense app" },
  },
  {
    title: "Scroll-driven 3D site",
    groupLabel: "Interface · live",
    line: "The camera dives through a mind-scene as you scroll, until the frame rate gives out.",
    action: "Scroll it",
    href: "https://project-neon-chi-35.vercel.app",
    external: true,
    image: { src: "/work/scroll-3d.jpg", alt: "The scroll-driven 3D site" },
  },
  {
    title: "This site",
    groupLabel: "Site · live",
    line: "A single monochrome surface with a custom motion layer, built without an animation library.",
    action: "Read the code",
    href: "https://github.com/logiclovingmind/logiclovingmind-web",
    external: true,
    image: { src: "/work/this-site.jpg", alt: "The logiclovingmind.com homepage" },
  },
  {
    title: "DOMINIUS",
    groupLabel: "Internal OS",
    line: "The studio's command centre, with two AI agents built to different permission levels.",
    action: "Read the case study",
    href: "https://github.com/logiclovingmind/logiclovingmind/blob/main/dominius-case-study.md",
    external: true,
    image: { src: "/work/dominius.jpg", alt: "The DOMINIUS command centre" },
  },
  {
    title: "Daily Fresh Music",
    groupLabel: "Automation",
    line: "A daily playlist across 23 languages, tuned by a taste model your likes sharpen.",
    action: "See the repo",
    href: "https://github.com/logiclovingmind/music-xp",
    external: true,
    image: { src: "/work/music-xp.jpg", alt: "The Music XP explorer dashboard" },
  },
];