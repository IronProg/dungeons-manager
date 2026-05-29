import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import { Switch, Text, View } from 'react-native';

import type { SavingThrowFormType } from '@/components/CharacterSheet/Skills/SavingThrow/useSavingThrowForm';
import { useSavingThrowForm } from '@/components/CharacterSheet/Skills/SavingThrow/useSavingThrowForm';
import { Button } from '@/components/ui/Button';
import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import i18n from '@/i18n';
import { useUpdateSavingThrowMutation } from '@/services/savingThrows/savingThrow';
import type { SavingThrow } from '@/types/character';

export type SavingThrowFormProps = {
  characterId: number;
  savingThrow: SavingThrow;
};

export const SavingThrowForm = ({
  characterId,
  savingThrow,
}: SavingThrowFormProps) => {
  const { close } = useBottomSheet();
  const { control, handleSubmit } = useSavingThrowForm({ savingThrow });

  const { mutate: updateSavingThrow, isPending } =
    useUpdateSavingThrowMutation();

  const onSubmit = (values: SavingThrowFormType) => {
    updateSavingThrow(
      { characterId, id: savingThrow.id!, ...values },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-gray-900 font-bold text-2xl text-center">
        {i18n.t(`savingThrows.${savingThrow.mainAttribute}`)}
      </Text>

      <View className="flex flex-row gap-4 flex-wrap">
        <View>
          <Controller
            control={control}
            name="proficiency"
            render={({ field, fieldState: { error } }) => (
              <View className="flex flex-col items-start">
                <Text>{i18n.t('general.proficiency')}</Text>
                <Switch value={field.value} onValueChange={field.onChange} />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <View className="min-w-0 flex-1">
          <Controller
            control={control}
            name="customBonus"
            render={({ field, fieldState: { error } }) => (
              <View className="flex flex-col items-start">
                <Text>{i18n.t('general.modifier')}</Text>
                <BottomSheetTextInput
                  className="w-full text-base bg-gray-200 rounded-xl h-15"
                  keyboardType="number-pad"
                  onChangeText={field.onChange}
                  value={`${field.value ?? ''}`}
                />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <View className="min-w-0 flex-1">
          <Controller
            control={control}
            name="extraAttribute"
            render={({ field, fieldState: { error } }) => (
              <>
                <Text>{i18n.t('general.extraAttribute')}</Text>

                <AttributePicker {...field} error={error?.message} />
              </>
            )}
          />
        </View>
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
