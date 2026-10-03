// eslint-disable-next-line no-restricted-imports -- the isolated CommonJS payload test needs a resolvable type-only import.
import type { NpcEditorValues } from './npcPayload';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { buildNpcUpdatePayload } = require('./npcPayload');

const invalidNpcValues: NpcEditorValues = {
  // @ts-expect-error The API contract exposes `speeds`, not `speed`.
  scalars: { speed: '30 ft.' },
};

void invalidNpcValues;

const payload = buildNpcUpdatePayload({
  scalars: { name: 'Bite' },
  entries: [
    {
      id: 7,
      kind: 'action',
      title: 'Bite',
      description: '...',
      damages: [{ id: 9, deleted: true }],
    },
  ],
});

const entry = payload.entriesAttributes?.[0];
if (entry?.id !== 7) {
  throw new Error('Expected existing entry ID to be retained');
}

if (entry?.npcDamagesAttributes?.[0]?.id !== 9) {
  throw new Error('Expected deleted damage ID to be retained');
}

if (entry?.npcDamagesAttributes?.[0]?._destroy !== true) {
  throw new Error('Expected deleted damage payload');
}

if ('npcAttackAttributes' in (entry ?? {})) {
  throw new Error('Expected omitted optional attack not to be serialized');
}
