import { useNavigation, useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

import { EditTableName } from '@/components/EditTable/EditTableName';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { showMessage } from '@/core/utils/messages';
import { useTable } from '@/hooks/useTable';
import i18n from '@/i18n';
import { useDestroyTableMutation } from '@/services/tables/table.api';

export const EditTable = () => {
  const { table, tableId, clearTableId } = useTable();
  const navigation = useNavigation();
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);
  const { mutateAsync: destroyTable } = useDestroyTableMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: table?.name ?? i18n.t('general.loading'),
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
    showMessage(i18n.t('tables.tableDeleted'));
  };

  return (
    <>
      <EditTableName />

      <ConfirmationModal
        isVisible={deleting}
        onClose={() => setDeleting(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
