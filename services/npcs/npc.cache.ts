import type { QueryClient } from '@tanstack/react-query';

import type { Npc } from '@/types/npc';

export const npcKeys = {
  library: () => ['npcs', 'library'] as const,
  byCharacter: (characterId: number) =>
    ['npcs', 'character', characterId] as const,
  detail: (id: number) => ['npcs', 'detail', id] as const,
};

export const cacheUpdatedNpc = async (queryClient: QueryClient, npc: Npc) => {
  await queryClient.cancelQueries({ queryKey: npcKeys.detail(npc.id) });
  queryClient.setQueryData(npcKeys.detail(npc.id), npc);
  return queryClient.invalidateQueries({
    queryKey:
      npc.characterId == null
        ? npcKeys.library()
        : npcKeys.byCharacter(npc.characterId),
  });
};
