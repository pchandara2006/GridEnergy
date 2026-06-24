# GridReady AI TODO

## Next Development Tasks
- Add a lightweight test runner and unit tests for `src/lib/scoring.js`.
- Add tests for `calculateGridReadinessScore()`, score bands, recommendations, and source confidence labels.
- Add tests for `src/services/external/eiaAdapter.js`.
- Add tests for `src/services/external/femaRiskAdapter.js`.
- Add tests for `src/services/external/droughtMonitorAdapter.js`.
- Add tests for `src/services/external/usgsWaterAdapter.js` once the adapter grows beyond placeholder normalization.
- Add tests for `src/services/external/egridAdapter.js`.
- Add tests for `src/services/external/lbnlQueueAdapter.js`.
- Replace EIA sample cache with generated cache during real data validation.
- Replace FEMA state-level sample cache with county or tract-level generated cache during real data validation.
- Replace Drought Monitor state-level sample cache with county, ZIP, or watershed-level generated cache during real data validation.
- Replace eGRID state-level sample cache with subregion-level generated cache during real data validation.
- Replace LBNL queue state-level sample cache with region, utility, and project-level generated cache during real data validation.
- Decide how USGS streamflow, groundwater, and monitoring-site signals should influence Water/Cooling Risk.
- Add source-provenance fields to demo data before connecting real datasets.
- Add methodology version IDs to score outputs before backend scope begins.
- Add visual QA screenshots for desktop, tablet, and mobile after the clean premium redesign.
- Add a reusable design token reference for the light editorial system.
- Add URL state for selected location, comparison set, and project scenario.
- Add exportable investor memo or PDF summary for a selected market.
- Add authentication-ready app shell when backend scope begins.
- Add more chart views for electricity cost volatility, queue timing, and carbon exposure.
- Add accessibility pass with keyboard testing across interactive sections.

## Bugs / Follow-Up QA
- Validate the responsive layout manually across common tablet and mobile viewport sizes.
- Review mobile table behavior for the investment committee comparison view after real device testing.
- Confirm any future chart labels remain readable on narrow mobile screens if charting is reintroduced.

## Future Backend / API Ideas
- API endpoint for market search and saved site shortlists.
- Backend job for scheduled EIA cache refreshes and provenance tracking.
- Backend job for FEMA National Risk Index cache refreshes and geography matching.
- Backend job for U.S. Drought Monitor cache refreshes and geography matching.
- Backend job for USGS Water Data cache refreshes once water monitoring signals are prioritized.
- Backend job for EPA eGRID cache refreshes and subregion matching.
- Backend job for LBNL queue cache refreshes and queue-region matching.
- Scenario scoring service with versioned scoring models.
- Document ingestion pipeline for utility reports, interconnection filings, and zoning packets.
- User accounts, team workspaces, and shared diligence projects.
- Audit log for score changes and source evidence.

## Future Real-Data Integrations
- Utility integrated resource plans and capacity maps.
- LBNL interconnection queue datasets and ISO/RTO queue details.
- EIA electricity price and demand datasets.
- NOAA climate and heat-risk datasets.
- U.S. Drought Monitor and USGS water datasets.
- EPA eGRID emissions rates and resource-mix datasets.
- Local permitting, zoning, and community hearing records.
- Incentive, carbon compliance, and policy databases.
