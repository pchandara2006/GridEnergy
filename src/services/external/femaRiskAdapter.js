import { calculateClimateRiskScore, explainClimateRiskScore, getSourceConfidence } from '../../lib/scoring.js';
import { mapStateToEiaStateId } from './eiaAdapter.js';

export const FEMA_RISK_CACHE_PATH = '/data/fema-risk.json';
export const FEMA_RISK_SAMPLE_PATH = '/data/fema-risk.sample.json';

export function normalizeFemaRiskRecord(record) {
  const stateId = mapStateToEiaStateId(record.stateId ?? record.state ?? record.stateAbbreviation);
  const riskIndexScoreValue =
    record.riskIndexScore ?? record.nationalRiskIndexScore ?? record.riskScore ?? record.risk_index_score;
  const riskIndexScore = Number.parseFloat(riskIndexScoreValue);

  if (!stateId || !Number.isFinite(riskIndexScore)) return null;

  return {
    stateId,
    stateName: record.stateName ?? record.state_name ?? stateId,
    geographyType: record.geographyType ?? 'state',
    riskIndexScore,
    expectedAnnualLossRating: record.expectedAnnualLossRating ?? record.ealRating ?? null,
    socialVulnerabilityRating: record.socialVulnerabilityRating ?? record.soviRating ?? null,
    communityResilienceRating: record.communityResilienceRating ?? record.resilienceRating ?? null,
    dominantHazards: Array.isArray(record.dominantHazards) ? record.dominantHazards : [],
    period: record.period ?? null,
    source: record.source ?? 'FEMA National Risk Index',
    isSample: Boolean(record.isSample),
  };
}

function getCacheRecords(cache) {
  if (Array.isArray(cache)) return cache;
  if (Array.isArray(cache?.records)) return cache.records;
  return [];
}

export async function loadFemaRiskCache(fetcher = fetch) {
  const sources = [
    { path: FEMA_RISK_CACHE_PATH, sourceType: 'cache' },
    { path: FEMA_RISK_SAMPLE_PATH, sourceType: 'sample' },
  ];

  for (const source of sources) {
    try {
      const response = await fetcher(source.path, { cache: 'no-store' });
      if (!response.ok) continue;
      const data = await response.json();
      const records = getCacheRecords(data).map(normalizeFemaRiskRecord).filter(Boolean);
      if (records.length > 0) {
        return { ...data, records, sourceType: source.sourceType };
      }
    } catch {
      // Missing or malformed FEMA cache should never break the MVP UI.
    }
  }

  return { records: [], sourceType: 'none' };
}

export function getClimateRiskFromCache(cache, stateId) {
  const normalizedStateId = mapStateToEiaStateId(stateId);
  if (!normalizedStateId) return null;

  return getCacheRecords(cache)
    .map(normalizeFemaRiskRecord)
    .filter(Boolean)
    .find((record) => record.stateId === normalizedStateId) ?? null;
}

export function getClimateRiskScoreForLocation(location, cache) {
  const stateId = location.stateId ?? mapStateToEiaStateId(location.region);
  const riskRecord = getClimateRiskFromCache(cache, stateId);
  const sourceStatus = riskRecord ? cache?.sourceType : 'demo';

  if (!riskRecord) {
    return {
      score: location.categories.climate,
      sourceLabel: 'Climate: demo estimate',
      sourceConfidence: getSourceConfidence(sourceStatus),
      riskRecord: null,
      explanation: explainClimateRiskScore(null),
    };
  }

  return {
    score: calculateClimateRiskScore(riskRecord.riskIndexScore),
    sourceLabel: 'Climate: FEMA sample/cache',
    sourceConfidence: getSourceConfidence(sourceStatus),
    riskRecord,
    explanation: explainClimateRiskScore(riskRecord.riskIndexScore),
  };
}

export function applyFemaClimateRiskToLocation(location, cache) {
  const climateRisk = getClimateRiskScoreForLocation(location, cache);

  return {
    ...location,
    categories: {
      ...location.categories,
      climate: climateRisk.score,
    },
    climateRiskSource: climateRisk.sourceLabel,
    climateRiskConfidence: climateRisk.sourceConfidence,
    climateRiskRecord: climateRisk.riskRecord,
    climateRiskExplanation: climateRisk.explanation,
  };
}

export { calculateClimateRiskScore, explainClimateRiskScore };
