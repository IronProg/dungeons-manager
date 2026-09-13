// eslint-disable-next-line no-restricted-imports -- this isolated CommonJS test needs resolvable type-only imports.
import type { NpcEntryFormValues } from './npcEntryFormValues';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { buildNpcEntryParams } = require('./npcEntryFormValues');

const values: NpcEntryFormValues = {
  id: 7,
  kind: 'action',
  title: 'Bite',
  description: '...',
  damages: [{ id: 9, deleted: true }],
};

const actionParams = buildNpcEntryParams(values);
if (actionParams.id !== 7) {
  throw new Error('Expected an existing entry ID to be retained');
}

if (actionParams.npcDamagesAttributes?.[0]?._destroy !== true) {
  throw new Error('Expected a removed persisted damage to be destroyed');
}

const traitParams = buildNpcEntryParams({
  ...values,
  kind: 'trait',
  attack: { id: 4, _destroy: true },
});
if (
  'npcAttackAttributes' in traitParams ||
  'npcDamagesAttributes' in traitParams
) {
  throw new Error('Expected non-actions to omit attack and damage payloads');
}
