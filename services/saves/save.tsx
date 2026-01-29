import { useQuery } from '@tanstack/react-query';
import { savesService } from './save.service';
import { Save } from 'types/character';

export const getAllSavesKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'saves'] => ['characters', characterId, 'saves'];

export const useGetAllSaves = ({ characterId }: GetAllSavesParams) => {
  return useQuery<Save[], Error, Save[], ['characters', number, 'saves']>({
    queryKey: getAllSavesKey({ characterId: characterId! }),
    queryFn: () => savesService.fetchAll({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};
