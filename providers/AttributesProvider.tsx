import { AttributesContext } from 'contexts/AttributesContext';
import { useCharacters } from 'contexts/CharactersContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Attribute, Modifiers } from 'types/character';

const DEFAULT_MODIFIERS = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

export type AttributesProviderProps = {
  characterAttributes: Attribute[];
  modifiers: Modifiers;
  updateAttributes: (newAttribute: Attribute[]) => void;
};

export const AttributesProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();
  const [characterAttributes, setCharacterAttributes] = useState<Attribute[]>(
    [],
  );
  const [modifiers, setModifiers] = useState<Modifiers>(DEFAULT_MODIFIERS);

  useEffect(() => {
    if (character) {
      setCharacterAttributes(character.characterAttributes);
    }
  }, [character]);

  useEffect(() => {
    if (characterAttributes.length === 6) {
      const newModifiers: Modifiers = {
        strength: characterAttributes.find((attr) => attr.name === 'strength')!
          .modifier!,
        dexterity: characterAttributes.find(
          (attr) => attr.name === 'dexterity',
        )!.modifier!,
        constitution: characterAttributes.find(
          (attr) => attr.name === 'constitution',
        )!.modifier!,
        intelligence: characterAttributes.find(
          (attr) => attr.name === 'intelligence',
        )!.modifier!,
        wisdom: characterAttributes.find((attr) => attr.name === 'wisdom')!
          .modifier!,
        charisma: characterAttributes.find((attr) => attr.name === 'charisma')!
          .modifier!,
      };

      characterAttributes.forEach((attr) => {
        newModifiers[attr.name] = attr.modifier;
      });

      setModifiers(newModifiers);
    }
  }, [characterAttributes]);

  const updateAttributes = useCallback((newAttributes: Attribute[]) => {
    setCharacterAttributes(newAttributes);
  }, []);

  const value: AttributesProviderProps = {
    characterAttributes,
    modifiers,
    updateAttributes,
  };
  return (
    <AttributesContext.Provider value={value}>
      {children}
    </AttributesContext.Provider>
  );
};
