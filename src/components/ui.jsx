export function SectionHeader({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-forest">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-8 text-[#5f6863] md:text-lg">{body}</p> : null}
    </div>
  );
}

export function ScoreRing({ score, label, size = 'large' }) {
  const dimensions = size === 'large' ? 'h-44 w-44' : 'h-28 w-28';
  const textSize = size === 'large' ? 'text-5xl' : 'text-3xl';

  return (
    <div
      className={`${dimensions} grid place-items-center rounded-full`}
      style={{
        background: `conic-gradient(#1f6f4a ${score * 3.6}deg, rgba(20,24,22,0.08) 0deg)`,
      }}
      aria-label={`${label}: ${score} out of 100`}
    >
      <div className="grid h-[82%] w-[82%] place-items-center rounded-full bg-white text-center shadow-inner">
        <div>
          <div className={`${textSize} font-semibold leading-none text-ink`}>{score}</div>
          <div className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#69736d]">{label}</div>
        </div>
      </div>
    </div>
  );
}

export function RiskBar({ label, value }) {
  const color = value >= 75 ? 'bg-forest' : value >= 60 ? 'bg-steel' : value >= 45 ? 'bg-amber' : 'bg-clay';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-[#4e5752]">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </div>
      <div className="score-line">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function RecommendationBadge({ value }) {
  const style =
    value === 'Recommended'
      ? 'border-forest/25 bg-forest/10 text-forest'
      : value === 'High Risk'
        ? 'border-clay/25 bg-clay/10 text-clay'
        : 'border-amber/25 bg-amber/10 text-amber';

  return <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${style}`}>{value}</span>;
}
