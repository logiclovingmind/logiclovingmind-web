import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What Logic Loving Mind collects on this site, what stays in the client's own accounts on a deployed system, and how to have data removed.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDoc doc={PRIVACY} />;
}
