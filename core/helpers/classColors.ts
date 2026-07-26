import type { Character } from '@/types/character';

export const CLASS_COLORS: Record<string, string> = {
  Barbarian: '#dc2626',
  Bard: '#9333ea',
  Cleric: '#7c3aed',
  Druid: '#65a30d',
  Fighter: '#854d0e',
  Monk: '#0369a1',
  Paladin: '#b45309',
  Ranger: '#15803d',
  Rogue: '#0284c7',
  Sorcerer: '#ca8a04',
  Warlock: '#a21caf',
  Wizard: '#2563eb',
};

export const getClassColor = (className: string): string =>
  CLASS_COLORS[className] ?? '#4f46e5';

export const getAvatarColor = (character: Character): string => {
  const firstClass = character.characterClasses?.[0];

  if (firstClass) return getClassColor(firstClass.name);

  return '#4f46e5';
};
