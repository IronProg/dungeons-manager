import type {
  Npc,
  NpcEntry,
  NpcEntryParams,
  NpcUpdateParams,
} from '@/types/npc';

type NpcApiEntryKind = 'trait' | 'reaction' | 'action' | 'legendary_action';

export type NpcResponse = Omit<Npc, 'entries'> & {
  entries: (Omit<NpcEntry, 'kind'> & { kind: NpcApiEntryKind })[];
  proficiencBonus?: number;
};

type NpcUpdateRequest = Omit<NpcUpdateParams, 'entriesAttributes'> & {
  entriesAttributes?: (Omit<NpcEntryParams, 'kind'> & {
    kind?: NpcApiEntryKind;
  })[];
};

export const fromNpcResponse = ({
  proficiencBonus,
  ...npc
}: NpcResponse): Npc => ({
  ...npc,
  proficiencyBonus: npc.proficiencyBonus ?? proficiencBonus ?? 0,
  entries: npc.entries.map((entry) => ({
    ...entry,
    kind: entry.kind === 'legendary_action' ? 'legendaryAction' : entry.kind,
  })),
});

export const toNpcUpdateRequest = ({
  entriesAttributes,
  ...params
}: NpcUpdateParams): NpcUpdateRequest => ({
  ...params,
  ...(entriesAttributes
    ? {
        entriesAttributes: entriesAttributes.map(({ kind, ...entry }) => ({
          ...entry,
          ...(kind
            ? { kind: kind === 'legendaryAction' ? 'legendary_action' : kind }
            : {}),
        })),
      }
    : {}),
});
