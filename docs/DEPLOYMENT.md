# Deployment

GridReady AI is a Vite React app and can be deployed as a static site.

## Run Locally

```bash
npm install
npm run dev
```

Open the Vite local URL shown in the terminal, usually `http://127.0.0.1:5173/`.

## Build

```bash
npm run build
```

The production bundle is written to:

```text
dist/
```

## Deploy On Vercel

Recommended Vercel settings:

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root

The app does not require runtime environment variables for the public demo.

## Environment Variable Notes

`.env.example` documents the optional `EIA_API_KEY` used only by the local EIA fetch script:

```bash
EIA_API_KEY=your_eia_api_key_here
```

Do not add this key to client-side code. The public demo works without it because sample JSON files are checked into `public/data`.

## Demo Data Limitations

- `public/data/*.sample.json` files are sample records for MVP validation.
- Generated cache files, when present, should be treated as public frontend assets.
- The public demo should not be presented as live infrastructure intelligence.
- Finance/ROI is still a local demo estimate.

## Static Asset Checklist

Confirm these files exist before deployment:

- `public/data/eia-retail-prices.sample.json`
- `public/data/fema-risk.sample.json`
- `public/data/drought-risk.sample.json`
- `public/data/egrid-carbon.sample.json`
- `public/data/lbnl-queue-risk.sample.json`

## Post-Deploy Checklist

- Open the deployed homepage and confirm it loads without console errors.
- Confirm Location Analyzer can switch demo markets.
- Confirm Market Comparison ranks selected markets.
- Confirm Scenario Simulator works for `100 MW AI Data Center`.
- Confirm source confidence labels show `External sample` or `Demo fallback`.
- Confirm no API keys or local filesystem paths appear in browser output.
- Confirm `npm run lint` and `npm run build` pass locally before pushing future deployment changes.
