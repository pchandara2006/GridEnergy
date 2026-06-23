import { useMemo, useState } from 'react';
import { Radar, RadarChart, PolarAngleAxis, PolarGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, BadgeCheck, Lightbulb } from 'lucide-react';
import { locations } from '../data/gridreadyData.js';
import { RecommendationBadge, RiskBar, ScoreRing, SectionHeader } from './ui.jsx';

const categoryLabels = {
  powerCost: 'Power Cost Score',
  gridAccess: 'Grid Access Score',
  timeToPower: 'Time-to-Power Score',
  waterCooling: 'Water/Cooling Risk',
  climate: 'Climate Risk',
  carbonCompliance: 'Carbon/Compliance Risk',
  financeRoi: 'Finance/ROI Risk',
};

export function LocationAnalyzer() {
  const [selectedId, setSelectedId] = useState(locations[2].id);
  const selected = useMemo(() => locations.find((location) => location.id === selectedId) ?? locations[0], [selectedId]);
  const categoryEntries = Object.entries(selected.categories);

  return (
    <section id="analyzer" className="border-y border-white/8 bg-ink/70 py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <SectionHeader
            eyebrow="Location risk analyzer"
            title="Evaluate grid readiness before the site shortlist hardens."
            body="Select a demo market to see readiness, risk categories, recommendation logic, and the business explanation a development team would need."
          />
          <label className="block">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Demo location</span>
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full rounded-lg border border-white/12 bg-graphite px-4 py-3 text-white outline-none transition focus:border-cyanline"
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}, {location.region}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-panel rounded-2xl p-6">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <RecommendationBadge value={selected.recommendation} />
                <h3 className="mt-5 text-3xl font-semibold">{selected.city}</h3>
                <p className="mt-1 text-slate-400">{selected.region}</p>
              </div>
              <ScoreRing score={selected.score} label="Grid readiness" />
            </div>
            <p className="mt-8 text-lg leading-8 text-slate-300">{selected.explanation}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-risk/25 bg-risk/8 p-5">
                <div className="mb-3 flex items-center gap-2 text-risk">
                  <AlertTriangle size={18} />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Biggest risk</span>
                </div>
                <p className="font-medium text-white">{selected.biggestRisk}</p>
              </div>
              <div className="rounded-xl border border-gridgreen/25 bg-gridgreen/8 p-5">
                <div className="mb-3 flex items-center gap-2 text-gridgreen">
                  <Lightbulb size={18} />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Best opportunity</span>
                </div>
                <p className="font-medium text-white">{selected.bestOpportunity}</p>
              </div>
            </div>
          </article>
          <article className="glass-panel rounded-2xl p-6">
            <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
              <div className="space-y-5">
                {categoryEntries.map(([key, value]) => (
                  <RiskBar key={key} label={categoryLabels[key]} value={value} />
                ))}
              </div>
              <div className="min-h-80 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={selected.riskTrend}>
                    <PolarGrid stroke="rgba(255,255,255,0.15)" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                    <Radar dataKey="value" stroke="#4de7ff" fill="#4de7ff" fillOpacity={0.22} />
                    <Tooltip contentStyle={{ background: '#090d14', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <BadgeCheck size={16} className="text-gridgreen" />
                  Best fit: {selected.bestUseCase}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
