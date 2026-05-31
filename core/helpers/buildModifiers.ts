import type { Attribute, Modifiers } from '@/types/character';

const DEFAULT_MODIFIERS = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

export const buildModifiers = (attributes: Attribute[]): Modifiers => {
  if (!attributes || attributes.length === 0) return DEFAULT_MODIFIERS;

  return {
    strength: attributes.find((attr) => attr.name === 'strength')!.modifier,
    dexterity: attributes.find((attr) => attr.name === 'dexterity')!.modifier,
    constitution: attributes.find((attr) => attr.name === 'constitution')!
      .modifier,
    intelligence: attributes.find((attr) => attr.name === 'intelligence')!
      .modifier,
    wisdom: attributes.find((attr) => attr.name === 'wisdom')!.modifier,
    charisma: attributes.find((attr) => attr.name === 'charisma')!.modifier,
  };
};
