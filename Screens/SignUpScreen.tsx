import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, Shield, UserPlus } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from 'i18n';

import {
  RegisterFormType,
  useRegisterForm,
} from 'components/Auth/useRegisterForm';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useSignInMutation, useSignUpMutation } from 'services/auth/auth.api';

import { TextInput } from 'react-native-gesture-handler';
import { Container } from 'components/Container';

export const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useAppNavigation();
  const { handleSubmit, control } = useRegisterForm();

  const { mutate: signIn } = useSignInMutation();
  const { mutate: signUp, isPending } = useSignUpMutation();

  const onSubmit = useCallback(
    (values: RegisterFormType) => {
      signUp(
        { user: values },
        {
          onSuccess: () => {
            signIn({ user: values });
          },
        },
      );
    },
    [signIn, signUp],
  );

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerClassName="flex-1"
        enableOnAndroid
      >
        <View className="bg-indigo-600 pt-12 pb-16 px-6 rounded-b-[40px]">
          <View className="items-center">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
              <UserPlus size={40} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold">
              {i18n.t('auth.createAccount')}
            </Text>
            <Text className="text-indigo-200 mt-2">
              {i18n.t('auth.registerSubtitle')}
            </Text>
          </View>
        </View>

        <View className="flex-1 px-6 -mt-8">
          <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10">
            <Text className="text-gray-800 text-xl font-bold mb-6">
              {i18n.t('auth.getStarted')}
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
                <View className="mb-4">
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

            <Controller
              control={control}
              name="passwordConfirmation"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View className="mb-6">
                  <Text className="text-gray-600 text-sm font-medium mb-2">
                    {i18n.t('auth.passwordConfirmation')}
                  </Text>
                  <View
                    className={`flex-row items-center bg-slate-50 rounded-xl px-4 border ${error?.message ? 'border-red-400' : 'border-slate-200'}`}
                  >
                    <Shield size={20} color="#9CA3AF" />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-800"
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
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
                    {i18n.t('auth.creating')}
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-bold text-base">
                  {i18n.t('auth.register')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="text-gray-500">{i18n.t('auth.hasAccount')} </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-indigo-600 font-bold">
                {i18n.t('auth.signIn')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
