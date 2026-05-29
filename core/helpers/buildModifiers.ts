import type { Attribute, Modifiers } from '@/types/character';

export const buildModifiers = (attributes: Attribute[]): Modifiers => {
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
