import React, { useEffect, useState } from 'react';
import { MainCharacterSheetAttributes } from './Attributes/MainCharacterSheetAttributes';
import { MainCharacterSheetGeneralInfo } from './GeneralInfo/MainCharacterSheetGeneralInfo';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { MainCharacterSheetHitPoints } from './HitPoints/MainCharacterSheetHitPoints';
import { ScrollView } from 'react-native-gesture-handler';
import { MainCharacterSheetSkills } from './Skills/MainCharacterSheetSkills';
import { SettingsIcon } from 'lucide-react-native';
import i18n from 'i18n';
import { getAllAttributesKey } from 'services/attributes/attributes';
import { useQueryClient } from '@tanstack/react-query';
import {
  getCharacterCurrencyKey,
  getCharacterGeneralInfoKey,
  useGetCharacter,
} from 'services/characters/character';
import { getAllSavesKey } from 'services/saves/save';
import { getAllSkillsKey } from 'services/skills/skill';
import { getAllAttacksKey } from 'services/attacks/attack';
import { getAllResourcesKey } from 'services/resources/resource';
import { getAllFeaturesKey } from 'services/features/feature';

export const MainCharacterSheet = () => {
  const queryClient = useQueryClient();
  const { data: character } = useGetCharacter({ id: 10 });

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!character) return;

    setInitialLoading(true);

    queryClient.setQueryData(
      getAllAttributesKey({ characterId: character.id! }),
      character.characterAttributes,
    );

    queryClient.setQueryData(
      getCharacterGeneralInfoKey({ characterId: character.id! }),
      character.generalInfo,
    );

    queryClient.setQueryData(
      getCharacterCurrencyKey({ characterId: character.id! }),
      character.currencies,
    );

    queryClient.setQueryData(
      getAllSavesKey({ characterId: character.id! }),
      character.saves,
    );

    queryClient.setQueryData(
      getAllSkillsKey({ characterId: character.id! }),
      character.skills,
    );

    queryClient.setQueryData(
      getAllAttacksKey({ characterId: character.id! }),
      character.attacks,
    );

    queryClient.setQueryData(
      getAllResourcesKey({ characterId: character.id! }),
      character.resources,
    );

    queryClient.setQueryData(
      getAllFeaturesKey({ characterId: character.id! }),
      character.features,
    );

    setInitialLoading(false);
  }, [character, queryClient]);

  return (
    <>
      {initialLoading ? (
        <ActivityIndicator />
      ) : character ? (
        <ScrollView>
          <View className="flex flex-row justify-between items-center mb-2">
            <Text className="text-black text-2xl font-bold">
              {character.name}
            </Text>

            <TouchableOpacity className="bg-gray-100 rounded-full p-2">
              <SettingsIcon size={24} />
            </TouchableOpacity>
          </View>

          <View className="bg-gray-100 rounded-lg flex-col items-stretch">
            <Text className="text-gray-900 text-lg font-semibold text-center">
              {i18n.t('titles.characterSheet')}
            </Text>

            <MainCharacterSheetHitPoints characterId={character.id!} />

            <View className={styles.separator} />

            <MainCharacterSheetGeneralInfo characterId={character.id!} />
          </View>

          <View className="bg-gray-100 rounded-lg flex-col items-stretch mt-4">
            <Text className="text-gray-900 text-lg font-semibold text-center">
              {i18n.t('titles.attributes')}
            </Text>

            <MainCharacterSheetAttributes characterId={character.id!} />
          </View>

          <View className="bg-gray-100 rounded-lg flex-col items-stretch mt-4">
            <Text className="text-gray-900 text-lg font-semibold text-center">
              {i18n.t('titles.savesAndSkills')}
            </Text>

            <MainCharacterSheetSkills characterId={character.id!} />
          </View>
        </ScrollView>
      ) : (
        <Text>Error while loading character</Text>
      )}
    </>
  );
};

const styles = {
  separator: 'border-t border-neutral-300 mx-4',
};
