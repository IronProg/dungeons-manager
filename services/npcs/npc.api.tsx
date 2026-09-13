import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { npcService } from '@/services/npcs/npc.service';
import type {
  Npc,
  NpcCreateParams,
  NpcImportParams,
  NpcSummary,
  NpcUpdateParams,
} from '@/types/npc';

export const npcKeys = {
  library: () => ['npcs', 'library'] as const,
  byCharacter: (characterId: number) =>
    ['npcs', 'character', characterId] as const,
  detail: (id: number) => ['npcs', 'detail', id] as const,
};

type GetNpcsParams = {
  characterId?: number;
};

type GetNpcParams = {
  id?: number;
};

type UpdateNpcParams = {
  id: number;
  params: NpcUpdateParams;
};

type ImportNpcParams = {
  id: number;
  params?: NpcImportParams;
};

type DestroyNpcParams = {
  id: number;
};

type NpcListKey =
  | ReturnType<typeof npcKeys.library>
  | ReturnType<typeof npcKeys.byCharacter>;

type DestroyNpcContext = {
  listKey?: NpcListKey;
};

const invalidateNpcList = (
  queryClient: ReturnType<typeof useQueryClient>,
  npc: Npc,
) => {
  if (npc.characterId == null) {
    queryClient.invalidateQueries({ queryKey: npcKeys.library() });
    return;
  }

  queryClient.invalidateQueries({
    queryKey: npcKeys.byCharacter(npc.characterId),
  });
};

const getCachedNpcListKey = (
  queryClient: ReturnType<typeof useQueryClient>,
  id: number,
): NpcListKey | undefined => {
  const entry = queryClient
    .getQueriesData<NpcSummary[]>({ queryKey: ['npcs'] })
    .find(([, data]) => data?.some((npc) => npc.id === id));

  return entry?.[0] as NpcListKey | undefined;
};

const invalidateNpcDetailAndList = (
  queryClient: ReturnType<typeof useQueryClient>,
  npc: Npc,
) => {
  queryClient.invalidateQueries({ queryKey: npcKeys.detail(npc.id) });
  invalidateNpcList(queryClient, npc);
};

export const useGetNpcs = (params: GetNpcsParams = {}) => {
  const { characterId } = params;
  const queryKey =
    characterId == null ? npcKeys.library() : npcKeys.byCharacter(characterId);

  return useQuery<NpcSummary[], AxiosError<ApiErrorResponse>>({
    queryKey,
    queryFn: () => npcService.fetchAll({ characterId }),
    networkMode: 'offlineFirst',
  });
};

export const useGetNpc = ({ id }: GetNpcParams) =>
  useQuery<Npc, AxiosError<ApiErrorResponse>>({
    queryKey: npcKeys.detail(id!),
    queryFn: () => npcService.fetch(id!),
    enabled: Number.isFinite(id) && id! > 0,
    networkMode: 'offlineFirst',
  });

export const useCreateNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Npc, AxiosError<ApiErrorResponse>, NpcCreateParams>({
    mutationFn: (params) => npcService.create(params),
    onSuccess: (npc) => invalidateNpcDetailAndList(queryClient, npc),
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};

export const useUpdateNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Npc, AxiosError<ApiErrorResponse>, UpdateNpcParams>({
    mutationFn: ({ id, params }) => npcService.update(id, params),
    onSuccess: (npc) => invalidateNpcDetailAndList(queryClient, npc),
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};

export const useImportNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Npc, AxiosError<ApiErrorResponse>, ImportNpcParams>({
    mutationFn: ({ id, params }) => npcService.import(id, params),
    onSuccess: (npc) => invalidateNpcDetailAndList(queryClient, npc),
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};

export const useDestroyNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    DestroyNpcParams,
    DestroyNpcContext
  >({
    mutationFn: ({ id }) => npcService.destroy(id),
    onMutate: ({ id }) => {
      const npc = queryClient.getQueryData<Npc>(npcKeys.detail(id));

      return {
        listKey: npc
          ? npc.characterId == null
            ? npcKeys.library()
            : npcKeys.byCharacter(npc.characterId)
          : getCachedNpcListKey(queryClient, id),
      };
    },
    onSuccess: (_, { id }, context) => {
      queryClient.invalidateQueries({ queryKey: npcKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: context?.listKey ?? npcKeys.library(),
      });
    },
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};
