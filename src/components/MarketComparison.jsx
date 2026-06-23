import { useEffect, useMemo, useState } from 'react';
import { demoDataNotice, locations } from '../data/gridreadyData.js';
import { applyEiaPowerCostToLocation, loadEiaRetailPriceCache } from '../services/external/eiaAdapter.js';
import { applyFemaClimateRiskToLocation, loadFemaRiskCache } from '../services/external/femaRiskAdapter.js';
import { RecommendationBadge, SectionHeader } from './ui.jsx';

const defaultSelected = ['dallas', 'albuquerque', 'atlanta', 'columbus'];

export function MarketComparison() {
  const [selectedIds, setSelectedIds] = useState(defaultSelected);
  const [eiaCache, setEiaCache] = useState({ records: [], sourceType: 'none' });
  const [femaCache, setFemaCache] = useState({ records: [], sourceType: 'none' });
  const selectedLocations = useMemo(
    () =>
      locations
        .filter((location) => selectedIds.includes(location.id))
        .map((location) => applyFemaClimateRiskToLocation(applyEiaPowerCostToLocation(location, eiaCache), femaCache))
        .sort((a, b) => b.score - a.score),
    [eiaCache, femaCache, selectedIds],
  );
  const strongest = [...selectedLocations].sort((a, b) => b.score - a.score)[0];
  const riskiest = [...selectedLocations].sort((a, b) => a.score - b.score)[0];

  const toggleLocation = (id) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.length > 3 ? current.filter((item) => item !== id) : current;
      }
      return current.length < 5 ? [...current, id] : current;
    });
  };

  useEffect(() => {
    let isMounted = true;
    loadEiaRetailPriceCache().then((cache) => {
      if (isMounted) setEiaCache(cache);
    });
    loadFemaRiskCache().then((cache) => {
      if (isMounted) setFemaCache(cache);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="comparison" className="section-light py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Market comparison"
          title="Compare infrastructure markets side by side."
          body="Shortlist three to five demo markets and review readiness, best fit, main constraint, and decision notes in an investment memo format."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {locations.map((location) => {
            const active = selectedIds.includes(location.id);
            return (
              <button
                key={location.id}
                onClick={() => toggleLocation(location.id)}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  active ? 'border-black/30 bg-white text-ink' : 'border-black/[0.1] bg-white/60 text-[#4e5752] hover:border-black/25'
                }`}
              >
                {location.city}
              </button>
            );
          })}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="border border-black/[0.08] bg-white p-6">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Strongest market</p>
                <p className="mt-3 text-3xl font-semibold text-ink">{strongest?.city}</p>
                <p className="mt-1 text-[#5f6863]">{strongest?.score} readiness score</p>
              </div>
              <div className="border-t border-black/[0.08] pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Highest diligence need</p>
                <p className="mt-3 text-3xl font-semibold text-ink">{riskiest?.city}</p>
                <p className="mt-1 leading-7 text-[#5f6863]">{riskiest?.biggestRisk}</p>
              </div>
            </div>
          </article>
          <article className="overflow-hidden border border-black/[0.08] bg-white">
            <div className="border-b border-black/[0.08] p-6">
              <h3 className="text-2xl font-semibold text-ink">Investment committee view</h3>
              <p className="mt-2 text-sm text-[#6b716d]">{demoDataNotice}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#eef1ed] text-xs uppercase tracking-[0.14em] text-[#6b716d]">
                  <tr>
                    <th className="px-5 py-4">Rank</th>
                    <th className="px-5 py-4">Market</th>
                    <th className="px-5 py-4">Score</th>
                    <th className="px-5 py-4">Best fit</th>
                    <th className="px-5 py-4">Main constraint</th>
                    <th className="px-5 py-4">Decision note</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLocations.map((location, index) => (
                    <tr key={location.id} className="border-t border-black/[0.08]">
                      <td className="px-5 py-4 font-semibold text-[#6b716d]">{index + 1}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-ink">{location.city}</p>
                        <p className="text-xs text-[#6b716d]">{location.region}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-ink">{location.score}</span>
                          <div className="score-line w-24">
                            <div className="h-full rounded-full bg-graphite" style={{ width: `${location.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#4e5752]">{location.bestUseCase}</td>
                      <td className="px-5 py-4 text-[#4e5752]">{location.biggestRisk}</td>
                      <td className="px-5 py-4">
                        <RecommendationBadge value={location.recommendation} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
