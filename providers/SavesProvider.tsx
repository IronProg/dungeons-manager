import { useAttributes } from 'contexts/AttributesContext';
import { useCharacters } from 'contexts/CharactersContext';
import { SavesContext } from 'contexts/SavesContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AttributesType, Save } from 'types/character';

export type SavesProviderProps = {
  saves: Save[];
  updateSaves: (newSaves: Save[]) => void;
  getSaveBonus: (name: AttributesType) => number;
};

export const SavesProvider = ({ children }: { children: ReactNode }) => {
  const { character, proficiency } = useCharacters();
  const { modifiers } = useAttributes();
  const [saves, setSaves] = useState<Save[]>([]);

  useEffect(() => {
    if (character) {
      setSaves(character.saves);
    }
  }, [character]);

  const getSaveBonus = useCallback(
    (name: AttributesType) => {
      const selectedSave = saves.find((save) => save.mainAttribute === name);

      if (!selectedSave) return 0;

      let modifier = modifiers[selectedSave.mainAttribute];

      if (selectedSave.proficiency) {
        modifier += proficiency;
      }

      if (selectedSave.customBonus) {
        modifier += proficiency;
      }

      return modifier;
    },
    [modifiers, proficiency, saves],
  );

  const updateSaves = useCallback((newSaves: Save[]) => {
    setSaves(newSaves);
  }, []);

  const value: SavesProviderProps = { saves, updateSaves, getSaveBonus };

  return (
    <SavesContext.Provider value={value}>{children}</SavesContext.Provider>
  );
};
