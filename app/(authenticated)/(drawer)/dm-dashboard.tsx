import { useQueryClient } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { DMDashboardList } from '@/components/DMDashboard';
import { useTable } from '@/hooks/useTable';
import type { TableChannelCallback } from '@/hooks/useTableChannel';
import { useTableChannel } from '@/hooks/useTableChannel';

export default function DMDashboard() {
  const queryClient = useQueryClient();
  const { table, tableId, isPending } = useTable();

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['tables', tableId, 'characters'],
    });
  };

  const callback = (data: TableChannelCallback) => {
    if (data.invalidate === 'table') {
      handleRefresh();
    }
  };

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

  return <DMDashboardList table={table!} tableId={tableId} />;
}
