import { View, Text, FlatList } from 'react-native';

import { Button } from '@/components/ui/Button';
import i18n from '@/i18n';
import type { TableRequest } from '@/types/table';

interface TableRequestsListProps {
  requests: TableRequest[];
  currentUserId?: number;
  onAccept: (id: number, tableId: number) => void;
  onRefuse: (id: number, tableId: number) => void;
  onCancel: (id: number, tableId: number) => void;
  isPending: boolean;
}

const formatName = (user: { nickname: string; discriminator: string }) =>
  `${user.nickname}#${user.discriminator}`;

export const TableRequestsList = ({
  requests,
  currentUserId,
  onAccept,
  onRefuse,
  onCancel,
  isPending,
}: TableRequestsListProps) => {
  const renderItem = ({ item }: { item: TableRequest }) => {
    const isReceived = item.receiver.id === currentUserId;
    const isSent = item.sender.id === currentUserId;
    const tableLabel =
      item.tableName ?? `${i18n.t('tables.table')} #${item.tableId}`;

    return (
      <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <Text className="font-semibold text-gray-800 mb-1">{tableLabel}</Text>
        <Text className="text-gray-500 text-sm mb-3">
          {`${formatName(item.sender)} → ${formatName(item.receiver)}`}
        </Text>

        <View className="flex-row gap-2 flex-1">
          {isReceived && (
            <>
              <Button
                text={i18n.t('tableRequests.accept')}
                onPress={() => onAccept(item.id, item.tableId)}
                disabled={isPending}
                className="w-1/2"
                accessibilityLabel={i18n.t('tableRequests.accept')}
              />

              <Button
                text={i18n.t('tableRequests.refuse')}
                onPress={() => onRefuse(item.id, item.tableId)}
                disabled={isPending}
                className="w-1/2 bg-red-600"
                accessibilityLabel={i18n.t('tableRequests.refuse')}
              />
            </>
          )}

          {isSent && (
            <Button
              text={i18n.t('tableRequests.cancel')}
              onPress={() => onCancel(item.id, item.tableId)}
              disabled={isPending}
              className="bg-red-600"
              accessibilityLabel={i18n.t('tableRequests.cancel')}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View className="items-center py-10 px-4">
          <Text className="text-gray-500 text-center">
            {i18n.t('tableRequests.noRequests')}
          </Text>
        </View>
      )}
    />
  );
};
