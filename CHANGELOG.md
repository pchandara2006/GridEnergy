# Changelog

## 2026-06-23
- Added EIA retail price cache/sample integration foundation for Power Cost Score.
- Added `src/services/external/eiaAdapter.js`, `scripts/fetchEiaRetailPrices.js`, `.env.example`, and EIA sample cache data.
- Added `docs/DATA_SOURCES.md` and `docs/EIA_INTEGRATION.md`.
- Added `npm run fetch:eia`.
- Added `README.md` with product summary, problem, target users, features, tech stack, local run instructions, and future data integrations.
- Moved project scenario scoring helpers into `src/lib/scoring.js`.
- Added reusable demo-data notice metadata in `src/data/gridreadyData.js`.
- Removed unused Recharts and Lucide React dependencies after the visual cleanup removed active charts and icons.
- Moved build and styling packages to `devDependencies`, leaving React packages as runtime dependencies.
- Ran a second strict cleanup pass to further reduce template-like UI treatments.
- Replaced circular score visuals with plain numeric score treatments, muted status styling, removed unused card/badge/frame CSS primitives, and reduced remaining accent-color usage.
- Completed final strict visual cleanup for the premium GridReady interface.
- Removed remaining AI-generated cues including decorative hero sketching, arrow icons, fake chart blocks, excess badges, repeated mini-cards, confidence chips, and the nonfunctional mobile menu icon.
- Simplified key sections around typography, dividers, restrained tables, and memo-style hierarchy without adding features or sections.
- Redesigned visual language from neon/dark dashboard to clean premium infrastructure SaaS inspired by Apple/Robinhood/Snowflake-style clarity and editorial Awwwards-level spacing.
- Replaced glowing grid hero with a light editorial hero and calm site-readiness product preview.
- Reworked navigation, why-now metrics, platform modules, analyzer, comparison view, simulator, document review workspace, use cases, and footer with off-white surfaces, graphite text, muted green/blue accents, and memo-style layouts.
- Removed active use of neon grid, glass panel, scan-band, pulse-node, and energy-line styling.

## 2026-06-23 Initial MVP
- Created the GridReady AI React + Vite MVP scaffold.
- Added Tailwind CSS, Recharts, and Lucide React configuration.
- Built premium navigation, hero, why-now, platform modules, analyzer, comparison dashboard, scenario simulator, document intelligence mock demo, use cases, and footer.
- Added centralized mock/demo data for eight markets and five project types.
- Added project memory documentation: context, TODOs, decisions, data model, and GitHub workflow notes.

Important files updated:
- `src/App.jsx`
- `src/components/*`
- `src/data/gridreadyData.js`
- `src/index.css`
- `GRIDREADY_CONTEXT.md`
- `TODO.md`
- `docs/DECISIONS.md`
- `docs/DATA_MODEL.md`
- `docs/GITHUB_WORKFLOW.md`
