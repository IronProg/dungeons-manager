import { CharactersContext } from 'contexts/CharactersContext';
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
      const character: Character = {
        name: 'Personagem de Teste',
        attributes: [
          { name: 'strength', tempValue: 0, value: 9, modifier: -1 },
          { name: 'dexterity', tempValue: 0, value: 16, modifier: 3 },
          { name: 'constitution', tempValue: 0, value: 16, modifier: 3 },
          { name: 'intelligence', tempValue: 0, value: 18, modifier: 4 },
          { name: 'wisdom', tempValue: 0, value: 16, modifier: 3 },
          { name: 'charisma', tempValue: 0, value: 12, modifier: 1 },
        ],
        proficiency: 2,
        level: 1,
        experience: 200,
        currencies: {
          copperPoints: 0,
          silverPoints: 0,
          electrumPoints: 0,
          goldPoints: 0,
          platinumPoints: 0,
        },
        generalInfo: {
          armorClassBase: 10,
          armorClassFirstAttribute: 'dexterity',
          armorClassSecondAttribute: undefined,
          hitPoints: 0,
          hitPointsLimit: 0,
          temporaryHitPoints: 0,
          hitDices: 1,
          hitDicesMaximum: 1,
          hitDicesSize: 'd6',
          speed: 30,
          speedClimbing: undefined,
          speedFlying: undefined,
          initiativeCustomBonus: undefined,
          passivePerceptionCustomBonus: undefined,
          exhaustion: 0,
        },
        saves: [
          { attribute: 'strength', proficiency: false },
          { attribute: 'dexterity', proficiency: false },
          { attribute: 'constitution', proficiency: false },
          { attribute: 'intelligence', proficiency: true },
          { attribute: 'wisdom', proficiency: true },
          { attribute: 'charisma', proficiency: false },
        ],
        skills: [
          { name: 'acrobatics', attribute: 'dexterity', proficiency: true },
          { name: 'animalHandling', attribute: 'wisdom', proficiency: false },
          { name: 'arcana', attribute: 'intelligence', proficiency: true },
          { name: 'athletics', attribute: 'strength', proficiency: false },
          { name: 'deception', attribute: 'charisma', proficiency: false },
          { name: 'history', attribute: 'intelligence', proficiency: true },
          { name: 'insight', attribute: 'wisdom', proficiency: true },
          { name: 'intimidation', attribute: 'charisma', proficiency: false },
          {
            name: 'investigation',
            attribute: 'intelligence',
            proficiency: true,
            expertise: true,
          },
          { name: 'medicine', attribute: 'wisdom', proficiency: true },
          { name: 'nature', attribute: 'intelligence', proficiency: true },
          { name: 'perception', attribute: 'wisdom', proficiency: true },
          { name: 'performance', attribute: 'charisma', proficiency: false },
          { name: 'persuasion', attribute: 'charisma', proficiency: false },
          { name: 'religion', attribute: 'intelligence', proficiency: true },
          { name: 'sleightOfHand', attribute: 'dexterity', proficiency: false },
          { name: 'stealth', attribute: 'dexterity', proficiency: false },
          { name: 'survival', attribute: 'wisdom', proficiency: false },
        ],
        attacks: [
          {
            name: 'Club',
            attribute: 'strength',
            applyProficiency: true,
            range: 'corpo-a-corpo',
            damages: [
              {
                dice: '1d4',
                attribute: 'strength',
                kind: 'Concussão',
              },
            ],
            properties: 'Teste propriedades',
          },
          {
            name: 'Espada de Gelo',
            attribute: 'intelligence',
            applyProficiency: true,
            range: 'corpo-a-corpo',
            damages: [
              {
                dice: '1d8',
                attribute: 'dexterity',
                kind: 'Cortante',
              },
              {
                dice: '1d4',
                attribute: 'intelligence',
                kind: 'Frio',
              },
            ],
            properties: 'Teste propriedades',
          },
        ],
        resources: [
          { name: 'Psionic Dice(d6)', amount: 6, max: 6 },
          { name: 'Kit de curandeiro', amount: 4, max: 10 },
        ],
        features: [
          {
            title: 'Feature teste',
            origin: 'Classe, nível 1',
            description: 'Exemplo de descrição',
          },
        ],
      };

      setCharacter(character);
      success?.(character);
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
