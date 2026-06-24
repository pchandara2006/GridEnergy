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
- Weighted Grid Readiness methodology with score bands and source confidence labels
- Document intelligence mock workflow
- Use case summaries for power-heavy infrastructure teams
- EIA retail price cache foundation for Power Cost Score, with demo fallback
- FEMA National Risk Index cache foundation for Climate Risk Score, with demo fallback
- U.S. Drought Monitor cache foundation for Water/Cooling Risk, with demo fallback
- EPA eGRID cache foundation for Carbon/Compliance Risk, with demo fallback
- LBNL Interconnection Queue cache foundation for Grid Access and Time-to-Power Scores, with demo fallback

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

## Scoring Methodology
All scores use one direction: higher means stronger infrastructure readiness and lower risk. Grid Readiness is a weighted score:

```text
Grid Access 20% + Time-to-Power 20% + Power Cost 15% + Water/Cooling 15% + Climate 10% + Carbon/Compliance 10% + Finance/ROI 10%
```

Source confidence labels are `Verified cache`, `External sample`, and `Demo fallback`. Full methodology is documented in `docs/SCORING_METHODOLOGY.md`.

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

## FEMA Climate Risk Data
The frontend reads normalized FEMA National Risk Index cache data from public JSON. The repository currently includes sample state-level data:

```text
public/data/fema-risk.sample.json
```

If a generated FEMA cache is later added at `public/data/fema-risk.json`, the app will use it first. If not, the app falls back to the sample file, then to local demo Climate Risk Score values.

## Water/Cooling Risk Data
The frontend reads normalized U.S. Drought Monitor cache data from public JSON. The repository currently includes sample state-level data:

```text
public/data/drought-risk.sample.json
```

If a generated drought cache is later added at `public/data/drought-risk.json`, the app will use it first. If not, the app falls back to the sample file, then to local demo Water/Cooling Risk values.

USGS Water Data support is currently a documented adapter placeholder for future streamflow, groundwater, and monitoring-site signals. The app does not call live USGS APIs yet.

## EPA eGRID Carbon/Compliance Data
The frontend reads normalized EPA eGRID-style cache data from public JSON. The repository currently includes sample state-level data:

```text
public/data/egrid-carbon.sample.json
```

If a generated eGRID cache is later added at `public/data/egrid-carbon.json`, the app will use it first. If not, the app falls back to the sample file, then to local demo Carbon/Compliance Risk values.

## LBNL Interconnection Queue Data
The frontend reads normalized LBNL Interconnection Queue-style cache data from public JSON. The repository currently includes sample state-level data:

```text
public/data/lbnl-queue-risk.sample.json
```

If a generated queue cache is later added at `public/data/lbnl-queue-risk.json`, the app will use it first. If not, the app falls back to the sample file, then to local demo Grid Access and Time-to-Power values.

## Future Data Integrations
- Utility integrated resource plans and capacity maps
- LBNL interconnection queue datasets and ISO/RTO queue details
- EIA electricity price, demand, and generation datasets
- NOAA climate and heat-risk datasets
- U.S. Drought Monitor and USGS water datasets
- EPA eGRID emissions rates and resource-mix datasets
- Local permitting, zoning, and public hearing records
- Incentive, carbon compliance, and energy policy databases

## Notes
The current scoring model is intentionally simple and local. Future production scoring should include source provenance, timestamped data versions, confidence intervals, evidence links, and a backend API.
