import ProofStats from "./ProofStats";

const QUOTES = [
  {
    quote:
      "Nexora replaced four brittle ETL jobs with one canvas. Our data team ships in hours, not sprints — and on-call pages dropped to near zero.",
    name: "Priya Nair",
    role: "VP Data, Vantyx",
    initials: "PN",
  },
  {
    quote:
      "The AI enrichment is the real unlock. Entity-resolution that used to need a model team now runs inline with confidence scores we can trust.",
    name: "Marcus Feldt",
    role: "Head of ML, Orbital",
    initials: "MF",
  },
  {
    quote:
      "We deployed the exact same flows into our VPC for compliance with zero rewrites. Governance went from a quarter-long project to a dashboard.",
    name: "Aisha Khan",
    role: "Director of Eng, Lumen",
    initials: "AK",
  },
];

export default function Testimonials() {
  return (
    <section id="proof" className="proof" aria-labelledby="proof-title">
      <div className="shell">
        <header className="sec-head" data-reveal>
          <p className="eyebrow"><span className="dot" /> Social proof</p>
          <h2 id="proof-title" className="section-title">
            Trusted where <span className="grad-text">data can&apos;t break</span>
          </h2>
        </header>

        <ProofStats />

        <div className="proof__grid">
          {QUOTES.map((q, i) => (
            <figure
              className="quote"
              key={q.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <blockquote>
                <p>&ldquo;{q.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="quote__by">
                <span className="quote__avatar" aria-hidden>{q.initials}</span>
                <span>
                  <strong>{q.name}</strong>
                  <span className="muted">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
