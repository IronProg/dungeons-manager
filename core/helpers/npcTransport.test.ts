// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert = require('node:assert/strict');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { fromNpcResponse, toNpcUpdateRequest } = require('./npcTransport');

const response = {
  id: 1,
  entries: [
    { id: 2, kind: 'legendary_action', title: 'Tail', cost: '2' },
    { id: 3, kind: 'action', title: 'Bite' },
  ],
};
const npc = fromNpcResponse(response);
assert.equal(npc.entries[0].kind, 'legendaryAction');
assert.equal(npc.entries[0].cost, '2');
assert.equal(npc.entries[1].kind, 'action');
assert.equal(response.entries[0].kind, 'legendary_action');

assert.deepEqual(
  toNpcUpdateRequest({
    entriesAttributes: [
      { id: 2, kind: 'legendaryAction', cost: '2' },
      { id: 3, kind: 'action' },
      { id: 4, _destroy: true },
    ],
  }),
  {
    entriesAttributes: [
      { id: 2, kind: 'legendary_action', cost: '2' },
      { id: 3, kind: 'action' },
      { id: 4, _destroy: true },
    ],
  },
);
assert.deepEqual(toNpcUpdateRequest({ hitPoints: 8 }), { hitPoints: 8 });

export {};
