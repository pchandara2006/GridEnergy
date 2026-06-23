import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Crown, ShieldAlert } from 'lucide-react';
import { locations } from '../data/gridreadyData.js';
import { RecommendationBadge, SectionHeader } from './ui.jsx';

const defaultSelected = ['dallas', 'albuquerque', 'atlanta', 'columbus'];

export function MarketComparison() {
  const [selectedIds, setSelectedIds] = useState(defaultSelected);
  const selectedLocations = useMemo(
    () => locations.filter((location) => selectedIds.includes(location.id)),
    [selectedIds],
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

  return (
    <section id="comparison" className="py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Market comparison"
          title="Compare infrastructure markets side by side."
          body="Shortlist three to five demo markets and compare grid readiness, risk profile, business fit, and recommendation status."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {locations.map((location) => {
            const active = selectedIds.includes(location.id);
            return (
              <button
                key={location.id}
                onClick={() => toggleLocation(location.id)}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  active ? 'border-cyanline bg-cyanline/12 text-white' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25'
                }`}
              >
                {location.city}
              </button>
            );
          })}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="glass-panel rounded-2xl p-6">
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gridgreen/25 bg-gridgreen/8 p-5">
                <div className="mb-3 flex items-center gap-2 text-gridgreen">
                  <Crown size={18} />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Strongest market</span>
                </div>
                <p className="text-2xl font-semibold">{strongest?.city}</p>
                <p className="mt-1 text-slate-300">{strongest?.score} readiness score</p>
              </div>
              <div className="rounded-xl border border-warning/25 bg-warning/8 p-5">
                <div className="mb-3 flex items-center gap-2 text-warning">
                  <ShieldAlert size={18} />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">Riskiest market</span>
                </div>
                <p className="text-2xl font-semibold">{riskiest?.city}</p>
                <p className="mt-1 text-slate-300">{riskiest?.biggestRisk}</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedLocations} layout="vertical" margin={{ left: 18, right: 18 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                  <YAxis dataKey="city" type="category" width={110} tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#090d14', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8 }} />
                  <Bar dataKey="score" fill="#4de7ff" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="glass-panel overflow-hidden rounded-2xl">
            <div className="border-b border-white/10 p-6">
              <h3 className="text-2xl font-semibold">Comparison table</h3>
              <p className="mt-2 text-sm text-slate-400">Demo values for MVP validation.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/[0.035] text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Market</th>
                    <th className="px-5 py-4">Score</th>
                    <th className="px-5 py-4">Best fit for</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLocations.map((location) => (
                    <tr key={location.id} className="border-t border-white/8">
                      <td className="px-5 py-4 font-medium text-white">{location.city}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span>{location.score}</span>
                          <div className="h-2 w-24 rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-cyanline to-gridgreen" style={{ width: `${location.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">{location.bestUseCase}</td>
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
