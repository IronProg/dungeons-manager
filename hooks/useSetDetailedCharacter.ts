import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getAllAttacksKey } from 'services/attacks/attack';
import { getAllAttributesKey } from 'services/attributes/attributes';
import {
  getCharacterCurrencyKey,
  getCharacterGeneralInfoKey,
} from 'services/characters/character';
import { getAllFeaturesKey } from 'services/features/feature';
import { getAllResourcesKey } from 'services/resources/resource';
import { getAllSavesKey } from 'services/saves/save';
import { getAllSkillsKey } from 'services/skills/skill';
import { Character } from 'types/character';

type useDetailedCharacterProps = {
  setInitialLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type useDetailedCharacterResult = {
  setDetailedCharacterData: (character: Character) => void;
};

export const useDetailedCharacter = ({
  setInitialLoading,
}: useDetailedCharacterProps): useDetailedCharacterResult => {
  const queryClient = useQueryClient();

  const setDetailedCharacterData = useCallback(
    (character: Character) => {
      setInitialLoading(true);

      queryClient.setQueryData(
        getAllAttributesKey({ characterId: character.id! }),
        character.characterAttributes,
      );

      queryClient.setQueryData(
        getCharacterGeneralInfoKey({ characterId: character.id! }),
        character.generalInfo,
      );

      queryClient.setQueryData(
        getCharacterCurrencyKey({ characterId: character.id! }),
        character.currencies,
      );

      queryClient.setQueryData(
        getAllSavesKey({ characterId: character.id! }),
        character.saves,
      );

      queryClient.setQueryData(
        getAllSkillsKey({ characterId: character.id! }),
        character.skills,
      );

      queryClient.setQueryData(
        getAllAttacksKey({ characterId: character.id! }),
        character.attacks,
      );

      queryClient.setQueryData(
        getAllResourcesKey({ characterId: character.id! }),
        character.resources,
      );

      queryClient.setQueryData(
        getAllFeaturesKey({ characterId: character.id! }),
        character.features,
      );

      setInitialLoading(false);
    },
    [queryClient, setInitialLoading],
  );

  return { setDetailedCharacterData };
};
