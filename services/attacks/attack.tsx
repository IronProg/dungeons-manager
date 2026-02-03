import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useCreateAttackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attack, Error, CreateAttackParams>({
    mutationFn: (params: CreateAttackParams) => attacksService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllAttacksKey({ characterId }),
      });
    },
  });
};

export const useUpdateAttackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attack, Error, UpdateAttackParams>({
    mutationFn: (params: UpdateAttackParams) => attacksService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllAttacksKey({ characterId }),
      });
    },
  });
};

export const useDeleteAttackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attack, Error, DeleteAttackParams>({
    mutationFn: (params: DeleteAttackParams) => attacksService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllAttacksKey({ characterId }),
      });
    },
  });
};
