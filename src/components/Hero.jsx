import { demoDataNotice } from '../data/gridreadyData.js';

const previewRows = [
  { city: 'Dallas', score: 81, constraint: 'Reliability planning', step: 'Validate backup and tariff exposure' },
  { city: 'Phoenix', score: 64, constraint: 'Cooling and water', step: 'Stress-test thermal load assumptions' },
  { city: 'Albuquerque', score: 78, constraint: 'Queue timing', step: 'Review transmission upgrade schedule' },
];

export function Hero() {
  return (
    <section id="top" className="section-light relative overflow-hidden pt-28">
      <div className="section-shell editorial-grid min-h-[calc(100vh-7rem)] py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-7 text-xs font-bold uppercase tracking-[0.22em] text-[#6b716d]">{demoDataNotice}</p>
          <h1 className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Know where power is ready before capital is committed.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f6863] md:text-xl">
            GridReady AI helps infrastructure teams compare power availability, grid timing, water constraints, climate exposure, and project economics before selecting a site.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#analyzer" className="clean-button-primary">
              Analyze a Site
            </a>
            <a href="#platform" className="clean-button-secondary">
              View Platform
            </a>
          </div>
          <p className="mt-8 max-w-lg text-sm leading-6 text-[#6b716d]">
            Financial-grade site intelligence for power-heavy infrastructure, built for market comparison, project diligence, and investment risk review.
          </p>
        </div>

        <div className="border border-black/[0.08] bg-white">
          <div>
            <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Site readiness memo</p>
                <h2 className="mt-1 text-lg font-semibold text-ink">Southwest power corridor</h2>
              </div>
              <span className="text-sm font-semibold text-[#6b716d]">MVP preview</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="divide-y divide-black/[0.08]">
                {previewRows.map((row) => (
                  <div key={row.city} className="grid gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
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
                        <div className="h-full rounded-full bg-graphite" style={{ width: `${row.score}%` }} />
                      </div>
                    </div>
                    <p className="text-sm leading-5 text-[#4e5752]">{row.step}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-black/[0.08] pt-5 text-sm leading-6 text-[#5f6863]">
                Prioritize capacity confirmation and cooling assumptions before site control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
