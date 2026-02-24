import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CharacterGeneralInfo } from 'types/character';
import { generalInfoService } from './generalInfos.service';
import { useCharacter } from 'contexts/CharacterContext';

export const getCharacterGeneralInfoKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'generalInfo'] => [
  'characters',
  characterId,
  'generalInfo',
];

export const useGetCharacterGeneralInfo = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    CharacterGeneralInfo,
    Error,
    CharacterGeneralInfo,
    ['characters', number, 'generalInfo']
  >({
    queryKey: getCharacterGeneralInfoKey({ characterId: characterId! }),
    queryFn: () => generalInfoService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateGeneralInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CharacterGeneralInfo, Error, UpdateGeneralInfoParams>({
    mutationFn: (params: UpdateGeneralInfoParams) =>
      generalInfoService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getCharacterGeneralInfoKey({ characterId }),
      });
    },
  });
};
