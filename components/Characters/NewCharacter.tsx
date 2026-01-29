import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NewCharacterFormType, useNewCharacter } from './useNewCharacter';
import { Controller } from 'react-hook-form';
import i18n from 'i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { useCreateCharacterMutation } from 'services/characters/character';
import { useNavigation } from '@react-navigation/native';
import { CharacterDrawerProps } from 'navigators/DrawerNavigator';

export const NewCharacter = () => {
  const { control, handleSubmit } = useNewCharacter();
  const navigation = useNavigation<CharacterDrawerProps>();
  const { bottom } = useSafeAreaInsets();

  const { mutate: createCharacter, isPending } = useCreateCharacterMutation();

  const onSubmit = useCallback(
    (values: NewCharacterFormType) => {
      createCharacter(values, {
        onSuccess: (data) => {
          navigation.navigate('CharacterSheet', { characterId: data.id! });
        },
        onError: (error) => {
          console.error({ error });
        },
      });
    },
    [createCharacter, navigation],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-1 pt-4"
      enableOnAndroid
    >
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

      <View className="mt-auto px-4" style={{ paddingBottom: bottom + 20 }}>
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
