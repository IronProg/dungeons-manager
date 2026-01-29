import { CharacterContext } from 'contexts/CharacterContext';
import { useDetailedCharacter } from 'hooks/useSetDetailedCharacter';
import { ReactNode, useEffect, useState } from 'react';
import { useGetCharacter } from 'services/characters/character';
import { Character } from 'types/character';

export type CharacterProviderProps = {
  initialLoading: boolean;
  characterId?: number;
  character?: Character;
  proficiency: number;
  isLoading: boolean;
  isFetching: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [characterId, setCharacterId] = useState<number>();
  const { setDetailedCharacterData } = useDetailedCharacter({
    setInitialLoading,
  });

  const {
    data: character,
    isLoading,
    isFetching,
  } = useGetCharacter({ id: characterId });

  useEffect(() => {
    if (!character) {
      setInitialLoading(false);

      return;
    }

    setDetailedCharacterData(character);
  }, [character, setDetailedCharacterData]);

  const value: CharacterProviderProps = {
    initialLoading,
    character,
    characterId,
    proficiency: character?.proficiency || 2,
    isLoading,
    isFetching,
    setCharacterId,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
