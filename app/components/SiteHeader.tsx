import Image from "next/image";
import { ArrowIcon } from "./Icons";

const NAV = [
  { href: "#features", label: "Platform" },
  { href: "#pricing", label: "Pricing" },
  { href: "#proof", label: "Customers" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a href="#main" className="brand" aria-label="Nexora home">
          <Image src="/logo.svg" alt="Nexora" width={132} height={28} priority />
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__cta">
          <a href="#pricing" className="btn btn--ghost">Sign in</a>
          <a href="#pricing" className="btn btn--primary">
            Start free <ArrowIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
