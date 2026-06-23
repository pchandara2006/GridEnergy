import { Clock3, DollarSign, TrendingUp } from 'lucide-react';
import { SectionHeader } from './ui.jsx';

const stats = [
  {
    icon: TrendingUp,
    title: 'Power Demand Pressure',
    value: '+42%',
    label: 'Demo load-growth pressure index',
    body: 'AI compute, electrification, and industrial reshoring are concentrating demand in fewer grid-ready corridors.',
  },
  {
    icon: Clock3,
    title: 'Grid Delay Risk',
    value: '36 mo',
    label: 'Demo high-risk schedule exposure',
    body: 'Interconnection studies, substation upgrades, and transmission constraints can become the critical path.',
  },
  {
    icon: DollarSign,
    title: 'Infrastructure ROI Risk',
    value: '$18M',
    label: 'Demo cost-sensitivity case',
    body: 'Power price movement and capacity upgrade costs can materially change project returns before operations begin.',
  },
];

export function WhyNow() {
  return (
    <section id="why-now" className="relative border-y border-white/8 bg-ink/70 py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Why now"
          title="Power is becoming the deciding constraint."
          body="The bottleneck for AI data centers, factories, EV charging hubs, and clean-energy projects is no longer only land. It is power availability, grid timing, cost, water/cooling risk, and climate exposure."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.title} className="glass-panel rounded-2xl p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyanline/20 bg-cyanline/10 text-cyanline">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Demo value</span>
                </div>
                <div className="text-5xl font-semibold text-white">{stat.value}</div>
                <h3 className="mt-6 text-xl font-semibold">{stat.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gridgreen">{stat.label}</p>
                <p className="mt-5 leading-7 text-slate-300">{stat.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
