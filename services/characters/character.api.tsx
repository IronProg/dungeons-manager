import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { characterService } from './character.service';

import type { Character } from 'types/character';

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

  return useMutation<Character, Error, CreateCharacterParams>({
    mutationFn: (params: CreateCharacterParams) =>
      characterService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
};

export const useUpdateCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Character, Error, UpdateCharacterParams>({
    mutationFn: (params: UpdateCharacterParams) =>
      characterService.update(params),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['characters', id] });
    },
  });
};

export const useDestroyCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, DestroyCharacterParams>({
    mutationFn: (params) => characterService.destroy(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
};
