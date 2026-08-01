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

      const setIfMissing = <T>(key: readonly unknown[], data: T) => {
        if (queryClient.getQueryData(key) === undefined) {
          queryClient.setQueryData(key, data);
        }
      };

      setIfMissing(
        getAllAttributesKey({ characterId }),
        character.characterAttributes,
      );

      setIfMissing(
        getAllClassesKey({ characterId }),
        character.characterClasses,
      );

      setIfMissing(
        getAllSavingThrowsKey({ characterId }),
        character.savingThrows,
      );

      setIfMissing(getAllSkillsKey({ characterId }), character.skills);

      setIfMissing(getAllAttacksKey({ characterId }), character.attacks);

      setIfMissing(getAllResourcesKey({ characterId }), character.resources);

      setIfMissing(getAllFeaturesKey({ characterId }), character.features);

      setIfMissing(
        getCharacterGeneralInfoKey({ characterId }),
        character.generalInfo,
      );

      setIfMissing(
        getCharacterCurrencyKey({ characterId }),
        character.currencies,
      );

      if (character.equipments) {
        setIfMissing(
          getAllEquipmentsKey({ characterId }),
          character.equipments,
        );
      }

      if (character.spellSlots) {
        setIfMissing(
          getAllCharacterSpellSlotsKey({ characterId }),
          character.spellSlots,
        );
      }

      if (character.background) {
        setIfMissing(getBackgroundKey({ characterId }), character.background);
      }

      if (character.proficiency) {
        setIfMissing(getProficiencyKey({ characterId }), character.proficiency);
      }

      if (character.note) {
        setIfMissing(getNoteKey({ characterId }), character.note);
      }

      setInitialLoading(false);
    },
    [queryClient, setInitialLoading],
  );

  return { setDetailedCharacterData };
};
