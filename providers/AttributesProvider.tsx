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
  attributes: Attribute[];
  modifiers: Modifiers;
  updateAttributes: (newAttribute: Attribute[]) => void;
};

export const AttributesProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [modifiers, setModifiers] = useState<Modifiers>(DEFAULT_MODIFIERS);

  useEffect(() => {
    if (character) {
      setAttributes(character.attributes);
    }
  }, [character]);

  useEffect(() => {
    if (attributes.length === 6) {
      const newModifiers: Modifiers = {
        strength: attributes.find((attr) => attr.name === 'strength')!
          .modifier!,
        dexterity: attributes.find((attr) => attr.name === 'dexterity')!
          .modifier!,
        constitution: attributes.find((attr) => attr.name === 'constitution')!
          .modifier!,
        intelligence: attributes.find((attr) => attr.name === 'intelligence')!
          .modifier!,
        wisdom: attributes.find((attr) => attr.name === 'wisdom')!.modifier!,
        charisma: attributes.find((attr) => attr.name === 'charisma')!
          .modifier!,
      };

      attributes.forEach((attr) => {
        newModifiers[attr.name] = attr.modifier;
      });

      setModifiers(newModifiers);
    }
  }, [attributes]);

  const updateAttributes = useCallback((newAttributes: Attribute[]) => {
    setAttributes(newAttributes);
  }, []);

  const value: AttributesProviderProps = {
    attributes,
    modifiers,
    updateAttributes,
  };
  return (
    <AttributesContext.Provider value={value}>
      {children}
    </AttributesContext.Provider>
  );
};
