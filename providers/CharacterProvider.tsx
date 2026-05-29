import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { CharacterContext } from '@/contexts/CharacterContext';
import { buildModifiers } from '@/core/helpers/buildModifiers';
import { useDetailedCharacter } from '@/hooks/useSetDetailedCharacter';
import { useGetCharacter } from '@/services/characters/character.api';
import type { Character, Modifiers } from '@/types/character';

export type CharacterProviderProps = {
  initialLoading: boolean;
  characterId?: number;
  character?: Character;
  proficiencyBonus: number;
  isLoading: boolean;
  isFetching: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<number | undefined>>;
  modifiers?: Modifiers;
  setModifiers: React.Dispatch<React.SetStateAction<Modifiers | undefined>>;
  canEdit: boolean;
};

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [characterId, setCharacterId] = useState<number>();
  const [modifiers, setModifiers] = useState<Modifiers>();

  const { setDetailedCharacterData } = useDetailedCharacter({
    setInitialLoading,
  });

  const {
    data: character,
    isLoading,
    isFetching,
  } = useGetCharacter({ id: characterId });

  const canEdit = character?.isOwner ?? false;

  useEffect(() => {
    if (!character) {
      setInitialLoading(false);

      return;
    }

    setDetailedCharacterData(character);

    const modifiers = buildModifiers(character.characterAttributes);

    setModifiers(modifiers);
  }, [character, setDetailedCharacterData]);

  const value: CharacterProviderProps = {
    initialLoading,
    character,
    characterId,
    proficiencyBonus: character?.proficiencyBonus || 2,
    isLoading,
    isFetching,
    setCharacterId,
    modifiers,
    setModifiers,
    canEdit,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
