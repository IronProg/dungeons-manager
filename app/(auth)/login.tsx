import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Controller } from 'react-hook-form';
import { BookOpen, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import i18n from 'i18n';

import { LoginFormType, useLoginForm } from 'components/Auth/useLoginForm';
import { useGetCurrentUser, useSignInMutation } from 'services/auth/auth.api';

import { Container } from 'components/Container';
import { Redirect, useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function LoginScreen() {
  const router = useRouter();
  const { data: currentUser, isFetching } = useGetCurrentUser();
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control } = useLoginForm();

  const { mutate: signIn, isPending } = useSignInMutation();

  const onSubmit = useCallback(
    (values: LoginFormType) => {
      signIn(
        { user: values },
        {
          onSuccess: () => {
            router.navigate('/(authenticated)/(drawer)/(tabs)');
          },
        },
      );
    },
    [router, signIn],
  );

  if (currentUser && !isFetching) {
    return <Redirect href={'/(authenticated)/(drawer)/(tabs)'} />;
  }

  return (
    <Container>
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="grow gap-4 flex flex-col justify-center "
      >
        <View className="bg-indigo-600 pt-12 pb-16 px-6 rounded-b-[40px]">
          <View className="items-center">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
              <BookOpen size={40} color="white" />
            </View>

            <Text className="text-white text-3xl font-bold">
              Dungeons Manager
            </Text>
          </View>
        </View>

        <View className="flex-1 px-6 -mt-8">
          <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10">
            <Text className="text-gray-800 text-xl font-bold mb-6">
              {i18n.t('auth.welcomeBack')}
            </Text>

            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View className="mb-4">
                  <Text className="text-gray-600 text-sm font-medium mb-2">
                    {i18n.t('auth.email')}
                  </Text>
                  <View
                    className={`flex-row items-center bg-slate-50 rounded-xl px-4 border ${error?.message ? 'border-red-400' : 'border-slate-200'}`}
                  >
                    <Mail size={20} color="#9CA3AF" />

                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-800"
                      placeholder="exemplo@email.com"
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

            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View className="mb-6">
                  <Text className="text-gray-600 text-sm font-medium mb-2">
                    {i18n.t('auth.password')}
                  </Text>
                  <View
                    className={`flex-row items-center bg-slate-50 rounded-xl px-4 border ${error?.message ? 'border-red-400' : 'border-slate-200'}`}
                  >
                    <Lock size={20} color="#9CA3AF" />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-800"
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#9CA3AF" />
                      ) : (
                        <Eye size={20} color="#9CA3AF" />
                      )}
                    </TouchableOpacity>
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
                  <ActivityIndicator size={20} color={'white'} />

                  <Text className="text-white font-bold text-base ml-2">
                    {i18n.t('auth.signingIn')}
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-bold text-base">
                  {i18n.t('auth.signIn')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="text-gray-500">{i18n.t('auth.noAccount')} </Text>

            <TouchableOpacity
              hitSlop={25}
              onPress={() => router.navigate('/signup')}
            >
              <Text className="text-indigo-600 font-bold">
                {i18n.t('auth.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
}
