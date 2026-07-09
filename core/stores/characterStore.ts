import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  characterPersistStorage,
  characterStorage,
} from '@/core/storage/characterStorage';

type CharacterState = {
  selectedCharacterId?: number;
  setSelectedCharacterId: (id?: number) => void;
};

type CharacterPersistedState = Pick<CharacterState, 'selectedCharacterId'>;

const readPersistedCharacterId = (): number | undefined => {
  try {
    const raw = characterStorage.getString('character-store');

    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as {
      state?: { selectedCharacterId?: unknown };
    };

    const id = parsed.state?.selectedCharacterId;

    return typeof id === 'number' ? id : undefined;
  } catch {
    return undefined;
  }
};

export const useCharacterStore = create<CharacterState>()(
  persist<CharacterState, [], [], CharacterPersistedState>(
    (set) => ({
      selectedCharacterId: readPersistedCharacterId(),
      setSelectedCharacterId: (selectedCharacterId) =>
        set({ selectedCharacterId }),
    }),
    {
      name: 'character-store',
      storage: createJSONStorage(() => characterPersistStorage),
      partialize: (state) => ({
        selectedCharacterId: state.selectedCharacterId,
      }),
    },
  ),
);
