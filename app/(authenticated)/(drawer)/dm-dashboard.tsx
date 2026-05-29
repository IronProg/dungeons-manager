import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { Redirect, useRouter } from 'expo-router';
import { Edit } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { DMCharacterCard } from '@/components/Characters/DMCharacterCard';
import { useTable } from '@/contexts/TableContext';
import type { TableChannelCallback } from '@/hooks/useTableChannel';
import { useTableChannel } from '@/hooks/useTableChannel';
import i18n from '@/i18n';
import { useGetTableCharactersResume } from '@/services/tables/table.api';

export default function DMDashboard() {
  const queryClient = useQueryClient();
  const { table, tableId, isPending } = useTable();
  const router = useRouter();
  const { data: characters, isLoading: isLoadingCharacters } =
    useGetTableCharactersResume({ id: tableId! });

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['tables', tableId, 'characters'],
    });
  }, [queryClient, tableId]);

  const callback = useCallback(
    (data: TableChannelCallback) => {
      if (data.invalidate === 'table') {
        handleRefresh();
      }
    },
    [handleRefresh],
  );

  useTableChannel({ tableId: table?.id, callback });

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!tableId || (table && !table.isCreator)) {
    return <Redirect href="/(authenticated)/(drawer)/tables" />;
  }

  return (
    <FlashList
      refreshControl={
        <RefreshControl
          refreshing={isLoadingCharacters}
          onRefresh={handleRefresh}
        />
      }
      data={characters || []}
      renderItem={({ item }) => <DMCharacterCard character={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View className="px-4 py-6 flex-row justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-slate-800">
              {table?.name}
            </Text>

            <Text className="text-slate-500 font-medium">
              {i18n.t('titles.dmDashboard')}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(authenticated)/edit-table')}
            className="h-10 w-10 items-center justify-center rounded-full bg-indigo-500"
            hitSlop={10}
          >
            <Edit size={16} color="white" />
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className="py-20 items-center px-6">
          {isLoadingCharacters ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : (
            <>
              <View className="w-16 h-16 bg-slate-200 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl">👤</Text>
              </View>
              <Text className="text-slate-500 text-center text-lg font-medium">
                {i18n.t('titles.noCharacters')}
              </Text>
              <Text className="text-slate-400 text-center mt-1">
                {i18n.t('titles.noCharactersSubtitle')}
              </Text>
            </>
          )}
        </View>
      )}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
    />
  );
}
