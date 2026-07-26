import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NewTableFormType } from '@/components/NewTable/useNewTable';
import { useNewTable } from '@/components/NewTable/useNewTable';
import { Button } from '@/components/ui/Button';
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
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-200"
    >
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-gray-500 text-sm mb-6">
          {i18n.t('tables.whatsName')}
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

      <View className="px-4" style={{ paddingBottom: 16 + bottom }}>
        <Button
          text={i18n.t('tables.createTable')}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          loading={isPending}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
