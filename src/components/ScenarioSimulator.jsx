import { useMemo, useState } from 'react';
import { ArrowRight, ServerCog } from 'lucide-react';
import { locations, projectTypes } from '../data/gridreadyData.js';
import { RiskBar, ScoreRing, SectionHeader } from './ui.jsx';

function calculateProjectFit(location, project) {
  const weighted = Object.entries(project.weights).reduce(
    (acc, [key, weight]) => {
      acc.total += location.categories[key] * weight;
      acc.weight += weight;
      return acc;
    },
    { total: 0, weight: 0 },
  );

  return Math.round(weighted.total / weighted.weight);
}

function ratingFor(score) {
  if (score >= 78) return 'Strong fit';
  if (score >= 65) return 'Conditional fit';
  return 'High diligence required';
}

export function ScenarioSimulator() {
  const [projectId, setProjectId] = useState(projectTypes[0].id);
  const [locationId, setLocationId] = useState('dallas');

  const project = useMemo(() => projectTypes.find((item) => item.id === projectId) ?? projectTypes[0], [projectId]);
  const location = useMemo(() => locations.find((item) => item.id === locationId) ?? locations[0], [locationId]);
  const fitScore = calculateProjectFit(location, project);
  const weakestCategory = Object.entries(location.categories).sort((a, b) => a[1] - b[1])[0];

  return (
    <section id="simulator" className="border-y border-white/8 bg-ink/70 py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Scenario simulator"
          title="Stress-test project fit before committing diligence budget."
          body="Change the infrastructure type and market to see how readiness, risk warnings, and recommended next steps shift."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="glass-panel rounded-2xl p-6">
            <label className="block">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Project type</span>
              <select
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                className="w-full rounded-lg border border-white/12 bg-graphite px-4 py-3 text-white outline-none focus:border-cyanline"
              >
                {projectTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-6 block">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Location</span>
              <select
                value={locationId}
                onChange={(event) => setLocationId(event.target.value)}
                className="w-full rounded-lg border border-white/12 bg-graphite px-4 py-3 text-white outline-none focus:border-cyanline"
              >
                {locations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.city}, {item.region}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center gap-3 text-cyanline">
                <ServerCog size={20} />
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">Selected case</span>
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{project.name}</p>
              <p className="mt-2 text-slate-300">{location.city} market simulation</p>
            </div>
          </aside>
          <article className="glass-panel rounded-2xl p-6">
            <div className="grid gap-8 xl:grid-cols-[0.7fr_1fr]">
              <div className="flex flex-col items-start gap-6">
                <ScoreRing score={fitScore} label="Project fit" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gridgreen">Project fit rating</p>
                  <h3 className="mt-3 text-3xl font-semibold">{ratingFor(fitScore)}</h3>
                </div>
              </div>
              <div className="space-y-5">
                <RiskBar label="Estimated infrastructure readiness" value={fitScore} />
                <RiskBar label="Base market grid readiness" value={location.score} />
                <RiskBar label="Power cost fit" value={location.categories.powerCost} />
                <RiskBar label="Time-to-power fit" value={location.categories.timeToPower} />
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-risk">Biggest risk</p>
                <p className="mt-3 font-medium text-white">{location.biggestRisk}</p>
                <p className="mt-2 text-xs text-slate-400">Weakest demo category: {weakestCategory[0]}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-warning">Financial warning</p>
                <p className="mt-3 font-medium text-white">{project.warning}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanline">Suggested next step</p>
                <p className="mt-3 font-medium text-white">{project.nextStep}</p>
              </div>
            </div>
            <a href="#intelligence" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gridgreen hover:text-white">
              Review document signals
              <ArrowRight size={16} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
