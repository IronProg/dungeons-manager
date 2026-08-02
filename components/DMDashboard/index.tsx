import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { DMCharacterCard } from '@/components/Characters/DMCharacterCard';
import { DmDashboardHeader } from '@/components/DMDashboard/DmDashboardHeader';
import i18n from '@/i18n';
import { useGetTableCharactersResume } from '@/services/tables/table.api';
import type { Table } from '@/types/table';

interface DMDashboardListProps {
  table: Table;
  tableId: number;
}

export const DMDashboardList = ({ table, tableId }: DMDashboardListProps) => {
  const queryClient = useQueryClient();
  const { data: characters, isLoading: isLoadingCharacters } =
    useGetTableCharactersResume({ id: tableId });

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['tables', tableId, 'characters'],
    });
  };

  return (
    <FlashList
      refreshControl={
        <RefreshControl
          refreshing={isLoadingCharacters}
          onRefresh={handleRefresh}
        />
      }
      data={characters ?? []}
      renderItem={({ item }) => <DMCharacterCard character={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <DmDashboardHeader table={table} />}
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
      contentContainerClassName="px-4 pb-8"
    />
  );
};
