# Data Sources

GridReady AI currently uses local demo data plus a first external data foundation for electricity retail prices.

## Current Sources

| Source | Status | Used for | Location |
| --- | --- | --- | --- |
| Local demo data | Active fallback | Site readiness, risk categories, use cases, document signals | `src/data/gridreadyData.js` |
| EIA retail sales electricity prices | Cache/sample foundation | Power Cost Score | `public/data/eia-retail-prices.json` or `public/data/eia-retail-prices.sample.json` |

## Data Policy

- Browser code must not call external APIs with secrets.
- API keys must not be committed.
- Public data integrations should be normalized into cache files before frontend use.
- Every non-live dataset must remain clearly labeled as demo, sample, or cache data.

## Planned Sources

- Utility integrated resource plans and capacity maps
- ISO/RTO interconnection queues
- EIA electricity demand and generation data
- NOAA climate and heat-risk data
- Water stress and cooling-risk datasets
- Local permitting, zoning, and public hearing records
- Incentive, carbon compliance, and policy databases
