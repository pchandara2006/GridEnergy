# GridReady AI Context

## Product Summary
GridReady AI is an enterprise intelligence MVP for infrastructure site selection. It helps data centers, manufacturers, utilities, clean-energy developers, industrial real estate teams, and infrastructure investors understand where power is available, where grid delays are likely, and where electricity costs or other operating risks could damage project ROI.

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
- Frontend-first single-page app.
- Modular sections live in `src/components`.
- Demo domain data is centralized in `src/data/gridreadyData.js`.
- Scenario scoring logic is isolated in `src/lib/scoring.js`.
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

## Current Visual Language
The frontend was redesigned from a neon/dark dashboard to a clean premium infrastructure SaaS style inspired by Apple/Robinhood/Snowflake-style clarity and editorial Awwwards-level spacing. The interface now uses off-white surfaces, graphite text, restrained borders, tables, and memo-style hierarchy.

## How To Run Locally
1. Install dependencies: `npm install`
2. Start local development server: `npm run dev`
3. Build production bundle: `npm run build`
4. Run lint checks: `npm run lint`

All market scores and document outputs are demo values for MVP validation unless local EIA, FEMA, drought-risk, eGRID, or LBNL queue caches are generated. Sample cache data is also sample data, not official live data.
