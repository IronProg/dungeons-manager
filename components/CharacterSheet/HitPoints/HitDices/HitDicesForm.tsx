import { useBottomSheet } from '@gorhom/bottom-sheet';
import { Minus, Plus } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import {
  useGetAllClasses,
  useUpdateAllClassesMutation,
} from '@/services/classes/class';
import type { CharacterClass } from '@/types/character';

type handleAddFunction = {
  characterClass: CharacterClass;
  full?: boolean;
};

export const HitDicesForm = () => {
  const { close } = useBottomSheet();
  const { data: fetchedCharacterClasses } = useGetAllClasses();

  const [characterClasses, setCharacterClasses] = useState<CharacterClass[]>(
    fetchedCharacterClasses ?? [],
  );

  const { characterId } = useCharacter();

  const { mutate: updateAllCharacters, isPending } =
    useUpdateAllClassesMutation();

  useEffect(() => {
    if (fetchedCharacterClasses) {
      setCharacterClasses(fetchedCharacterClasses);
    } else {
      setCharacterClasses([]);
    }
  }, [fetchedCharacterClasses]);

  const onSubmit = useCallback(() => {
    updateAllCharacters(
      { characterId: characterId!, classes: characterClasses },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  }, [characterClasses, characterId, close, updateAllCharacters]);

  const handleAdd = useCallback(
    ({ characterClass, full = false }: handleAddFunction) => {
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
    },
    [],
  );

  const handleDecrease = useCallback(
    ({ characterClass, full = false }: handleAddFunction) => {
      setCharacterClasses((prev) =>
        prev?.map((cls) => {
          if (cls.id !== characterClass.id) return cls;

          return {
            ...characterClass,
            hitDiceAmount: full ? 0 : Math.max(0, cls.hitDiceAmount - 1),
          };
        }),
      );
    },
    [],
  );

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.hitDices')} / {i18n.t('general.maximum')}
      </Text>

      <View className="flex flex-col gap-2 pb-4">
        <View className="flex flex-row">
          <View className="w-8/12 px-2">
            <Text className="text-center font-medium">
              {i18n.t('hitDices.currentAmount')}
            </Text>
          </View>

          <View className="w-2/12 px-2">
            <Text className="text-center font-medium">
              {i18n.t('classes.hitDice')}
            </Text>
          </View>

          <View className="w-2/12 px-2">
            <Text className="text-center font-medium">
              {i18n.t('general.total')}
            </Text>
          </View>
        </View>

        {characterClasses?.map((characterClass) => (
          <View key={characterClass.id} className="flex flex-row items-center">
            <View className="w-8/12 flex flex-row gap-6 justify-center px-2 py-2">
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

            <View className="w-2/12 px-2">
              <Text className="text-center">{characterClass.hitDice}</Text>
            </View>

            <View className="w-2/12 px-2">
              <Text className="text-center">{characterClass.level}</Text>
            </View>
          </View>
        ))}
      </View>

      <Button onPress={onSubmit} disabled={isPending} />
    </View>
  );
};
