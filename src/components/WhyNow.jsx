import { SectionHeader } from './ui.jsx';

const stats = [
  {
    title: 'Demand pressure',
    value: '+42%',
    label: 'Demo load-growth pressure index',
    body: 'AI compute, electrification, and industrial reshoring are concentrating demand in fewer grid-ready corridors.',
  },
  {
    title: 'Grid timing risk',
    value: '36 mo',
    label: 'Demo high-risk schedule exposure',
    body: 'Interconnection studies, substation upgrades, and transmission constraints can become the critical path.',
  },
  {
    title: 'Cooling and water exposure',
    value: '$18M',
    label: 'Demo cost-sensitivity case',
    body: 'Power price movement and capacity upgrade costs can materially change project returns before operations begin.',
  },
];

export function WhyNow() {
  return (
    <section id="why-now" className="section-muted border-y border-black/[0.08] py-24">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Why now"
            title="Power is now a site-selection constraint."
            body="Data centers, factories, EV charging networks, and clean-energy projects can secure land faster than they can secure reliable capacity. GridReady AI turns scattered energy, grid, water, and climate signals into a practical readiness view before teams spend millions on due diligence."
          />
          <div className="product-card px-6 py-2">
            {stats.map((stat) => (
              <div key={stat.title} className="metric-row">
                <div>
                  <p className="text-lg font-semibold text-ink">{stat.title}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.12em] text-[#6b716d]">{stat.label}</p>
                  <p className="mt-3 max-w-xl leading-7 text-[#5f6863]">{stat.body}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-semibold text-ink">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-forest">Demo value</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
