import { useCharacters } from 'contexts/CharactersContext';
import { AttacksContext } from 'contexts/AttacksContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Attack } from 'types/character';

export type AttacksProviderProps = {
  attacks: Attack[];
  appendAttack: (newAttack: Attack) => void;
  updateAttack: (attack: Attack, newAttack: Attack) => void;
};

export const AttacksProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();

  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    if (character) {
      setAttacks(character.attacks);
    }
  }, [character]);

  const appendAttack = useCallback((newAttack: Attack) => {
    setAttacks((prev) => [...prev, newAttack]);
  }, []);

  const updateAttack = useCallback((attack: Attack, newAttack: Attack) => {
    setAttacks((prev) =>
      prev.map((atk) => {
        if (atk.name === attack.name) {
          return newAttack;
        }

        return atk;
      }),
    );
  }, []);

  const value: AttacksProviderProps = {
    attacks,
    appendAttack,
    updateAttack,
  };

  return (
    <AttacksContext.Provider value={value}>{children}</AttacksContext.Provider>
  );
};
