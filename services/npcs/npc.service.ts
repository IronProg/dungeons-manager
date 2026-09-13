import api from '@/core/api/api';
import type {
  Npc,
  NpcCreateParams,
  NpcImportParams,
  NpcSummary,
  NpcUpdateParams,
} from '@/types/npc';

export const npcService = {
  fetchAll: (params?: { characterId?: number }): Promise<NpcSummary[]> =>
    api.get<NpcSummary[]>('/npcs', { params }).then((res) => res.data),
  fetch: (id: number): Promise<Npc> =>
    api.get<Npc>(`/npcs/${id}`).then((res) => res.data),
  create: (params: NpcCreateParams): Promise<Npc> =>
    api.post<Npc>('/npcs', params).then((res) => res.data),
  update: (id: number, params: NpcUpdateParams): Promise<Npc> =>
    api.patch<Npc>(`/npcs/${id}`, params).then((res) => res.data),
  import: (id: number, params?: NpcImportParams): Promise<Npc> =>
    api.post<Npc>(`/npcs/${id}/import`, params).then((res) => res.data),
  destroy: (id: number): Promise<null> =>
    api.delete<null>(`/npcs/${id}`).then((res) => res.data),
};
