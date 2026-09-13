import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus, Search, Skull } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import { NpcCard } from '@/components/Npcs/Library/NpcCard';
import i18n from '@/i18n';
import { useGetNpcs } from '@/services/npcs/npc.api';
import type { NpcSummary } from '@/types/npc';

const EmptyNpcs = ({ onNewNpc }: { onNewNpc: () => void }) => (
  <View className="items-center py-16 px-4">
    <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
      <Skull size={32} color="#9ca3af" />
    </View>
    <Text className="text-gray-500 text-center text-lg mb-2">
      {i18n.t('npcs.noNpcs')}
    </Text>
    <TouchableOpacity
      onPress={onNewNpc}
      className="bg-indigo-500 px-6 py-3 rounded-xl"
      activeOpacity={0.8}
    >
      <Text className="text-white font-medium">{i18n.t('npcs.new')}</Text>
    </TouchableOpacity>
  </View>
);

export const MyNpcs = () => {
  const [searchText, setSearchText] = useState('');
  const [text] = useDebounce(searchText, 500);
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { data: npcs = [], isLoading, refetch, isRefetching } = useGetNpcs();

  const filteredNpcs = npcs.filter((npc) =>
    npc.name.toLocaleLowerCase().includes(text.trim().toLocaleLowerCase()),
  );

  const openNewNpc = () => router.push('/(authenticated)/npc-name');

  const renderItem = ({ item }: { item: NpcSummary }) => (
    <NpcCard
      item={item}
      onPress={() =>
        router.push({
          pathname: '/(authenticated)/npc-sheet',
          params: { id: item.id.toString() },
        })
      }
    />
  );

  return (
    <View className="flex-1 bg-slate-100">
      <View className="flex-row items-center gap-3 px-4 pt-4 pb-2">
        <View className="flex-1 relative justify-center">
          <View className="absolute left-3 z-10">
            <Search size={18} color="#9ca3af" />
          </View>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder={i18n.t('npcs.searchPlaceholder')}
            className="bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 h-12"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          onPress={openNewNpc}
          className="bg-indigo-500 rounded-xl h-12 px-4 flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Plus size={20} color="white" />
          <Text className="text-white font-medium ml-1">
            {i18n.t('npcs.new')}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : (
        <FlashList
          className="flex-1 px-4"
          data={filteredNpcs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<EmptyNpcs onNewNpc={openNewNpc} />}
          contentContainerClassName="pt-2"
          contentContainerStyle={{ paddingBottom: bottom + 16 }}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      )}
    </View>
  );
};
