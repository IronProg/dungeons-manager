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
    onSuccess: (npc) => invalidateNpcList(queryClient, npc),
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};

export const useUpdateNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Npc, AxiosError<ApiErrorResponse>, UpdateNpcParams>({
    mutationFn: ({ id, params }) => npcService.update(id, params),
    onSuccess: (npc) => {
      queryClient.invalidateQueries({ queryKey: npcKeys.detail(npc.id) });
      invalidateNpcList(queryClient, npc);
    },
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};

export const useImportNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Npc, AxiosError<ApiErrorResponse>, ImportNpcParams>({
    mutationFn: ({ id, params }) => npcService.import(id, params),
    onSuccess: (npc) => invalidateNpcList(queryClient, npc),
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};

export const useDestroyNpcMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    DestroyNpcParams,
    Npc | undefined
  >({
    mutationFn: ({ id }) => npcService.destroy(id),
    onMutate: ({ id }) => queryClient.getQueryData<Npc>(npcKeys.detail(id)),
    onSuccess: (_, { id }, npc) => {
      queryClient.invalidateQueries({ queryKey: npcKeys.detail(id) });
      if (npc) invalidateNpcList(queryClient, npc);
    },
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};
