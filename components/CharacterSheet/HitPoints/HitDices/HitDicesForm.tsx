import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { HitDicesFormType, useHitDicesForm } from './useHitDicesForm';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import RNPickerSelect from 'react-native-picker-select';
import { HIT_DICES } from 'core/enums/hitDices';
import { ChevronDown } from 'lucide-react-native';

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
        </View>

        <View className="flex flex-col items-center">
          <Controller
            control={control}
            name="hitDicesSize"
            render={({ field, fieldState: { error } }) => (
              <>
                <RNPickerSelect
                  onValueChange={field.onChange}
                  placeholder="Placeholder"
                  value={field.value || ''}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    viewContainer: {
                      backgroundColor: '#f3f3f3ff',
                      width: 120,
                      borderRadius: 20,
                      overflow: 'hidden',
                    },
                  }}
                  items={[
                    { label: 'None', value: null },
                    ...HIT_DICES.map((dice) => ({
                      label: dice,
                      value: dice,
                    })),
                  ]}
                >
                  <View className="rounded-lg bg-gray-100 px-4 h-15 py-3 flex flex-row justify-between items-center gap-2">
                    <Text className="text-xl">{field.value}</Text>

                    <View className="pt-1">
                      <ChevronDown size={12} />
                    </View>
                  </View>
                </RNPickerSelect>

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
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
