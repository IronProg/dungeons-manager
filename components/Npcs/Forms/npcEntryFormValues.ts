// eslint-disable-next-line no-restricted-imports -- the isolated CommonJS form-values test needs resolvable imports.
import {
  buildNpcUpdatePayload,
  type NpcEditorValues,
} from '../../../core/helpers/npcPayload';
// eslint-disable-next-line no-restricted-imports -- the isolated CommonJS form-values test needs resolvable type-only imports.
import type {
  NpcAttackParams,
  NpcDamage,
  NpcDamageParams,
  NpcEntry,
  NpcEntryKind,
  NpcEntryParams,
} from '../../../types/npc';

type NpcDamageFormValues = Omit<
  NpcDamageParams,
  'diceAmount' | 'diceSize' | '_destroy'
> & {
  diceAmount?: number | null;
  diceSize?: number | null;
  deleted?: boolean;
};

export type NpcEntryFormValues = Omit<
  NpcEntryParams,
  'npcAttackAttributes' | 'npcDamagesAttributes' | '_destroy'
> & {
  kind: NpcEntryKind;
  title: string;
  description: string;
  attack?: NpcAttackParams;
  damages?: NpcDamageFormValues[];
};

const toAttackFormValues = (
  attack: NonNullable<NpcEntry['npcAttack']>,
): NpcAttackParams => ({
  id: attack.id,
  mainAttribute: attack.mainAttribute ?? null,
  applyProficiency: attack.applyProficiency,
  customBonus: attack.customBonus ?? null,
  range: attack.range ?? '',
  properties: attack.properties ?? '',
  description: attack.description ?? '',
});

const toDamageFormValues = (damage: NpcDamage): NpcDamageFormValues => ({
  id: damage.id,
  diceAmount: damage.diceAmount,
  diceSize: damage.diceSize,
  mainAttribute: damage.mainAttribute ?? null,
  customBonus: damage.customBonus ?? null,
  kind: damage.kind ?? '',
});

export const getNpcEntryDefaultValues = (
  entry?: NpcEntry,
  kind: NpcEntryKind = 'trait',
): NpcEntryFormValues => ({
  id: entry?.id,
  kind: entry?.kind ?? kind,
  title: entry?.title ?? '',
  description: entry?.description ?? '',
  cost: entry?.cost ?? '',
  ...(entry?.kind === 'action'
    ? {
        attack: entry.npcAttack
          ? toAttackFormValues(entry.npcAttack)
          : undefined,
        damages: entry.npcDamages?.map(toDamageFormValues) ?? [],
      }
    : {}),
});

export const buildNpcEntryParams = (
  values: NpcEntryFormValues,
): NpcEntryParams =>
  buildNpcUpdatePayload({
    scalars: {},
    entries: [values as NonNullable<NpcEditorValues['entries']>[number]],
  }).entriesAttributes?.[0] ?? {};
