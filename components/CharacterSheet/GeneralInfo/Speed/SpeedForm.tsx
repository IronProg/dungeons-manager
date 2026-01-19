import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { SpeedFormType, useSpeedForm } from './useSpeedForm';

type SpeedFormProps = {
  onClose: () => void;
};

export const SpeedForm = ({ onClose }: SpeedFormProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { control, handleSubmit } = useSpeedForm({
    generalInfo,
  });

  const onSubmit = useCallback(
    (values: SpeedFormType) => {
      const newGeneralInfo = {
        ...generalInfo,
        ...values,
      };

      updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">Speed</Text>

      <View className="flex flex-row gap-4 items-start">
        <View>
          <Text className="font-medium">Normal</Text>
          <Controller
            control={control}
            name="speed"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl rounded-lg bg-gray-100 overflow-hidden h-15"
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

        <View>
          <Text className="font-medium">Climbing</Text>
          <Controller
            control={control}
            name="speedClimbing"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl rounded-lg bg-gray-100 overflow-hidden h-15"
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

        <View>
          <Text className="font-medium">Flying</Text>
          <Controller
            control={control}
            name="speedFlying"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl rounded-lg bg-gray-100 overflow-hidden h-15"
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
