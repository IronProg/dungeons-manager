import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SpellSlot } from 'types/character';
import { spellSlotService } from './spellSlot.service';
import { useCharacter } from 'contexts/CharacterContext';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

export const getCharacterSpellSlotsKey = ({
  characterId,
  level,
}: {
  characterId: number;
  level: number;
}): ['characters', number, 'spellSlots', number] => [
  'characters',
  characterId,
  'spellSlots',
  level,
];

export const useGetCharacterSpellSlots = (level: number) => {
  const { character, characterId } = useCharacter();

  return useQuery<
    SpellSlot[],
    Error,
    SpellSlot[],
    ['characters', number, 'spellSlots', number]
  >({
    queryKey: getCharacterSpellSlotsKey({ characterId: characterId!, level }),
    queryFn: () => spellSlotService.fetchAll(characterId!, level),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateSpellSlotMutation = (level: number) => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<
    SpellSlot,
    AxiosError<ApiErrorResponse>,
    Partial<SpellSlot>
  >({
    mutationFn: (params: Partial<SpellSlot>) =>
      spellSlotService.update(characterId!, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCharacterSpellSlotsKey({
          characterId: characterId!,
          level,
        }),
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
