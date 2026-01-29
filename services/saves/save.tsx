import { useQuery } from '@tanstack/react-query';
import { savesService } from './save.service';
import { Save } from 'types/character';

export const getAllSavesKey = ({
  characterId,
}: GetAllSavesParams): ['characters', number, 'saves'] => [
  'characters',
  characterId,
  'saves',
];

export const useGetAllSaves = ({ characterId }: GetAllSavesParams) => {
  return useQuery<Save[], Error, Save[], ['characters', number, 'saves']>({
    queryKey: getAllSavesKey({ characterId }),
    queryFn: () => savesService.fetchAll({ characterId }),
    // staleTime: 10 * 60_000,
  });
};
