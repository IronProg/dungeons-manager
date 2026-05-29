import { useRouter } from 'expo-router';
import { Users, Hash } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TablesItem } from '@/components/Table/TablesItem.tsx';
import { Button } from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { useTable } from '@/contexts/TableContext';
import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import {
  useGetAllTables,
  useJoinTableMutation,
  useLeaveTableMutation,
} from '@/services/tables/table.api';
import type { Table } from '@/types/table';

const TablesListEmpty = () => (
  <View className="items-center py-10 px-4">
    <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
      <Users size={32} color="#9ca3af" />
    </View>
    <Text className="text-gray-500 text-center text-lg">
      {i18n.t('tables.noTables') ?? "You don't belong to any tables yet."}
    </Text>
  </View>
);

export const Tables = () => {
  const { bottom } = useSafeAreaInsets();
  const [inviteCode, setInviteCode] = useState<string>('');
  const [tableToSelect, setTableToSelect] = useState<Table | null>(null);
  const [tableToDelete, setTableToDelete] = useState<Table | null>(null);

  const { data: tables, isLoading: isLoadingTables } = useGetAllTables();
  const { mutateAsync: joinTable, isPending: isJoining } =
    useJoinTableMutation();
  const { mutateAsync: leaveTable, isPending: isLeaving } =
    useLeaveTableMutation();
  const { setTableId } = useTable();
  const { navigate } = useRouter();

  const handleJoinTable = async () => {
    if (!inviteCode.trim()) {
      showMessage(i18n.t('tables.inviteCodeRequired'), 'error');
      return;
    }

    await joinTable({ inviteCode: inviteCode.trim() });

    setInviteCode('');
    showMessage(i18n.t('tables.joinedTable'));
  };

  const handleLeaveTable = async () => {
    if (!tableToDelete) return;

    await leaveTable({ id: tableToDelete.id });

    showMessage(i18n.t('tables.tableLeft'));
    setTableToDelete(null);
  };

  const handleConfirmSelect = () => {
    if (tableToSelect?.id) {
      setTableId(tableToSelect.id);
    }

    setTableToSelect(null);
  };

  const renderTableItem = ({ item }: { item: Table }) => (
    <TablesItem
      item={item}
      onSelect={() => setTableToSelect(item)}
      onDelete={() => setTableToDelete(item)}
    />
  );

  return (
    <>
      <View className="flex-1 bg-slate-200">
        <View className="px-5 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {i18n.t('tables.joinTable') ?? 'Join Table'}
          </Text>

          <View className="flex-row items-center gap-3">
            <View className="flex-1 relative justify-center">
              <View className="absolute left-3 z-10">
                <Hash size={20} color="#9ca3af" />
              </View>
              <TextInput
                value={inviteCode}
                onChangeText={setInviteCode}
                placeholder={i18n.t('tables.inviteCodePlaceholder')}
                className="bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 font-medium h-12"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Button
                text={i18n.t('tables.join') ?? 'Join'}
                onPress={handleJoinTable}
                disabled={isJoining || !inviteCode}
                className="px-2"
                textClassName="text-base"
                hitSlop={10}
              />
            </View>
          </View>
        </View>

        <View className="flex-1 px-5 mt-2">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            {i18n.t('tables.myTables') ?? 'My Tables'}
          </Text>

          {isLoadingTables ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#4f46e5" />
            </View>
          ) : (
            <FlatList
              data={tables}
              renderItem={renderTableItem}
              keyExtractor={(item, index) =>
                item.id?.toString() ?? index.toString()
              }
              ListEmptyComponent={TablesListEmpty}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}

          <View className="mt-auto py-4" style={{ marginBottom: bottom }}>
            <Button
              onPress={() => navigate('/(authenticated)/(drawer)/new-table')}
              text={i18n.t('tables.createTable') ?? 'Create Table'}
            />
          </View>
        </View>
      </View>

      <ConfirmationModal
        isVisible={!!tableToSelect}
        onClose={() => setTableToSelect(null)}
        onConfirm={handleConfirmSelect}
        title={tableToSelect?.name}
        subTitle={i18n.t('tables.selectTable')}
        buttonClassName="bg-indigo-500"
      />

      <ConfirmationModal
        isVisible={!!tableToDelete}
        onClose={() => setTableToDelete(null)}
        onConfirm={handleLeaveTable}
        title={i18n.t('tables.leaveTitle', { table: tableToDelete?.name })}
        subTitle={i18n.t('tables.leaveText')}
        buttonClassName="bg-red-500"
        isPending={isLeaving}
      />
    </>
  );
};
