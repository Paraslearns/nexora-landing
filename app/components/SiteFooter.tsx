import Image from "next/image";

const COLUMNS = [
  { title: "Product", links: ["Platform", "Connectors", "AI Enrichment", "Pricing", "Changelog"] },
  { title: "Developers", links: ["Documentation", "API Reference", "SDKs", "Status", "Security"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Blog", "Contact"] },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <Image src="/logo.svg" alt="Nexora" width={132} height={28} />
          <p className="muted">
            The autonomous AI platform for data automation. Ingest, enrich, orchestrate — at any scale.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="site-footer__h">{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="shell site-footer__base">
        <p className="muted">© {new Date().getFullYear()} Nexora Labs, Inc. All rights reserved.</p>
        <p className="muted site-footer__legal">
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Cookies</a>
        </p>
      </div>
    </footer>
  );
}
