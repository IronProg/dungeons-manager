export const getNextNpcHitPoints = (
  hitPoints: number,
  hitPointsLimit: number,
  change: number,
) => Math.min(Math.max(hitPoints + change, 0), hitPointsLimit);
