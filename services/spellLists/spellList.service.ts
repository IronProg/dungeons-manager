import { spellListStorage } from '@/core/storage/mmkv';
import type { Spell } from '@/types/character';

const SPELLS_KEY = 'external_spells';

const getStoredSpells = (): Spell[] => {
  const data = spellListStorage.getString(SPELLS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Spell[];
  } catch {
    return [];
  }
};

const setStoredSpells = (spells: Spell[]) => {
  spellListStorage.set(SPELLS_KEY, JSON.stringify(spells));
};

export const getExternalSpellsCount = (): number => {
  return getStoredSpells().length;
};

export const insertExternalSpells = (spells: Spell[]) => {
  setStoredSpells(spells);
};

export const searchExternalSpells = (query: string): Spell[] => {
  const spells = getStoredSpells();

  let results = spells.map((spell, index) => ({ ...spell, id: index }));

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter((spell) =>
      spell.name.toLowerCase().includes(lowerQuery),
    );
  }

  results.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));

  return results;
};

export const getExternalSpellById = (id: number): Spell | null => {
  const spells = getStoredSpells();

  if (id < 0 || id >= spells.length) return null;

  return { ...spells[id], id };
};
