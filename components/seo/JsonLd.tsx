import { CONTACT, SITE } from "@/content/site";

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          description: SITE.positioning,
          email: CONTACT.generalEmail,
          telephone: `+91${CONTACT.salesPhone}`,
          areaServed: "IN",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              telephone: `+91${CONTACT.salesPhone}`,
              email: CONTACT.generalEmail,
              areaServed: "IN",
              availableLanguage: "en",
            },
            {
              "@type": "ContactPoint",
              contactType: "technical support",
              email: CONTACT.supportEmail,
              areaServed: "IN",
              availableLanguage: "en",
            },
          ],
        }),
      }}
    />
  );
}
