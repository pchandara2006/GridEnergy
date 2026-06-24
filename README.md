# GridReady AI

Power readiness intelligence for infrastructure site selection.

GridReady AI is an infrastructure intelligence platform for power-heavy site decisions. It helps data center developers, manufacturers, utilities, clean-energy developers, EV charging networks, industrial real estate teams, and infrastructure investors compare power availability, grid timing, electricity cost, water/cooling constraints, climate exposure, carbon/compliance risk, and project economics before committing capital to a site.

The product is designed for early diligence: where teams need a fast, explainable view of site readiness before moving into utility studies, land acquisition, interconnection strategy, permitting, or investment committee review.

## Why It Matters

Power-heavy infrastructure can often secure land faster than it can secure reliable electrical capacity. AI data centers, advanced manufacturing, EV charging networks, battery storage, solar development, and industrial real estate all need earlier visibility into grid readiness, time-to-power, cooling exposure, climate risk, carbon intensity, and project economics.

Those signals are usually fragmented across utilities, public datasets, queue reports, climate models, water-risk indicators, emissions data, and project-finance assumptions. GridReady AI organizes those inputs into a structured readiness workflow for market screening, site comparison, and capital planning.

## What GridReady AI Does

- Scores site readiness across grid, power cost, water, climate, carbon, and finance factors
- Compares markets side by side
- Simulates project fit for data centers, manufacturing, storage, solar, and EV charging
- Generates decision-oriented readiness signals
- Structures public data foundations for power, climate, water, carbon, and interconnection risk

## Platform Modules

- **Location Analyzer**: evaluates a selected market across readiness, risk, source confidence, and recommendation signals
- **Market Comparison**: compares multiple markets side by side for shortlisting and investment review
- **Scenario Simulator**: tests project fit across infrastructure archetypes such as AI data centers, manufacturing, storage, solar, and EV charging
- **Document Intelligence**: structures diligence signals from planning and infrastructure documents for future ingestion workflows
- **Scoring Methodology**: applies a weighted Grid Readiness formula with consistent score direction and recommendation bands
- **Data Source Layer**: normalizes external data foundations into cache-ready public datasets and source-confidence labels

## Data Intelligence Layer

GridReady AI is structured around public and semi-public infrastructure data foundations. Current implementation supports cache/sample data architecture for these sources, with production pipelines planned.

| Data foundation | Readiness area | Role in GridReady AI |
| --- | --- | --- |
| EIA retail electricity price foundation | Power Cost | Supports electricity-cost scoring by state and sector |
| FEMA National Risk Index foundation | Climate Risk | Supports climate and hazard exposure scoring |
| U.S. Drought Monitor / USGS water foundation | Water/Cooling Risk | Supports water availability, drought, and future monitoring signals |
| EPA eGRID carbon foundation | Carbon/Compliance Risk | Supports emissions intensity and resource-mix scoring |
| LBNL Interconnection Queue foundation | Grid Access and Time-to-Power | Supports queue congestion, completion, withdrawal, and duration signals |
| Local finance/ROI model | Finance/ROI | Supports early project economics and sensitivity screening |

The frontend reads normalized cache files from `public/data/*.json` when generated, checked-in sample files when available, and local fallback values when no external-style data is present.

## Scoring Methodology

Higher scores indicate stronger readiness and lower risk.

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

## Source Confidence Model

GridReady AI separates score values from source status so users can tell whether a score is backed by generated cache data, sample external-style data, or local fallback assumptions.

- `Verified cache`: generated cache data is present and being read by the application
- `External sample`: checked-in sample data using the normalized external-source shape is being used
- `Demo fallback`: local fallback values are being used

These labels describe current data status. They are not statistical confidence intervals.

## Current Implementation Status

This repository contains the public prototype and data architecture foundation for GridReady AI.

- Current version is a public MVP/prototype
- Uses sample/cache JSON foundations for external data architecture
- Not yet production-grade
- No backend, authentication, saved projects, or team workspace yet
- No live scheduled production data pipelines yet
- Intended for product validation, technical demonstration, and investor/developer review

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Local JSON cache/sample architecture
- Modular scoring and source-confidence helpers
- External-source adapter layer in `src/services/external`

## Project Structure

```text
src/
  components/        React UI sections
  data/              Market, project, use case, and document data
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

Quality checks:

```bash
npm run lint
npm run build
```

## Deployment

GridReady AI can be deployed as a static Vite application on Vercel.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Required environment variables: none for the public prototype
- Optional environment variable for local EIA cache generation: `EIA_API_KEY`

Deployment details: `docs/DEPLOYMENT.md`.

## Environment Variables

The application does not require API keys at runtime. `.env.example` documents the optional EIA fetch key:

```bash
EIA_API_KEY=your_eia_api_key_here
```

The browser never receives this key. The optional fetch script writes normalized JSON to `public/data/eia-retail-prices.json`.

## Limitations

- External source records in `public/data/*.sample.json` are sample/cache foundations, not live authoritative datasets.
- Several foundations are currently state-level and should move to utility, subregion, county, queue-region, or site-level matching.
- Finance/ROI scoring is an early local model and should be validated against project-specific assumptions.
- Document Intelligence is a structured product workflow, not live document ingestion yet.
- Production use will require backend services, data refresh jobs, evidence links, governance, audit trails, and customer-specific validation.

## Roadmap

- Real source cache pipelines for EIA, FEMA, Drought Monitor, USGS, EPA eGRID, and LBNL queue data
- Backend scoring API with versioned methodologies
- Saved site shortlists and project workspaces
- Decision memo export for investment committee and development review
- Document ingestion for utility reports, interconnection filings, zoning packets, and diligence materials
- Source provenance with retrieval timestamps, dataset versions, and evidence links
- Region, utility, queue-area, and site-level matching
- Team workspace for shared diligence projects

## Repository Status

This repository contains the public prototype and data architecture foundation for GridReady AI. It is intended to communicate the product direction, scoring logic, data model, and frontend workflow for an infrastructure intelligence platform.
