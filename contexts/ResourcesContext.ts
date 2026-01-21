import { ResourcesProviderProps } from 'providers/ResourcesProvider';
import { createContext, useContext } from 'react';

export const ResourcesContext = createContext<
  ResourcesProviderProps | undefined
>(undefined);

export const useResources = () => {
  const context = useContext(ResourcesContext);

  if (!context) {
    throw new Error('useResources must be used within a ResourcesProvider');
  }

  return context;
};
