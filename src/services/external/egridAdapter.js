import { calculateCarbonComplianceScore, explainCarbonComplianceScore } from '../../lib/scoring.js';
import { mapStateToEiaStateId } from './eiaAdapter.js';

export const EGRID_CARBON_CACHE_PATH = '/data/egrid-carbon.json';
export const EGRID_CARBON_SAMPLE_PATH = '/data/egrid-carbon.sample.json';

function normalizeNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

function getCacheRecords(cache) {
  if (Array.isArray(cache)) return cache;
  if (Array.isArray(cache?.records)) return cache.records;
  return [];
}

export function normalizeEgridRecord(record) {
  const stateId = mapStateToEiaStateId(record.stateId ?? record.state ?? record.stateAbbreviation);
  const co2RateLbPerMwh = normalizeNumber(record.co2RateLbPerMwh ?? record.co2Rate ?? record.co2_rate_lb_per_mwh);
  const renewableSharePercent = normalizeNumber(
    record.renewableSharePercent ?? record.renewableShare ?? record.renewable_share_percent,
  );
  const fossilSharePercent = normalizeNumber(record.fossilSharePercent ?? record.fossilShare ?? record.fossil_share_percent);
  const nuclearSharePercent = normalizeNumber(record.nuclearSharePercent ?? record.nuclearShare ?? record.nuclear_share_percent);

  if (!stateId || co2RateLbPerMwh === null || renewableSharePercent === null || fossilSharePercent === null) return null;

  return {
    stateId,
    stateName: record.stateName ?? stateId,
    egridSubregion: record.egridSubregion ?? record.subregion ?? null,
    co2RateLbPerMwh,
    renewableSharePercent,
    fossilSharePercent,
    nuclearSharePercent,
    reportingYear: record.reportingYear ?? record.year ?? null,
    source: record.source ?? 'EPA eGRID',
    isSample: Boolean(record.isSample),
  };
}

export async function loadEgridCarbonCache(fetcher = fetch) {
  const sources = [
    { path: EGRID_CARBON_CACHE_PATH, sourceType: 'cache' },
    { path: EGRID_CARBON_SAMPLE_PATH, sourceType: 'sample' },
  ];

  for (const source of sources) {
    try {
      const response = await fetcher(source.path, { cache: 'no-store' });
      if (!response.ok) continue;
      const data = await response.json();
      const records = getCacheRecords(data).map(normalizeEgridRecord).filter(Boolean);
      if (records.length > 0) {
        return { ...data, records, sourceType: source.sourceType };
      }
    } catch {
      // Missing or malformed eGRID cache should never break the MVP UI.
    }
  }

  return { records: [], sourceType: 'none' };
}

export function getCarbonDataFromCache(cache, stateId) {
  const normalizedStateId = mapStateToEiaStateId(stateId);
  if (!normalizedStateId) return null;

  return getCacheRecords(cache)
    .map(normalizeEgridRecord)
    .filter(Boolean)
    .find((record) => record.stateId === normalizedStateId) ?? null;
}

export function getCarbonComplianceScoreForLocation(location, cache) {
  const stateId = location.stateId ?? mapStateToEiaStateId(location.region);
  const carbonRecord = getCarbonDataFromCache(cache, stateId);

  if (!carbonRecord) {
    return {
      score: location.categories.carbonCompliance,
      sourceLabel: 'Carbon/compliance: demo estimate',
      carbonRecord: null,
      explanation: explainCarbonComplianceScore(null),
    };
  }

  return {
    score: calculateCarbonComplianceScore(carbonRecord),
    sourceLabel: 'Carbon/compliance: EPA eGRID sample/cache',
    carbonRecord,
    explanation: explainCarbonComplianceScore(carbonRecord),
  };
}

export function applyEgridCarbonComplianceToLocation(location, cache) {
  const carbonCompliance = getCarbonComplianceScoreForLocation(location, cache);

  return {
    ...location,
    categories: {
      ...location.categories,
      carbonCompliance: carbonCompliance.score,
    },
    carbonComplianceSource: carbonCompliance.sourceLabel,
    carbonComplianceRecord: carbonCompliance.carbonRecord,
    carbonComplianceExplanation: carbonCompliance.explanation,
  };
}

export { calculateCarbonComplianceScore, explainCarbonComplianceScore };
