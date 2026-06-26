import { PARTNERS } from "./Icons";

export default function TrustBar() {
  // Duplicate the set so the marquee track can loop seamlessly.
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section className="trust" aria-label="Trusted by leading data teams">
      <div className="shell">
        <p className="trust__label muted" data-reveal>
          Powering data teams at category-defining companies
        </p>
      </div>
      <div className="marquee" data-reveal>
        <ul className="marquee__track" aria-hidden="true">
          {loop.map((p, i) => (
            <li key={`${p.name}-${i}`}>{p.node}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
