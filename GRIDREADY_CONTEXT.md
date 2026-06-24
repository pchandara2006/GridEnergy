# GridReady AI Context

## Product Summary
GridReady AI is an infrastructure intelligence platform for power-heavy site decisions. It helps data center developers, manufacturers, utilities, clean-energy developers, EV charging networks, industrial real estate teams, and infrastructure investors compare power availability, grid timing, electricity cost, water/cooling constraints, climate exposure, carbon/compliance risk, and project economics before committing capital to a site.

Core tagline: "Power readiness intelligence for the next generation of infrastructure."

## Target Users
- AI data center development and energy strategy teams
- Advanced manufacturing site selection teams
- Utilities and grid planning teams
- Battery storage and solar developers
- EV charging network developers
- Infrastructure investors and industrial real estate teams

## Tech Stack
- React + Vite
- Tailwind CSS
- Local mock/demo data in `src/data/gridreadyData.js`
- Reusable scoring helpers in `src/lib/scoring.js`
- EIA retail price cache adapter in `src/services/external/eiaAdapter.js`
- FEMA National Risk Index cache adapter in `src/services/external/femaRiskAdapter.js`
- U.S. Drought Monitor cache adapter in `src/services/external/droughtMonitorAdapter.js`
- USGS Water Data placeholder adapter in `src/services/external/usgsWaterAdapter.js`
- EPA eGRID cache adapter in `src/services/external/egridAdapter.js`
- LBNL Interconnection Queue cache adapter in `src/services/external/lbnlQueueAdapter.js`

## Architecture
- Public prototype single-page application for product validation and technical demonstration.
- Modular sections live in `src/components`.
- Demo domain data is centralized in `src/data/gridreadyData.js`.
- Scenario scoring logic is isolated in `src/lib/scoring.js`.
- Grid Readiness uses one official weighted formula where Grid Access and Time-to-Power each carry 20% weight.
- Source confidence is normalized as `Verified cache`, `External sample`, or `Demo fallback`.
- Power Cost Score can use normalized EIA retail-price cache data from `public/data/eia-retail-prices.json`, with sample/demo fallback.
- Climate Risk Score can use normalized FEMA National Risk Index cache data from `public/data/fema-risk.json`, with sample/demo fallback.
- Water/Cooling Risk can use normalized U.S. Drought Monitor cache data from `public/data/drought-risk.json`, with sample/demo fallback.
- Carbon/Compliance Risk can use normalized EPA eGRID-style cache data from `public/data/egrid-carbon.json`, with sample/demo fallback.
- Grid Access and Time-to-Power Scores can use normalized LBNL Interconnection Queue-style cache data from `public/data/lbnl-queue-risk.json`, with sample/demo fallback.
- Backend/API integration can later replace local arrays without rewriting the UI sections.

## Completed Features
- Premium navigation with section links and "Analyze a Site" CTA.
- Clean light navigation with a custom minimal GridReady mark.
- Editorial hero with a calm product-preview memo instead of a neon grid visual.
- Why Now section with clean metric rows.
- Horizontal platform modules with restrained product visuals.
- Interactive light-mode location risk analyzer for eight demo markets.
- Market comparison dashboard in investment-committee memo style.
- Guided project scenario simulator for five project archetypes.
- AI document intelligence review workspace with document signals and review snippets.
- Minimal use case section and clean graphite footer.
- Documentation memory files for future sessions.
- EIA retail price cache foundation for Power Cost Score.
- FEMA National Risk Index cache foundation for Climate Risk Score.
- U.S. Drought Monitor cache/sample foundation for Water/Cooling Risk.
- USGS Water Data placeholder shape for future streamflow, groundwater, and monitoring-site signals.
- EPA eGRID cache/sample foundation for Carbon/Compliance Risk.
- LBNL Interconnection Queue cache/sample foundation for Grid Access and Time-to-Power Scores.
- Scoring methodology and trust layer for consistent score direction, recommendation bands, source labels, and fallback explanations.
- Public-demo documentation, deployment guide, demo script, pitch brief, and project status summary.
- Product-first GitHub README positioning for infrastructure intelligence, with current implementation status and limitations moved below the core product narrative.

## Current Visual Language
The frontend was redesigned from a neon/dark dashboard to a clean premium infrastructure SaaS style inspired by Apple/Robinhood/Snowflake-style clarity and editorial Awwwards-level spacing. The interface now uses off-white surfaces, graphite text, restrained borders, tables, and memo-style hierarchy.

## How To Run Locally
1. Install dependencies: `npm install`
2. Start local development server: `npm run dev`
3. Build production bundle: `npm run build`
4. Run lint checks: `npm run lint`

All market scores and document outputs use public-prototype data foundations unless local EIA, FEMA, drought-risk, eGRID, or LBNL queue caches are generated. Sample cache data is also sample data, not official live data. Higher scores always mean stronger readiness or lower risk.

## Deployment Notes
- Static Vite deployment is supported.
- Public demo requires no runtime API keys.
- Optional `EIA_API_KEY` is only for local cache generation with `npm run fetch:eia`.
- Deployment instructions live in `docs/DEPLOYMENT.md`.
