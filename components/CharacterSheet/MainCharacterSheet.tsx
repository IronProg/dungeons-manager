import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { CircleQuestionMark, FileTextIcon } from 'lucide-react-native';
import i18n from 'i18n';

import { MainCharacterSheetAttributes } from './Attributes/MainCharacterSheetAttributes';
import { MainCharacterSheetGeneralInfo } from './GeneralInfo/MainCharacterSheetGeneralInfo';
import { MainCharacterSheetHitPoints } from './HitPoints/MainCharacterSheetHitPoints';
import { MainCharacterSheetSkills } from './Skills/MainCharacterSheetSkills';
import { HintsModal } from './HintsModal';

export const MainCharacterSheet = () => {
  const [hintsOpen, setHintsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <ScrollView contentContainerClassName="px-2">
        <View className="flex flex-row justify-between items-center mb-2">
          <Text className="text-black text-2xl font-bold">
            {i18n.t('titles.characterSheet')}
          </Text>

          <View className="flex flex-row gap-2">
            <TouchableOpacity
              hitSlop={20}
              onPress={() => setHintsOpen(true)}
              className="bg-white rounded-full p-2"
            >
              <CircleQuestionMark size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              hitSlop={20}
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

      <HintsModal visible={hintsOpen} onClose={() => setHintsOpen(false)} />
    </>
  );
};

const styles = {
  separator: 'border-t border-neutral-300 mx-4',
};
