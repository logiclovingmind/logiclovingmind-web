import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms covering this site and a Logic Loving Mind engagement: account ownership, pass-through vendor costs and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalDoc doc={TERMS} />;
}
