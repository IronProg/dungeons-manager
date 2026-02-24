import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { savesService } from './save.service';
import { Save } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';

export const getAllSavesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'saves'] => ['characters', characterId, 'saves'];

export const useGetAllSaves = () => {
  const { character, characterId } = useCharacter();

  return useQuery<Save[], Error, Save[], ['characters', number, 'saves']>({
    queryKey: getAllSavesKey({ characterId: characterId! }),
    queryFn: () => savesService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateSaveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Save, Error, UpdateSaveParams>({
    mutationFn: (params: UpdateSaveParams) => savesService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllSavesKey({ characterId }),
      });
    },
  });
};
