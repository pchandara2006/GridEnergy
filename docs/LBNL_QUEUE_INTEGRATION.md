# LBNL Interconnection Queue Integration

## Why Queue Data Matters

Grid access and time-to-power are often the gating risks for power-heavy infrastructure. A site can look strong on land, incentives, demand, or power price and still fail if interconnection studies, transmission upgrades, queue congestion, or utility delivery timelines delay the project.

GridReady AI treats interconnection queue data as a readiness signal for data centers, manufacturers, clean-energy developers, EV charging networks, and infrastructure investors that need early visibility into grid capacity and delivery timing.

## What LBNL Queue Data Represents

Lawrence Berkeley National Laboratory's Queued Up work tracks proposed generation and storage projects seeking transmission interconnection. The public research and data describe active queue capacity, technology mix, project outcomes, withdrawals, interconnection agreements, and queue duration trends across ISOs/RTOs and non-ISO utilities.

For GridReady AI, the current architecture normalizes LBNL-style queue records into a cache/sample shape with:

- Active queue capacity
- Storage, solar, and gas queue capacity
- Withdrawn capacity share
- Completed capacity share
- Median queue duration
- Interconnection agreement share
- Queue congestion level
- Queue region
- Reporting year

## Frontend Read Path

The frontend does not call live LBNL data files. It reads normalized public JSON through `src/services/external/lbnlQueueAdapter.js`:

1. Try `/data/lbnl-queue-risk.json`
2. Fall back to `/data/lbnl-queue-risk.sample.json`
3. Fall back to existing demo Grid Access and Time-to-Power values

Normalized frontend shape:

```json
{
  "stateId": "TX",
  "stateName": "Texas",
  "queueRegion": "ERCOT",
  "activeQueueMw": 76000,
  "storageQueueMw": 31500,
  "solarQueueMw": 29200,
  "gasQueueMw": 9800,
  "withdrawnSharePercent": 49,
  "completedSharePercent": 24,
  "medianQueueDurationYears": 3.2,
  "interconnectionAgreementSharePercent": 33,
  "queueCongestionLevel": "High",
  "reportingYear": 2025,
  "source": "LBNL Interconnection Queue",
  "isSample": true
}
```

## How It Maps To Grid Access Score

`calculateGridAccessScore()` maps queue congestion signals to a 0-100 readiness score:

- Higher active queue capacity = lower readiness
- Higher withdrawn share = lower readiness
- Higher completed share = higher readiness
- Higher interconnection agreement share = higher readiness
- Score is clamped between 0 and 100

Current formula:

```text
Queue pressure penalty = min((activeQueueMw / 60000) * 35, 35)
Withdrawn penalty = withdrawnSharePercent * 0.35
Completed signal = completedSharePercent * 0.25
Agreement signal = interconnectionAgreementSharePercent * 0.15
Grid Access Score = 100 - queue pressure penalty - withdrawn penalty + completed signal + agreement signal
```

## How It Maps To Time-To-Power Score

`calculateTimeToPowerScore()` maps queue duration and agreement signals to a 0-100 readiness score:

- Higher median queue duration = lower readiness
- Higher interconnection agreement share = better readiness
- Higher withdrawn share = lower readiness
- Score is clamped between 0 and 100

Current formula:

```text
Duration penalty = medianQueueDurationYears * 14
Agreement signal = interconnectionAgreementSharePercent * 0.25
Withdrawn penalty = withdrawnSharePercent * 0.15
Time-to-Power Score = 100 - duration penalty + agreement signal - withdrawn penalty
```

The formulas are intentionally simple for MVP transparency. Production scoring should tune weights by project type, load size, voltage, utility territory, study phase, and interconnection reform status.

## Current Sample-Data Limitations

- `public/data/lbnl-queue-risk.sample.json` is sample MVP data only.
- The current records are state-level stand-ins for queue-style data, not official live LBNL records.
- State-level queue signals can hide major differences by ISO/RTO, utility, county, substation, project type, and voltage class.
- The score does not yet model behind-the-meter load interconnection, transmission upgrade cost, feeder capacity, utility-specific study timelines, or project-specific power delivery requests.

## Future Region/Utility/Project-Level Improvement

Production scoring should move from state-level sample records to region, utility, and project-level queue matching. Future versions should preserve:

- LBNL dataset version and reporting year
- ISO/RTO, utility, county, and queue region
- Technology type and project status
- Interconnection request date, study phase, agreement status, and commercial operation date where available
- Withdrawal and completion outcome history
- Retrieval timestamp
- Source file URL and evidence links
- Confidence metadata and known data gaps

This is important because data centers, manufacturers, clean-energy developers, and infrastructure investors need early warnings when interconnection timelines or grid access constraints can overwhelm otherwise attractive project economics.
