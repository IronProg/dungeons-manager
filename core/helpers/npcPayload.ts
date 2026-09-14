// eslint-disable-next-line no-restricted-imports -- the isolated CommonJS payload test needs a resolvable type-only import.
import type {
  NpcAttackParams,
  NpcDamageParams,
  NpcEntryParams,
  NpcScalars,
  NpcUpdateParams,
} from '../../types/npc';

type NpcDamageEditorValues = Omit<NpcDamageParams, '_destroy'> & {
  deleted?: boolean;
};

type NpcAttackEditorValues = NpcAttackParams;

type NpcEntryEditorValues = Omit<
  NpcEntryParams,
  'npcAttackAttributes' | 'npcDamagesAttributes' | '_destroy'
> & {
  attack?: NpcAttackEditorValues;
  damages?: NpcDamageEditorValues[];
  deleted?: boolean;
};

export type NpcEditorValues = {
  scalars: NpcScalars;
  entries?: NpcEntryEditorValues[];
};

const omitUndefined = <T extends object>(value: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined),
  ) as Partial<T>;

const toDamageParams = ({
  deleted,
  ...damage
}: NpcDamageEditorValues): NpcDamageParams => ({
  ...omitUndefined(damage),
  ...(deleted ? { _destroy: true } : {}),
});

const toAttackParams = (attack: NpcAttackEditorValues): NpcAttackParams =>
  omitUndefined(attack) as NpcAttackParams;

const toEntryParams = ({
  attack,
  damages,
  deleted,
  kind,
  ...entry
}: NpcEntryEditorValues): NpcEntryParams => {
  const params: NpcEntryParams = {
    ...omitUndefined({ ...entry, kind }),
    ...(deleted ? { _destroy: true } : {}),
  };

  if (kind === 'action') {
    if (attack) params.npcAttackAttributes = toAttackParams(attack);
    if (damages) params.npcDamagesAttributes = damages.map(toDamageParams);
  }

  return params;
};

export const buildNpcUpdatePayload = (
  values: NpcEditorValues,
): NpcUpdateParams => ({
  ...omitUndefined(values.scalars),
  ...(values.entries
    ? { entriesAttributes: values.entries.map(toEntryParams) }
    : {}),
});
