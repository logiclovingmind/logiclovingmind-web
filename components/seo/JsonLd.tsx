import { CONTACT, SITE } from "@/content/site";
import { TIERS } from "@/content/tiers";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
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
          addressLocality: "HSR Layout, Bengaluru",
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
      }}
    />
  );
}

export function ProductsJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": TIERS.map((tier) => ({
          "@type": "Product",
          name: `${SITE.name} ${tier.name}`,
          description: tier.etymology,
          brand: { "@type": "Brand", name: SITE.name },
          category: "Real estate conversation automation",
          offers:
            tier.setupInr === null
              ? {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "INR",
                    description: "Custom pricing",
                  },
                }
              : {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: tier.setupInr,
                  availability: "https://schema.org/InStock",
                  description: "One-time setup",
                },
        })),
      }}
    />
  );
}
