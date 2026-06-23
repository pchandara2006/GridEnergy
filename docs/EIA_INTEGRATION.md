# EIA Integration

## What Data Is Used

GridReady AI uses the EIA electricity retail sales dataset as the first external-data foundation for Power Cost Score. The integration is designed around state-level commercial and industrial electricity price records.

The normalized frontend shape is:

```json
{
  "stateId": "TX",
  "stateName": "Texas",
  "sector": "industrial",
  "latestPriceCentsPerKwh": 7.6,
  "period": "2025-12",
  "source": "EIA retail sales",
  "isSample": true
}
```

## API Key

Create a local `.env` file and add:

```bash
EIA_API_KEY=your_eia_api_key_here
```

Do not commit `.env`. The repository includes `.env.example` only.

The fetch script reads `.env` if present and also respects an already-exported shell environment variable.

## Fetch Script

Run:

```bash
npm run fetch:eia
```

The script reads `EIA_API_KEY` from the environment. If the key is missing, it prints a clear message and exits without failing the app.

The script requests monthly EIA electricity retail-sales price data for commercial and industrial sectors for the current demo states:

- NM
- AZ
- TX
- CO
- GA
- OH
- VA
- NV

## Cache Output

Generated live-cache output is saved to:

```text
public/data/eia-retail-prices.json
```

The repository also includes:

```text
public/data/eia-retail-prices.sample.json
```

The sample file keeps the MVP working without an API key. It is sample data for validation, not official or live data.

## Frontend Read Path

The frontend never uses an EIA API key. It reads normalized JSON through `src/services/external/eiaAdapter.js`:

1. Try `/data/eia-retail-prices.json`
2. Fall back to `/data/eia-retail-prices.sample.json`
3. Fall back to existing demo Power Cost Score if neither cache is available

## Scoring

`src/lib/scoring.js` includes `calculatePowerCostScoreFromPrice(priceCentsPerKwh, sector)`.

The scoring rule is intentionally simple:

- Lower electricity price = higher score
- Higher electricity price = lower score
- Score is clamped between 0 and 100

## Current Limitations

- The integration uses state-level retail price data, not utility-territory or nodal price data.
- The current frontend cache is not a production data pipeline.
- The score does not yet include tariff structures, demand charges, interruptible rates, hedging, or negotiated power contracts.
- Real production scoring should include source provenance, retrieval timestamp, confidence, and evidence links.
