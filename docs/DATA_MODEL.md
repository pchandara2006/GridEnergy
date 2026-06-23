# Data Model

## City Data Structure
Each city record in `src/data/gridreadyData.js` includes:
- `id`: stable key for selectors and comparisons.
- `city`: market display name.
- `region`: state or regional label.
- `score`: overall Grid Readiness Score from 0 to 100.
- `recommendation`: one of `Recommended`, `Needs Review`, or `High Risk`.
- `bestUseCase`: market-fit label such as `AI Data Center`, `Battery Storage`, `Manufacturing`, `EV Charging Hub`, or `Solar Development`.
- `biggestRisk`: concise diligence risk.
- `bestOpportunity`: concise upside signal.
- `explanation`: business-style market summary.
- `categories`: score categories used by the analyzer and simulator.
- `riskTrend`: optional visualization-ready risk data for future modules.
- `costCurve`: optional visualization-ready cost trend data for future modules.

The file also exports `demoDataNotice`, a shared UI/documentation reminder that all current data is for MVP validation and is not official or live.

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
