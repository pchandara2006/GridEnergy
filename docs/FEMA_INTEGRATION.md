# FEMA National Risk Index Integration

## What Data Will Be Used

GridReady AI uses a cache/sample architecture for FEMA National Risk Index data as the external-data foundation for Climate Risk Score.

The intended source is FEMA National Risk Index data with hazard risk, expected annual loss, social vulnerability, and community resilience indicators. The current MVP normalizes state-level sample records for the existing demo markets.

Normalized frontend shape:

```json
{
  "stateId": "AZ",
  "stateName": "Arizona",
  "geographyType": "state",
  "riskIndexScore": 58,
  "expectedAnnualLossRating": "Relatively High",
  "socialVulnerabilityRating": "Relatively Moderate",
  "communityResilienceRating": "Relatively Moderate",
  "dominantHazards": ["Heat", "Drought", "Wildfire"],
  "period": "sample",
  "source": "FEMA National Risk Index",
  "isSample": true
}
```

## How It Maps To Climate Risk Score

`calculateClimateRiskScore(riskIndexScore)` maps FEMA risk to a 0-100 readiness score:

- Lower FEMA risk = higher Climate Risk Score
- Higher FEMA risk = lower Climate Risk Score
- Score is clamped between 0 and 100

The current implementation uses:

```text
Climate Risk Score = 100 - FEMA riskIndexScore
```

If FEMA cache/sample data is unavailable, GridReady AI keeps the existing local demo Climate Risk Score.

## Frontend Read Path

The frontend reads normalized public JSON through `src/services/external/femaRiskAdapter.js`:

1. Try `/data/fema-risk.json`
2. Fall back to `/data/fema-risk.sample.json`
3. Fall back to existing demo Climate Risk Score

## Current Sample-Data Limitations

- `public/data/fema-risk.sample.json` is sample data for MVP validation only.
- The current sample records are state-level, not county or tract level.
- The sample cache does not represent live FEMA data.
- The score does not yet account for site-specific floodplain, wildfire interface, water stress, heat island, or facility design assumptions.

## Future County/Tract-Level Improvement

Production scoring should move from state-level sample records to county, census tract, or site-buffer data. Future versions should preserve:

- FEMA source URL and dataset version
- Record geography ID
- Retrieval timestamp
- Hazard-specific risk drivers
- Evidence links and confidence metadata
- Separate treatment for hazard exposure, vulnerability, and resilience
