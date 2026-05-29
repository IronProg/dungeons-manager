import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';

import { Skeleton } from '@/components/ui/Skeleton';
import { useCharacter } from '@/contexts/CharacterContext';
import { useTable } from '@/contexts/TableContext';
import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';
import {
  useCloneCharacterMutation,
  useGetAllCharacters,
} from '@/services/characters/character.api';
import type { Character } from '@/types/character';

export const ImportCharacter = () => {
  const { character, setCharacterId } = useCharacter();
  const { tableId } = useTable();
  const navigation = useRouter();

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const {
    data: allCharacters,
    isLoading,
    isError,
  } = useGetAllCharacters({ useTableId: false });

  const { bottom } = useSafeAreaInsets();

  const [characterCloned, setCharacterCloned] = useState(false);

  const { mutateAsync: cloneCharacter, isPending } =
    useCloneCharacterMutation();

  const cloneCharacterHandler = useCallback(async () => {
    if (!selectedCharacter || !tableId) return;

    const data = await cloneCharacter({ id: selectedCharacter.id!, tableId });

    setCharacterId(data.id);
    setCharacterCloned(true);
  }, [cloneCharacter, selectedCharacter, setCharacterId, tableId]);

  useEffect(() => {
    if (characterCloned && character) {
      setCharacterCloned(false);
      navigation.navigate('/(authenticated)/(drawer)/(tabs)');
    }
  }, [characterCloned, navigation, character]);

  const disabled = !selectedCharacter || characterCloned || isPending;

  const renderItem = ({ item }: { item: Character }) => {
    const isSelected = item.id === selectedCharacter?.id;

    return (
      <TouchableOpacity
        onPress={() =>
          setSelectedCharacter((prev) =>
            prev && prev.id === item.id ? null : item,
          )
        }
        className={cn(
          'bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-sm border border-white',
          { 'border-indigo-400': isSelected },
        )}
        activeOpacity={0.7}
      >
        <View className="w-12 h-12 rounded-full bg-indigo-500 items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-1">
            <Text className="font-semibold text-base text-gray-800">
              {item.name}
            </Text>
          </View>

          <Text className="text-gray-400 text-sm">
            {i18n.t('general.level')} {item.level}
          </Text>

          {item.table && (
            <View className="flex flex-row gap-1 items-center">
              <Text className="font-bold text-gray-600 text-sm">
                {i18n.t('tables.table')}:
              </Text>
              <Text className="text-gray-400 text-sm">{item.table.name}</Text>
            </View>
          )}
        </View>

        {isSelected && <Check size={24} color={colors.indigo[400]} />}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-slate-200">
      <FlashList
        className="flex-1 px-4"
        contentContainerClassName="gap-4 flex-col"
        data={allCharacters}
        renderItem={renderItem}
        ListEmptyComponent={() =>
          isLoading ? (
            <>
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </>
          ) : isError ? (
            <Text className="mt-10 font-medium text-lg">
              Error while loading characters
            </Text>
          ) : (
            <Text className="mt-10 font-medium text-lg">
              No characters found
            </Text>
          )
        }
      />

      <KeyboardStickyView>
        <View className="mt-auto px-4" style={{ paddingBottom: 16 + bottom }}>
          <TouchableOpacity
            onPress={cloneCharacterHandler}
            disabled={disabled}
            className={`bg-green-600 px-4 py-2 rounded-lg ${disabled ? 'opacity-75' : ''}`}
          >
            <Text className="text-2xl text-center text-white font-medium">
              {i18n.t('general.generateCharacter')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardStickyView>
    </View>
  );
};
