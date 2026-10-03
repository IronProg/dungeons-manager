// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert = require('node:assert/strict');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { QueryClient } = require('@tanstack/react-query');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { cacheUpdatedNpc, npcKeys } = require('./npc.cache');

async function testUpdatedHitPoints() {
  const client = new QueryClient();
  const key = npcKeys.detail(1);
  client.setQueryData(key, { id: 1, hitPoints: 10 });
  client.setQueryData(npcKeys.library(), []);
  client.setQueryData(npcKeys.byCharacter(7), []);
  const updatedNpc = { id: 1, characterId: 7, hitPoints: 9 };

  await cacheUpdatedNpc(client, updatedNpc);

  assert.deepEqual(client.getQueryData(key), updatedNpc);
  assert.equal(client.getQueryData(key).hitPoints - 1, 8);
  assert.equal(
    client.getQueryState(npcKeys.byCharacter(7)).isInvalidated,
    true,
  );
  assert.equal(client.getQueryState(npcKeys.library()).isInvalidated, false);

  await cacheUpdatedNpc(client, { id: 2, hitPoints: 3 });
  assert.equal(client.getQueryState(npcKeys.library()).isInvalidated, true);
  client.clear();
}

void testUpdatedHitPoints();

export {};
