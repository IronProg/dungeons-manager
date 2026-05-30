import { useRouter } from 'expo-router';
import { KeyRound, Mail } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import type { ForgotPasswordFormType } from '@/components/Auth/useForgotPasswordForm';
import { useForgotPasswordForm } from '@/components/Auth/useForgotPasswordForm';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import i18n from '@/i18n';
import { useSendInstructionsMutation } from '@/services/auth/auth.api';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const { handleSubmit, control } = useForgotPasswordForm();

  const {
    mutate: sendInstructions,
    isPending,
    isSuccess,
  } = useSendInstructionsMutation();

  const onSubmit = (values: ForgotPasswordFormType) => {
    sendInstructions(values);
  };

  return (
    <AppKeyboardAvoidingView contentContainerClassName="pt-0">
      <View className="bg-indigo-600 pt-12 pb-16 px-6 rounded-b-[40px]">
        <View className="items-center">
          <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
            <KeyRound size={40} color="white" />
          </View>
          <Text className="text-white text-3xl font-bold">
            {i18n.t('auth.forgotPassword')}
          </Text>
          <Text className="text-indigo-200 mt-2 text-center">
            {i18n.t('auth.forgotPasswordSubtitle')}
          </Text>
        </View>
      </View>

      <View className="flex-1 px-6 -mt-8">
        <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10">
          {isSuccess ? (
            <View className="items-center py-4">
              <Text className="text-gray-800 text-lg font-bold mb-2">
                {i18n.t('auth.emailSent')}
              </Text>
              <Text className="text-gray-500 text-center">
                {i18n.t('auth.emailSentSubtitle')}
              </Text>
            </View>
          ) : (
            <>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <View className="mb-6">
                    <Text className="text-gray-600 text-sm font-medium mb-2">
                      {i18n.t('auth.email')}
                    </Text>
                    <View
                      className={`flex-row items-center bg-slate-50 rounded-xl px-4 border ${error?.message ? 'border-red-400' : 'border-slate-200'}`}
                    >
                      <Mail size={20} color="#9CA3AF" />
                      <TextInput
                        className="flex-1 py-4 px-3 text-gray-800"
                        placeholder={i18n.t('auth.emailPlaceholder')}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                      />
                    </View>
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
                disabled={isPending}
                className={`bg-emerald-500 rounded-xl py-4 items-center shadow-md shadow-emerald-500/30 ${isPending ? 'opacity-70' : ''}`}
                activeOpacity={0.8}
              >
                {isPending ? (
                  <View className="flex-row items-center">
                    <ActivityIndicator size={20} color="white" />
                    <Text className="text-white font-bold text-base ml-2">
                      {i18n.t('auth.sending')}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white font-bold text-base">
                    {i18n.t('auth.sendInstructions')}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
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
