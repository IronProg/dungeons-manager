import React from 'react';
import { MainCharacterSheetAttributes } from './Attributes/MainCharacterSheetAttributes';
import { MainCharacterSheetGeneralInfo } from './GeneralInfo/MainCharacterSheetGeneralInfo';
import { Text, TouchableOpacity, View } from 'react-native';
import { MainCharacterSheetHitPoints } from './HitPoints/MainCharacterSheetHitPoints';
import { ScrollView } from 'react-native-gesture-handler';
import { MainCharacterSheetSkills } from './Skills/MainCharacterSheetSkills';
import { SettingsIcon } from 'lucide-react-native';
import i18n from 'i18n';

export const MainCharacterSheet = () => {
  return (
    <ScrollView>
      <View className="flex flex-row justify-between items-center mb-2">
        <Text className="text-black text-2xl font-bold">
          {i18n.t('titles.characterSheet')}
        </Text>

        <TouchableOpacity className="bg-gray-100 rounded-full p-2">
          <SettingsIcon size={24} />
        </TouchableOpacity>
      </View>

      <View className="bg-gray-100 rounded-lg flex-col items-stretch">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.general')}
        </Text>

        <MainCharacterSheetHitPoints />

        <View className={styles.separator} />

        <MainCharacterSheetGeneralInfo />
      </View>

      <View className="bg-gray-100 rounded-lg flex-col items-stretch mt-4">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.attributes')}
        </Text>

        <MainCharacterSheetAttributes />
      </View>

      <View className="bg-gray-100 rounded-lg flex-col items-stretch mt-4">
        <Text className="text-gray-900 text-lg font-semibold text-center">
          {i18n.t('titles.savesAndSkills')}
        </Text>

        <MainCharacterSheetSkills />
      </View>
    </ScrollView>
  );
};

const styles = {
  separator: 'border-t border-neutral-300 mx-4',
};
