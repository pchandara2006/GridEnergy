import { BatteryCharging, Building2, ChartCandlestick, Cpu, Factory, SunMedium } from 'lucide-react';
import { useCases } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

const icons = [Cpu, Factory, BatteryCharging, SunMedium, Building2, ChartCandlestick];

export function UseCases() {
  return (
    <section id="use-cases" className="border-y border-white/8 bg-ink/70 py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Use cases"
          title="Built for teams whose economics depend on power."
          body="GridReady AI is designed for infrastructure developers, operators, utilities, and investors who need earlier conviction on power availability and risk."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = icons[index];
            return (
              <article key={useCase.title} className="glass-panel rounded-2xl p-6">
                <div className="mb-7 grid h-12 w-12 place-items-center rounded-lg border border-cyanline/20 bg-cyanline/10 text-cyanline">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl font-semibold">{useCase.title}</h3>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-risk">Problem</p>
                    <p className="mt-2 leading-7 text-slate-300">{useCase.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyanline">How GridReady AI helps</p>
                    <p className="mt-2 leading-7 text-slate-300">{useCase.help}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gridgreen">Decision improved</p>
                    <p className="mt-2 leading-7 text-slate-300">{useCase.decision}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
