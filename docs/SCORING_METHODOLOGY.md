# Scoring Methodology

## Score Direction

All GridReady AI scores use the same direction:

- Higher score = stronger infrastructure readiness / lower risk
- Lower score = weaker infrastructure readiness / higher risk

This applies to Power Cost, Grid Access, Time-to-Power, Water/Cooling, Climate, Carbon/Compliance, Finance/ROI, Project Fit, and final Grid Readiness.

## Score Bands

| Score range | Band |
| --- | --- |
| 80-100 | Strong readiness |
| 65-79 | Viable with review |
| 50-64 | Constrained |
| 0-49 | High risk |

Recommendations map from these bands:

- `Recommended`
- `Proceed with review`
- `Requires deeper diligence`
- `High risk`

## Category Scores

Power Cost Score measures electricity cost readiness. Lower electricity prices score higher.

Grid Access Score measures access to deliverable grid capacity. Lower queue pressure and withdrawal risk score higher; stronger completion and interconnection agreement signals improve readiness.

Time-to-Power Score measures delivery-timing readiness. Shorter queue duration scores higher; stronger interconnection agreement share improves readiness.

Water/Cooling Score measures cooling and drought exposure readiness. Lower drought severity scores higher.

Climate Risk Score measures natural hazard readiness. Lower FEMA-style risk exposure scores higher.

Carbon/Compliance Score measures grid emissions and compliance readiness. Lower CO2 rate and fossil share score higher; higher renewable share improves readiness.

Finance/ROI Score is currently a demo estimate for financial sensitivity and project economics. Higher score means stronger estimated economic readiness.

## Grid Readiness Formula

`calculateGridReadinessScore()` uses the official default weighting:

| Category | Weight |
| --- | --- |
| Grid Access | 20% |
| Time-to-Power | 20% |
| Power Cost | 15% |
| Water/Cooling | 15% |
| Climate | 10% |
| Carbon/Compliance | 10% |
| Finance/ROI | 10% |

Formula:

```text
Grid Readiness =
  Grid Access * 0.20 +
  Time-to-Power * 0.20 +
  Power Cost * 0.15 +
  Water/Cooling * 0.15 +
  Climate * 0.10 +
  Carbon/Compliance * 0.10 +
  Finance/ROI * 0.10
```

The weighting reflects GridReady AI's core diligence question: whether power-heavy infrastructure can get sufficient power quickly enough. Grid Access and Time-to-Power therefore carry the highest weights.

## Source Confidence Labels

`getSourceConfidence()` classifies source status into three labels:

| Label | Meaning |
| --- | --- |
| Verified cache | Generated cache data exists and is being read by the frontend |
| External sample | External-style sample data is being used for MVP validation |
| Demo fallback | Local demo values are being used because no cache/sample record is available |

## Fallback Behavior

Each external adapter follows the same read order:

1. Read generated cache JSON from `public/data/*.json`
2. Fall back to checked-in sample JSON from `public/data/*.sample.json`
3. Fall back to local demo values in `src/data/gridreadyData.js`

The frontend does not expose API keys and does not call protected external APIs directly.

## Current Limitations

- Current sample data is for MVP validation only.
- Several external foundations are state-level samples and should move to utility, county, subregion, queue-region, or site-specific matching.
- Finance/ROI remains a demo score until a real finance model is added.
- Current formulas are intentionally simple and should be validated against real project outcomes before production use.
- Source confidence labels describe data status, not statistical certainty.

## Future Improvements

- Add unit tests for each scoring helper and adapter.
- Add score versioning and methodology IDs.
- Add source timestamps, dataset versions, and evidence links to every score.
- Add confidence intervals or data-quality flags when production data pipelines exist.
- Tune category weights by project type, load size, region, utility territory, and customer risk tolerance.
