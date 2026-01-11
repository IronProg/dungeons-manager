import React, { useEffect, useState } from 'react';

import { useCharacters } from 'contexts/CharactersContext';
import { MainCharacterSheetAttributes } from './Attributes/MainCharacterSheetAttributes';
import { MainCharacterSheetGeneralInfo } from './GeneralInfo/MainCharacterSheetGeneralInfo';
import { Text, TouchableOpacity, View } from 'react-native';
import { MainCharacterSheetHitPoints } from './HitPoints/MainCharacterSheetHitPoints';
import { ScrollView } from 'react-native-gesture-handler';
import { MainCharacterSheetProficiencies } from './Proficiencies/MainCharacterSheetProficiencies';
import { SettingsIcon } from 'lucide-react-native';

export const MainCharacterSheet = () => {
  const [loading, setLoading] = useState(true);
  const { character, getDetails } = useCharacters();

  useEffect(() => {
    if (!character) {
      getDetails({
        id: '1',
        success: () => {
          setLoading(false);
        },
      });
    } else {
      setLoading(false);
    }
  }, [character, getDetails]);

  return (
    <>
      {character && (
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
              Ficha do Personagem
            </Text>
            <MainCharacterSheetHitPoints character={character} />
            <View className={styles.separator} />
            <MainCharacterSheetGeneralInfo character={character} />
          </View>

          <View className="bg-gray-100 rounded-lg flex-col items-stretch mt-4">
            <Text className="text-gray-900 text-lg font-semibold text-center">
              Atributos
            </Text>
            <MainCharacterSheetAttributes character={character} />
          </View>

          <View className="bg-gray-100 rounded-lg flex-col items-stretch mt-4">
            <Text className="text-gray-900 text-lg font-semibold text-center">
              Resistências e Perícias
            </Text>
            <MainCharacterSheetProficiencies character={character} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = {
  separator: 'border-t border-neutral-300 mx-4',
};
