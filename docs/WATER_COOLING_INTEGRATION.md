# Water/Cooling Risk Integration

## Why Water/Cooling Matters

Power-heavy infrastructure projects can fail late if cooling assumptions, water availability, drought exposure, or heat-driven operating constraints are not understood early. GridReady AI treats Water/Cooling Risk as a readiness signal for data centers, manufacturing facilities, solar and storage projects, and other infrastructure that depends on reliable thermal and water planning.

## U.S. Drought Monitor Foundation

GridReady AI now has a cache/sample architecture for U.S. Drought Monitor data. The frontend does not call live drought services directly. It reads normalized public JSON and falls back safely:

1. Try `/data/drought-risk.json`
2. Fall back to `/data/drought-risk.sample.json`
3. Fall back to local demo Water/Cooling Risk values

Normalized frontend shape:

```json
{
  "stateId": "AZ",
  "stateName": "Arizona",
  "droughtCategory": "D3",
  "droughtCategoryLabel": "Extreme Drought",
  "droughtSeverityScore": 4,
  "latestPeriod": "sample",
  "source": "U.S. Drought Monitor",
  "isSample": true
}
```

## How It Maps To Water/Cooling Risk

`calculateWaterCoolingRiskScore(droughtSeverityScore)` maps drought severity to a 0-100 readiness score:

- No drought = higher readiness
- D0 = mild concern
- D1 = moderate concern
- D2 = elevated risk
- D3 = high risk
- D4 = severe risk
- Score is clamped between 0 and 100

Current formula:

```text
Water/Cooling Readiness Score = 100 - droughtSeverityScore * 17
```

Severity mapping:

| Drought category | Severity score |
| --- | --- |
| none | 0 |
| D0 | 1 |
| D1 | 2 |
| D2 | 3 |
| D3 | 4 |
| D4 | 5 |

## USGS Water Data Placeholder

`src/services/external/usgsWaterAdapter.js` documents the future normalized shape for USGS Water Data signals:

- `streamflowPercentile`
- `groundwaterTrend`
- `waterStressNote`
- `monitoringSiteCount`
- `source: "USGS Water Data"`

The app does not call live USGS APIs yet. Future backend jobs can normalize streamflow, groundwater, and monitoring-site data into a cache file before the browser reads it.

## Current Sample-Data Limitations

- `public/data/drought-risk.sample.json` is sample MVP data only.
- The current records are state-level and should not be used for real site decisions.
- Drought category alone does not capture municipal water rights, utility cooling design, wastewater reuse, local aquifer conditions, or project-specific water intensity.
- The score is intentionally simple so users can understand the current MVP behavior.

## Future County/ZIP-Level Improvement

Production scoring should move from state-level sample records to county, ZIP, watershed, or site-buffer matching. Future versions should preserve:

- Source URL and dataset version
- Retrieval timestamp
- Geography ID and matching method
- Drought category history, not just latest value
- USGS monitoring-site evidence
- Facility cooling assumptions and water-reuse strategy
- Confidence metadata and source notes
