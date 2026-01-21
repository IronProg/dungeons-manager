import { useCharacters } from 'contexts/CharactersContext';
import { ResourcesContext } from 'contexts/ResourcesContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Resource } from 'types/character';

export type ResourcesProviderProps = {
  resources: Resource[];
  appendResource: (newResources: Resource) => void;
  updateResource: (resource: Resource, newResource: Resource) => void;
};

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const { character } = useCharacters();

  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (character) {
      setResources(character.resources);
    }
  }, [character]);

  const appendResource = useCallback((newResource: Resource) => {
    setResources((prev) => [...prev, newResource]);
  }, []);

  const updateResource = useCallback(
    (resource: Resource, newResource: Resource) => {
      setResources((prev) =>
        prev.map((feat) => {
          if (feat.name === resource.name) {
            return newResource;
          }

          return feat;
        }),
      );
    },
    [],
  );

  const value: ResourcesProviderProps = {
    resources,
    appendResource,
    updateResource,
  };

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};
