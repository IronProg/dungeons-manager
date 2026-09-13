type NpcEntryKind = 'trait' | 'reaction' | 'action' | 'legendaryAction';

type NpcScalars = object;

type NpcDamageParams = {
  id?: number;
  diceAmount?: number;
  diceSize?: number;
  mainAttribute?: string | null;
  customBonus?: number | null;
  kind?: string | null;
  _destroy?: true;
};

type NpcAttackParams = {
  id?: number;
  mainAttribute?: string | null;
  applyProficiency?: boolean;
  customBonus?: number | null;
  range?: string | null;
  properties?: string | null;
  description?: string | null;
  _destroy?: true;
};

type NpcEntryParams = {
  id?: number;
  kind?: NpcEntryKind;
  title?: string;
  description?: string;
  cost?: number | null;
  npcAttackAttributes?: NpcAttackParams;
  npcDamagesAttributes?: NpcDamageParams[];
  _destroy?: true;
};

type NpcUpdateParams = NpcScalars & { entriesAttributes?: NpcEntryParams[] };

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

const omitUndefined = <T extends Record<string, unknown>>(
  value: T,
): Partial<T> =>
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
  ...omitUndefined(values.scalars as Record<string, unknown>),
  ...(values.entries
    ? { entriesAttributes: values.entries.map(toEntryParams) }
    : {}),
});
