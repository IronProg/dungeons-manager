import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NewTableFormType } from '@/components/NewTable/useNewTable.tsx';
import { useNewTable } from '@/components/NewTable/useNewTable.tsx';
import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import { useCreateTableMutation } from '@/services/tables/table.api';

export const NewTable = () => {
  const { control, handleSubmit, reset } = useNewTable();
  const navigation = useRouter();
  const { bottom } = useSafeAreaInsets();

  const { mutate: createTable, isPending } = useCreateTableMutation();

  const onSubmit = (values: NewTableFormType) => {
      createTable(values, {
        onSuccess: () => {
          reset();
          showMessage(i18n.t('tables.created'));
          navigation.navigate('/(authenticated)/(drawer)/tables');
        },
      });
    },
    [createTable, reset, navigation];

  return (
    <View className="flex-1 bg-slate-200">
      <View className="grow flex-col gap-4 p-4">
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
      </View>

      <KeyboardStickyView>
        <View className="mt-auto px-4" style={{ paddingBottom: 16 + bottom }}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className={`bg-green-600 px-4 py-2 rounded-lg ${isPending ? 'opacity-75' : ''}`}
          >
            <Text className="text-2xl text-center text-white font-medium">
              {i18n.t('tables.createTable')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardStickyView>
    </View>
  );
};
