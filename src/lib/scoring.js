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
