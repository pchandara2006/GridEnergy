# Decisions

## Design Decisions
- Use a deep graphite and black base with electric blue, cyan, and soft green accents to match the requested enterprise energy innovation direction.
- Use original CSS/SVG grid visuals instead of external imagery to avoid copied brand assets and keep the MVP self-contained.
- Use dense, polished product sections rather than a generic marketing landing page, because the product needs to feel investor-ready and operational.
- Use consistent panel styling, score rings, risk bars, and chart treatments to create a unified intelligence-platform feel.

## Product Decisions
- Clearly label the dataset as a demo dataset for MVP validation.
- Focus the primary workflow on location analysis, market comparison, project fit simulation, and document signal extraction.
- Keep business language direct and decision-oriented for infrastructure teams and investors.
- Include "best opportunity" and "biggest risk" outputs because users need directional diligence guidance, not just scores.

## Technical Decisions
- Build frontend-first with local mock data because the brief requested clean local data before backend complexity.
- Centralize demo domain data in `src/data/gridreadyData.js` so future API responses can follow the same shape.
- Use Recharts for charting because it fits the requested stack and supports responsive charts quickly.
- Use Lucide React for iconography because it keeps the UI crisp without custom SVG icon maintenance.

## Why Frontend-First Was Chosen
The MVP needs to validate the product narrative, interaction model, scoring presentation, and investor-quality interface before committing to backend architecture. A frontend-first build lets the team demo the decision workflow, collect feedback, and later replace local demo data with real APIs without discarding the product surface.
