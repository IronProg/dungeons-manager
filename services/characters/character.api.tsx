import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useTable } from '@/contexts/TableContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { characterService } from '@/services/characters/character.service';
import type { Character } from '@/types/character';

interface useGetAllCharacterProps {
  useTableId?: boolean;
}

export const useGetAllCharacters = ({
  useTableId = true,
}: useGetAllCharacterProps = {}) => {
  const { tableId } = useTable();

  const params = useTableId ? { tableId } : undefined;

  return useQuery({
    queryKey: ['characters', 'all', params],
    queryFn: () => characterService.fetchAll({ params }),
  });
};

export const useGetCharacter = ({ id }: GetCharacterParams) => {
  return useQuery<Character, Error, Character, ['characters', number]>({
    queryKey: ['characters', id!],
    queryFn: () => characterService.fetch({ id }),
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
    mutationFn: (params: CreateCharacterParams) =>
      characterService.create({ ...params, tableId }),
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
