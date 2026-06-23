/* eslint-env node */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'public', 'data', 'eia-retail-prices.json');

const EIA_ENDPOINT = 'https://api.eia.gov/v2/electricity/retail-sales/data/';
const STATE_IDS = ['NM', 'AZ', 'TX', 'CO', 'GA', 'OH', 'VA', 'NV'];
const SECTOR_IDS = ['COM', 'IND'];

async function loadLocalEnv() {
  const envPath = path.join(projectRoot, '.env');

  try {
    const content = await readFile(envPath, 'utf8');
    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .forEach((line) => {
        const [key, ...valueParts] = line.split('=');
        if (!process.env[key]) {
          process.env[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
        }
      });
  } catch {
    // A local .env file is optional; shell environment variables work too.
  }
}

function normalizeSector(value) {
  const sector = String(value ?? '').toLowerCase();
  if (sector === 'com' || sector.includes('commercial')) return 'commercial';
  if (sector === 'ind' || sector.includes('industrial')) return 'industrial';
  return sector;
}

function normalizeRecord(record) {
  const stateId = record.stateid ?? record.stateId;
  const sector = normalizeSector(record.sectorid ?? record.sectorName ?? record.sector);
  const latestPriceCentsPerKwh = Number.parseFloat(record.price);

  if (!stateId || !sector || !Number.isFinite(latestPriceCentsPerKwh)) return null;

  return {
    stateId,
    stateName: record.stateDescription ?? record.stateName ?? stateId,
    sector,
    latestPriceCentsPerKwh,
    period: record.period,
    source: 'EIA retail sales',
    isSample: false,
  };
}

function buildEiaUrl(apiKey) {
  const params = new URLSearchParams();
  params.set('api_key', apiKey);
  params.set('frequency', 'monthly');
  params.append('data[0]', 'price');
  params.set('sort[0][column]', 'period');
  params.set('sort[0][direction]', 'desc');
  params.set('offset', '0');
  params.set('length', '5000');

  STATE_IDS.forEach((stateId) => params.append('facets[stateid][]', stateId));
  SECTOR_IDS.forEach((sectorId) => params.append('facets[sectorid][]', sectorId));

  return `${EIA_ENDPOINT}?${params.toString()}`;
}

function latestByStateAndSector(records) {
  const latest = new Map();

  records
    .map(normalizeRecord)
    .filter(Boolean)
    .forEach((record) => {
      const key = `${record.stateId}:${record.sector}`;
      const current = latest.get(key);
      if (!current || String(record.period) > String(current.period)) {
        latest.set(key, record);
      }
    });

  return [...latest.values()].sort((a, b) => `${a.stateId}:${a.sector}`.localeCompare(`${b.stateId}:${b.sector}`));
}

async function main() {
  await loadLocalEnv();
  const apiKey = process.env.EIA_API_KEY;

  if (!apiKey) {
    console.log('EIA_API_KEY is not set. Skipping EIA fetch. The app will continue using demo/sample fallback data.');
    return;
  }

  const response = await fetch(buildEiaUrl(apiKey));
  if (!response.ok) {
    throw new Error(`EIA request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const rows = payload?.response?.data ?? [];
  const records = latestByStateAndSector(rows);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: 'EIA retail sales',
        isSample: false,
        records,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Saved ${records.length} normalized EIA retail price records to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
