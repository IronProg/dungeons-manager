import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { FileTextIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from 'i18n';

import { MainCharacterSheetAttributes } from './Attributes/MainCharacterSheetAttributes';
import { MainCharacterSheetGeneralInfo } from './GeneralInfo/MainCharacterSheetGeneralInfo';
import { MainCharacterSheetHitPoints } from './HitPoints/MainCharacterSheetHitPoints';
import { MainCharacterSheetSkills } from './Skills/MainCharacterSheetSkills';

export const MainCharacterSheet = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

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
          <TouchableOpacity
            hitSlop={10}
            onPress={() => router.push('/character-details')}
            className="bg-white rounded-full p-2"
          >
            <FileTextIcon size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-lg flex-col items-stretch shadow-sm">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.general')}
        </Text>

        <MainCharacterSheetHitPoints />

        <View className={styles.separator} />

        <MainCharacterSheetGeneralInfo />
      </View>

      <View className="bg-white rounded-lg flex-col items-stretch mt-4 shadow-sm">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.attributes')}
        </Text>

        <MainCharacterSheetAttributes />
      </View>

      <View className="bg-white rounded-lg flex-col items-stretch mt-4 shadow-sm">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.savingThrowsAndSkills')}
        </Text>

        <MainCharacterSheetSkills />
      </View>
    </ScrollView>
  );
};

const styles = {
  separator: 'border-t border-neutral-300 mx-4',
};
