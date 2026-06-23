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
