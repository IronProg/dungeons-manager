import api from '@/core/api/api';
import {
  fromNpcResponse,
  toNpcUpdateRequest,
  type NpcResponse,
} from '@/core/helpers/npcTransport';
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
    api
      .get<NpcResponse>(`/npcs/${id}`)
      .then((res) => fromNpcResponse(res.data)),
  create: (params: NpcCreateParams): Promise<Npc> =>
    api
      .post<NpcResponse>('/npcs', params)
      .then((res) => fromNpcResponse(res.data)),
  update: (id: number, params: NpcUpdateParams): Promise<Npc> =>
    api
      .patch<NpcResponse>(`/npcs/${id}`, toNpcUpdateRequest(params))
      .then((res) => fromNpcResponse(res.data)),
  import: (id: number, params?: NpcImportParams): Promise<Npc> =>
    api
      .post<NpcResponse>(`/npcs/${id}/import`, params)
      .then((res) => fromNpcResponse(res.data)),
  destroy: (id: number): Promise<null> =>
    api.delete<null>(`/npcs/${id}`).then((res) => res.data),
};
