import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Spell } from 'types/character';
import { spellService } from './spell.service';
import { useCharacter } from 'contexts/CharacterContext';
import { ApiErrorResponse, handleErrorMessage } from 'core/error/handler';
import { AxiosError } from 'axios';

export const getCharacterSpellsKey = ({
  characterId,
  level,
}: {
  characterId: number;
  level: number;
}): ['characters', number, 'spells', number] => [
  'characters',
  characterId,
  'spells',
  level,
];

export const useGetCharacterSpells = (level: number) => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Spell[],
    Error,
    Spell[],
    ['characters', number, 'spells', number]
  >({
    queryKey: getCharacterSpellsKey({ characterId: characterId!, level }),
    queryFn: () => spellService.fetchAll(characterId!, level),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateSpellMutation = (level: number) => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<Spell, AxiosError<ApiErrorResponse>, Partial<Spell>>({
    mutationFn: (params: Partial<Spell>) => spellService.update(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCharacterSpellsKey({ characterId: characterId!, level }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDeleteSpellMutation = (level: number) => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();

  return useMutation<null, AxiosError<ApiErrorResponse>, number>({
    mutationFn: (id: number) => spellService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCharacterSpellsKey({ characterId: characterId!, level }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
