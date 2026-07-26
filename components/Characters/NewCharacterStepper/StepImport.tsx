import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { getAvatarColor, getClassColor } from '@/core/helpers/classColors';
import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';
import type { Character } from '@/types/character';

interface StepImportProps {
  characters: Character[] | undefined;
  isLoading: boolean;
  error: Error | null;
  selectedCharacterId: number | null;
  onSelect: (characterId: number | null) => void;
  onRetry?: () => void;
}

export const StepImport = ({
  characters,
  isLoading,
  error,
  selectedCharacterId,
  onSelect,
  onRetry,
}: StepImportProps) => {
  if (isLoading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View className="flex-1 w-full px-4">
      <Text className="text-gray-500 text-sm mb-4">
        {i18n.t('character.cloneCharacter')}
      </Text>

      <TouchableOpacity
        onPress={() => onSelect(null)}
        className={cn(
          'border rounded-xl p-4 mb-3',
          selectedCharacterId === null
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-dashed border-gray-400',
        )}
        activeOpacity={0.7}
      >
        <Text
          className={cn(
            'text-center font-medium',
            selectedCharacterId === null ? 'text-indigo-600' : 'text-gray-400',
          )}
        >
          {i18n.t('character.startFresh')}
        </Text>
      </TouchableOpacity>

      {error ? (
        <View className="items-center py-8 px-4">
          <Text className="text-red-400 text-center mb-4">
            {i18n.t('errors.couldNotLoadCharacters')}
          </Text>
          {onRetry && (
            <TouchableOpacity
              onPress={onRetry}
              className="bg-indigo-500 px-6 py-3 rounded-xl"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium">
                {i18n.t('general.tryAgain')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : characters?.length === 0 ? (
        <View className="items-center py-8 px-4">
          <Text className="text-gray-400 text-center">
            {i18n.t('character.noCharactersToImport')}
          </Text>
        </View>
      ) : (
        characters?.map((character) => {
          const isSelected = character.id === selectedCharacterId;
          const avatarColor = getAvatarColor(character);

          return (
            <TouchableOpacity
              key={character.id ?? `character-${character.name}`}
              onPress={() => onSelect(character.id ?? null)}
              className={cn(
                'border rounded-xl p-4 mb-3',
                isSelected
                  ? 'border-2 border-indigo-400 bg-indigo-50'
                  : 'border border-gray-200 bg-white',
              )}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center mb-2">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: avatarColor }}
                >
                  <Text className="text-white font-bold text-base">
                    {character.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">
                    {character.name}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {i18n.t('general.level')} {character.level}
                  </Text>
                </View>
              </View>

              {character.characterClasses &&
                character.characterClasses.length > 0 && (
                  <View className="flex-row flex-wrap gap-1 mb-2 pl-[52px]">
                    {character.characterClasses.map((cls) => (
                      <View
                        key={cls.id}
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${getClassColor(cls.name)}30`,
                        }}
                      >
                        <Text
                          className="text-xs font-medium"
                          style={{ color: getClassColor(cls.name) }}
                        >
                          {cls.name} {cls.level}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

              {character.table && (
                <Text className="text-gray-400 text-xs pl-[52px]">
                  {character.table.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};
