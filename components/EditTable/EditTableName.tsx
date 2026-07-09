import { useNavigation } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { EditTableFormType } from '@/components/EditTable/useEditTable';
import { useEditTable } from '@/components/EditTable/useEditTable';
import { showMessage } from '@/core/utils/messages';
import { useTable } from '@/hooks/useTable';
import i18n from '@/i18n';
import { useUpdateTableMutation } from '@/services/tables/table.api';

export const EditTableName = () => {
  const { bottom } = useSafeAreaInsets();
  const { table, tableId } = useTable();
  const { control, handleSubmit, reset } = useEditTable(table?.name ?? '');
  const { goBack } = useNavigation();

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
          goBack();
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-slate-200">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="flex-1 p-4">
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-gray-500 text-sm mb-6">
              {i18n.t('tables.renameTable')}
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <View className="w-full max-w-xs">
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder={i18n.t('tables.enterName')}
                    className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-center text-lg text-gray-800 w-full"
                    autoFocus
                    autoCapitalize="words"
                    maxLength={50}
                  />
                  {error?.message && (
                    <Text className="text-red-400 text-sm mt-2 text-center">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <KeyboardStickyView
        className="p-4 border-t border-gray-300"
        style={{ paddingBottom: bottom }}
      >
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdating}
          className={`bg-green-600 p-4 rounded-lg w-full ${
            isUpdating ? 'opacity-75' : ''
          }`}
        >
          <Text className="text-xl text-center text-white font-medium">
            {i18n.t('tables.saveName')}
          </Text>
        </TouchableOpacity>
      </KeyboardStickyView>
    </View>
  );
};
