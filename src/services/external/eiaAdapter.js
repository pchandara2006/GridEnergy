import { calculatePowerCostScoreFromPrice, getSourceConfidence } from '../../lib/scoring.js';

export const EIA_RETAIL_PRICE_CACHE_PATH = '/data/eia-retail-prices.json';
export const EIA_RETAIL_PRICE_SAMPLE_PATH = '/data/eia-retail-prices.sample.json';

const STATE_NAME_TO_ID = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

const STATE_ID_TO_NAME = Object.fromEntries(Object.entries(STATE_NAME_TO_ID).map(([name, id]) => [id, name]));

function normalizeSector(value) {
  const sector = String(value ?? '').toLowerCase();
  if (sector === 'com' || sector.includes('commercial')) return 'commercial';
  if (sector === 'ind' || sector.includes('industrial')) return 'industrial';
  return sector || 'unknown';
}

export function mapStateToEiaStateId(state) {
  if (!state) return null;
  const value = String(state).trim();
  const upper = value.toUpperCase();
  if (upper.length === 2 && STATE_ID_TO_NAME[upper]) return upper;
  return STATE_NAME_TO_ID[value] ?? null;
}

export function normalizeEiaRetailPriceRecord(record) {
  const stateId = mapStateToEiaStateId(record.stateId ?? record.stateid ?? record.state);
  const stateName = record.stateName ?? record.stateDescription ?? record.stateDescriptionName ?? STATE_ID_TO_NAME[stateId] ?? null;
  const sector = normalizeSector(record.sector ?? record.sectorName ?? record.sectorid);
  const priceValue = record.latestPriceCentsPerKwh ?? record.price ?? record.value;
  const latestPriceCentsPerKwh = Number.parseFloat(priceValue);

  if (!stateId || !Number.isFinite(latestPriceCentsPerKwh)) return null;

  return {
    stateId,
    stateName,
    sector,
    latestPriceCentsPerKwh,
    period: record.period ?? null,
    source: record.source ?? 'EIA retail sales',
    isSample: Boolean(record.isSample),
  };
}

export function getCacheRecords(cache) {
  if (Array.isArray(cache)) return cache;
  if (Array.isArray(cache?.records)) return cache.records;
  return [];
}

export function getStateElectricityPriceFromCache(cache, stateId, sector = 'industrial') {
  const normalizedStateId = mapStateToEiaStateId(stateId);
  if (!normalizedStateId) return null;

  const records = getCacheRecords(cache).map(normalizeEiaRetailPriceRecord).filter(Boolean);
  const preferredSector = normalizeSector(sector);

  return (
    records.find((record) => record.stateId === normalizedStateId && record.sector === preferredSector) ??
    records.find((record) => record.stateId === normalizedStateId && record.sector === 'industrial') ??
    records.find((record) => record.stateId === normalizedStateId && record.sector === 'commercial') ??
    null
  );
}

export async function loadEiaRetailPriceCache(fetcher = fetch) {
  const sources = [
    { path: EIA_RETAIL_PRICE_CACHE_PATH, sourceType: 'cache' },
    { path: EIA_RETAIL_PRICE_SAMPLE_PATH, sourceType: 'sample' },
  ];

  for (const source of sources) {
    try {
      const response = await fetcher(source.path, { cache: 'no-store' });
      if (!response.ok) continue;
      const data = await response.json();
      const records = getCacheRecords(data).map(normalizeEiaRetailPriceRecord).filter(Boolean);
      if (records.length > 0) {
        return { ...data, records, sourceType: source.sourceType };
      }
    } catch {
      // Missing or malformed cache should never break the MVP UI.
    }
  }

  return { records: [], sourceType: 'none' };
}

export function getPowerCostScoreForLocation(location, cache, sector = 'industrial') {
  const stateId = location.stateId ?? mapStateToEiaStateId(location.region);
  const priceRecord = getStateElectricityPriceFromCache(cache, stateId, sector);
  const sourceStatus = priceRecord ? cache?.sourceType : 'demo';

  if (!priceRecord) {
    return {
      score: location.categories.powerCost,
      sourceLabel: 'Power cost: demo estimate',
      sourceConfidence: getSourceConfidence(sourceStatus),
      priceRecord: null,
    };
  }

  return {
    score: calculatePowerCostScoreFromPrice(priceRecord.latestPriceCentsPerKwh, priceRecord.sector),
    sourceLabel: 'Power cost: EIA sample/cache',
    sourceConfidence: getSourceConfidence(sourceStatus),
    priceRecord,
  };
}

export function applyEiaPowerCostToLocation(location, cache, sector = 'industrial') {
  const powerCost = getPowerCostScoreForLocation(location, cache, sector);

  return {
    ...location,
    categories: {
      ...location.categories,
      powerCost: powerCost.score,
    },
    powerCostSource: powerCost.sourceLabel,
    powerCostConfidence: powerCost.sourceConfidence,
    powerCostPriceRecord: powerCost.priceRecord,
  };
}

export { calculatePowerCostScoreFromPrice };
