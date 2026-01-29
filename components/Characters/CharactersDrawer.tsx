import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n';
import { CharacterRoutesStack } from 'navigators/DrawerNavigator';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Character } from 'types/character';

type DrawerNavigation = DrawerNavigationProp<CharacterRoutesStack>;

type CharactersDrawerProps = {
  characters: Character[];
};

export const CharactersDrawer = ({ characters }: CharactersDrawerProps) => {
  const navigation = useNavigation<DrawerNavigation>();

  return (
    <ScrollView contentContainerClassName="flex flex-col items-stretch gap-2 px-2">
      <View className=" py-4">
        <Text className="text-center font-medium text-xl">
          {i18n.t('titles.characters')}
        </Text>
      </View>

      {characters.map((character) => (
        <TouchableOpacity
          key={character.id}
          onPress={() => {
            navigation.navigate('CharacterSheet', {
              characterId: character.id!,
            });
          }}
          className="w-full bg-gray-100 py-2 px-4"
        >
          <Text className="font-medium text-lg">
            {character.id}. {character.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
