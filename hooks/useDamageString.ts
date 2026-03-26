import { useCharacter } from 'contexts/CharacterContext';

import { Damage } from 'types/character';

export const useDamageFormat = () => {
  const { modifiers } = useCharacter();

  const damageFormat = (damage?: Damage) => {
    if (!damage) return '';

    let baseDamage = `${damage.diceAmount}d${damage.diceSize}`;

    if (damage?.customBonus) {
      baseDamage += ` + ${damage.customBonus}`;
    }

    if (damage?.mainAttribute) {
      const modifier = modifiers?.[damage.mainAttribute];

      if (modifier) {
        baseDamage += ` + ${modifier}`;
      }
    }

    return `${baseDamage} ${damage.kind || ''}`;
  };

  return { damageFormat };
};
