# GridReady AI

GridReady AI is a frontend-first MVP for infrastructure site intelligence. It helps teams compare power availability, grid timing, water/cooling constraints, climate exposure, and project economics before committing capital to a site.

All scores, documents, and market outputs in this repository are demo values for MVP validation. They are not official, live, or source-backed site-selection data.

## Problem
Power-heavy infrastructure projects can secure land faster than they can secure reliable electrical capacity. Data centers, factories, EV charging networks, clean-energy projects, and infrastructure investors must evaluate utility capacity, queue timing, electricity cost, water/cooling risk, climate exposure, permitting signals, and ROI risk across fragmented sources.

GridReady AI packages those signals into a practical readiness workflow for early diligence and market comparison.

## Target Users
- AI data center development and energy strategy teams
- Advanced manufacturing and industrial site selection teams
- Utilities and grid planning teams
- Battery storage and solar developers
- EV charging network developers
- Infrastructure investors and industrial real estate teams

## Features
- Site readiness hero preview with clearly labeled demo data
- Why Now market-pressure narrative
- Platform module overview
- Interactive location analyzer for demo markets
- Market comparison table
- Project scenario simulator with reusable scoring helpers
- Document intelligence mock workflow
- Use case summaries for power-heavy infrastructure teams
- EIA retail price cache foundation for Power Cost Score, with demo fallback

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Local mock/demo data
- Frontend-only MVP architecture

## Project Structure
```text
src/
  components/        React UI sections
  data/              Demo market, project, use case, and document data
  lib/               Reusable non-UI logic such as scoring helpers
  services/external/ External-data adapters that read normalized cache data
docs/                Product, data model, decision, and workflow notes
public/data/         Sample and generated public cache files
```

## How To Run Locally
```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, typically:

```text
http://127.0.0.1:5173/
```

## Quality Checks
```bash
npm run lint
npm run build
```

## EIA Power Cost Data
The frontend does not call the EIA API directly and does not expose API keys. To generate a local EIA retail price cache:

```bash
cp .env.example .env
# edit .env and set EIA_API_KEY
npm run fetch:eia
```

The generated cache is saved to:

```text
public/data/eia-retail-prices.json
```

If no key or generated cache is available, the app falls back to `public/data/eia-retail-prices.sample.json`, then to local demo Power Cost Score values.

## Future Data Integrations
- Utility integrated resource plans and capacity maps
- ISO/RTO interconnection queues
- EIA electricity price, demand, and generation datasets
- NOAA climate and heat-risk datasets
- Water stress and cooling-risk datasets
- Local permitting, zoning, and public hearing records
- Incentive, carbon compliance, and energy policy databases

## Notes
The current scoring model is intentionally simple and local. Future production scoring should include source provenance, timestamped data versions, confidence intervals, evidence links, and a backend API.
