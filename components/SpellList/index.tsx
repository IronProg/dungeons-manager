import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';
import { useDebounce } from 'use-debounce';

import i18n from '@/i18n';
import { searchExternalSpells } from '@/services/spellLists/spellList.service';
import type { Spell } from '@/types/character';

export const SpellList = () => {
  const router = useRouter();
  const { level } = useLocalSearchParams<{ level?: string }>();

  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<Spell[]>([]);

  const [debouncedText] = useDebounce(searchText, 1_000);

  const handleSpellSelect = (spellId: number) => {
    router.dismiss();

    router.replace({
      pathname: '/(authenticated)/spell-form',
      params: { importedSpellId: String(spellId), level: level ?? '0' },
    });
  };

  useEffect(() => {
    const list = searchExternalSpells(debouncedText);

    setResults(list);
  }, [debouncedText]);

  return (
    <View className="flex-1 pb-4 px-2 mt-4">
      <View className="flex-row px-3 py-2 mb-4 items-center rounded-full bg-white">
        <Search size={20} color={colors.gray[500]} />

        <TextInput
          className="flex-1 ml-2 text-base text-gray-800"
          placeholder={i18n.t('spellList.searchPlaceholder')}
          placeholderTextColor={colors.gray[500]}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlashList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SpellListItem
            item={item}
            onPress={() => handleSpellSelect(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-4">
            {i18n.t('spellList.noSpellsFound')}
          </Text>
        }
      />
    </View>
  );
};

const SpellListItem = ({
  item,
  onPress,
}: {
  item: Spell;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className="bg-gray-100 p-4 rounded-xl mb-2 flex-row justify-between items-center"
    onPress={onPress}
  >
    <View className="flex-1 pr-4">
      <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
      <Text className="text-gray-500 text-sm">
        {i18n.t('spells.level')} {item.level}
      </Text>
    </View>
  </TouchableOpacity>
);
