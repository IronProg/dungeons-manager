import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { spellSlotService } from './spellSlot.service';
import { useCharacter } from 'contexts/CharacterContext';

import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';

import { SpellSlot } from 'types/character';

export const getCharacterSpellSlotsKey = ({
  characterId,
  level,
}: {
  characterId: number;
  level?: number;
}): ['characters', number, 'spellSlots', number | undefined] => [
  'characters',
  characterId,
  'spellSlots',
  level,
];

export const getAllCharacterSpellSlotsKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'spellSlots', 'all'] => [
  'characters',
  characterId,
  'spellSlots',
  'all',
];

export const useGetCharacterSpellSlots = (level: number) => {
  const { character, characterId } = useCharacter();

  return useQuery<
    SpellSlot[],
    Error,
    SpellSlot[],
    ['characters', number, 'spellSlots', number | undefined]
  >({
    queryKey: getCharacterSpellSlotsKey({ characterId: characterId!, level }),
    queryFn: () => spellSlotService.fetchAll(characterId!, level),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useGetAllCharacterSpellSlots = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    SpellSlot[],
    Error,
    SpellSlot[],
    ['characters', number, 'spellSlots', 'all']
  >({
    queryKey: getAllCharacterSpellSlotsKey({ characterId: characterId! }),
    queryFn: () => spellSlotService.fetchAll(characterId!),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateSpellSlotMutation = () => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<
    SpellSlot,
    AxiosError<ApiErrorResponse>,
    UpdateSpellSlotParams
  >({
    mutationFn: (params: UpdateSpellSlotParams) =>
      spellSlotService.update(characterId!, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId, 'spellSlots'],
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useResetAllSpellSlotsMutation = () => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<SpellSlot, AxiosError<ApiErrorResponse>, null>({
    mutationFn: () => spellSlotService.resetAll(characterId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters', characterId, 'spellSlots'],
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
