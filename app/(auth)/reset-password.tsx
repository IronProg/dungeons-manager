import { useRouter, useLocalSearchParams } from 'expo-router';
import { LockKeyhole } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { PasswordInput } from '@/components/Auth/shared/PasswordInput';
import type { ResetPasswordFormType } from '@/components/Auth/useResetPasswordForm';
import { useResetPasswordForm } from '@/components/Auth/useResetPasswordForm';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import i18n from '@/i18n';
import { useChangePasswordMutation } from '@/services/auth/auth.api';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token: string }>();

  const { handleSubmit, control } = useResetPasswordForm();

  const {
    mutate: changePassword,
    isPending,
    isSuccess,
  } = useChangePasswordMutation();

  const onSubmit = (values: ResetPasswordFormType) => {
    if (!token) return;

    changePassword({ ...values, token });
  };

  if (isSuccess) {
    return (
      <AppKeyboardAvoidingView contentContainerClassName="pt-0">
        <View className="bg-indigo-600 pt-12 pb-16 px-6 rounded-b-[40px]">
          <View className="items-center">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
              <LockKeyhole size={40} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold">
              {i18n.t('auth.passwordChanged')}
            </Text>
          </View>
        </View>

        <View className="flex-1 px-6 -mt-8">
          <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10 items-center">
            <Text className="text-gray-500 text-center mb-6">
              {i18n.t('auth.passwordChangedSubtitle')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.navigate('/login', { relativeToDirectory: true })
              }
              className="bg-emerald-500 rounded-xl py-4 px-12 items-center shadow-md shadow-emerald-500/30"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-base">
                {i18n.t('auth.backToLogin')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AppKeyboardAvoidingView>
    );
  }

  return (
    <AppKeyboardAvoidingView contentContainerClassName="pt-0">
      <View className="bg-indigo-600 pt-12 pb-16 px-6 rounded-b-[40px]">
        <View className="items-center">
          <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
            <LockKeyhole size={40} color="white" />
          </View>
          <Text className="text-white text-3xl font-bold">
            {i18n.t('auth.resetPassword')}
          </Text>
        </View>
      </View>

      <View className="flex-1 px-6 -mt-8">
        <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10">
          <Text className="text-gray-800 text-xl font-bold mb-6">
            {i18n.t('auth.resetPasswordSubtitle')}
          </Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <View className="mb-4">
                <Text className="text-gray-600 text-sm font-medium mb-2">
                  {i18n.t('auth.password')}
                </Text>
                <PasswordInput
                  onChangeText={onChange}
                  value={value}
                  error={error?.message}
                />
                {error?.message && (
                  <Text className="text-red-500 text-xs mt-1">
                    {error?.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <View className="mb-6">
                <Text className="text-gray-600 text-sm font-medium mb-2">
                  {i18n.t('auth.passwordConfirmation')}
                </Text>
                <PasswordInput
                  onChangeText={onChange}
                  value={value}
                  error={error?.message}
                />
                {error?.message && (
                  <Text className="text-red-500 text-xs mt-1">
                    {error?.message}
                  </Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isPending || !token}
            className={`bg-emerald-500 rounded-xl py-4 items-center shadow-md shadow-emerald-500/30 ${isPending ? 'opacity-70' : ''}`}
            activeOpacity={0.8}
          >
            {isPending ? (
              <View className="flex-row items-center">
                <ActivityIndicator size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">
                  {i18n.t('auth.changingPassword')}
                </Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-base">
                {i18n.t('auth.changePassword')}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-6 mb-8">
          <TouchableOpacity
            hitSlop={25}
            onPress={() =>
              router.navigate('/login', { relativeToDirectory: true })
            }
          >
            <Text className="text-indigo-600 font-bold">
              {i18n.t('auth.backToLogin')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppKeyboardAvoidingView>
  );
}
