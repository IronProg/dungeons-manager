import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character } from 'types/character';
import {
  Award,
  Eye,
  Footprints,
  Shield,
  Skull,
  Zap,
} from 'lucide-react-native';

type MainCharacterSheetAttributes = {
  character: Character;
};

export const MainCharacterSheetGeneralInfo = ({
  character,
}: MainCharacterSheetAttributes) => {
  return (
    <View className="py-4 flex flex-col gap-2">
      <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Shield size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              CA
            </Text>
            <Text className="text-3xl font-bold text-center">
              {character.armorClass}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Zap size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Iniciativa
            </Text>
            <Text className="text-3xl font-bold text-center">
              {character.initiative}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Footprints size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Velocidade
            </Text>
            <Text className="text-3xl font-bold text-center">
              {character.speed}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Award size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Proficiência
            </Text>
            <Text className="text-3xl font-bold text-center">
              {character.proficiency}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Skull size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Exaustão
            </Text>
            <Text className="text-3xl font-bold text-center">0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="relative flex flex-col items-center justify-center flex w-[90px]">
          <Eye size={90} color={'#ccc'} fill={'#ddd'} />
          <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
            <Text className="text-gray-900 text-sm font-semibold text-center">
              Percepção Passiva
            </Text>
            <Text className="text-3xl font-bold text-center">
              {character.passivePerception}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
