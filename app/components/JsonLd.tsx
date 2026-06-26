/* Structured data for richer SEO indexing (SoftwareApplication + Organization). */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Nexora",
        url: "https://nexora-ai.vercel.app",
        logo: "https://nexora-ai.vercel.app/logo.svg",
      },
      {
        "@type": "SoftwareApplication",
        name: "Nexora",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Next-gen AI platform that automates your entire data pipeline — ingest, enrich, and orchestrate millions of records in real time.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier available",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "238",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
