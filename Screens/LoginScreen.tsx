import { useNavigation } from '@react-navigation/native';
import { LoginFormType, useLoginForm } from 'components/Auth/useLoginForm';
import { Container } from 'components/Container';
import { Button } from 'components/ui/Button';
import { AuthStackProps } from 'navigators/AuthNavigator';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSignInMutation } from 'services/auth/auth';

export const LoginScreen = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { handleSubmit, control } = useLoginForm();

  const { mutate: signIn, isPending } = useSignInMutation();

  const onSubmit = useCallback(
    (values: LoginFormType) => {
      signIn(
        { user: values },
        {
          onSuccess: (data) => {
            console.log('success', { data });
          },
        },
      );
    },
    [signIn],
  );

  return (
    <Container>
      <KeyboardAvoidingView className="flex-1 justify-center px-6 bg-slate-50 flex flex-col gap-4">
        <Text className="text-4xl font-bold text-slate-800 text-center">
          Dungeons Manager
        </Text>

        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <View>
                <Text className="text-slate-600 mb-2 ml-1">Email</Text>
                <TextInput
                  className="bg-white p-4 rounded-xl shadow-lg text-slate-800"
                  placeholder="name@example.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View>
                <Text className="text-slate-600 mb-2 ml-1">Password</Text>

                <TextInput
                  className="bg-white p-4 rounded-xl shadow-lg text-slate-800"
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />

          <Button
            text="Sign In"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
        </View>

        <View className="flex flex-col">
          <View className="mt-8 flex-row justify-center">
            <Text className="text-slate-500 py-2">Don't have an account? </Text>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-blue-600 font-bold py-2">Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="items-center w-full py-2">
            <Text className="text-blue-600 font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};
