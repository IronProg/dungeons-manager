import { FeaturesProviderProps } from 'providers/FeaturesProvider';
import { createContext, useContext } from 'react';

export const FeaturesContext = createContext<FeaturesProviderProps | undefined>(
  undefined,
);

export const useFeatures = () => {
  const context = useContext(FeaturesContext);

  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }

  return context;
};
