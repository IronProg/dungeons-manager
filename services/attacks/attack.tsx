import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { attacksService } from '@/services/attacks/attack.service';
import type { Attack } from '@/types/character';

export const getAllAttacksKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'attacks'] => ['characters', characterId, 'attacks'];

export const useGetAllAttacks = () => {
  const { character, characterId } = useCharacter();

  return useQuery<Attack[], Error, Attack[], ['characters', number, 'attacks']>(
    {
      queryKey: getAllAttacksKey({ characterId: characterId! }),
      queryFn: () => attacksService.fetchAll({ characterId: characterId! }),
      enabled: !!character,
    },
  );
};

export const useCreateAttackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attack, AxiosError<ApiErrorResponse>, CreateAttackParams>({
    mutationFn: (params: CreateAttackParams) => attacksService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllAttacksKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useUpdateAttackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attack, AxiosError<ApiErrorResponse>, UpdateAttackParams>({
    mutationFn: (params: UpdateAttackParams) => attacksService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllAttacksKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDeleteAttackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Attack, AxiosError<ApiErrorResponse>, DeleteAttackParams>({
    mutationFn: (params: DeleteAttackParams) => attacksService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllAttacksKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
