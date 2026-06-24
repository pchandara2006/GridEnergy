# Decisions

## Design Decisions
- Redesigned visual language from neon/dark dashboard to clean premium infrastructure SaaS inspired by Apple/Robinhood/Snowflake-style clarity and editorial Awwwards-level spacing.
- Use mostly light and off-white surfaces with graphite text, deep forest green, muted blue, soft silver, and restrained earth-tone risk states.
- Removed the glowing grid hero, glassmorphism panels, scan-band effect, pulsing nodes, and neon energy lines because they made the product feel robotic and dashboard-heavy.
- Use editorial spacing, memo-style product frames, clean tables, and restrained score lines to make the product feel more like financial-grade site intelligence.
- Keep a custom minimal logo mark made from simple node/line geometry rather than a lightning or generic AI icon.

## Product Decisions
- Clearly label the dataset as a demo dataset for MVP validation.
- Use EIA retail electricity price data as the first external-data foundation because it is public, state-level, and relevant to Power Cost Score.
- Use FEMA National Risk Index as the second external-data foundation because it is a public, infrastructure-relevant baseline for natural hazard exposure and resilience.
- Use U.S. Drought Monitor data as the third external-data foundation because drought severity is a clear public baseline for water/cooling readiness.
- Treat USGS Water Data as a planned enrichment source for streamflow, groundwater, and monitoring-site evidence once site-level geography matching is available.
- Use EPA eGRID as the fourth external-data foundation because emissions rates and resource mix are practical public baselines for Carbon/Compliance Risk.
- Use LBNL Interconnection Queue data as the fifth external-data foundation because grid access and delivery timing are often gating risks for power-heavy projects.
- Focus the primary workflow on location analysis, market comparison, project fit simulation, and document signal extraction.
- Keep business language direct and decision-oriented for infrastructure teams and investors.
- Include "best opportunity" and "biggest risk" outputs because users need directional diligence guidance, not just scores.
- Use one score direction across the product: higher scores always mean stronger readiness or lower risk.
- Weight Grid Access and Time-to-Power highest in Grid Readiness because deliverable power and delivery timing are the central diligence question.

## Technical Decisions
- Build frontend-first with local mock data because the brief requested clean local data before backend complexity.
- Centralize demo domain data in `src/data/gridreadyData.js` so future API responses can follow the same shape.
- Keep reusable scoring logic in `src/lib/scoring.js` instead of embedding it in React components.
- Keep score bands, recommendations, source confidence labels, and the official Grid Readiness formula in `src/lib/scoring.js`.
- Keep EIA API access out of browser code. Fetch scripts read `EIA_API_KEY` from the environment and write normalized public cache JSON.
- Use sample EIA cache data for MVP validation and fallback, while clearly marking it as sample data.
- Use FEMA cache/sample JSON in the browser rather than calling external geospatial APIs directly from the UI.
- Start with state-level FEMA sample data, then move to county or tract-level matching when real site geographies are introduced.
- Use Drought Monitor cache/sample JSON in the browser rather than live frontend API calls.
- Start with state-level drought sample data, then move to county, ZIP, watershed, or site-buffer matching when real site geographies are introduced.
- Keep USGS Water Data as a normalized adapter placeholder until a backend cache job and scoring role are defined.
- Use EPA eGRID cache/sample JSON in the browser rather than live frontend data fetching.
- Start with state-level eGRID-style sample data, then move to eGRID subregion-level matching when real site geographies and service territories are introduced.
- Use LBNL queue cache/sample JSON in the browser rather than live frontend data fetching.
- Start with state-level LBNL queue-style sample data, then move to ISO/RTO, utility, queue-region, and project-level matching when real site geographies are introduced.
- Remove unused charting and icon dependencies after the final visual cleanup removed active charts and icons.
- Keep the app frontend-only until data provenance, API shape, and scoring requirements are clearer.

## Why Frontend-First Was Chosen
The MVP needs to validate the product narrative, interaction model, scoring presentation, and investor-quality interface before committing to backend architecture. A frontend-first build lets the team demo the decision workflow, collect feedback, and later replace local demo data with real APIs without discarding the product surface.
