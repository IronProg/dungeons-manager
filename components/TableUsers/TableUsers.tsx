import { useNavigation, useRouter } from 'expo-router';
import { UserPlus, UserX } from 'lucide-react-native';
import { useLayoutEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { showMessage } from '@/core/utils/messages';
import { useTable } from '@/hooks/useTable';
import i18n from '@/i18n';
import { useGetCurrentUser } from '@/services/auth/auth.api';
import { useGetTable } from '@/services/tables/table.api';
import { useDeleteTablesUserMutation } from '@/services/tablesUsers/tablesUser.api';
import type { TableUser } from '@/types/table';

export const TableUsers = () => {
  const { table, tableId } = useTable();
  const navigation = useNavigation();
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { data: tableData } = useGetTable({ id: tableId! });
  const { mutateAsync: deleteTablesUser, isPending: isKicking } =
    useDeleteTablesUserMutation();

  const [userToKick, setUserToKick] = useState<TableUser | null>(null);

  const isCreator = tableData?.isCreator ?? table?.isCreator;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: table?.name ?? i18n.t('tables.players'),
      headerRight: () =>
        isCreator ? (
          <TouchableOpacity
            onPress={() => router.push('/(authenticated)/invite-user')}
            className="mr-4"
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={i18n.t('tableRequests.invite')}
          >
            <UserPlus size={24} color="white" />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, table?.name, isCreator, router]);

  const handleKickConfirm = async () => {
    if (!userToKick || !tableId) return;

    try {
      await deleteTablesUser({ id: userToKick.id, tableId });

      showMessage(i18n.t('tables.playerKicked'));
    } catch {
      showMessage(i18n.t('errors.couldNotKickPlayer'), 'error');
    } finally {
      setUserToKick(null);
    }
  };

  const renderPlayerItem = ({ item }: { item: TableUser }) => (
    <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-1">
        <Text className="font-medium text-gray-800">
          {`${item.nickname}#${item.discriminator}`}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          {new Date(item.joinedAt).toLocaleDateString()}
        </Text>
      </View>

      {isCreator && currentUser?.id !== item.userId && (
        <TouchableOpacity
          onPress={() => setUserToKick(item)}
          className="w-10 h-10 rounded-full bg-red-100 items-center justify-center"
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={i18n.t('tables.kickPlayer')}
        >
          <UserX size={20} color="#ef4444" />
        </TouchableOpacity>
      )}
    </View>
  );

  const players = tableData?.tablesUsers ?? [];

  return (
    <View className="flex-1 bg-slate-200 p-4">
      <FlatList
        data={players}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="items-center py-10">
            <Text className="text-gray-500 text-center">
              {i18n.t('general.noDataFound')}
            </Text>
          </View>
        )}
      />

      {isCreator && (
        <View className="py-4">
          <Button
            text={i18n.t('tables.pendingInvites')}
            onPress={() => router.push('/(authenticated)/table-invites')}
            className="bg-indigo-100 border-indigo-400 border"
            textClassName="text-indigo-700"
          />
        </View>
      )}

      <ConfirmationModal
        isVisible={!!userToKick}
        onClose={() => setUserToKick(null)}
        onConfirm={handleKickConfirm}
        title={i18n.t('tables.kickPlayer')}
        subTitle={i18n.t('tables.kickPlayerConfirm')}
        buttonClassName="bg-red-500"
        isPending={isKicking}
      />
    </View>
  );
};
