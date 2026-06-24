export function calculateProjectFit(location, project) {
  const weighted = Object.entries(project.weights).reduce(
    (acc, [key, weight]) => {
      acc.total += location.categories[key] * weight;
      acc.weight += weight;
      return acc;
    },
    { total: 0, weight: 0 },
  );

  return Math.round(weighted.total / weighted.weight);
}

export function getProjectFitRating(score) {
  if (score >= 78) return 'Strong fit';
  if (score >= 65) return 'Conditional fit';
  return 'High diligence required';
}

export function getWeakestCategory(categories) {
  return Object.entries(categories).sort((a, b) => a[1] - b[1])[0];
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function calculatePowerCostScoreFromPrice(priceCentsPerKwh, sector = 'industrial') {
  const price = Number.parseFloat(priceCentsPerKwh);
  if (!Number.isFinite(price)) return null;

  const normalizedSector = String(sector).toLowerCase();
  const lowPrice = normalizedSector === 'commercial' ? 8 : 5;
  const highPrice = normalizedSector === 'commercial' ? 24 : 16;
  const score = 100 - ((price - lowPrice) / (highPrice - lowPrice)) * 100;

  return clampScore(score);
}

export function explainPowerCostScore(priceCentsPerKwh, sector = 'industrial') {
  const score = calculatePowerCostScoreFromPrice(priceCentsPerKwh, sector);
  if (score === null) {
    return 'Power cost score uses the local demo estimate because no valid EIA retail price record is available.';
  }

  return `Power cost score maps ${sector} electricity price (${priceCentsPerKwh} cents/kWh) to a 0-100 score, where lower prices score higher.`;
}

export function calculateClimateRiskScore(riskIndexScore) {
  const risk = Number.parseFloat(riskIndexScore);
  if (!Number.isFinite(risk)) return null;

  return clampScore(100 - risk);
}

export function explainClimateRiskScore(riskIndexScore) {
  const score = calculateClimateRiskScore(riskIndexScore);
  if (score === null) {
    return 'Climate Risk Score uses the local demo estimate because no valid FEMA National Risk Index record is available.';
  }

  return `Climate Risk Score maps FEMA National Risk Index risk (${riskIndexScore}) to a 0-100 readiness score, where lower risk scores higher.`;
}

export function calculateWaterCoolingRiskScore(droughtSeverityScore) {
  const severity = Number.parseFloat(droughtSeverityScore);
  if (!Number.isFinite(severity)) return null;

  return clampScore(100 - severity * 17);
}

export function explainWaterCoolingRiskScore(droughtCategory, droughtSeverityScore) {
  const score = calculateWaterCoolingRiskScore(droughtSeverityScore);
  if (score === null) {
    return 'Water/Cooling Risk Score uses the local demo estimate because no valid drought-risk record is available.';
  }

  return `Water/Cooling Risk Score maps U.S. Drought Monitor category ${droughtCategory} to a 0-100 readiness score, where lower drought severity scores higher.`;
}

export function calculateCarbonComplianceScore(input, renewableSharePercent, fossilSharePercent) {
  const values =
    typeof input === 'object' && input !== null
      ? input
      : {
          co2RateLbPerMwh: input,
          renewableSharePercent,
          fossilSharePercent,
        };

  const co2Rate = Number.parseFloat(values.co2RateLbPerMwh);
  const renewableShare = Number.parseFloat(values.renewableSharePercent);
  const fossilShare = Number.parseFloat(values.fossilSharePercent);

  if (!Number.isFinite(co2Rate) || !Number.isFinite(renewableShare) || !Number.isFinite(fossilShare)) return null;

  const co2RateScore = 100 - (co2Rate / 1500) * 100;
  const renewableScore = renewableShare;
  const fossilScore = 100 - fossilShare;
  const weightedScore = co2RateScore * 0.55 + renewableScore * 0.3 + fossilScore * 0.15;

  return clampScore(weightedScore);
}

export function explainCarbonComplianceScore(record) {
  const score = calculateCarbonComplianceScore(record);
  if (score === null) {
    return 'Carbon/Compliance Risk Score uses the local demo estimate because no valid EPA eGRID record is available.';
  }

  return `Carbon/Compliance Risk Score blends EPA eGRID-style CO2 rate, renewable share, and fossil share into a 0-100 readiness score.`;
}
