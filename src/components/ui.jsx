export function SectionHeader({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyanline">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{body}</p> : null}
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
        background: `conic-gradient(#4de7ff ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
      }}
      aria-label={`${label}: ${score} out of 100`}
    >
      <div className="grid h-[82%] w-[82%] place-items-center rounded-full bg-[#070b11] text-center shadow-inner">
        <div>
          <div className={`${textSize} font-semibold leading-none text-white`}>{score}</div>
          <div className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

export function RiskBar({ label, value }) {
  const color = value >= 75 ? 'bg-gridgreen' : value >= 60 ? 'bg-cyanline' : value >= 45 ? 'bg-warning' : 'bg-risk';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function RecommendationBadge({ value }) {
  const style =
    value === 'Recommended'
      ? 'border-gridgreen/40 bg-gridgreen/12 text-gridgreen'
      : value === 'High Risk'
        ? 'border-risk/40 bg-risk/12 text-risk'
        : 'border-warning/40 bg-warning/12 text-warning';

  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${style}`}>{value}</span>;
}
