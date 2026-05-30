import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { spellService } from '@/services/spells/spell.service';
import type { Spell, SpellSlotLevelType } from '@/types/character';

export const getAllCharacterSpellsKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'spells'] => ['characters', characterId, 'spells'];

export const getCharacterSpellsKey = ({
  characterId,
  level,
}: {
  characterId: number;
  level: SpellSlotLevelType;
}): ['characters', number, 'spells', SpellSlotLevelType] => [
  'characters',
  characterId,
  'spells',
  level,
];

export const useGetCharacterSpells = (level: SpellSlotLevelType) => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Spell[],
    Error,
    Spell[],
    ['characters', number, 'spells', number]
  >({
    queryKey: getCharacterSpellsKey({ characterId: characterId!, level }),
    queryFn: () => spellService.fetchAll(characterId!, level),
    enabled: !!character,
  });
};

export const useUpdateSpellMutation = () => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<Spell, AxiosError<ApiErrorResponse>, UpdateSpellParams>({
    mutationFn: (params: UpdateSpellParams) =>
      spellService.update(characterId!, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId, 'spells'],
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useCreateSpellMutation = () => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<Spell, AxiosError<ApiErrorResponse>, CreateSpellParams>({
    mutationFn: (params: CreateSpellParams) =>
      spellService.create(characterId!, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId, 'spells'],
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDeleteSpellMutation = () => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<null, AxiosError<ApiErrorResponse>, number>({
    mutationFn: (id: number) => spellService.delete(characterId!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAllCharacterSpellsKey({ characterId: characterId! }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
