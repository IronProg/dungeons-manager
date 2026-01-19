import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { HitDicesFormType, useHitDicesForm } from './useHitDicesForm';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { Picker } from '@react-native-picker/picker';
import { HIT_DICES } from 'core/enums/hitDices';

type HitDicesFormProps = {
  onClose: () => void;
};

export const HitDicesForm = ({ onClose }: HitDicesFormProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { control, handleSubmit } = useHitDicesForm({ generalInfo });

  const onSubmit = useCallback(
    (values: HitDicesFormType) => {
      updateGeneralInfo({ ...generalInfo, ...values });

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">
        Dados de Vida / Máximo
      </Text>

      <View className="flex flex-row gap-2">
        <View className="flex flex-col items-center">
          <Controller
            control={control}
            name="hitDices"
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

        <Text className="mt-4">/</Text>

        <View className="flex flex-col items-center">
          <Controller
            control={control}
            name="hitDicesMaximum"
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

      <View className="absolute top-8 right-0">
        <Controller
          control={control}
          name="hitDicesSize"
          render={({ field, fieldState: { error } }) => (
            <>
              <Picker
                onValueChange={field.onChange}
                placeholder="Placeholder"
                selectedValue={field.value || ''}
                mode="dialog"
                style={{
                  backgroundColor: '#f3f3f3ff',
                  width: 90,
                  height: 50,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              >
                {HIT_DICES.map((hitDice) => (
                  <Picker.Item key={hitDice} label={hitDice} value={hitDice} />
                ))}
              </Picker>

              <Text className="text-red-400 text-sm">{error?.message}</Text>
            </>
          )}
        />
        <Text className="text-center"></Text>
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
