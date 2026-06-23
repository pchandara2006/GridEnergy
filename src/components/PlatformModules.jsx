import { ArrowUpRight } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { platformModules } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

const moduleChart = [
  { name: 'Q1', value: 38 },
  { name: 'Q2', value: 52 },
  { name: 'Q3', value: 61 },
  { name: 'Q4', value: 74 },
  { name: 'Q5', value: 82 },
];

export function PlatformModules() {
  return (
    <section id="platform" className="py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Platform"
          title="A decision layer for power-sensitive infrastructure."
          body="GridReady AI turns scattered grid, power, water, climate, compliance, and financial signals into a practical site-selection workflow."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {platformModules.map((module, index) => (
            <article key={module.title} className="glass-panel overflow-hidden rounded-2xl p-6">
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyanline">Module 0{index + 1}</p>
                  <h3 className="text-2xl font-semibold">{module.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{module.body}</p>
                  <a href="#analyzer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gridgreen hover:text-white">
                    Explore module
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="min-w-36 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-right">
                  <div className="text-4xl font-semibold text-white">{module.metric}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{module.label}</div>
                </div>
              </div>
              <div className="mt-8 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moduleChart.map((point) => ({ ...point, value: point.value + index * 5 }))}>
                    <defs>
                      <linearGradient id={`moduleGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4de7ff" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#4de7ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#4de7ff" strokeWidth={2} fill={`url(#moduleGradient${index})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
