import { ArrowRight, BarChart3, Gauge, MapPinned, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 fine-grid opacity-70" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-electric/15 to-transparent" />
      <div className="section-shell relative grid min-h-[calc(100vh-7rem)] items-center gap-12 py-12 lg:grid-cols-[1fr_0.95fr]">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyanline">
            <Zap size={15} />
            Demo dataset for MVP validation
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Power readiness intelligence for the next generation of infrastructure.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            GridReady AI helps data centers, manufacturers, utilities, and infrastructure investors identify where power is available, where grid delays are risky, and where energy costs could destroy project ROI.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#analyzer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyanline px-5 py-3 font-semibold text-graphite transition hover:bg-white">
              Analyze a Location
              <ArrowRight size={18} />
            </a>
            <a href="#comparison" className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-cyanline/50 hover:bg-white/8">
              Compare Markets
            </a>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <div className="glass-panel relative h-full min-h-[520px] overflow-hidden rounded-2xl p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(77,231,255,0.22),transparent_18rem)]" />
            <div className="scan-band absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-cyanline/10 to-transparent" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 620" role="img" aria-label="Abstract power grid map">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path className="energy-line" d="M72 410 C180 320 238 350 330 235 S514 142 645 210" fill="none" stroke="#4de7ff" strokeWidth="3" filter="url(#glow)" />
              <path className="energy-line" d="M92 210 C205 245 255 155 360 185 S535 345 650 330" fill="none" stroke="#8ee6b5" strokeWidth="2" filter="url(#glow)" />
              <path d="M118 485 L245 372 L355 410 L490 300 L612 410" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
              {[
                [72, 410, '#4de7ff'],
                [202, 335, '#8ee6b5'],
                [330, 235, '#4de7ff'],
                [470, 160, '#35a7ff'],
                [645, 210, '#8ee6b5'],
                [360, 185, '#4de7ff'],
                [650, 330, '#35a7ff'],
              ].map(([cx, cy, fill]) => (
                <g key={`${cx}-${cy}`} className="pulse-node" style={{ transformOrigin: `${cx}px ${cy}px` }}>
                  <circle cx={cx} cy={cy} r="16" fill={fill} opacity="0.12" />
                  <circle cx={cx} cy={cy} r="5" fill={fill} filter="url(#glow)" />
                </g>
              ))}
            </svg>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span>Grid signal map</span>
                <span>Live UI mock</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/12 bg-graphite/78 p-5">
                  <div className="mb-4 flex items-center gap-3 text-cyanline">
                    <Gauge size={20} />
                    <span className="text-sm font-semibold uppercase tracking-[0.18em]">Readiness</span>
                  </div>
                  <div className="text-6xl font-semibold">81</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Dallas demo market shows strong power economics with reliability diligence required.</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/12 bg-graphite/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm text-slate-300"><MapPinned size={16} /> Capacity node</span>
                      <span className="text-gridgreen">Strong</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-graphite/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm text-slate-300"><BarChart3 size={16} /> Demand signal</span>
                      <span className="text-warning">Rising</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-graphite/70 p-4">
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-cyanline to-gridgreen" />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">Queue confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
