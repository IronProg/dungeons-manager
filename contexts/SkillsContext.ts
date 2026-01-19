import { SkillsProviderProps } from 'providers/SkillsProvider';
import { createContext, useContext } from 'react';

export const SkillsContext = createContext<SkillsProviderProps | undefined>(
  undefined,
);

export const useSkills = () => {
  const context = useContext(SkillsContext);

  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }

  return context;
};
