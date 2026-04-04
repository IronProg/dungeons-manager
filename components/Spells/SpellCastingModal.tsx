import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import i18n from 'i18n';

import {
  useGetAllCharacterSpellSlots,
  useUpdateSpellSlotMutation,
} from 'services/spellSlots/spellSlot';
import { cn } from 'core/helpers/cn';
import { useDamageFormat } from 'hooks/useDamageString';
import { useDiceRoll } from 'contexts/DiceRollContext';
import { useCharacter } from 'contexts/CharacterContext';
import { useSpellDamage } from 'hooks/useSpellDamage';

import { Button } from 'components/ui/Button';
import { BaseModal } from 'components/ui/Modals/BaseModal';

import { Damage, Spell, SpellSlotLevelType } from 'types/character';

interface SpellCastingModalProps {
  spell?: Spell;
  onClose: () => void;
}

export const SpellCastingModal = ({
  spell,
  onClose,
}: SpellCastingModalProps) => {
  return (
    <BaseModal visible={!!spell} onClose={onClose}>
      <Content onClose={onClose} spell={spell} />
    </BaseModal>
  );
};

const Content = ({ spell, onClose }: SpellCastingModalProps) => {
  const { composeRoll } = useDiceRoll();
  const { damageFormat } = useDamageFormat();
  const { calculateSpellDamage } = useSpellDamage();
  const { characterId } = useCharacter();

  const { mutate: updateSpellSlot, isPending } = useUpdateSpellSlotMutation();
  const initialDamages: Damage[] = useMemo(() => spell?.damages || [], [spell]);
  const higherLevelsDamage: Damage[] = useMemo(
    () => spell?.higherLevelsDamages || [],
    [spell],
  );

  const [currentLevel, setCurrentLevel] = useState<SpellSlotLevelType>(
    spell?.level || 1,
  );

  const { data: spellSlots } = useGetAllCharacterSpellSlots();

  const availableSpellLevels = useMemo(
    () =>
      spellSlots
        ?.filter((slot) => slot.amount !== 0)
        ?.map((slot) => slot.level)
        ?.sort() || [],
    [spellSlots],
  );

  const maxLevel = useMemo(
    () => Math.max(...(spellSlots?.map((slot) => slot.level) || [0])),
    [spellSlots],
  );

  const minLevel = useMemo(() => spell?.level || 1, [spell?.level]);

  const damages: Damage[] = useMemo(() => {
    const damagesArray: Damage[] = [];

    if (initialDamages) {
      damagesArray.push(...initialDamages);
    }

    const higherLevels = currentLevel - minLevel;

    if (higherLevels > 0 && higherLevelsDamage.length > 0) {
      Array.from({ length: higherLevels }).map(() => {
        damagesArray.push(...higherLevelsDamage);
      });
    }

    return damagesArray;
  }, [initialDamages, currentLevel, minLevel, higherLevelsDamage]);

  useEffect(() => {
    setCurrentLevel(spell?.level || 1);
  }, [spell?.level]);

  const handleCast = useCallback(() => {
    const spellSlot = spellSlots?.find((slot) => slot.level === currentLevel);

    if (!spellSlot) return;

    const dices = calculateSpellDamage({
      spell: spell!,
      levelCast: currentLevel,
    });

    updateSpellSlot(
      {
        id: spellSlot.id!,
        amount: Math.max(spellSlot.amount - 1, 0),
        characterId: characterId!,
      },
      {
        onSuccess: () => composeRoll(dices),
        onSettled: onClose,
      },
    );
  }, [
    calculateSpellDamage,
    characterId,
    composeRoll,
    currentLevel,
    onClose,
    spell,
    spellSlots,
    updateSpellSlot,
  ]);

  return (
    <View className="flex flex-col items-center grow">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.hitDices')} / {i18n.t('general.maximum')}
      </Text>

      <View className="flex flex-col gap-2 pb-4">
        <View className="flex flex-row">
          <View className="w-6/12 px-2">
            <Text className="text-center font-medium">
              {i18n.t('general.level')}
            </Text>
          </View>

          <View className="w-6/12 px-2">
            <Text className="text-center font-medium">
              {i18n.t('general.damage')}
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center">
          <View className="w-6/12 flex flex-row gap-6 justify-center px-2 py-2">
            <TouchableOpacity
              hitSlop={10}
              onPress={() =>
                setCurrentLevel(
                  (prev) => Math.max(minLevel, prev - 1) as SpellSlotLevelType,
                )
              }
              disabled={currentLevel === minLevel}
              onLongPress={() => {}}
              className={cn(
                'h-8 w-8 rounded-full bg-red-500 flex items-center justify-center shadow-sm',
                { 'opacity-80': currentLevel === minLevel },
              )}
            >
              <Minus size={24} color="white" />
            </TouchableOpacity>

            <Text>{currentLevel}</Text>

            <TouchableOpacity
              hitSlop={10}
              onPress={() =>
                setCurrentLevel(
                  (prev) => Math.min(9, prev + 1) as SpellSlotLevelType,
                )
              }
              disabled={currentLevel === maxLevel}
              onLongPress={() => {}}
              className={cn(
                'h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shadow-sm',
                { 'opacity-80': currentLevel === maxLevel },
              )}
            >
              <Plus size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="w-6/12 px-2 flex flex-col gap-1">
            {damages.map((damage, index) => (
              <Text key={`${damage.id}-${index}`} className="text-center">
                {damageFormat(damage)}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {!availableSpellLevels.includes(currentLevel) && (
        <View className="w-full py-2">
          <Text className="text-center font-medium text-red-500">
            {i18n.t('spells.noSpellSlotAvailable')}
          </Text>
        </View>
      )}

      <Button
        onPress={handleCast}
        disabled={isPending}
        className="mt-auto"
        text={i18n.t('spells.cast')}
      />
    </View>
  );
};
