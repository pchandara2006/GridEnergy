import { ArrowRight } from 'lucide-react';

const previewRows = [
  { city: 'Dallas', score: 81, constraint: 'Reliability planning', step: 'Validate backup and tariff exposure', color: 'bg-forest' },
  { city: 'Phoenix', score: 64, constraint: 'Cooling and water', step: 'Stress-test thermal load assumptions', color: 'bg-amber' },
  { city: 'Albuquerque', score: 78, constraint: 'Queue timing', step: 'Review transmission upgrade schedule', color: 'bg-steel' },
];

export function Hero() {
  return (
    <section id="top" className="section-light relative overflow-hidden pt-28">
      <div className="section-shell editorial-grid min-h-[calc(100vh-7rem)] py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="soft-badge mb-7">Demo dataset for MVP validation</p>
          <h1 className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Know where power is ready before capital is committed.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f6863] md:text-xl">
            GridReady AI helps infrastructure teams compare power availability, grid timing, water constraints, climate exposure, and project economics before selecting a site.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#analyzer" className="clean-button-primary gap-2">
              Analyze a Site
              <ArrowRight size={18} />
            </a>
            <a href="#platform" className="clean-button-secondary">
              View Platform
            </a>
          </div>
          <p className="mt-8 max-w-lg text-sm leading-6 text-[#6b716d]">
            Financial-grade site intelligence for power-heavy infrastructure, built for market comparison, project diligence, and investment risk review.
          </p>
        </div>

        <div className="product-frame p-3 sm:p-4">
          <div className="rounded-[22px] border border-black/[0.08] bg-white">
            <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Site readiness memo</p>
                <h2 className="mt-1 text-lg font-semibold text-ink">Southwest power corridor</h2>
              </div>
              <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-forest">Draft</span>
            </div>
            <div className="grid gap-0 lg:grid-cols-[1fr_0.78fr]">
              <div className="p-5 sm:p-6">
                <div className="space-y-3">
                  {previewRows.map((row) => (
                    <div key={row.city} className="rounded-2xl border border-black/[0.08] bg-[#fbfaf7] p-4">
                      <div className="grid gap-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                        <div>
                          <p className="font-semibold text-ink">{row.city}</p>
                          <p className="text-xs text-[#6b716d]">Demo market</p>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center justify-between text-xs text-[#6b716d]">
                            <span>{row.constraint}</span>
                            <span className="font-semibold text-ink">{row.score}</span>
                          </div>
                          <div className="score-line">
                            <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.score}%` }} />
                          </div>
                        </div>
                        <p className="text-sm leading-5 text-[#4e5752]">{row.step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-black/[0.08] bg-[#eef1ed] p-6 lg:border-l lg:border-t-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Constraint sketch</p>
                <svg className="mt-6 h-48 w-full" viewBox="0 0 320 210" role="img" aria-label="Minimal terrain and site node diagram">
                  <path d="M12 152 C54 122 76 133 112 103 C145 75 180 92 211 67 C246 38 279 54 308 31" fill="none" stroke="#3c6f8f" strokeWidth="2" />
                  <path d="M12 178 C70 149 105 160 151 133 C205 102 247 113 308 82" fill="none" stroke="#1f6f4a" strokeWidth="2" opacity="0.75" />
                  <circle cx="112" cy="103" r="7" fill="#1f6f4a" />
                  <circle cx="211" cy="67" r="7" fill="#3c6f8f" />
                  <circle cx="151" cy="133" r="7" fill="#a96f2d" />
                  <path d="M34 193 H286" stroke="rgba(20,24,22,0.16)" />
                </svg>
                <div className="memo-card mt-4 p-4">
                  <p className="text-sm font-semibold text-ink">Recommended next step</p>
                  <p className="mt-2 text-sm leading-6 text-[#5f6863]">Prioritize capacity confirmation and cooling assumptions before site control.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
