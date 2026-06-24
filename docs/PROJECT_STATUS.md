# Project Status

This repository contains the public prototype and data architecture foundation for GridReady AI, an infrastructure intelligence platform for power-heavy site decisions.

## Complete

- React + Vite public prototype
- Premium static UI for product validation and technical demonstration
- Location Analyzer
- Market Comparison
- Scenario Simulator
- Document Intelligence mock workflow
- Official weighted Grid Readiness formula
- Score bands and recommendations
- Source confidence labels
- External data adapter architecture for EIA, FEMA, Drought Monitor, EPA eGRID, and LBNL queue data
- USGS Water Data placeholder adapter
- Sample JSON files in `public/data`
- Deployment-ready static build
- Product-first GitHub README and public repository documentation

## Demo / Sample

- Demo market data in `src/data/gridreadyData.js`
- Sample external-style JSON files in `public/data/*.sample.json`
- Document Intelligence signals and snippets
- Finance/ROI category score
- Market recommendations and project-fit outputs

## Not Live Yet

- Production data pipelines
- Backend API
- Authentication
- Saved site shortlists
- Team workspaces
- Live utility territory or substation matching
- County, tract, queue-region, or site-level geography matching
- Real document ingestion
- Evidence links and audit trail

## Next Technical Priorities

- Add unit tests for scoring helpers and external adapters
- Add generated cache pipelines beyond EIA
- Add source provenance, timestamps, and dataset versions
- Add methodology version IDs to score outputs
- Add backend API for scoring and saved site evaluations
- Add deployment smoke-test checklist to future release workflow

## Next Product Priorities

- Validate target buyer workflow with infrastructure developers and investors
- Add an exportable investment memo
- Add project-specific scoring profiles by load size and project type
- Improve geography matching from state-level to utility/region/site-level
- Define production evidence requirements for each score
- Refine repository presentation around product traction, buyer workflow, and deployment proof points as the platform matures
