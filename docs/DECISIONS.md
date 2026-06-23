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
- Focus the primary workflow on location analysis, market comparison, project fit simulation, and document signal extraction.
- Keep business language direct and decision-oriented for infrastructure teams and investors.
- Include "best opportunity" and "biggest risk" outputs because users need directional diligence guidance, not just scores.

## Technical Decisions
- Build frontend-first with local mock data because the brief requested clean local data before backend complexity.
- Centralize demo domain data in `src/data/gridreadyData.js` so future API responses can follow the same shape.
- Keep reusable scoring logic in `src/lib/scoring.js` instead of embedding it in React components.
- Keep EIA API access out of browser code. Fetch scripts read `EIA_API_KEY` from the environment and write normalized public cache JSON.
- Use sample EIA cache data for MVP validation and fallback, while clearly marking it as sample data.
- Remove unused charting and icon dependencies after the final visual cleanup removed active charts and icons.
- Keep the app frontend-only until data provenance, API shape, and scoring requirements are clearer.

## Why Frontend-First Was Chosen
The MVP needs to validate the product narrative, interaction model, scoring presentation, and investor-quality interface before committing to backend architecture. A frontend-first build lets the team demo the decision workflow, collect feedback, and later replace local demo data with real APIs without discarding the product surface.
