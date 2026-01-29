import { useQuery } from '@tanstack/react-query';
import { attacksService } from './attack.service';
import { Attack } from 'types/character';

export const getAllAttacksKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'attacks'] => ['characters', characterId, 'attacks'];

export const useGetAllAttacks = ({ characterId }: GetAllAttacksParams) => {
  return useQuery<Attack[], Error, Attack[], ['characters', number, 'attacks']>(
    {
      queryKey: getAllAttacksKey({ characterId: characterId! }),
      queryFn: () => attacksService.fetchAll({ characterId: characterId! }),
      staleTime: 10 * 60_000,
      enabled: !!characterId,
    },
  );
};
