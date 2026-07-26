import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getAllAttacksKey } from '@/services/attacks/attack';
import { getAllAttributesKey } from '@/services/attributes/attributes';
import { getBackgroundKey } from '@/services/backgrounds/background.api';
import { getAllClassesKey } from '@/services/classes/class';
import { getCharacterCurrencyKey } from '@/services/currencies/currencies';
import { getAllEquipmentsKey } from '@/services/equipments/equipment.api';
import { getAllFeaturesKey } from '@/services/features/feature';
import { getCharacterGeneralInfoKey } from '@/services/generalInfos/generalInfos';
import { getNoteKey } from '@/services/notes/note.api';
import { getProficiencyKey } from '@/services/proficiencies/proficiency.api';
import { getAllResourcesKey } from '@/services/resources/resource';
import { getAllSavingThrowsKey } from '@/services/savingThrows/savingThrow';
import { getAllSkillsKey } from '@/services/skills/skill';
import { getAllCharacterSpellSlotsKey } from '@/services/spellSlots/spellSlot';
import type { Character } from '@/types/character';

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

  // eslint-disable-next-line no-restricted-syntax
  const setDetailedCharacterData = useCallback(
    (character: Character) => {
      setInitialLoading(true);

      const characterId = character.id!;

      queryClient.setQueryData(
        getAllAttributesKey({ characterId }),
        character.characterAttributes,
      );

      queryClient.setQueryData(
        getAllClassesKey({ characterId }),
        character.characterClasses,
      );

      queryClient.setQueryData(
        getAllSavingThrowsKey({ characterId }),
        character.savingThrows,
      );

      queryClient.setQueryData(
        getAllSkillsKey({ characterId }),
        character.skills,
      );

      queryClient.setQueryData(
        getAllAttacksKey({ characterId }),
        character.attacks,
      );

      queryClient.setQueryData(
        getAllResourcesKey({ characterId }),
        character.resources,
      );

      queryClient.setQueryData(
        getAllFeaturesKey({ characterId }),
        character.features,
      );

      queryClient.setQueryData(
        getCharacterGeneralInfoKey({ characterId }),
        character.generalInfo,
      );

      queryClient.setQueryData(
        getCharacterCurrencyKey({ characterId }),
        character.currencies,
      );

      if (character.equipments) {
        queryClient.setQueryData(
          getAllEquipmentsKey({ characterId }),
          character.equipments,
        );
      }

      if (character.spellSlots) {
        queryClient.setQueryData(
          getAllCharacterSpellSlotsKey({ characterId }),
          character.spellSlots,
        );
      }

      if (character.background) {
        queryClient.setQueryData(
          getBackgroundKey({ characterId }),
          character.background,
        );
      }

      if (character.proficiency) {
        queryClient.setQueryData(
          getProficiencyKey({ characterId }),
          character.proficiency,
        );
      }

      if (character.note) {
        queryClient.setQueryData(getNoteKey({ characterId }), character.note);
      }

      setInitialLoading(false);
    },
    [queryClient, setInitialLoading],
  );

  return { setDetailedCharacterData };
};
