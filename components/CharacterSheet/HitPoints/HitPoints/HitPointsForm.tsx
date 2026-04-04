import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { HitPointsFormType, useHitPointsForm } from './useHitPointsForm';
import i18n from 'i18n';
import { CharacterGeneralInfo } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { useUpdateGeneralInfoMutation } from 'services/generalInfos/generalInfos';
import { Button } from 'components/ui/Button';

export type HitPointsFormProps = {
  generalInfo: CharacterGeneralInfo;
};

export const HitPointsForm = ({ generalInfo }: HitPointsFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useHitPointsForm({ generalInfo });

  const { mutate: updateCharacter, isPending } = useUpdateGeneralInfoMutation();

  const onSubmit = useCallback(
    (values: HitPointsFormType) => {
      updateCharacter(
        { characterId: characterId!, ...values },
        {
          onSuccess: () => {
            close();
          },
        },
      );
    },
    [characterId, close, updateCharacter],
  );

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.hitPoints')}
      </Text>

      <View className="flex flex-row gap-4 flex-wrap">
        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.current')}
          </Text>

          <Controller
            control={control}
            name="hitPoints"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-base w-full px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.maximum')}
          </Text>

          <Controller
            control={control}
            name="hitPointsLimit"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-base w-full px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.temp')}
          </Text>

          <Controller
            control={control}
            name="temporaryHitPoints"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-base w-full px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <View className="min-w-0 flex-1">
        <Text className="font-medium text-center">
          {i18n.t('hitPoints.tempMaxHP')}
        </Text>

        <Controller
          control={control}
          name="hitPointsLimitTemporary"
          render={({ field, fieldState: { error } }) => (
            <>
              <BottomSheetTextInput
                className="text-center text-base px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                onChangeText={field.onChange}
                value={`${field.value || ''}`}
                keyboardType="numeric"
              />

              <Text className="text-red-400 text-sm">{error?.message}</Text>
            </>
          )}
        />
      </View>

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
