import { useNavigation, useRouter } from 'expo-router';
import { Trash2, UserX } from 'lucide-react-native';
import { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'tailwindcss/colors';

import { EditTableName } from '@/components/EditTable/EditTableName.tsx';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { useTable } from '@/contexts/TableContext';
import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import { useGetCurrentUser } from '@/services/auth/auth.api';
import {
  useDestroyTableMutation,
  useGetTable,
} from '@/services/tables/table.api';
import { useDeleteTablesUserMutation } from '@/services/tablesUsers/tablesUser.api';
import type { TableUser } from '@/types/table';

export const EditTable = () => {
  const { table, tableId, clearTableId } = useTable();
  const { data: currentUser } = useGetCurrentUser();
  const navigation = useNavigation();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const [deleting, setDeleting] = useState(false);

  const { data: tableData } = useGetTable({ id: tableId! });
  const { mutateAsync: destroyTable } = useDestroyTableMutation();

  const { mutateAsync: deleteTablesUser } = useDeleteTablesUserMutation();

  const [userToKick, setUserToKick] = useState<TableUser | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: table?.name ?? 'Loading',
      headerRight: () => (
        <TouchableOpacity onPress={() => setDeleting(true)}>
          <Trash2 size={24} color={colors.red[500]} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, table?.name]);

  const handleDeleteConfirm = async () => {
    if (!tableId) return;

    await destroyTable({ id: tableId });

    setDeleting(false);
    clearTableId();
    router.navigate('/(authenticated)/(drawer)/tables');
  };

  const handleKickConfirm = async () => {
    if (!userToKick || !tableId) return;

    await deleteTablesUser({ id: userToKick.id });

    showMessage(i18n.t('tables.playerKicked'));
    setUserToKick(null);
  };

  const renderPlayerItem = ({ item }: { item: TableUser }) => (
      <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
        <View className="flex-1">
          <Text className="font-medium text-gray-800">{item.email}</Text>
          <Text className="text-gray-500 text-sm mt-1">
            {new Date(item.joinedAt).toLocaleDateString()}
          </Text>
        </View>

        {currentUser && currentUser.email !== item.email && (
          <TouchableOpacity
            onPress={() => setUserToKick(item)}
            className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
            hitSlop={10}
          >
            <UserX size={20} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    ),
    [currentUser];

  const players = tableData?.tablesUsers ?? [];

  return (
    <View className="flex-1 bg-slate-200">
      <FlatList
        data={players}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListHeaderComponent={() => <EditTableName />}
        ListEmptyComponent={() => (
          <View className="items-center py-10">
            <Text className="text-gray-500 text-center">
              {i18n.t('general.noDataFound')}
            </Text>
          </View>
        )}
      />

      <KeyboardStickyView>
        <View style={{ height: bottom }} />
      </KeyboardStickyView>

      <ConfirmationModal
        isVisible={!!userToKick}
        onClose={() => setUserToKick(null)}
        onConfirm={handleKickConfirm}
        title={i18n.t('tables.kickPlayer')}
        subTitle={i18n.t('tables.kickPlayerConfirm')}
        buttonClassName="bg-red-500"
      />

      <ConfirmationModal
        isVisible={deleting}
        onClose={() => setDeleting(false)}
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
};
