import { ArrowIcon } from "./Icons";

export default function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="shell">
        <div className="cta__card" data-reveal>
          <div className="cta__aura" aria-hidden />
          <h2 id="cta-title" className="cta__title">
            Ship your first <span className="grad-text">autonomous flow</span> today
          </h2>
          <p className="muted cta__sub">
            Start free in minutes. Scale to billions of records when you&apos;re ready —
            no migration, no rewrite.
          </p>
          <div className="cta__actions">
            <a href="#pricing" className="btn btn--primary btn--lg">
              Start free <ArrowIcon />
            </a>
            <a href="#features" className="btn btn--ghost btn--lg">Book a demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
