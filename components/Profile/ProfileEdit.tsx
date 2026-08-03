import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { useProfileForm } from '@/components/Profile/useProfileForm';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import { Button } from '@/components/ui/Button';
import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import { useUpdateUserMutation } from '@/services/users/user.api';

interface ProfileEditProps {
  initialNickname: string;
}

export const ProfileEdit = ({ initialNickname }: ProfileEditProps) => {
  const router = useRouter();
  const { control, handleSubmit, reset } = useProfileForm(initialNickname);
  const { mutate: updateUser, isPending } = useUpdateUserMutation();

  const onSubmit = handleSubmit((data) => {
    updateUser(
      { user: data },
      {
        onSuccess: () => {
          reset();
          showMessage(i18n.t('profile.updated'));
          router.back();
        },
      },
    );
  });

  return (
    <AppKeyboardAvoidingView>
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          {i18n.t('profile.nickname')}
        </Text>

        <Controller
          control={control}
          name="nickname"
          render={({ field, fieldState: { error } }) => (
            <View>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder={i18n.t('profile.nickname')}
                className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 font-medium h-12"
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={50}
                accessibilityLabel={i18n.t('profile.nickname')}
              />

              {error?.message && (
                <Text className="text-red-400 text-sm mt-2 mb-4">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <View className="mt-2">
          <Button
            text={i18n.t('general.save')}
            onPress={onSubmit}
            disabled={isPending}
            loading={isPending}
          />
        </View>
      </View>
    </AppKeyboardAvoidingView>
  );
};
