import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import i18n from 'i18n';
import { Container } from 'components/Container';
import { Search } from 'lucide-react-native';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import {
  initExternalSpellsDb,
  getExternalSpellsCount,
  insertExternalSpells,
  searchExternalSpells,
} from 'services/spellLists/spellList.service';
import { FlashList } from '@shopify/flash-list';
import { colors } from 'core/utils/colors';
import { useDebounce } from 'use-debounce';
import { Spell } from 'types/character';
import {
  getCurrentExternalSpellsUrl,
  getLastExternalSpellsUrl,
  setLastExternalSpellsUrl,
} from 'services/spellLists/spellList.store';

export default function SpellListScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams<{ level?: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [downloadPromptVisible, setDownloadPromptVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<Spell[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const [debouncedText] = useDebounce(searchText, 1_000);

  const currentUrl = useMemo(() => getCurrentExternalSpellsUrl(), []);

  const checkDb = useCallback(async () => {
    initExternalSpellsDb();

    const lastUrl = await getLastExternalSpellsUrl();

    if (lastUrl !== currentUrl) {
      setDownloadPromptVisible(true);
    }

    const count = getExternalSpellsCount();

    if (count === 0) {
      setDownloadPromptVisible(true);
    }

    setIsLoading(false);
  }, [currentUrl]);

  useEffect(() => {
    checkDb();
  }, [checkDb]);

  const handleDownloadSpells = async () => {
    setDownloadPromptVisible(false);
    setIsDownloading(true);
    try {
      const url = currentUrl;
      if (!url) throw new Error('Missing EXPO_PUBLIC_JSON_URL');

      const response = await fetch(url);
      const data = await response.json();

      insertExternalSpells(data);
      setLastExternalSpellsUrl(currentUrl);
      setSearchText('');
      performSearch('');
    } catch (e) {
      console.error(e);
      setDownloadPromptVisible(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSpellSelect = (spellId: number) => {
    router.dismiss();

    router.replace({
      pathname: '/(authenticated)/spell-form',
      params: { importedSpellId: String(spellId), level: level || '0' },
    });
  };

  const performSearch = useCallback((query: string) => {
    const list = searchExternalSpells(query);
    setResults(list);
  }, []);

  useEffect(() => {
    performSearch(debouncedText);
  }, [debouncedText, performSearch]);

  const renderItem = ({ item }: { item: Spell }) => (
    <TouchableOpacity
      className="bg-gray-100 p-4 rounded-xl mb-2 flex-row justify-between items-center"
      onPress={() => handleSpellSelect(item.id!)}
    >
      <View className="flex-1 pr-4">
        <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
        <Text className="text-gray-500 text-sm">
          {i18n.t('spells.level')} {item.level}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Stack.Screen
        options={{
          headerTitle: i18n.t('spellList.title'),
          headerShown: true,
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
        }}
      />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : isDownloading ? (
        <View className="flex-1 justify-center items-center gap-4">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="text-lg text-gray-600 font-bold">
            {i18n.t('spellList.downloading')}
          </Text>
        </View>
      ) : (
        <View className="flex-1 pb-4 px-2">
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
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-4">
                {i18n.t('spellList.noSpellsFound')}
              </Text>
            }
          />
        </View>
      )}

      <ConfirmationModal
        isVisible={downloadPromptVisible}
        onClose={() => {
          setDownloadPromptVisible(false);

          router.back();
        }}
        onConfirm={handleDownloadSpells}
        title={i18n.t('spellList.downloadTitle')}
        subTitle={i18n.t('spellList.downloadSubTitle')}
        buttonClassName="bg-indigo-600"
      />
    </Container>
  );
}
