# EPA eGRID Integration

## Why Carbon/Compliance Risk Matters

Large power users increasingly need to understand electricity emissions exposure before choosing a market. Data centers, manufacturers, clean-energy developers, and infrastructure investors may face customer carbon requirements, reporting expectations, procurement constraints, renewable-energy targets, or future policy pressure tied to the grid mix behind a site.

GridReady AI treats Carbon/Compliance Risk as a readiness signal for markets where grid emissions, renewable share, fossil generation exposure, and environmental disclosure risk affect long-term project attractiveness.

## What EPA eGRID Represents

EPA eGRID is the Emissions & Generation Resource Integrated Database. It provides environmental characteristics of U.S. electric power generation, including emissions, emission rates, generation, heat input, resource mix, and regional attributes.

For GridReady AI, the current architecture normalizes eGRID-style records into a cache/sample shape with:

- CO2 output emission rate in pounds per megawatt-hour
- Renewable generation share
- Fossil generation share
- Nuclear generation share when useful
- eGRID subregion label
- Reporting year

## Frontend Read Path

The frontend does not call live EPA services. It reads normalized public JSON through `src/services/external/egridAdapter.js`:

1. Try `/data/egrid-carbon.json`
2. Fall back to `/data/egrid-carbon.sample.json`
3. Fall back to existing demo Carbon/Compliance Risk values

Normalized frontend shape:

```json
{
  "stateId": "TX",
  "stateName": "Texas",
  "egridSubregion": "ERCT",
  "co2RateLbPerMwh": 840,
  "renewableSharePercent": 31,
  "fossilSharePercent": 68,
  "nuclearSharePercent": 1,
  "reportingYear": 2023,
  "source": "EPA eGRID",
  "isSample": true
}
```

## How It Maps To Carbon/Compliance Risk Score

`calculateCarbonComplianceScore()` maps eGRID-style data to a 0-100 readiness score:

- Lower CO2 rate = higher readiness
- Higher renewable share = higher readiness
- Higher fossil share = lower readiness
- Score is clamped between 0 and 100

Current formula:

```text
CO2 rate score = 100 - (co2RateLbPerMwh / 1500) * 100
Fossil score = 100 - fossilSharePercent
Carbon/Compliance Score = CO2 rate score * 0.55 + renewableSharePercent * 0.30 + fossil score * 0.15
```

The formula is intentionally simple for MVP transparency. Production scoring should tune weights by customer segment, facility type, procurement strategy, and policy context.

## Current Sample-Data Limitations

- `public/data/egrid-carbon.sample.json` is sample MVP data only.
- The current records are state-level stand-ins for eGRID-style data, not official live eGRID records.
- A state can include multiple grid regions and procurement options, so state-level scoring is too broad for production siting decisions.
- The score does not yet model power purchase agreements, renewable energy credits, utility tariffs, hourly emissions, customer-specific carbon accounting, or local compliance regimes.

## Future Subregion-Level Improvement

Production scoring should move from state-level sample records to eGRID subregion-level or utility/service-territory matching. Future versions should preserve:

- eGRID dataset version and reporting year
- eGRID subregion and matching method
- Retrieval timestamp
- CO2, CH4, N2O, NOx, SO2, and CO2e fields where useful
- Resource mix by fuel type
- Source file URL and evidence links
- Confidence metadata and policy/compliance notes

This helps data centers, manufacturers, and infrastructure investors compare where a project can meet energy-cost, emissions, customer-reporting, and compliance expectations before capital is committed.
