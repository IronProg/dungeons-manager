import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { HitPointsFormType, useHitPointsForm } from './useHitPointsForm';
import i18n from 'i18n';
import { CharacterGeneralInfo } from 'types/character';

type HitPointsFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const HitPointsForm = ({ generalInfo, onClose }: HitPointsFormProps) => {
  const { control, handleSubmit } = useHitPointsForm({ generalInfo });

  const onSubmit = useCallback(
    (values: HitPointsFormType) => {
      // updateGeneralInfo({ ...generalInfo, ...values });

      onClose();
    },
    [generalInfo, onClose],
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

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          {i18n.t('general.save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
