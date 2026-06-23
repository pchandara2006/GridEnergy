export function SectionHeader({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#6b716d]">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-8 text-[#5f6863] md:text-lg">{body}</p> : null}
    </div>
  );
}

export function ScoreRing({ score, label, size = 'large' }) {
  const textSize = size === 'large' ? 'text-6xl' : 'text-4xl';

  return (
    <div className="min-w-28 text-left sm:text-right" aria-label={`${label}: ${score} out of 100`}>
      <div className={`${textSize} font-semibold leading-none tracking-tight text-ink`}>{score}</div>
      <div className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#69736d]">{label}</div>
    </div>
  );
}

export function RiskBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-[#4e5752]">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </div>
      <div className="score-line">
        <div className="h-full rounded-full bg-graphite" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function RecommendationBadge({ value }) {
  return <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b716d]">{value}</span>;
}
