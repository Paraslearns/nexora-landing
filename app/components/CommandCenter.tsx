import ParticleSphere from "./ParticleSphere";
import { FeatureIcon, ArrowIcon } from "./Icons";

const PILLARS = [
  {
    icon: "flow",
    title: "Infinite visual canvas",
    desc: "Map multi-step agent behaviour on a high-precision grid — drag triggers, logic gates, and actions to craft custom paths.",
  },
  {
    icon: "bolt",
    title: "Autonomous execution",
    desc: "Run complex decision trees without manual intervention. The engine handles branching and error recovery automatically.",
  },
  {
    icon: "shield",
    title: "End-to-end encryption",
    desc: "Every node and transfer is shielded with industrial-grade security. Maintain total control over your data flow.",
  },
  {
    icon: "globe",
    title: "Production-ready stack",
    desc: "Connect core business platforms through secure, ready integrations that scale with your volume.",
  },
];

export default function CommandCenter() {
  return (
    <section id="command" className="command" aria-labelledby="command-title">
      <div className="shell">
        <div className="command__stage" data-reveal>
          <div className="command__sphere">
            <ParticleSphere />
            <span className="command__cursorlabel" aria-hidden>You</span>
          </div>

          <header className="command__copy">
            <p className="eyebrow"><span className="dot" /> Command center</p>
            <h2 id="command-title" className="section-title">
              Orchestrate agents on a <span className="grad-text">living canvas</span>
            </h2>
            <p className="muted sec-head__sub">
              Describe an outcome and watch Nexora assemble the pipeline — every
              node tuned, tested, and deployed in real time.
            </p>
          </header>

          <div className="command__prompt" role="group" aria-label="Demo prompt (illustrative)">
            <input
              type="text"
              defaultValue="Ask Nexora to build a real-time fraud pipeline…"
              aria-label="Ask Nexora anything"
              readOnly
              tabIndex={-1}
            />
            <button type="button" className="command__send" aria-label="Send prompt">
              <ArrowIcon />
            </button>
          </div>
        </div>

        <ul className="command__pillars" data-reveal role="list">
          {PILLARS.map((p) => (
            <li key={p.title} className="pillar">
              <span className="pillar__icon"><FeatureIcon name={p.icon} /></span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__desc muted">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
