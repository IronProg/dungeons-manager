import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { useTable } from '@/hooks/useTable';
import { characterService } from '@/services/characters/character.service';
import type { Character } from '@/types/character';

interface useGetAllCharacterProps {
  useTableId?: boolean;
  text?: string;
}

export const useGetAllCharacters = ({
  useTableId = true,
  text,
}: useGetAllCharacterProps = {}) => {
  const { tableId } = useTable();

  const params: Record<string, unknown> = {};
  if (useTableId && tableId) params.tableId = tableId;
  if (text) params.text = text;

  return useQuery({
    queryKey: ['characters', 'all', params],
    queryFn: () => characterService.fetchAll({ params }),
  });
};

export const useGetCharacter = ({ id }: GetCharacterParams) => {
  return useQuery<
    Character,
    Error,
    Character,
    ['characters', number, 'preload']
  >({
    queryKey: ['characters', id!, 'preload'],
    queryFn: () => characterService.fetch({ id, preload: true }),
    enabled: !!id,
  });
};

export const useCreateCharacterMutation = () => {
  const queryClient = useQueryClient();
  const { tableId } = useTable();

  return useMutation<
    Character,
    AxiosError<ApiErrorResponse>,
    CreateCharacterParams
  >({
    mutationFn: ({ name, tableId: paramTableId }: CreateCharacterParams) =>
      characterService.create({ name, tableId: paramTableId ?? tableId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useUpdateCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Character,
    AxiosError<ApiErrorResponse>,
    UpdateCharacterParams
  >({
    mutationFn: (params: UpdateCharacterParams) =>
      characterService.update(params),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['characters', id] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDestroyCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    null,
    AxiosError<ApiErrorResponse>,
    DestroyCharacterParams
  >({
    mutationFn: (params) => characterService.destroy(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useCloneCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Character,
    AxiosError<ApiErrorResponse>,
    CloneCharacterParams
  >({
    mutationFn: (params: CloneCharacterParams) =>
      characterService.clone(params),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['characters'] }),
    onError: ({ response }) => handleErrorMessage(response?.data),
  });
};
