import { Minus, Plus } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { BaseModal } from '@/components/ui/Modals/BaseModal';
import { useCharacter } from '@/contexts/CharacterContext';
import { useDiceRoll } from '@/hooks/useDiceRoll';
import i18n from '@/i18n';
import {
  useGetAllClasses,
  useUpdateAllClassesMutation,
} from '@/services/classes/class';
import type { CharacterClass } from '@/types/character';

type handleAlterFunction = {
  characterClass: CharacterClass;
  full?: boolean;
};

interface HitDicesRollFormProps {
  open: boolean;
  onClose: () => void;
}

export const HitDicesRollForm = ({ open, onClose }: HitDicesRollFormProps) => {
  return (
    <BaseModal visible={open} onClose={onClose}>
      <Content onClose={onClose} />
    </BaseModal>
  );
};

const Content = ({ onClose }: { onClose: () => void }) => {
  const { enabled, composeRoll } = useDiceRoll();
  const { characterId, modifiers } = useCharacter();

  const constitutionModifier = modifiers?.constitution ?? 0;

  const { mutate: updateAllClasses, isPending } = useUpdateAllClassesMutation();

  const { data: fetchedCharacterClasses } = useGetAllClasses();

  const [characterClasses, setCharacterClasses] = useState<CharacterClass[]>(
    fetchedCharacterClasses ?? [],
  );

  useEffect(() => {
    if (fetchedCharacterClasses) {
      setCharacterClasses(
        fetchedCharacterClasses.map((cls) => ({
          ...cls,
          hitDiceAmount: 0,
          level: cls.hitDiceAmount,
        })),
      );
    } else {
      setCharacterClasses([]);
    }
  }, [fetchedCharacterClasses]);

  const onSubmit = () => {
    const updatedClasses = fetchedCharacterClasses?.map((cls) => {
      const characterClass = characterClasses?.find((c) => c.id === cls.id);

      return {
        ...cls,
        hitDiceAmount: cls.hitDiceAmount - (characterClass?.hitDiceAmount ?? 0),
      };
    });

    updateAllClasses(
      { characterId: characterId!, classes: updatedClasses! },
      {
        onSuccess: () => {
          if (enabled) {
            const rolls = characterClasses
              ?.filter((cls) => cls.hitDiceAmount > 0)
              .map((cls) => {
                return {
                  label: cls.name,
                  amount: cls.hitDiceAmount,
                  diceSize: +cls.hitDice.replace('d', ''),
                  bonuses: Array(cls.hitDiceAmount).fill(constitutionModifier),
                };
              });

            composeRoll(rolls);
          }

          requestAnimationFrame(() => {
            onClose();
          });
        },
      },
    );
  };

  const handleAdd = ({ characterClass, full = false }: handleAlterFunction) => {
    setCharacterClasses((prev) =>
      prev?.map((cls) => {
        if (cls.id !== characterClass.id) return cls;

        return {
          ...characterClass,
          hitDiceAmount: full
            ? cls.level
            : Math.min(cls.level, cls.hitDiceAmount + 1),
        };
      }),
    );
  };

  const handleDecrease = ({
    characterClass,
    full = false,
  }: handleAlterFunction) => {
    setCharacterClasses((prev) =>
      prev?.map((cls) => {
        if (cls.id !== characterClass.id) return cls;

        return {
          ...characterClass,
          hitDiceAmount: full ? 0 : Math.max(0, cls.hitDiceAmount - 1),
        };
      }),
    );
  };

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.hitDices')} / {i18n.t('general.maximum')}
      </Text>

      <View className="flex flex-col gap-2 pb-4">
        <View className="flex flex-row">
          <View className="w-8/12 px-0.5">
            <Text className="text-center font-medium">
              {i18n.t('hitDices.currentAmount')}
            </Text>
          </View>

          <View className="w-2/12 px-0.5">
            <Text className="text-center font-medium">
              {i18n.t('classes.hitDice')}
            </Text>
          </View>

          <View className="w-2/12 px-0.5">
            <Text className="text-center font-medium">
              {i18n.t('general.total')}
            </Text>
          </View>
        </View>

        {characterClasses?.map((characterClass) => (
          <View key={characterClass.id} className="flex flex-row items-center">
            <View className="w-8/12 flex flex-row gap-6 justify-center px-0.5 py-2">
              <TouchableOpacity
                hitSlop={10}
                onPress={() => handleDecrease({ characterClass })}
                onLongPress={() =>
                  handleDecrease({ characterClass, full: true })
                }
                className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center shadow-sm"
              >
                <Minus size={24} color="white" />
              </TouchableOpacity>

              <Text className="font-bold text-lg">
                {characterClass.hitDiceAmount}
              </Text>

              <TouchableOpacity
                hitSlop={10}
                onPress={() => handleAdd({ characterClass })}
                onLongPress={() => handleAdd({ characterClass, full: true })}
                className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shadow-sm"
              >
                <Plus size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="w-2/12 px-0.5">
              <Text className="text-center">{characterClass.hitDice}</Text>
            </View>

            <View className="w-2/12 px-0.5">
              <Text className="text-center">{characterClass.level}</Text>
            </View>
          </View>
        ))}
      </View>

      <Button onPress={onSubmit} disabled={isPending} />
    </View>
  );
};
