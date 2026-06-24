# Data Model

## City Data Structure
Each city record in `src/data/gridreadyData.js` includes:
- `id`: stable key for selectors and comparisons.
- `city`: market display name.
- `region`: state or regional label.
- `score`: overall Grid Readiness Score from 0 to 100.
- `recommendation`: one of `Recommended`, `Proceed with review`, `Requires deeper diligence`, or `High risk`.
- `bestUseCase`: market-fit label such as `AI Data Center`, `Battery Storage`, `Manufacturing`, `EV Charging Hub`, or `Solar Development`.
- `biggestRisk`: concise diligence risk.
- `bestOpportunity`: concise upside signal.
- `explanation`: business-style market summary.
- `categories`: score categories used by the analyzer and simulator.
- `riskTrend`: optional visualization-ready risk data for future modules.
- `costCurve`: optional visualization-ready cost trend data for future modules.

The file also exports `demoDataNotice`, a shared UI/documentation reminder that all current data is for MVP validation and is not official or live.

Each demo location now includes `stateId` so external state-level data, including EIA retail electricity prices, FEMA risk records, Drought Monitor records, EPA eGRID-style records, and LBNL queue-style records, can map cleanly into the app.

## Score Categories
Current category keys:
- `powerCost`
- `gridAccess`
- `timeToPower`
- `waterCooling`
- `climate`
- `carbonCompliance`
- `financeRoi`

Scores are normalized from 0 to 100, where higher is better for readiness and lower risk. UI labels explain risk-oriented categories as readiness-adjusted scores rather than official risk measurements.

Official Grid Readiness weighting:
- `gridAccess`: 20%
- `timeToPower`: 20%
- `powerCost`: 15%
- `waterCooling`: 15%
- `climate`: 10%
- `carbonCompliance`: 10%
- `financeRoi`: 10%

Score bands:
- 80-100: Strong readiness
- 65-79: Viable with review
- 50-64: Constrained
- 0-49: High risk

Power Cost Score can be replaced at runtime by EIA cache/sample data. When a normalized EIA retail price record is available, `calculatePowerCostScoreFromPrice()` maps the latest cents/kWh value to a 0-100 score. If no EIA cache/sample record is available, the app keeps the local demo Power Cost Score.

Climate Risk Score can be replaced at runtime by FEMA cache/sample data. When a normalized FEMA National Risk Index record is available, `calculateClimateRiskScore()` maps the risk index to a 0-100 readiness score. If no FEMA cache/sample record is available, the app keeps the local demo Climate Risk Score.

Water/Cooling Risk can be replaced at runtime by U.S. Drought Monitor cache/sample data. When a normalized drought record is available, `calculateWaterCoolingRiskScore()` maps drought severity to a 0-100 readiness score. If no drought cache/sample record is available, the app keeps the local demo Water/Cooling Risk value.

Carbon/Compliance Risk can be replaced at runtime by EPA eGRID cache/sample data. When a normalized eGRID-style record is available, `calculateCarbonComplianceScore()` blends CO2 rate, renewable share, and fossil share into a 0-100 readiness score. If no eGRID cache/sample record is available, the app keeps the local demo Carbon/Compliance Risk value.

Grid Access and Time-to-Power Scores can be replaced at runtime by LBNL Interconnection Queue cache/sample data. When a normalized queue record is available, `calculateGridAccessScore()` maps active queue capacity, withdrawal share, completion share, and agreement share to Grid Access readiness, while `calculateTimeToPowerScore()` maps queue duration, agreement share, and withdrawal share to delivery-timing readiness. If no LBNL queue cache/sample record is available, the app keeps the local demo Grid Access and Time-to-Power values.

## Project Scenario Data
Each project type includes:
- `id`
- `name`
- `fitLabel`
- `weights`
- `nextStep`
- `warning`

The simulator calculates project fit by applying project-specific weights to the selected city's category scores. The reusable scoring helpers live in `src/lib/scoring.js`.

## Demo Scoring
The current dataset is intentionally mocked for MVP validation. It is not official, live, or source-backed. The demo scoring model is designed to show product behavior and investor-facing UX, not to make real site-selection claims.

Future real scoring should include source provenance, timestamped data versions, confidence intervals, and evidence links for each signal.

## Source Confidence

Runtime source confidence labels:
- `Verified cache`: generated cache data is available.
- `External sample`: checked-in external-style sample data is being used.
- `Demo fallback`: local demo values are being used.

## EIA Retail Price Cache

Normalized records live in `public/data/eia-retail-prices.json` when generated. The sample fallback lives in `public/data/eia-retail-prices.sample.json`.

Record fields:
- `stateId`
- `stateName`
- `sector`
- `latestPriceCentsPerKwh`
- `period`
- `source`
- `isSample`

## FEMA National Risk Index Cache

Normalized records live in `public/data/fema-risk.json` when generated. The sample fallback lives in `public/data/fema-risk.sample.json`.

Record fields:
- `stateId`
- `stateName`
- `geographyType`
- `riskIndexScore`
- `expectedAnnualLossRating`
- `socialVulnerabilityRating`
- `communityResilienceRating`
- `dominantHazards`
- `period`
- `source`
- `isSample`

## U.S. Drought Monitor Cache

Normalized records live in `public/data/drought-risk.json` when generated. The sample fallback lives in `public/data/drought-risk.sample.json`.

Record fields:
- `stateId`
- `stateName`
- `droughtCategory`
- `droughtCategoryLabel`
- `droughtSeverityScore`
- `latestPeriod`
- `source`
- `isSample`

## USGS Water Data Placeholder

`src/services/external/usgsWaterAdapter.js` documents the future normalized cache shape for USGS Water Data. No live USGS calls are made by the frontend.

Future record fields:
- `stateId`
- `stateName`
- `streamflowPercentile`
- `groundwaterTrend`
- `waterStressNote`
- `monitoringSiteCount`
- `source`
- `isSample`

## EPA eGRID Carbon Cache

Normalized records live in `public/data/egrid-carbon.json` when generated. The sample fallback lives in `public/data/egrid-carbon.sample.json`.

Record fields:
- `stateId`
- `stateName`
- `egridSubregion`
- `co2RateLbPerMwh`
- `renewableSharePercent`
- `fossilSharePercent`
- `nuclearSharePercent`
- `reportingYear`
- `source`
- `isSample`

## LBNL Interconnection Queue Cache

Normalized records live in `public/data/lbnl-queue-risk.json` when generated. The sample fallback lives in `public/data/lbnl-queue-risk.sample.json`.

Record fields:
- `stateId`
- `stateName`
- `queueRegion`
- `activeQueueMw`
- `storageQueueMw`
- `solarQueueMw`
- `gasQueueMw`
- `withdrawnSharePercent`
- `completedSharePercent`
- `medianQueueDurationYears`
- `interconnectionAgreementSharePercent`
- `queueCongestionLevel`
- `reportingYear`
- `source`
- `isSample`
