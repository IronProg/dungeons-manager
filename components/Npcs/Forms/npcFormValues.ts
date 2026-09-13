// eslint-disable-next-line no-restricted-imports -- the isolated CommonJS form-values test needs a resolvable type-only import.
import type { NpcScalars } from '../../../types/npc';

export const getChangedNpcScalars = <T extends NpcScalars>(
  initialValues: T,
  values: T,
): NpcScalars =>
  Object.fromEntries(
    Object.entries(values).filter(
      ([key, value]) => initialValues[key as keyof T] !== value,
    ),
  ) as NpcScalars;
