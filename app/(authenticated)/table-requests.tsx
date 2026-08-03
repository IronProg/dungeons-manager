import { ActivityIndicator, View } from 'react-native';

import { TableRequestsList } from '@/components/TableRequests/TableRequestsList';
import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import { useGetCurrentUser } from '@/services/auth/auth.api';
import {
  useAcceptTableRequestMutation,
  useCancelTableRequestMutation,
  useGetTableRequests,
  useRefuseTableRequestMutation,
} from '@/services/tableRequests/tableRequest.api';

export default function TableRequestsScreen() {
  const { data: user } = useGetCurrentUser();
  const { data: requests, isLoading } = useGetTableRequests({
    status: 'pending',
  });
  const { mutate: accept, isPending: isAccepting } =
    useAcceptTableRequestMutation();
  const { mutate: refuse, isPending: isRefusing } =
    useRefuseTableRequestMutation();
  const { mutate: cancel, isPending: isCancelling } =
    useCancelTableRequestMutation();

  const isPending = isAccepting || isRefusing || isCancelling;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-200">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-200 p-4">
      <TableRequestsList
        requests={requests ?? []}
        currentUserId={user?.id}
        onAccept={(id, tableId) =>
          accept(
            { id, tableId },
            {
              onSuccess: () =>
                showMessage(i18n.t('tableRequests.requestAccepted')),
            },
          )
        }
        onRefuse={(id, tableId) =>
          refuse(
            { id, tableId },
            {
              onSuccess: () =>
                showMessage(i18n.t('tableRequests.requestRefused')),
            },
          )
        }
        onCancel={(id, tableId) =>
          cancel(
            { id, tableId },
            {
              onSuccess: () =>
                showMessage(i18n.t('tableRequests.requestCancelled')),
            },
          )
        }
        isPending={isPending}
      />
    </View>
  );
}
