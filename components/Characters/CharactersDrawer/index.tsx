import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TableIcon, Users, XCircle } from 'lucide-react-native';
import i18n from 'i18n';

import { useTable } from 'contexts/TableContext';
import { useCharacter } from 'contexts/CharacterContext';
import { useDestroyCharacterMutation } from 'services/characters/character.api';

import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';
import { CharactersDrawerControls } from './CharactersDrawerControls';

import type { Character } from 'types/character';
import { CharactersDrawerItem } from './CharactersDrawerItem';

interface CharactersDrawerProps extends DrawerContentComponentProps {
  characters: Character[];
  onLogout: () => void;
  onNewCharacter: () => void;
}

export const CharactersDrawer = ({
  navigation,
  characters,
  onLogout,
  onNewCharacter,
}: CharactersDrawerProps) => {
  const { setCharacterId } = useCharacter();
  const { tableId, clearTableId, table } = useTable();

  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(
    null,
  );

  const { mutate: destroyCharacter } = useDestroyCharacterMutation();

  const handleDelete = (character: Character) => {
    destroyCharacter(
      { id: character.id! },
      { onSuccess: () => setCharacterToDelete(null) },
    );
  };

  const handleSelectCharacter = useCallback(
    (item: Character) => {
      setCharacterId(item.id!);
      navigation.navigate('(tabs)');
    },
    [navigation, setCharacterId],
  );

  const ListEmptyComponent = () => (
    <View className="items-center py-12">
      <Users size={48} color="#CBD5E1" />

      <Text className="text-gray-400 mt-4 text-center">
        {i18n.t('titles.noCharacters')}
      </Text>
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-slate-100">
        <View className="pl-5 pt-4 pb-6 bg-indigo-600 flex-row">
          <View className="flex-1">
            {table && (
              <Text className="text-white text-2xl font-bold">
                {table.name}
              </Text>
            )}
            <Text className="text-white text-2xl font-bold">
              {i18n.t('titles.characters')}
            </Text>
            <Text className="text-indigo-200 text-sm mt-1">
              {characters.length} {i18n.t('titles.characters')}
            </Text>
          </View>

          {tableId ? (
            <TouchableOpacity
              onPress={clearTableId}
              className="bg-amber-50 border border-amber-200 mr-2 rounded-xl flex-col w-20 items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <XCircle size={20} color="#d97706" />

              <Text className="text-amber-600 font-bold text-base text-center">
                {i18n.t('tables.unselectTable')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('tables')}
              className="bg-slate-100 border border-slate-200 mr-2 rounded-xl py-2 flex-col w-16 items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <TableIcon size={20} color="#4f46e5" />

              <Text className="text-indigo-600 font-bold text-base text-center">
                {i18n.t('tables.title')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-1 px-4 pt-4">
          <FlatList
            data={characters}
            renderItem={({ item }) => (
              <CharactersDrawerItem
                item={item}
                onPress={() => handleSelectCharacter(item)}
                onDelete={() => setCharacterToDelete(item)}
              />
            )}
            keyExtractor={(item: Character) => item.id!.toString()}
            ListEmptyComponent={ListEmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        <CharactersDrawerControls
          navigation={navigation}
          onLogout={onLogout}
          onNewCharacter={onNewCharacter}
        />
      </SafeAreaView>

      <ConfirmationModal
        isVisible={!!characterToDelete}
        onClose={() => setCharacterToDelete(null)}
        onConfirm={() => handleDelete(characterToDelete!)}
      />
    </>
  );
};
