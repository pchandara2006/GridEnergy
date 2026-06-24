import { calculateWaterCoolingRiskScore, explainWaterCoolingRiskScore, getSourceConfidence } from '../../lib/scoring.js';
import { mapStateToEiaStateId } from './eiaAdapter.js';

export const DROUGHT_RISK_CACHE_PATH = '/data/drought-risk.json';
export const DROUGHT_RISK_SAMPLE_PATH = '/data/drought-risk.sample.json';

const DROUGHT_CATEGORY_SEVERITY = {
  none: 0,
  normal: 0,
  D0: 1,
  D1: 2,
  D2: 3,
  D3: 4,
  D4: 5,
};

const DROUGHT_CATEGORY_LABELS = {
  none: 'No drought',
  normal: 'No drought',
  D0: 'Abnormally Dry',
  D1: 'Moderate Drought',
  D2: 'Severe Drought',
  D3: 'Extreme Drought',
  D4: 'Exceptional Drought',
};

function normalizeDroughtCategory(value) {
  const category = String(value ?? 'none').trim();
  const upper = category.toUpperCase();
  if (upper === 'NONE' || upper === 'NORMAL') return 'none';
  if (DROUGHT_CATEGORY_SEVERITY[upper] !== undefined) return upper;
  return 'none';
}

export function normalizeDroughtMonitorRecord(record) {
  const stateId = mapStateToEiaStateId(record.stateId ?? record.state ?? record.stateAbbreviation);
  const droughtCategory = normalizeDroughtCategory(record.droughtCategory ?? record.category);
  const droughtSeverityScoreValue = record.droughtSeverityScore ?? DROUGHT_CATEGORY_SEVERITY[droughtCategory];
  const droughtSeverityScore = Number.parseFloat(droughtSeverityScoreValue);

  if (!stateId || !Number.isFinite(droughtSeverityScore)) return null;

  return {
    stateId,
    stateName: record.stateName ?? stateId,
    droughtCategory,
    droughtCategoryLabel: record.droughtCategoryLabel ?? DROUGHT_CATEGORY_LABELS[droughtCategory],
    droughtSeverityScore,
    latestPeriod: record.latestPeriod ?? record.period ?? null,
    source: record.source ?? 'U.S. Drought Monitor',
    isSample: Boolean(record.isSample),
  };
}

function getCacheRecords(cache) {
  if (Array.isArray(cache)) return cache;
  if (Array.isArray(cache?.records)) return cache.records;
  return [];
}

export async function loadDroughtRiskCache(fetcher = fetch) {
  const sources = [
    { path: DROUGHT_RISK_CACHE_PATH, sourceType: 'cache' },
    { path: DROUGHT_RISK_SAMPLE_PATH, sourceType: 'sample' },
  ];

  for (const source of sources) {
    try {
      const response = await fetcher(source.path, { cache: 'no-store' });
      if (!response.ok) continue;
      const data = await response.json();
      const records = getCacheRecords(data).map(normalizeDroughtMonitorRecord).filter(Boolean);
      if (records.length > 0) {
        return { ...data, records, sourceType: source.sourceType };
      }
    } catch {
      // Missing or malformed drought cache should never break the MVP UI.
    }
  }

  return { records: [], sourceType: 'none' };
}

export function getDroughtRiskFromCache(cache, stateId) {
  const normalizedStateId = mapStateToEiaStateId(stateId);
  if (!normalizedStateId) return null;

  return getCacheRecords(cache)
    .map(normalizeDroughtMonitorRecord)
    .filter(Boolean)
    .find((record) => record.stateId === normalizedStateId) ?? null;
}

export function getWaterCoolingScoreForLocation(location, cache) {
  const stateId = location.stateId ?? mapStateToEiaStateId(location.region);
  const droughtRecord = getDroughtRiskFromCache(cache, stateId);
  const sourceStatus = droughtRecord ? cache?.sourceType : 'demo';

  if (!droughtRecord) {
    return {
      score: location.categories.waterCooling,
      sourceLabel: 'Water/cooling: demo estimate',
      sourceConfidence: getSourceConfidence(sourceStatus),
      droughtRecord: null,
      explanation: explainWaterCoolingRiskScore(null, null),
    };
  }

  return {
    score: calculateWaterCoolingRiskScore(droughtRecord.droughtSeverityScore),
    sourceLabel: 'Water/cooling: Drought Monitor sample/cache',
    sourceConfidence: getSourceConfidence(sourceStatus),
    droughtRecord,
    explanation: explainWaterCoolingRiskScore(droughtRecord.droughtCategory, droughtRecord.droughtSeverityScore),
  };
}

export function applyDroughtWaterCoolingToLocation(location, cache) {
  const waterCooling = getWaterCoolingScoreForLocation(location, cache);

  return {
    ...location,
    categories: {
      ...location.categories,
      waterCooling: waterCooling.score,
    },
    waterCoolingSource: waterCooling.sourceLabel,
    waterCoolingConfidence: waterCooling.sourceConfidence,
    waterCoolingRecord: waterCooling.droughtRecord,
    waterCoolingExplanation: waterCooling.explanation,
  };
}

export { calculateWaterCoolingRiskScore, explainWaterCoolingRiskScore };
