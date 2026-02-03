import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CharacterGeneralInfo } from 'types/character';
import { generalInfoService } from './generalInfos.service';

export const getCharacterGeneralInfoKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'generalInfo'] => [
  'characters',
  characterId,
  'generalInfo',
];

export const useGetCharacterGeneralInfo = ({
  characterId,
}: GetGeneralInfoParams) => {
  return useQuery<
    CharacterGeneralInfo,
    Error,
    CharacterGeneralInfo,
    ['characters', number, 'generalInfo']
  >({
    queryKey: getCharacterGeneralInfoKey({ characterId: characterId! }),
    queryFn: () => generalInfoService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
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
