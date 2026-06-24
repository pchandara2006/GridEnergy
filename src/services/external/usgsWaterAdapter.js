import { mapStateToEiaStateId } from './eiaAdapter.js';

export const USGS_WATER_CACHE_PATH = '/data/usgs-water.json';

export function normalizeUsgsWaterRecord(record) {
  const stateId = mapStateToEiaStateId(record.stateId ?? record.state ?? record.stateAbbreviation);

  return {
    stateId,
    stateName: record.stateName ?? null,
    streamflowPercentile: record.streamflowPercentile ?? null,
    groundwaterTrend: record.groundwaterTrend ?? null,
    waterStressNote: record.waterStressNote ?? null,
    monitoringSiteCount: record.monitoringSiteCount ?? 0,
    source: record.source ?? 'USGS Water Data',
    isSample: Boolean(record.isSample),
  };
}

export function getUsgsWaterSummaryFromCache(cache, stateId) {
  const normalizedStateId = mapStateToEiaStateId(stateId);
  const records = Array.isArray(cache?.records) ? cache.records : [];
  return records.map(normalizeUsgsWaterRecord).find((record) => record.stateId === normalizedStateId) ?? null;
}

export const usgsWaterDataShape = {
  stateId: 'TX',
  stateName: 'Texas',
  streamflowPercentile: 42,
  groundwaterTrend: 'declining',
  waterStressNote: 'Future normalized USGS streamflow and groundwater signal.',
  monitoringSiteCount: 0,
  source: 'USGS Water Data',
  isSample: true,
};
