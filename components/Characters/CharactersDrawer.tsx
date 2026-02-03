import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n';
import { CharacterDrawerProps } from 'navigators/DrawerNavigator';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Character } from 'types/character';

type CharactersDrawerProps = { characters: Character[] };

export const CharactersDrawer = ({ characters }: CharactersDrawerProps) => {
  const navigation = useNavigation<CharacterDrawerProps>();
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-400 rounded-l-xl">
      <View className="py-6">
        <Text className="text-center font-medium text-2xl text-slate-950">
          {i18n.t('titles.characters')}
        </Text>
      </View>

      <ScrollView contentContainerClassName="flex flex-1 justify-end flex-col items-stretch gap-2 px-2 pb-4">
        {characters.map((character) => (
          <TouchableOpacity
            key={character.id}
            onPress={() => {
              navigation.navigate('CharacterSheet', {
                characterId: character.id!,
              });
            }}
            className="w-full bg-slate-300 rounded-lg py-2 px-4"
          >
            <Text className="font-medium text-lg text-slate-950">
              {character.id}. {character.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="mt-auto px-4" style={{ marginBottom: bottom }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewCharacter')}
          className="bg-green-700 px-4 py-2 rounded-lg"
        >
          <Text className="text-2xl text-center text-white font-medium">
            {i18n.t('titles.newCharacter')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
