import { ArrowUpRight } from 'lucide-react';
import { platformModules } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

const outcomes = [
  'Faster site triage',
  'Cleaner market shortlist',
  'Earlier risk visibility',
  'Traceable diligence record',
];

export function PlatformModules() {
  return (
    <section id="platform" className="section-light py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Platform"
          title="A decision layer for power-sensitive infrastructure."
          body="GridReady AI turns scattered grid, power, water, climate, compliance, and financial signals into a practical site-selection workflow."
        />
        <div className="mt-12 divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {platformModules.map((module, index) => (
            <article key={module.title} className="grid gap-8 py-8 lg:grid-cols-[8rem_1fr_16rem] lg:items-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest">Module 0{index + 1}</p>
              <div>
                <p className="mb-3 text-sm font-semibold text-[#6b716d]">{outcomes[index]}</p>
                <h3 className="text-3xl font-semibold tracking-tight text-ink">{module.title}</h3>
                <p className="mt-4 max-w-3xl leading-7 text-[#5f6863]">{module.body}</p>
                <a href="#analyzer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-ink">
                  Explore module
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="product-card p-4">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-semibold text-ink">{module.metric}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#6b716d]">{module.label}</div>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-forest" />
                </div>
                <div className="space-y-2">
                  {[72, 58, 83].map((value) => (
                    <div key={value} className="score-line">
                      <div className="h-full rounded-full bg-steel" style={{ width: `${value}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
