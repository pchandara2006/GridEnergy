# GridReady AI

Power readiness intelligence for infrastructure site selection.

GridReady AI is a frontend-first MVP that helps infrastructure teams compare power availability, grid timing, electricity cost, water/cooling constraints, climate exposure, carbon/compliance risk, and project economics before committing capital to a site.

All scores, documents, and market outputs in this repository are for MVP validation. They are not official, live, or production-grade site-selection data.

## Problem

Power-heavy projects can secure land faster than they can secure reliable electrical capacity. AI data centers, advanced manufacturing facilities, EV charging networks, battery storage, solar projects, and infrastructure investors need to evaluate grid access, time-to-power, operating cost, cooling exposure, climate risk, carbon requirements, and ROI sensitivity across fragmented sources.

GridReady AI turns those signals into a comparable readiness workflow for early diligence and market screening.

## Target Users

- AI data center development and energy strategy teams
- Advanced manufacturing and industrial site-selection teams
- Utilities and grid planning teams
- Battery storage and solar developers
- EV charging network developers
- Infrastructure investors and industrial real estate teams

## Current MVP Features

- Site readiness homepage preview with clear demo-data labeling
- Location Analyzer for eight demo markets
- Market Comparison table for shortlisting three to five markets
- Scenario Simulator for project-fit analysis across five infrastructure archetypes
- Document Intelligence mock workflow for planning and diligence signals
- Weighted Grid Readiness methodology with score bands and source confidence labels
- Cache/sample architecture for external data foundations

## Data Foundations

| Foundation | Score area | Current status |
| --- | --- | --- |
| EIA retail electricity prices | Power Cost | Sample/cache foundation with optional fetch script |
| FEMA National Risk Index | Climate Risk | Sample/cache foundation |
| U.S. Drought Monitor | Water/Cooling Risk | Sample/cache foundation |
| USGS Water Data | Water/Cooling Risk | Placeholder adapter for future monitoring signals |
| EPA eGRID | Carbon/Compliance Risk | Sample/cache foundation |
| LBNL Interconnection Queue | Grid Access and Time-to-Power | Sample/cache foundation |
| Local MVP model | Finance/ROI | Demo fallback estimate |

The frontend reads generated cache files from `public/data/*.json` when available, then falls back to checked-in sample files, then to local demo values.

## Scoring Methodology

All scores use one direction: higher means stronger infrastructure readiness and lower risk.

Grid Readiness uses the official weighted formula:

```text
Grid Access 20% +
Time-to-Power 20% +
Power Cost 15% +
Water/Cooling 15% +
Climate 10% +
Carbon/Compliance 10% +
Finance/ROI 10%
```

Score bands:

- `80-100`: Strong readiness
- `65-79`: Viable with review
- `50-64`: Constrained
- `0-49`: High risk

Full methodology: `docs/SCORING_METHODOLOGY.md`.

## Source Confidence

- `Verified cache`: generated cache data is present and being read by the frontend
- `External sample`: checked-in external-style sample data is being used
- `Demo fallback`: local demo values are being used

These labels describe data status, not statistical certainty.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Local JSON/sample data in `public/data`
- Frontend-only MVP architecture

## Project Structure

```text
src/
  components/        React UI sections
  data/              Demo market, project, use case, and document data
  lib/               Scoring and source-confidence helpers
  services/external/ External-data adapters that read normalized cache data
docs/                Product, data, scoring, deployment, and workflow notes
public/data/         Sample and generated public cache files
scripts/             Optional data-fetch scripts
```

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually:

```text
http://127.0.0.1:5173/
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Deployment

GridReady AI is ready for static deployment on Vercel.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Required environment variables: none for the public demo
- Optional environment variable for local EIA cache generation: `EIA_API_KEY`

Deployment details: `docs/DEPLOYMENT.md`.

## Environment Variables

The app does not require API keys at runtime. `.env.example` documents the optional EIA fetch key:

```bash
EIA_API_KEY=your_eia_api_key_here
```

The browser never receives this key. The optional fetch script writes normalized JSON to `public/data/eia-retail-prices.json`.

## Current Limitations

- Demo markets and document signals are MVP validation data.
- External source files in `public/data/*.sample.json` are sample records, not live authoritative datasets.
- Several foundations are state-level and should move to utility, subregion, county, queue-region, or site-level matching.
- Finance/ROI is still a local demo estimate.
- No backend, authentication, saved projects, or production data pipeline exists yet.

## Roadmap

- Add unit tests for scoring helpers and external adapters
- Add generated cache pipelines for FEMA, drought, eGRID, and LBNL queue data
- Add source provenance, retrieval timestamps, dataset versions, and evidence links
- Move from state-level samples to utility/region/site-level matching
- Add backend scoring API, saved site shortlists, and team workspaces
- Add exportable investment memo/PDF output
- Add real document ingestion for utility reports, interconnection filings, and zoning packets
