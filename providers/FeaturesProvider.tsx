import { useCharacters } from 'contexts/CharactersContext';
import { FeaturesContext } from 'contexts/FeaturesContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Feature } from 'types/character';

export type FeaturesProviderProps = {
  features: Feature[];
  appendFeature: (newFeatures: Feature) => void;
  updateFeature: (feature: Feature, newFeature: Feature) => void;
};

export const FeaturesProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();

  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    if (character) {
      setFeatures(character.features);
    }
  }, [character]);

  const appendFeature = useCallback((newFeature: Feature) => {
    setFeatures((prev) => [...prev, newFeature]);
  }, []);

  const updateFeature = useCallback((feature: Feature, newFeature: Feature) => {
    setFeatures((prev) =>
      prev.map((feat) => {
        if (feat.title === feature.title) {
          return newFeature;
        }

        return feat;
      }),
    );
  }, []);

  const value: FeaturesProviderProps = {
    features,
    appendFeature,
    updateFeature,
  };

  return (
    <FeaturesContext.Provider value={value}>
      {children}
    </FeaturesContext.Provider>
  );
};
