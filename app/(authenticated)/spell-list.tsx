import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import i18n from 'i18n';

import {
  getCurrentExternalSpellsUrl,
  getLastExternalSpellsUrl,
  setLastExternalSpellsUrl,
} from 'services/spellLists/spellList.store';
import {
  initExternalSpellsDb,
  getExternalSpellsCount,
  insertExternalSpells,
} from 'services/spellLists/spellList.service';

import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import { SpellList } from 'components/SpellList';

export default function SpellListScreen() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [downloadPromptVisible, setDownloadPromptVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    } catch (e) {
      console.error(e);
      setDownloadPromptVisible(true);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
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
        <SpellList />
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
    </>
  );
}
