import { GeneralInfoProviderProps } from 'providers/GeneralInfoProvider';
import { createContext, useContext } from 'react';

export const GeneralInfoContext = createContext<
  GeneralInfoProviderProps | undefined
>(undefined);

export const useGeneralInfo = () => {
  const context = useContext(GeneralInfoContext);

  if (!context) {
    throw new Error('useGeneralInfo must be used within a GeneralInfoProvider');
  }

  return context;
};
