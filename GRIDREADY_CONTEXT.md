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
- Recharts
- Lucide React
- Local mock/demo data in `src/data/gridreadyData.js`

## Architecture
- Frontend-first single-page app.
- Modular sections live in `src/components`.
- Demo domain data is centralized in `src/data/gridreadyData.js`.
- Backend/API integration can later replace local arrays without rewriting the UI sections.

## Completed Features
- Premium navigation with section links and "Analyze a Site" CTA.
- Cinematic hero with original CSS/SVG power-grid visual.
- Why Now section with clearly labeled demo stat cards.
- Platform modules with data visuals.
- Interactive location risk analyzer for eight demo markets.
- Market comparison dashboard for three to five cities.
- Project scenario simulator for five project archetypes.
- AI document intelligence workflow mock demo.
- Use case cards and footer.
- Documentation memory files for future sessions.

## How To Run Locally
1. Install dependencies: `npm install`
2. Start local development server: `npm run dev`
3. Build production bundle: `npm run build`
4. Run lint checks: `npm run lint`

All market scores and document outputs are demo values for MVP validation, not official or live data.
