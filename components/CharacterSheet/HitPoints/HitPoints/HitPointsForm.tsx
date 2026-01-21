import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { HitPointsFormType, useHitPointsForm } from './useHitPointsForm';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';

type HitPointsFormProps = { onClose: () => void };

export const HitPointsForm = ({ onClose }: HitPointsFormProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { control, handleSubmit } = useHitPointsForm({ generalInfo });

  const onSubmit = useCallback(
    (values: HitPointsFormType) => {
      updateGeneralInfo({ ...generalInfo, ...values });

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">Vida</Text>

      <View className="flex flex-row gap-4 flex-wrap">
        <View className="flex flex-col items-center">
          <Text className="font-medium">Atual</Text>

          <Controller
            control={control}
            name="hitPoints"
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
          <Text className="text-center"></Text>
        </View>

        <View className="flex flex-col items-center">
          <Text className="font-medium">Máxima</Text>

          <Controller
            control={control}
            name="hitPointsLimit"
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
          <Text className="text-center"></Text>
        </View>

        <View className="flex flex-col items-center">
          <Text className="font-medium">Temp</Text>

          <Controller
            control={control}
            name="temporaryHitPoints"
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
          <Text className="text-center"></Text>
        </View>

        <View className="flex flex-col items-center">
          <Text className="font-medium">Vida Máxima Temporária</Text>

          <Controller
            control={control}
            name="hitPointsLimitTemporary"
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
          <Text className="text-center"></Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
