import { useCallback } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';
import i18n from 'i18n';

import { NewCharacterFormType, useNewCharacter } from './useNewCharacter';
import { useCreateCharacterMutation } from 'services/characters/character.api';
import { useRouter } from 'expo-router';
import { useCharacter } from 'contexts/CharacterContext';

export const NewCharacter = () => {
  const { setCharacterId } = useCharacter();
  const { control, handleSubmit } = useNewCharacter();
  const navigation = useRouter();
  const { bottom } = useSafeAreaInsets();

  const { mutate: createCharacter, isPending } = useCreateCharacterMutation();

  const onSubmit = useCallback(
    (values: NewCharacterFormType) => {
      createCharacter(values, {
        onSuccess: (data) => {
          setCharacterId(data.id!);
          navigation.navigate('/(drawer)/(tabs)');
        },
      });
    },
    [createCharacter, navigation, setCharacterId],
  );

  return (
    <KeyboardAwareScrollView contentContainerClassName="flex-1" enableOnAndroid>
      <View className="grow flex-col gap-4 px-4">
        <View>
          <Text className="text-lg font-medium">{i18n.t('general.name')}</Text>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  className="w-full px-4 text-xl h-15 bg-white rounded-lg"
                  value={`${field.value}`}
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

      <View className="mt-auto px-4" style={{ paddingBottom: bottom }}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          className={`bg-green-600 px-4 py-2 rounded-lg ${isPending && 'opacity-75'}`}
        >
          <Text className="text-2xl text-center text-white font-medium">
            {i18n.t('general.generateCharacter')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
