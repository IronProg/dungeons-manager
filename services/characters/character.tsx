import { useQuery } from '@tanstack/react-query';
import { characterService } from './character.service';
import { Character, CharacterGeneralInfo, Currencies } from 'types/character';

export const useGetAllCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: characterService.fetchAll,
    // staleTime: 10 * 60_000,
  });
};

export const useGetCharacter = ({ id }: GetCharacterParams) => {
  return useQuery<Character, Error, Character, ['characters', number]>({
    queryKey: ['characters', id],
    queryFn: () => characterService.fetch({ id }),
    // staleTime: 10 * 60_000,
    enabled: !!id,
  });
};

export const getCharacterGeneralInfoKey = ({
  characterId,
}: GetAllAttributesParams): ['characters', number, 'generalInfo'] => [
  'characters',
  characterId,
  'generalInfo',
];

export const useGetCharacterGeneralInfo = ({
  characterId,
}: GetCharacterGeneralInfoParams) => {
  return useQuery<
    CharacterGeneralInfo,
    Error,
    CharacterGeneralInfo,
    ['characters', number, 'generalInfo']
  >({
    queryKey: getCharacterGeneralInfoKey({ characterId }),
    queryFn: () => characterService.fetchGeneralInfo({ characterId }),
    // staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};

export const getCharacterCurrencyKey = ({
  characterId,
}: GetAllAttributesParams): ['characters', number, 'currencies'] => [
  'characters',
  characterId,
  'currencies',
];

export const useGetCharacterCurrency = ({
  characterId,
}: GetCharacterCurrencyParams) => {
  return useQuery<
    Currencies,
    Error,
    Currencies,
    ['characters', number, 'currencies']
  >({
    queryKey: getCharacterCurrencyKey({ characterId }),
    queryFn: () => characterService.fetchCurrency({ characterId }),
    // staleTime: 10 * 60_000,
    enabled: !!characterId,
  });
};
