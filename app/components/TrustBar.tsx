import { PARTNERS } from "./Icons";

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Trusted by leading data teams">
      <div className="shell">
        <p className="trust__label muted" data-reveal>
          Powering data teams at category-defining companies
        </p>
        <ul className="trust__logos" data-reveal>
          {PARTNERS.map((p) => (
            <li key={p.name}>{p.node}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
