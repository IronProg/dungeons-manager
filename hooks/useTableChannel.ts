import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';
import { getAccessTokenNonAsync } from 'core/utils/tokens';
import { useMemo } from 'react';

export type TableChannelCallback = {
  invalidate: 'table';
  characterId: number;
};

type useTableChannelProps = {
  tableId?: number;
  callback: (params: TableChannelCallback) => void;
};

export function useTableChannel({ tableId, callback }: useTableChannelProps) {
  const accessToken = getAccessTokenNonAsync();
  console.log({ accessToken });

  const actionCable = useMemo(
    () =>
      ActionCable.createConsumer(
        `${process.env.EXPO_PUBLIC_WEBSOCKET_URL || ''}?access_token=${accessToken}`,
      ),
    [accessToken],
  );

  const cable = new Cable({});

  if (!tableId) return;

  const channel = cable.setChannel(
    'TableChannel',
    actionCable.subscriptions.create({
      channel: 'TableChannel',
      id: tableId,
    }),
  );

  channel
    .on('received', callback)
    .on('connected', () => console.log('Connected!'))
    .on('disconnected', () => console.log('Disconnected'));
}
