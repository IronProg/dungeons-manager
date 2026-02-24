import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Currencies } from 'types/character';
import { currenciesService } from './currencies.service';
import { useCharacter } from 'contexts/CharacterContext';

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

  return useMutation<Currencies, Error, UpdateCurrenciesParams>({
    mutationFn: (params: UpdateCurrenciesParams) =>
      currenciesService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getCharacterCurrencyKey({ characterId }),
      });
    },
  });
};
