/* Inline SVG UI elements (feature glyphs + partner wordmarks).
   All decorative; consumers pass aria where meaningful. */

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const common = { viewBox: "0 0 24 24", width: 24, height: 24, className, "aria-hidden": true };
  switch (name) {
    case "flow":
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="2.2" {...stroke} />
          <circle cx="5" cy="18" r="2.2" {...stroke} />
          <circle cx="19" cy="12" r="2.2" {...stroke} />
          <path d="M7.2 6.6 16.8 11M7.2 17.4 16.8 13" {...stroke} />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" {...stroke} />
          <path d="M12 8.5 13.4 11l2.5 1-2.5 1L12 15.5 10.6 13l-2.5-1 2.5-1z" {...stroke} />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6z" {...stroke} />
          <path d="m9.2 12 2 2 3.6-3.8" {...stroke} />
        </svg>
      );
    case "graph":
      return (
        <svg {...common}>
          <path d="M4 4v16h16" {...stroke} />
          <path d="m7 15 3-4 3 2.5L19 7" {...stroke} />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 3 5 13h5l-1 8 8-10h-5z" {...stroke} />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" {...stroke} />
          <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" {...stroke} />
        </svg>
      );
    default:
      return null;
  }
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} className={className} aria-hidden>
      <path d="m4.5 10.5 3.2 3.2L15.5 6" {...stroke} />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} className={className} aria-hidden>
      <path d="M4 10h11M10 5l5 5-5 5" {...stroke} />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width={20} height={20} className={className} aria-hidden>
      <path d="m6 8 4 4 4-4" {...stroke} />
    </svg>
  );
}

/* ---- Partner wordmarks for the social-proof strip ---- */
export const PARTNERS: { name: string; node: React.ReactNode }[] = [
  {
    name: "Nimbus",
    node: (
      <svg viewBox="0 0 110 28" height={20} aria-label="Nimbus" role="img">
        <path d="M6 20a7 7 0 0 1 13-3 5 5 0 0 1 6 3" {...stroke} />
        <text x="34" y="20" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">Nimbus</text>
      </svg>
    ),
  },
  {
    name: "Vantyx",
    node: (
      <svg viewBox="0 0 110 28" height={20} aria-label="Vantyx" role="img">
        <path d="M6 8l5 12 5-12" {...stroke} />
        <text x="24" y="20" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">Vantyx</text>
      </svg>
    ),
  },
  {
    name: "Orbital",
    node: (
      <svg viewBox="0 0 120 28" height={20} aria-label="Orbital" role="img">
        <circle cx="12" cy="14" r="6" {...stroke} />
        <ellipse cx="12" cy="14" rx="10" ry="4" {...stroke} />
        <text x="28" y="20" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">Orbital</text>
      </svg>
    ),
  },
  {
    name: "Quanta",
    node: (
      <svg viewBox="0 0 120 28" height={20} aria-label="Quanta" role="img">
        <rect x="6" y="8" width="12" height="12" rx="3" {...stroke} />
        <path d="M14 16l4 4" {...stroke} />
        <text x="26" y="20" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">Quanta</text>
      </svg>
    ),
  },
  {
    name: "Hexapod",
    node: (
      <svg viewBox="0 0 130 28" height={20} aria-label="Hexapod" role="img">
        <path d="M12 6l6 4v8l-6 4-6-4v-8z" {...stroke} />
        <text x="26" y="20" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">Hexapod</text>
      </svg>
    ),
  },
  {
    name: "Lumen",
    node: (
      <svg viewBox="0 0 110 28" height={20} aria-label="Lumen" role="img">
        <circle cx="12" cy="14" r="6" {...stroke} />
        <path d="M12 4v2M12 22v2M2 14h2M22 14h2" {...stroke} />
        <text x="28" y="20" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">Lumen</text>
      </svg>
    ),
  },
];
