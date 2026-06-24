import {
  calculateGridAccessScore,
  calculateTimeToPowerScore,
  explainGridAccessRisk,
  explainTimeToPowerRisk,
} from '../../lib/scoring.js';
import { mapStateToEiaStateId } from './eiaAdapter.js';

export const LBNL_QUEUE_RISK_CACHE_PATH = '/data/lbnl-queue-risk.json';
export const LBNL_QUEUE_RISK_SAMPLE_PATH = '/data/lbnl-queue-risk.sample.json';

function normalizeNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

function getCacheRecords(cache) {
  if (Array.isArray(cache)) return cache;
  if (Array.isArray(cache?.records)) return cache.records;
  return [];
}

export function normalizeLbnlQueueRecord(record) {
  const stateId = mapStateToEiaStateId(record.stateId ?? record.state ?? record.stateAbbreviation);
  const activeQueueMw = normalizeNumber(record.activeQueueMw ?? record.active_queue_mw);
  const withdrawnSharePercent = normalizeNumber(record.withdrawnSharePercent ?? record.withdrawn_share_percent);
  const completedSharePercent = normalizeNumber(record.completedSharePercent ?? record.completed_share_percent);
  const medianQueueDurationYears = normalizeNumber(record.medianQueueDurationYears ?? record.median_queue_duration_years);
  const interconnectionAgreementSharePercent = normalizeNumber(
    record.interconnectionAgreementSharePercent ?? record.interconnection_agreement_share_percent,
  );

  if (
    !stateId ||
    activeQueueMw === null ||
    withdrawnSharePercent === null ||
    completedSharePercent === null ||
    medianQueueDurationYears === null ||
    interconnectionAgreementSharePercent === null
  ) {
    return null;
  }

  return {
    stateId,
    stateName: record.stateName ?? stateId,
    queueRegion: record.queueRegion ?? record.region ?? null,
    activeQueueMw,
    storageQueueMw: normalizeNumber(record.storageQueueMw ?? record.storage_queue_mw),
    solarQueueMw: normalizeNumber(record.solarQueueMw ?? record.solar_queue_mw),
    gasQueueMw: normalizeNumber(record.gasQueueMw ?? record.gas_queue_mw),
    withdrawnSharePercent,
    completedSharePercent,
    medianQueueDurationYears,
    interconnectionAgreementSharePercent,
    queueCongestionLevel: record.queueCongestionLevel ?? 'Moderate',
    reportingYear: record.reportingYear ?? record.year ?? null,
    source: record.source ?? 'LBNL Interconnection Queue',
    isSample: Boolean(record.isSample),
  };
}

export async function loadLbnlQueueRiskCache(fetcher = fetch) {
  const sources = [
    { path: LBNL_QUEUE_RISK_CACHE_PATH, sourceType: 'cache' },
    { path: LBNL_QUEUE_RISK_SAMPLE_PATH, sourceType: 'sample' },
  ];

  for (const source of sources) {
    try {
      const response = await fetcher(source.path, { cache: 'no-store' });
      if (!response.ok) continue;
      const data = await response.json();
      const records = getCacheRecords(data).map(normalizeLbnlQueueRecord).filter(Boolean);
      if (records.length > 0) {
        return { ...data, records, sourceType: source.sourceType };
      }
    } catch {
      // Missing or malformed LBNL queue cache should never break the MVP UI.
    }
  }

  return { records: [], sourceType: 'none' };
}

export function getQueueRiskFromCache(cache, stateId) {
  const normalizedStateId = mapStateToEiaStateId(stateId);
  if (!normalizedStateId) return null;

  return getCacheRecords(cache)
    .map(normalizeLbnlQueueRecord)
    .filter(Boolean)
    .find((record) => record.stateId === normalizedStateId) ?? null;
}

export function getQueueScoresForLocation(location, cache) {
  const stateId = location.stateId ?? mapStateToEiaStateId(location.region);
  const queueRecord = getQueueRiskFromCache(cache, stateId);

  if (!queueRecord) {
    return {
      gridAccessScore: location.categories.gridAccess,
      timeToPowerScore: location.categories.timeToPower,
      gridAccessSource: 'Grid access: demo estimate',
      timeToPowerSource: 'Time-to-power: demo estimate',
      queueRecord: null,
      gridAccessExplanation: explainGridAccessRisk(null),
      timeToPowerExplanation: explainTimeToPowerRisk(null),
    };
  }

  return {
    gridAccessScore: calculateGridAccessScore(queueRecord),
    timeToPowerScore: calculateTimeToPowerScore(queueRecord),
    gridAccessSource: 'Grid access: LBNL queue sample/cache',
    timeToPowerSource: 'Time-to-power: LBNL queue sample/cache',
    queueRecord,
    gridAccessExplanation: explainGridAccessRisk(queueRecord),
    timeToPowerExplanation: explainTimeToPowerRisk(queueRecord),
  };
}

export function applyLbnlQueueRiskToLocation(location, cache) {
  const queueRisk = getQueueScoresForLocation(location, cache);

  return {
    ...location,
    categories: {
      ...location.categories,
      gridAccess: queueRisk.gridAccessScore,
      timeToPower: queueRisk.timeToPowerScore,
    },
    gridAccessSource: queueRisk.gridAccessSource,
    timeToPowerSource: queueRisk.timeToPowerSource,
    queueRiskRecord: queueRisk.queueRecord,
    gridAccessExplanation: queueRisk.gridAccessExplanation,
    timeToPowerExplanation: queueRisk.timeToPowerExplanation,
  };
}

export { calculateGridAccessScore, calculateTimeToPowerScore, explainGridAccessRisk, explainTimeToPowerRisk };
