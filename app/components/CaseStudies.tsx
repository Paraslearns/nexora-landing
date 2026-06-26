import { ArrowIcon } from "./Icons";

const CASES = [
  {
    id: "001",
    sector: "Healthcare",
    title: "Predictive patient-care pipeline",
    desc: "Unified 14 data sources into one real-time flow, powering predictive triage across 40M member records.",
    metric: "+38% throughput",
    hue: "linear-gradient(135deg, #ffc801, #ff9932)",
  },
  {
    id: "002",
    sector: "Fintech",
    title: "Fraud signals in milliseconds",
    desc: "Streaming enrichment scores every transaction inline, cutting false positives without adding latency.",
    metric: "12ms / event",
    hue: "linear-gradient(135deg, #19b9a6, #114c5a)",
  },
  {
    id: "003",
    sector: "Logistics",
    title: "Autonomous supply orchestration",
    desc: "Replaced six brittle ETL jobs with one self-healing DAG that reroutes around upstream outages.",
    metric: "99.99% uptime",
    hue: "linear-gradient(135deg, #ff9932, #ffc801)",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="cases" aria-labelledby="cases-title">
      <div className="shell">
        <header className="sec-head" data-reveal>
          <p className="eyebrow"><span className="dot" /> Case studies</p>
          <h2 id="cases-title" className="section-title">
            Proven <span className="grad-text">neural solutions</span>
          </h2>
          <p className="muted sec-head__sub">
            We partner with category leaders to deploy bespoke data flows that
            solve hard operational problems — and move the numbers.
          </p>
        </header>

        <ul className="cases__list" data-reveal>
          {CASES.map((c) => (
            <li key={c.id}>
              <a
                href="#"
                className="cs-row"
                data-cursor="view"
                data-cursor-label="View"
                aria-label={`${c.title} — ${c.sector} case study`}
              >
                <span className="cs-row__media" aria-hidden>
                  <span className="cs-row__thumb" style={{ backgroundImage: c.hue }} />
                </span>
                <span className="cs-row__index">//{c.id}</span>
                <span className="cs-row__body">
                  <span className="cs-row__sector muted">{c.sector}</span>
                  <span className="cs-row__title">{c.title}</span>
                  <span className="cs-row__desc muted">{c.desc}</span>
                </span>
                <span className="cs-row__metric">{c.metric}</span>
                <ArrowIcon className="cs-row__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
