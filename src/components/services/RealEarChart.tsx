/**
 * Real-ear measurement illustration for the hearing aid fittings hero.
 *
 * Inline SVG (no image asset needed) showing the prescription target line,
 * the software first-fit, and the adjusted response — from the client's
 * approved design. Colours reference the site's theme variables.
 */
export default function RealEarChart() {
  return (
    <figure className="bg-white rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
      <figcaption className="flex flex-col gap-1">
        <span className="text-sm font-medium text-primary">
          What real-ear measurement checks
        </span>
        <span className="text-xl font-semibold leading-snug text-foreground">
          Is the sound in your ear canal what your prescription calls for?
        </span>
      </figcaption>

      <svg
        viewBox="0 0 480 240"
        role="img"
        aria-label="Illustration: a dashed prescription target line and a solid measured line. Before adjustment the measured line falls short in the high pitches; after adjustment it sits on the target."
        className="w-full h-auto block"
      >
        <rect x="0" y="0" width="480" height="240" rx="10" fill="var(--background)" />
        <g stroke="var(--border)" strokeWidth="1">
          <line x1="40" y1="40" x2="460" y2="40" />
          <line x1="40" y1="90" x2="460" y2="90" />
          <line x1="40" y1="140" x2="460" y2="140" />
          <line x1="40" y1="190" x2="460" y2="190" />
        </g>
        {/* Prescription target (dashed) */}
        <path
          d="M40 150 C 120 140, 180 110, 250 92 S 380 70, 460 78"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="2.5"
          strokeDasharray="7 6"
        />
        {/* Software first-fit (gold) */}
        <path
          d="M40 156 C 120 150, 190 136, 260 140 S 390 168, 460 178"
          fill="none"
          stroke="var(--secondary-dark)"
          strokeWidth="2.5"
        />
        {/* After adjustment (primary) */}
        <path
          d="M40 152 C 120 142, 180 112, 250 94 S 380 72, 460 80"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3.5"
        />
        <text x="40" y="222" fontSize="12" fill="var(--muted)">Low pitch</text>
        <text x="460" y="222" textAnchor="end" fontSize="12" fill="var(--muted)">High pitch</text>
        <text x="22" y="120" fontSize="12" fill="var(--muted)" transform="rotate(-90 22 120)" textAnchor="middle">Loudness</text>
      </svg>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <svg width="26" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="26" y2="3" stroke="var(--foreground)" strokeWidth="2.5" strokeDasharray="6 4" />
          </svg>
          Your prescription target
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="26" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="26" y2="3" stroke="var(--secondary-dark)" strokeWidth="2.5" />
          </svg>
          Software first-fit
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="26" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="26" y2="3" stroke="var(--primary)" strokeWidth="3.5" />
          </svg>
          After we adjust
        </span>
      </div>

      <p className="text-[13px] text-muted">
        Illustration only — every ear and every hearing loss is different.
      </p>
    </figure>
  );
}
