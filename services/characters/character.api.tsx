import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { characterService } from './character.service';

import type { Character } from 'types/character';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

export const useGetAllCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: characterService.fetchAll,
    staleTime: 10 * 60_000,
  });
};

export const useGetCharacter = ({ id }: GetCharacterParams) => {
  return useQuery<Character, Error, Character, ['characters', number]>({
    queryKey: ['characters', id!],
    queryFn: () => characterService.fetch({ id }),
    staleTime: 10 * 60_000,
    enabled: !!id,
  });
};

export const useCreateCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Character,
    AxiosError<ApiErrorResponse>,
    CreateCharacterParams
  >({
    mutationFn: (params: CreateCharacterParams) =>
      characterService.create(params),
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
