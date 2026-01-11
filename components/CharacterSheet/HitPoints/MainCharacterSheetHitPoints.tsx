import { Book, Heart, Tent } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character } from 'types/character';

type MainCharacterSheetAttributes = {
  character: Character;
};

export const MainCharacterSheetHitPoints = ({
  character,
}: MainCharacterSheetAttributes) => {
  return (
    <>
      <View className="flex flex-row justify-between flex-wrap p-4">
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Heart size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-center h-full w-full">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Vida
            </Text>
            <Text className="text-2xl font-bold text-center">
              {character.hitPoints} / {character.hitPointsLimit}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Tent size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-center h-full w-full">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Dados de vida (d6)
            </Text>
            <Text className="text-2xl font-bold text-center">20/20</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Book size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-center h-full w-full">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Experiência
            </Text>
            <Text className="text-2xl font-bold text-center">10900</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
