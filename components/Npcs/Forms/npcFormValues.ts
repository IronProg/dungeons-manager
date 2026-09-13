// eslint-disable-next-line no-restricted-imports -- the isolated CommonJS form-values test needs a resolvable type-only import.
import type { Npc, NpcScalars } from '../../../types/npc';

export const getChangedNpcScalars = <T extends NpcScalars>(
  initialValues: T,
  values: T,
): NpcScalars =>
  Object.fromEntries(
    Object.entries(values).filter(
      ([key, value]) => initialValues[key as keyof T] !== value,
    ),
  ) as NpcScalars;

export const getNpcGeneralDefaultValues = (
  npc: Pick<
    Npc,
    | 'name'
    | 'hitPoints'
    | 'hitPointsLimit'
    | 'hitPointsLimitTemporary'
    | 'temporaryHitPoints'
    | 'armorClass'
    | 'speeds'
    | 'senses'
    | 'languages'
    | 'challengeRating'
    | 'challengeRatingInfo'
  >,
) => ({
  name: npc.name,
  hitPoints: npc.hitPoints,
  hitPointsLimit: npc.hitPointsLimit,
  hitPointsLimitTemporary: npc.hitPointsLimitTemporary,
  temporaryHitPoints: npc.temporaryHitPoints,
  armorClass: npc.armorClass,
  speeds: npc.speeds ?? '',
  senses: npc.senses ?? '',
  languages: npc.languages ?? '',
  challengeRating: npc.challengeRating,
  challengeRatingInfo: npc.challengeRatingInfo ?? '',
});
