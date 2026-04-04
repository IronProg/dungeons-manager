import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  LogOut,
  Plus,
  TableIcon,
  Trash2,
  Users,
  XCircle,
  LayoutDashboard,
  Eye,
} from 'lucide-react-native';
import i18n from 'i18n';

import { useDestroyCharacterMutation } from 'services/characters/character.api';

import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import type { Character } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { useTable } from 'contexts/TableContext';

interface CharactersDrawerProps extends DrawerContentComponentProps {
  characters: Character[];
  onLogout: () => void;
  onNewCharacter: () => void;
}

export const CharactersDrawer: React.FC<CharactersDrawerProps> = ({
  navigation,
  characters,
  onLogout,
  onNewCharacter,
}) => {
  const { setCharacterId } = useCharacter();
  const { tableId, table, clearTableId } = useTable();

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

  const renderCharacterItem = ({ item }: { item: Character }) => {
    const isViewOnly = table?.isCreator && !item.isOwner;

    return (
      <TouchableOpacity
        onPress={() => handleSelectCharacter(item)}
        className="bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-sm"
        activeOpacity={0.7}
      >
        <View className="w-12 h-12 rounded-full bg-indigo-500 items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-1">
            {isViewOnly && <Eye size={14} color="#6366f1" />}
            <Text className="font-semibold text-base text-gray-800">
              {item.name}
            </Text>
          </View>
          <Text className="text-gray-400 text-sm">
            {i18n.t('general.level')} {item.level}
          </Text>
          {item.table && (
            <View className="flex flex-row gap-1 items-center">
              <Text className="font-bold text-gray-600 text-sm">
                {i18n.t('tables.table')}:
              </Text>
              <Text className="text-gray-400 text-sm">{item.table.name}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setCharacterToDelete(item)}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
        <View className="px-5 pt-4 pb-6 bg-indigo-600">
          {table && (
            <Text className="text-white text-2xl font-bold">{table.name}</Text>
          )}
          <Text className="text-white text-2xl font-bold">
            {i18n.t('titles.characters')}
          </Text>
          <Text className="text-indigo-200 text-sm mt-1">
            {characters.length} {i18n.t('titles.characters')}
          </Text>
        </View>

        <View className="flex-1 px-4 pt-4">
          <FlatList
            data={characters}
            renderItem={renderCharacterItem}
            keyExtractor={(item: Character) => item.id!.toString()}
            ListEmptyComponent={ListEmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        <View className="px-4 pb-4 gap-3">
          {tableId ? (
            <TouchableOpacity
              onPress={clearTableId}
              className="bg-amber-50 border border-amber-200 rounded-xl py-4 flex-row items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <XCircle size={20} color="#d97706" />
              <Text className="text-amber-600 font-bold text-base ml-2">
                {i18n.t('tables.unselectTable') || 'Leave Current Table'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('tables')}
              className="bg-indigo-50 border border-indigo-200 rounded-xl py-4 flex-row items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <TableIcon size={20} color="#4f46e5" />
              <Text className="text-indigo-600 font-bold text-base ml-2">
                {i18n.t('tables.title') || 'Tables'}
              </Text>
            </TouchableOpacity>
          )}
          {table?.isCreator && (
            <TouchableOpacity
              onPress={() => navigation.navigate('dm-dashboard')}
              className="bg-indigo-100 border border-indigo-200 rounded-xl py-4 flex-row items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <LayoutDashboard size={20} color="#4f46e5" />
              <Text className="text-indigo-600 font-bold text-base ml-2">
                {i18n.t('titles.dmDashboardInternal')}
              </Text>
            </TouchableOpacity>
          )}

          {table && (
            <TouchableOpacity
              onPress={onNewCharacter}
              className="bg-emerald-500 rounded-xl py-4 flex-row items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              <Plus size={20} color="white" />
              <Text className="text-white font-bold text-base ml-2">
                {i18n.t('titles.newCharacter')}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onLogout}
            className="bg-white border border-red-200 rounded-xl py-3 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <LogOut size={18} color="#EF4444" />

            <Text className="text-red-500 font-medium text-sm ml-2">
              {i18n.t('titles.logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ConfirmationModal
        isVisible={!!characterToDelete}
        onClose={() => setCharacterToDelete(null)}
        onConfirm={() => handleDelete(characterToDelete!)}
      />
    </>
  );
};
