import { ArrowIcon, FeatureIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__aura" aria-hidden />
      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="eyebrow" data-reveal="hero">
            <span className="dot" /> Next-gen AI data automation
          </p>

          <h1 id="hero-title" className="hero__title" data-reveal="hero" style={{ ["--reveal-delay" as string]: "40ms" }}>
            Automate your entire <span className="grad-text">data pipeline</span> with AI.
          </h1>

          <p className="hero__sub muted" data-reveal="hero" style={{ ["--reveal-delay" as string]: "90ms" }}>
            Nexora ingests, enriches, and orchestrates millions of records in real time —
            no glue code, no ops team, no 3 a.m. pages. Ship autonomous data flows in an afternoon.
          </p>

          <div className="hero__actions" data-reveal="hero" style={{ ["--reveal-delay" as string]: "140ms" }}>
            <a href="#pricing" className="btn btn--primary btn--lg">
              Start free <ArrowIcon />
            </a>
            <a href="#features" className="btn btn--ghost btn--lg">See the platform</a>
          </div>

          <dl className="hero__stats" data-reveal="hero" style={{ ["--reveal-delay" as string]: "190ms" }}>
            <div>
              <dt>4.2B+</dt>
              <dd className="muted">records / day</dd>
            </div>
            <div>
              <dt>99.99%</dt>
              <dd className="muted">pipeline uptime</dd>
            </div>
            <div>
              <dt>12ms</dt>
              <dd className="muted">median latency</dd>
            </div>
          </dl>
        </div>

        {/* Animated product visual (pure CSS/SVG, decorative) */}
        <div className="hero__visual" data-reveal="hero" style={{ ["--reveal-delay" as string]: "120ms" }} aria-hidden data-cursor="view" data-cursor-label="Explore">
          <div className="panel">
            <div className="panel__bar">
              <span /><span /><span />
              <em>nexora · live flow</em>
            </div>
            <div className="panel__grid">
              {["flow", "spark", "graph", "shield"].map((ic, i) => (
                <div className="node" key={ic} style={{ ["--i" as string]: i }}>
                  <FeatureIcon name={ic} className="node__ic" />
                  <span className="node__pulse" />
                </div>
              ))}
              <svg className="panel__wires" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden>
                <path d="M70 45 C140 45 160 90 230 90" className="wire" />
                <path d="M70 135 C140 135 160 90 230 90" className="wire wire--2" />
              </svg>
            </div>
            <div className="panel__foot">
              <span className="chip chip--ok">enriched 1.2M</span>
              <span className="chip">routing…</span>
              <span className="bar"><i style={{ width: "78%" }} /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
