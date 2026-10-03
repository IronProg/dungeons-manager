import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainCharacterSheetAttributes } from '@/components/CharacterSheet/Attributes/MainCharacterSheetAttributes';
import { MainCharacterSheetGeneralInfo } from '@/components/CharacterSheet/GeneralInfo/MainCharacterSheetGeneralInfo';
import { HintsModal } from '@/components/CharacterSheet/HintsModal';
import { MainCharacterSheetHitPoints } from '@/components/CharacterSheet/HitPoints/MainCharacterSheetHitPoints';
import { CharacterNpcs } from '@/components/CharacterSheet/Npcs/CharacterNpcs';
import { NpcAddSheet } from '@/components/CharacterSheet/Npcs/NpcAddSheet';
import { MainCharacterSheetSkills } from '@/components/CharacterSheet/Skills/MainCharacterSheetSkills';
import i18n from '@/i18n';

export const MainCharacterSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-slate-200"
      contentContainerClassName="p-4"
      contentContainerStyle={{ paddingBottom: 16 + bottom }}
    >
      <View className="flex flex-row justify-between items-center mb-2">
        <Text className="text-black text-2xl font-bold flex-1">
          {i18n.t('titles.characterSheet')}
        </Text>

        <View className="flex flex-row gap-2 flex-wrap">
          <NpcAddSheet />
          <HintsModal />
        </View>
      </View>

      <View className="bg-white rounded-lg flex-col items-stretch shadow-md shadow-blue-600 border border-slate-300">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.general')}
        </Text>

        <MainCharacterSheetHitPoints />

        <View className={styles.separator} />

        <MainCharacterSheetGeneralInfo />
      </View>

      <View className="bg-white rounded-lg flex-col items-stretch mt-4 shadow-md shadow-blue-600 border border-slate-300">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.attributes')}
        </Text>

        <MainCharacterSheetAttributes />
      </View>

      <View className="bg-white rounded-lg flex-col items-stretch mt-4 shadow-md shadow-blue-600 border border-slate-300">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.savingThrowsAndSkills')}
        </Text>

        <MainCharacterSheetSkills />
      </View>

      <CharacterNpcs />
    </ScrollView>
  );
};

const styles = {
  separator: 'border-t border-neutral-300 mx-4',
};
