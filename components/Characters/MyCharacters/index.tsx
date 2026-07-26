import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus, Search, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import { CharacterCard } from '@/components/Characters/MyCharacters/CharacterCard';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { useCharacter } from '@/contexts/CharacterContext';
import { useTable } from '@/hooks/useTable';
import i18n from '@/i18n';
import {
  useDestroyCharacterMutation,
  useGetAllCharacters,
} from '@/services/characters/character.api';
import type { Character } from '@/types/character';

const MyCharactersListEmpty = ({
  onAddCharacter,
}: {
  onAddCharacter: () => void;
}) => (
  <View className="items-center py-16 px-4">
    <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
      <Users size={32} color="#9ca3af" />
    </View>
    <Text className="text-gray-500 text-center text-lg mb-2">
      {i18n.t('titles.noCharacters')}
    </Text>
    <TouchableOpacity
      onPress={onAddCharacter}
      className="bg-indigo-500 px-6 py-3 rounded-xl"
      activeOpacity={0.8}
    >
      <Text className="text-white font-medium">
        {i18n.t('character.addFirst')}
      </Text>
    </TouchableOpacity>
  </View>
);

export const MyCharacters = () => {
  const [searchText, setSearchText] = useState('');
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(
    null,
  );
  const [text] = useDebounce(searchText, 500);

  const { setCharacterId } = useCharacter();
  const { table, tableId, clearTableId } = useTable();
  const navigation = useRouter();
  const { bottom } = useSafeAreaInsets();

  const {
    data: characters,
    isLoading,
    refetch,
  } = useGetAllCharacters({ useTableId: !!tableId, text: text || undefined });

  const { mutate: destroyCharacter, isPending: isDeleting } =
    useDestroyCharacterMutation();

  const handleSelectCharacter = (item: Character) => {
    setCharacterId(item.id);
    navigation.navigate('/(authenticated)/(drawer)/(tabs)');
  };

  const handleDelete = () => {
    if (!characterToDelete) return;
    destroyCharacter(
      { id: characterToDelete.id! },
      { onSuccess: () => setCharacterToDelete(null) },
    );
  };

  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard
      item={item}
      onPress={() => handleSelectCharacter(item)}
      onDelete={() => setCharacterToDelete(item)}
    />
  );

  return (
    <>
      <View className="flex-1 bg-slate-100">
        <View className="flex-row items-center gap-3 px-4 pt-4 pb-2">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-3 z-10">
              <Search size={18} color="#9ca3af" />
            </View>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder={i18n.t('characters.searchPlaceholder')}
              className="bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 h-12"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('/(authenticated)/(drawer)/new-character')
            }
            className="bg-indigo-500 rounded-xl h-12 px-4 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <Plus size={20} color="white" />
            <Text className="text-white font-medium ml-1">
              {i18n.t('general.add')}
            </Text>
          </TouchableOpacity>
        </View>

        {tableId && (
          <View className="flex-row items-center px-4 pb-2 gap-2">
            <Text className="text-gray-600 text-sm flex-1">
              {i18n.t('characters.filterByTable', {
                table: table?.name ?? '',
              })}
            </Text>
            <TouchableOpacity
              onPress={clearTableId}
              className="bg-gray-200 px-3 py-1.5 rounded-full"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 text-sm font-medium">
                {i18n.t('characters.clearFilter')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <FlashList
          className="flex-1 px-4"
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item: Character) => item.id!.toString()}
          ListEmptyComponent={
            <MyCharactersListEmpty
              onAddCharacter={() =>
                navigation.navigate('/(authenticated)/(drawer)/new-character')
              }
            />
          }
          contentContainerClassName="pt-2"
          contentContainerStyle={{ paddingBottom: bottom + 16 }}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      </View>

      <ConfirmationModal
        isVisible={!!characterToDelete}
        onClose={() => setCharacterToDelete(null)}
        onConfirm={handleDelete}
        title={characterToDelete?.name}
        subTitle={i18n.t('character.deleteConfirmation')}
        buttonClassName="bg-red-500"
        isPending={isDeleting}
      />
    </>
  );
};
