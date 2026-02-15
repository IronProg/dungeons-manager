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
import { useSignUpMutation } from 'services/auth/auth';

export const SignUpScreen = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { handleSubmit, control } = useLoginForm();

  const { mutate: signUp, isPending } = useSignUpMutation();

  const onSubmit = useCallback(
    (values: LoginFormType) => {
      signUp(
        { user: values },
        {
          onSuccess: () => {
            console.log('success');

            navigation.navigate('Login');
          },
          onError: (ex) => {
            console.error(ex);
          },
        },
      );
    },
    [navigation, signUp],
  );

  return (
    <Container>
      <KeyboardAvoidingView className="flex-1 justify-center px-6 bg-slate-50 flex flex-col gap-4">
        <Text className="text-4xl font-bold text-slate-800 text-center">
          Create your account
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
            text="Register"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-blue-600 text-center font-bold py-2">
            Return to Login
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
};
