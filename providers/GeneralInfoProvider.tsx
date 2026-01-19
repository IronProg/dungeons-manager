import { useCharacters } from 'contexts/CharactersContext';
import { GeneralInfoContext } from 'contexts/GeneralInfoContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { CharacterGeneralInfo } from 'types/character';

const DEFAULT_GENERAL_INFO: CharacterGeneralInfo = {
  armorClassBase: 10,
  armorClassFirstAttribute: 'dexterity',
  armorClassSecondAttribute: undefined,
  hitPoints: 0,
  hitPointsLimit: 0,
  temporaryHitPoints: 0,
  speed: 30,
  speedClimbing: undefined,
  speedFlying: undefined,
  initiativeCustomBonus: undefined,
  passivePerceptionCustomBonus: undefined,
  exhaustion: 0,
};

export type GeneralInfoProviderProps = {
  generalInfo: CharacterGeneralInfo;
  updateGeneralInfo: (newGeneralInfo: CharacterGeneralInfo) => void;
};

export const GeneralInfoProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();

  const [generalInfo, setGeneralInfo] =
    useState<CharacterGeneralInfo>(DEFAULT_GENERAL_INFO);

  useEffect(() => {
    if (character?.generalInfo) {
      setGeneralInfo(character.generalInfo);
    }
  }, [character?.generalInfo]);

  const updateGeneralInfo = useCallback(
    (newGeneralInfo: CharacterGeneralInfo) => {
      setGeneralInfo(newGeneralInfo);
    },
    [],
  );

  const value: GeneralInfoProviderProps = {
    generalInfo,
    updateGeneralInfo,
  };

  return (
    <GeneralInfoContext.Provider value={value}>
      {children}
    </GeneralInfoContext.Provider>
  );
};
