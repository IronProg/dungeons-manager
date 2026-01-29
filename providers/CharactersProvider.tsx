import { CharactersContext } from 'contexts/CharactersContext';
import { Modules } from 'modules/modules';
import { ReactNode, useCallback, useState } from 'react';
import { ApiCallbacks } from 'types/api';
import { Character } from 'types/character';

type GetDetailsParams = {
  id: string | number;
} & ApiCallbacks<Character>;

export type CharactersProviderProps = {
  characters: Character[];
  character?: Character;
  proficiency: number;
  getDetails: (params: GetDetailsParams) => void;
  updateProficiency: (newProficiency: number) => void;
  updateExperience: (newProficiency: number) => void;
};

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const getDetails = useCallback(
    async ({ id, success, error }: GetDetailsParams) => {
      const { data } = await Modules.character.fetch({ id: `${id}` });

      setCharacter(data);

      setCharacter(data);
      success?.(data);
    },
    [],
  );

  const updateProficiency = useCallback(
    (newProficiency: number) => {
      setCharacter({ ...character!, proficiency: newProficiency });
    },
    [character],
  );

  const updateExperience = useCallback(
    (newExperience: number) => {
      setCharacter({ ...character!, experience: newExperience });
    },
    [character],
  );

  const value: CharactersProviderProps = {
    character,
    proficiency: character?.proficiency || 2,
    characters,
    updateProficiency,
    updateExperience,
    getDetails,
  };

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};
