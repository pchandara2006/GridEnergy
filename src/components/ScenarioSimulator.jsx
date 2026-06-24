import { useEffect, useMemo, useState } from 'react';
import { locations, projectTypes } from '../data/gridreadyData.js';
import { RiskBar, ScoreRing, SectionHeader } from './ui.jsx';
import { calculateProjectFit, getProjectFitRating, getWeakestCategory } from '../lib/scoring.js';
import { applyDroughtWaterCoolingToLocation, loadDroughtRiskCache } from '../services/external/droughtMonitorAdapter.js';
import { applyEiaPowerCostToLocation, loadEiaRetailPriceCache } from '../services/external/eiaAdapter.js';
import { applyFemaClimateRiskToLocation, loadFemaRiskCache } from '../services/external/femaRiskAdapter.js';

const categoryLabels = {
  powerCost: 'Power cost',
  gridAccess: 'Grid access',
  timeToPower: 'Time-to-power',
  waterCooling: 'Water/cooling',
  climate: 'Climate exposure',
  carbonCompliance: 'Carbon/compliance',
  financeRoi: 'Finance/ROI',
};

export function ScenarioSimulator() {
  const [projectId, setProjectId] = useState(projectTypes[0].id);
  const [locationId, setLocationId] = useState('dallas');
  const [eiaCache, setEiaCache] = useState({ records: [], sourceType: 'none' });
  const [femaCache, setFemaCache] = useState({ records: [], sourceType: 'none' });
  const [droughtCache, setDroughtCache] = useState({ records: [], sourceType: 'none' });

  const project = useMemo(() => projectTypes.find((item) => item.id === projectId) ?? projectTypes[0], [projectId]);
  const location = useMemo(() => {
    const selectedLocation = locations.find((item) => item.id === locationId) ?? locations[0];
    return applyDroughtWaterCoolingToLocation(
      applyFemaClimateRiskToLocation(applyEiaPowerCostToLocation(selectedLocation, eiaCache), femaCache),
      droughtCache,
    );
  }, [droughtCache, eiaCache, femaCache, locationId]);
  const fitScore = calculateProjectFit(location, project);
  const weakestCategory = getWeakestCategory(location.categories);

  useEffect(() => {
    let isMounted = true;
    loadEiaRetailPriceCache().then((cache) => {
      if (isMounted) setEiaCache(cache);
    });
    loadFemaRiskCache().then((cache) => {
      if (isMounted) setFemaCache(cache);
    });
    loadDroughtRiskCache().then((cache) => {
      if (isMounted) setDroughtCache(cache);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="simulator" className="section-muted border-y border-black/[0.08] py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Scenario simulator"
          title="Stress-test project fit before committing diligence budget."
          body="Use a guided workflow to see how project type and market selection change readiness, exposure, and the next diligence step."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="border border-black/[0.08] bg-white p-6">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Step 1</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">Project type</h3>
            </div>
            <label className="block">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.14em] text-[#6b716d]">Project type</span>
              <select
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                className="w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-ink outline-none focus:border-forest"
              >
                {projectTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="mb-6 mt-8 border-t border-black/[0.08] pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Step 2</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">Market</h3>
            </div>
            <label className="block">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.14em] text-[#6b716d]">Location</span>
              <select
                value={locationId}
                onChange={(event) => setLocationId(event.target.value)}
                className="w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-ink outline-none focus:border-forest"
              >
                {locations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.city}, {item.region}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-8 border-t border-black/[0.08] pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Selected case</p>
              <p className="mt-3 text-lg font-semibold text-ink">{project.name}</p>
              <p className="mt-1 text-[#5f6863]">{location.city} market simulation</p>
              <p className="mt-3 text-xs leading-5 text-[#6b716d]">Power cost score uses demo data unless EIA cache is generated.</p>
              <p className="mt-1 text-xs leading-5 text-[#6b716d]">{location.powerCostSource}</p>
              <p className="mt-3 text-xs leading-5 text-[#6b716d]">Climate risk uses demo data unless FEMA cache is generated.</p>
              <p className="mt-1 text-xs leading-5 text-[#6b716d]">{location.climateRiskSource}</p>
              <p className="mt-3 text-xs leading-5 text-[#6b716d]">Water/cooling risk uses demo data unless Drought Monitor cache is generated.</p>
              <p className="mt-1 text-xs leading-5 text-[#6b716d]">{location.waterCoolingSource}</p>
            </div>
          </aside>
          <article className="border border-black/[0.08] bg-white p-6 sm:p-8">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">Step 3</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Decision memo</h3>
            </div>
            <div className="grid gap-8 xl:grid-cols-[0.68fr_1fr]">
              <div className="flex flex-col items-start gap-6">
                <ScoreRing score={fitScore} label="Project fit" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Project fit rating</p>
                  <h4 className="mt-3 text-3xl font-semibold text-ink">{getProjectFitRating(fitScore)}</h4>
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
              <div className="border-t border-black/[0.08] pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Main constraint</p>
                <p className="mt-3 font-semibold text-ink">{location.biggestRisk}</p>
                <p className="mt-2 text-xs text-[#6b716d]">Weakest demo category: {categoryLabels[weakestCategory[0]]}</p>
              </div>
              <div className="border-t border-black/[0.08] pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Financial exposure</p>
                <p className="mt-3 font-semibold text-ink">{project.warning}</p>
              </div>
              <div className="border-t border-black/[0.08] pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6b716d]">Suggested next diligence step</p>
                <p className="mt-3 font-semibold text-ink">{project.nextStep}</p>
              </div>
            </div>
            <a href="#intelligence" className="mt-8 inline-flex text-sm font-bold text-[#4e5752] hover:text-ink">
              Review document signals
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
