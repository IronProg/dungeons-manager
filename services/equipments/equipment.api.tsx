import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { equipmentService } from '@/services/equipments/equipment.service';
import type { Equipment } from '@/types/character';

export const getAllEquipmentsKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'equipments'] => [
  'characters',
  characterId,
  'equipments',
];

export const useGetAllEquipments = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Equipment[],
    Error,
    Equipment[],
    ['characters', number, 'equipments']
  >({
    queryKey: getAllEquipmentsKey({ characterId: characterId! }),
    queryFn: () => equipmentService.fetchAll({ characterId: characterId! }),
    enabled: !!character,
  });
};

export const useCreateEquipmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Equipment,
    AxiosError<ApiErrorResponse>,
    CreateEquipmentParams
  >({
    mutationFn: (params: CreateEquipmentParams) =>
      equipmentService.create(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllEquipmentsKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useUpdateEquipmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Equipment,
    AxiosError<ApiErrorResponse>,
    UpdateEquipmentParams
  >({
    mutationFn: (params: UpdateEquipmentParams) =>
      equipmentService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllEquipmentsKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};

export const useDeleteEquipmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Equipment,
    AxiosError<ApiErrorResponse>,
    DeleteEquipmentParams
  >({
    mutationFn: (params: DeleteEquipmentParams) =>
      equipmentService.destroy(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getAllEquipmentsKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
