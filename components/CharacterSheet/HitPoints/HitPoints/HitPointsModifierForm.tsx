import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import {
  HitPointsModifierFormType,
  useHitPointsModifierForm,
} from './useHitPointsModifierForm';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import i18n from 'i18n';

type HitPointsModifierFormProps = { onClose: () => void };

export const HitPointsModifierForm = ({
  onClose,
}: HitPointsModifierFormProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { control, handleSubmit } = useHitPointsModifierForm();

  const onSubmit = useCallback(
    (values: HitPointsModifierFormType) => {
      let hitPoints = generalInfo.hitPoints;
      let tempHitPoints = generalInfo?.temporaryHitPoints || 0;

      if (values.damage) {
        tempHitPoints -= values.damage;

        if (tempHitPoints < 0) {
          hitPoints -= Math.abs(tempHitPoints);
        }
      }

      if (values.healing) {
        const healedHitPoints = hitPoints + values.healing;

        if (healedHitPoints > generalInfo.hitPointsLimit) {
          hitPoints = generalInfo.hitPointsLimit;
        } else {
          hitPoints = healedHitPoints;
        }
      }

      if (values.temporary) {
        tempHitPoints = Math.max(values.temporary, tempHitPoints);
      }

      updateGeneralInfo({
        ...generalInfo,
        hitPoints: Math.max(hitPoints, 0),
        temporaryHitPoints: tempHitPoints <= 0 ? undefined : tempHitPoints,
      });

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.hitPoints')}
      </Text>

      <View className="flex flex-row gap-4">
        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.damage')}
          </Text>

          <Controller
            control={control}
            name="damage"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
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
            {i18n.t('general.healing')}
          </Text>

          <Controller
            control={control}
            name="healing"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
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
            {i18n.t('general.temporary')}
          </Text>

          <Controller
            control={control}
            name="temporary"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
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

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          {i18n.t('general.apply')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
