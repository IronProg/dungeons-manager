import { useCharacters } from 'contexts/CharactersContext';
import { CurrenciesContext } from 'contexts/CurrenciesContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Currencies } from 'types/character';

const CURRENCIES_OBJECT: Currencies = {
  copperPoints: 0,
  silverPoints: 0,
  electrumPoints: 0,
  goldPoints: 0,
  platinumPoints: 0,
};

export type CurrenciesProviderProps = {
  currencies: Currencies;
  updateCurrencies: (newCurrencies: Currencies) => void;
};

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();

  const [currencies, setCurrencies] = useState<Currencies>(CURRENCIES_OBJECT);

  useEffect(() => {
    if (character) {
      setCurrencies(character.currencies);
    }
  }, [character]);

  const updateCurrencies = useCallback((newCurrencies: Currencies) => {
    setCurrencies(newCurrencies);
  }, []);

  const value: CurrenciesProviderProps = {
    currencies,
    updateCurrencies,
  };

  return (
    <CurrenciesContext.Provider value={value}>
      {children}
    </CurrenciesContext.Provider>
  );
};
