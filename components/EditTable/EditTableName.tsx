import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { EditTableFormType } from '@/components/EditTable/useEditTable';
import { useEditTable } from '@/components/EditTable/useEditTable';
import { useTable } from '@/contexts/TableContext';
import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import { useUpdateTableMutation } from '@/services/tables/table.api';

export const EditTableName = () => {
  const { table, tableId } = useTable();
  const { control, handleSubmit, reset } = useEditTable(table?.name ?? '');

  const { mutate: updateTable, isPending: isUpdating } =
    useUpdateTableMutation();

  const onSubmit = (values: EditTableFormType) => {
    if (!tableId) return;

    updateTable(
      { id: tableId, name: values.name },
      {
        onSuccess: () => {
          reset({ name: values.name });
          showMessage(i18n.t('tables.nameUpdated'));
        },
      },
    );
  };

  return (
    <View className="gap-4 mb-6">
      <View>
        <Text className="text-lg font-medium">{i18n.t('general.name')}</Text>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <>
              <TextInput
                className="w-full px-4 text-xl h-15 bg-white rounded-lg"
                value={field.value}
                onChangeText={field.onChange}
              />
              {error?.message && (
                <Text className="text-red-400 text-sm">{error?.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isUpdating}
        className={`bg-green-600 px-4 py-3 rounded-lg ${isUpdating ? 'opacity-75' : ''}`}
      >
        <Text className="text-xl text-center text-white font-medium">
          {i18n.t('tables.saveName')}
        </Text>
      </TouchableOpacity>

      <View className="mt-2">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          {i18n.t('tables.players')}
        </Text>
      </View>
    </View>
  );
};
