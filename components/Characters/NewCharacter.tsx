import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NewCharacterFormType } from '@/components/Characters/useNewCharacter';
import { useNewCharacter } from '@/components/Characters/useNewCharacter';
import { Button } from '@/components/ui/Button';
import { useCharacter } from '@/contexts/CharacterContext';
import { useTable } from '@/contexts/TableContext';
import i18n from '@/i18n';
import { useCreateCharacterMutation } from '@/services/characters/character.api';

export const NewCharacter = () => {
  const { character, setCharacterId } = useCharacter();
  const { table } = useTable();
  const { control, handleSubmit, reset } = useNewCharacter();
  const navigation = useRouter();
  const { bottom } = useSafeAreaInsets();

  const [waitingForCharacter, setWaitingForCharacter] = useState(false);

  const { mutate: createCharacter, isPending } = useCreateCharacterMutation();

  const onSubmit = (values: NewCharacterFormType) => {
    createCharacter(values, {
      onSuccess: (data) => {
        setCharacterId(data.id);
        setWaitingForCharacter(true);
      },
    });
  };

  useEffect(() => {
    if (waitingForCharacter && character) {
      reset();
      setWaitingForCharacter(false);
      navigation.navigate('/(authenticated)/(drawer)/(tabs)');
    }
  }, [waitingForCharacter, navigation, character, reset]);

  return (
    <View className="flex-1 bg-slate-200">
      <View className="grow flex-col gap-4 p-4">
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

        {!!table && (
          <View className="pt-20 px-10 gap-4">
            <Text className="font-medium text-center">
              {i18n.t('characters.importActionText')}
            </Text>

            <Button
              onPress={() =>
                navigation.navigate(
                  '/(authenticated)/(drawer)/import-character',
                )
              }
              className="bg-slate-600"
              text={i18n.t('characters.importActionButton')}
            />
          </View>
        )}

        {waitingForCharacter && (
          <View className="flex flex-col w-full items-center pt-20 gap-2">
            <Text className="text-xl font-medium">
              {i18n.t('character.generatingCharacter')}
            </Text>

            <ActivityIndicator size={40} />
          </View>
        )}
      </View>

      <KeyboardStickyView>
        <View className="mt-auto px-4" style={{ paddingBottom: 16 + bottom }}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isPending || waitingForCharacter}
            className={`bg-green-600 px-4 py-2 rounded-lg ${isPending || waitingForCharacter ? 'opacity-75' : ''}`}
          >
            <Text className="text-2xl text-center text-white font-medium">
              {i18n.t('general.generateCharacter')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardStickyView>
    </View>
  );
};
