import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';
import { useFocusEffect } from 'expo-router';

import { getAccessTokenNonAsync } from '@/core/utils/tokens';

export type TableChannelCallback = {
  invalidate: 'table';
  characterId: number;
};

type useTableChannelProps = {
  tableId?: number;
  callback: (params: TableChannelCallback) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
};

export function useTableChannel({
  tableId,
  callback,
  onConnect,
  onDisconnect,
}: useTableChannelProps) {
  const accessToken = getAccessTokenNonAsync();

  useFocusEffect(() => {
    if (!accessToken || !tableId) return;

    const consumer = ActionCable.createConsumer(
      `${process.env.EXPO_PUBLIC_WEBSOCKET_URL ?? ''}?access_token=${accessToken}`,
    );
    const cable = new Cable({});

    const subscription = consumer.subscriptions.create({
      channel: 'TableChannel',
      id: tableId,
    });
    const channel = cable.setChannel('TableChannel', subscription);
    channel
      .on('received', callback)
      .on('connected', () => onConnect?.())
      .on('disconnected', () => onDisconnect?.());
    return () => {
      // This closes the socket and cleans up all subscriptions
      consumer.disconnect();
    };
  });
}
