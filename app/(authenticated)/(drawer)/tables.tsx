import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Hash } from 'lucide-react-native';
import i18n from 'i18n';

import { useTable } from 'contexts/TableContext';
import {
  useGetAllTables,
  useJoinTableMutation,
} from 'services/tables/table.api';

import { Button } from 'components/ui/Button';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import type { Table } from 'types/table';

export default function TablesScreen() {
  const [inviteCode, setInviteCode] = useState<string>(
    process.env.EXPO_PUBLIC_TABLE_CODE || '',
  );
  const [tableToSelect, setTableToSelect] = useState<Table | null>(null);

  const { data: tables, isLoading: isLoadingTables } = useGetAllTables();
  const { mutate: joinTable, isPending: isJoining } = useJoinTableMutation();
  const { setTableId } = useTable();

  const handleJoinTable = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code.');
      return;
    }

    joinTable(
      { inviteCode: inviteCode.trim() },
      {
        onSuccess: () => {
          setInviteCode('');
          Alert.alert('Success', 'Successfully joined the table!');
        },
      },
    );
  };

  const handleConfirmSelect = () => {
    if (tableToSelect?.id) {
      setTableId(tableToSelect.id);
    }

    setTableToSelect(null);
  };

  const renderTableItem = ({ item }: { item: Table }) => (
    <TouchableOpacity
      onPress={() => setTableToSelect(item)}
      activeOpacity={0.7}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 flex-row items-center"
    >
      <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center mr-4">
        <Users size={24} color="#4f46e5" />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
        <Text className="text-gray-500 text-sm mt-1">
          {item.usersCount || 0} Members
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          {item.charactersCount || 0} Characters
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View className="items-center py-10 px-4">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Users size={32} color="#9ca3af" />
      </View>
      <Text className="text-gray-500 text-center text-lg">
        {i18n.t('tables.noTables') || "You don't belong to any tables yet."}
      </Text>
    </View>
  );

  return (
    <>
      <SafeAreaView
        className="flex-1 bg-slate-50"
        edges={['bottom', 'left', 'right']}
      >
        <View className="px-5 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {i18n.t('tables.joinTable') || 'Join Table'}
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
                text={i18n.t('tables.join') || 'Join'}
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
            {i18n.t('tables.myTables') || 'My Tables'}
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
                item.id?.toString() || index.toString()
              }
              ListEmptyComponent={ListEmptyComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      </SafeAreaView>

      <ConfirmationModal
        isVisible={!!tableToSelect}
        onClose={() => setTableToSelect(null)}
        onConfirm={handleConfirmSelect}
        title={tableToSelect?.name}
        subTitle={i18n.t('tables.selectTable')}
        buttonClassName="bg-indigo-500"
      />
    </>
  );
}
