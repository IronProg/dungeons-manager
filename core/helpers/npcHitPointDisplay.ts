export const getNpcTemporaryHitPointsText = (
  temporaryHitPoints?: number | null,
) =>
  temporaryHitPoints && temporaryHitPoints > 0
    ? `(${temporaryHitPoints})`
    : undefined;
