import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { currenciesService } from '@/services/currencies/currencies.service';
import type { Currencies } from '@/types/character';

export const getCharacterCurrencyKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'currencies'] => [
  'characters',
  characterId,
  'currencies',
];

export const useGetCharacterCurrency = () => {
  const { character, characterId } = useCharacter();

  return useQuery<
    Currencies,
    Error,
    Currencies,
    ['characters', number, 'currencies']
  >({
    queryKey: getCharacterCurrencyKey({ characterId: characterId! }),
    queryFn: () => currenciesService.fetch({ characterId: characterId! }),
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateCurrenciesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Currencies,
    AxiosError<ApiErrorResponse>,
    UpdateCurrenciesParams
  >({
    mutationFn: (params: UpdateCurrenciesParams) =>
      currenciesService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getCharacterCurrencyKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
