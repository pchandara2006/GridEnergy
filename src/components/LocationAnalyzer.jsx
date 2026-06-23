import { useMemo, useState } from 'react';
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

const diligenceStep = {
  Recommended: 'Advance to utility capacity confirmation and incentive review.',
  'Needs Review': 'Run focused diligence on the main constraint before land control.',
  'High Risk': 'Require executive review before committing additional diligence budget.',
};

export function LocationAnalyzer() {
  const [selectedId, setSelectedId] = useState(locations[2].id);
  const selected = useMemo(() => locations.find((location) => location.id === selectedId) ?? locations[0], [selectedId]);
  const categoryEntries = Object.entries(selected.categories);
  const weakestCategory = [...categoryEntries].sort((a, b) => a[1] - b[1])[0];

  return (
    <section id="analyzer" className="section-muted border-y border-black/[0.08] py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <SectionHeader
            eyebrow="Location risk analyzer"
            title="Evaluate grid readiness before the site shortlist hardens."
            body="Select a demo market to see readiness, risk categories, recommendation logic, and the business explanation a development team would need."
          />
          <label className="block">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-[#6b716d]">Demo location</span>
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              className="w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-ink outline-none transition focus:border-forest"
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}, {location.region}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-12 overflow-hidden border border-black/[0.08] bg-white">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <article className="border-b border-black/[0.08] bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <RecommendationBadge value={selected.recommendation} />
                  <h3 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{selected.city}</h3>
                  <p className="mt-1 text-[#6b716d]">{selected.region}</p>
                </div>
                <ScoreRing score={selected.score} label="Readiness" />
              </div>
              <p className="mt-8 text-lg leading-8 text-[#4e5752]">{selected.explanation}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border-t border-black/[0.08] pt-5">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Biggest constraint</p>
                  <p className="mt-3 font-semibold text-ink">{selected.biggestRisk}</p>
                </div>
                <div className="border-t border-black/[0.08] pt-5">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Best opportunity</p>
                  <p className="mt-3 font-semibold text-ink">{selected.bestOpportunity}</p>
                </div>
              </div>
            </article>
            <article className="bg-[#fbfaf7] p-6 sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Score breakdown</p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">Readiness by category</h3>
                </div>
                <p className="text-sm text-[#6b716d]">Best fit: {selected.bestUseCase}</p>
              </div>
              <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
                <div className="space-y-5">
                  {categoryEntries.map(([key, value]) => (
                    <RiskBar key={key} label={categoryLabels[key]} value={value} />
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="border-t border-black/[0.08] pt-5">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Lowest score</p>
                    <p className="mt-3 text-2xl font-semibold text-ink">{categoryLabels[weakestCategory[0]]}</p>
                    <p className="mt-1 text-[#5f6863]">{weakestCategory[1]} / 100</p>
                  </div>
                  <div className="border-t border-black/[0.08] pt-5">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Next diligence step</p>
                    <p className="mt-3 leading-7 text-[#4e5752]">{diligenceStep[selected.recommendation]}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
