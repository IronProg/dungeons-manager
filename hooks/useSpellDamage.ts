import { useCallback, useMemo } from 'react';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ComposeRollParams } from '@/contexts/DiceRollContext';
import type { Damage, Spell, SpellSlotLevelType } from '@/types/character';

type SpellDamageParams = { spell: Spell; levelCast: SpellSlotLevelType };
type CantripDamageParams = { spell: Spell };

export const useSpellDamage = () => {
  const { character, modifiers } = useCharacter();

  const cantripHigherLevels = useMemo(
    () => Math.floor(((character?.level ?? 1) - 1) / 4),
    [character?.level],
  );

  const mountDamagesArray = useCallback(
    (
      damages: Damage[],
      higherLevelsDamages: Damage[],
      higherLevels: number,
    ) => {
      const damagesArray = [];

      if (damages) {
        damagesArray.push(...damages);
      }

      if (higherLevels > 0 && higherLevelsDamages.length > 0) {
        Array.from({ length: higherLevels }).map(() => {
          damagesArray.push(...higherLevelsDamages);
        });
      }

      return damagesArray;
    },
    [],
  );

  const transformDamagesToDices = useCallback(
    (damagesArray: Damage[]) => {
      const allDices = damagesArray.map((damage) => {
        const attrBonus = damage.mainAttribute
          ? [modifiers![damage.mainAttribute]]
          : [];
        if (damage.customBonus) attrBonus.push(damage.customBonus);

        return {
          diceSize: damage.diceSize ?? 6,
          label: damage.kind ?? '',
          amount: damage.diceAmount || 1,
          bonuses: attrBonus,
        };
      });

      return allDices.reduce((acc: ComposeRollParams, dice) => {
        const damageType = dice.label;
        const damageAmount = dice.amount;

        const foundDice = acc.find((dmg) => dmg.label === damageType);

        if (foundDice) {
          foundDice.amount = (foundDice.amount || 0) + (damageAmount || 0);
        } else {
          acc.push(dice);
        }

        return acc;
      }, [] as ComposeRollParams);
    },
    [modifiers],
  );

  const calculateCantripDamage = useCallback(
    ({ spell }: CantripDamageParams): ComposeRollParams => {
      const damages = spell.damages;
      const higherLevelsDamages = spell.higherLevelsDamages;

      const damagesArray = mountDamagesArray(
        damages,
        higherLevelsDamages,
        cantripHigherLevels,
      );

      return transformDamagesToDices(damagesArray);
    },
    [cantripHigherLevels, mountDamagesArray, transformDamagesToDices],
  );

  const calculateSpellDamage = useCallback(
    ({ spell, levelCast }: SpellDamageParams): ComposeRollParams => {
      const damages = spell.damages;
      const higherLevelsDamages = spell.higherLevelsDamages;

      const higherLevels = (levelCast ?? 1) - spell.level;

      const damagesArray = mountDamagesArray(
        damages,
        higherLevelsDamages,
        higherLevels,
      );

      return transformDamagesToDices(damagesArray);
    },
    [mountDamagesArray, transformDamagesToDices],
  );

  return { calculateCantripDamage, calculateSpellDamage };
};
