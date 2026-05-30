import type {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client';

import { queryCacheStorage } from '@/core/storage/mmkv';

const CACHE_KEY = 'react-query-cache';

export const mmkvPersister: Persister = {
  persistClient: (client: PersistedClient) => {
    queryCacheStorage.set(CACHE_KEY, JSON.stringify(client));
  },
  restoreClient: () => {
    const data = queryCacheStorage.getString(CACHE_KEY);
    if (!data) return undefined;
    try {
      return JSON.parse(data) as PersistedClient;
    } catch {
      return undefined;
    }
  },
  removeClient: () => {
    queryCacheStorage.delete(CACHE_KEY);
  },
};
