import { CurrenciesProviderProps } from 'providers/CurrenciesProvider';
import { createContext, useContext } from 'react';

export const CurrenciesContext = createContext<
  CurrenciesProviderProps | undefined
>(undefined);

export const useCurrencies = () => {
  const context = useContext(CurrenciesContext);

  if (!context) {
    throw new Error('useCurrencies must be used within a CurrenciesProvider');
  }

  return context;
};
