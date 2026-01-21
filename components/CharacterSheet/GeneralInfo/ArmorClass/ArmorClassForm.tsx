import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { ChevronDown } from 'lucide-react-native';
import { ArmorClassFormType, useArmorClassForm } from './useArmorClassForm';
import RNPickerSelect from 'react-native-picker-select';
import { ATTRIBUTES } from 'core/enums/attributes';

type PassivePerceptionFormProps = {
  onClose: () => void;
};

export const ArmorClassForm = ({ onClose }: PassivePerceptionFormProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { control, handleSubmit } = useArmorClassForm({
    generalInfo,
  });

  const onSubmit = useCallback(
    (values: ArmorClassFormType) => {
      const newGeneralInfo = { ...generalInfo, ...values };

      updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        Passive Perception
      </Text>

      <View className="flex flex-row gap-4 items-start flex-wrap">
        <View>
          <Text className="font-medium">Base</Text>
          <Controller
            control={control}
            name="armorClassBase"
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
          <Text className="font-medium">Attribute</Text>
          <Controller
            control={control}
            name="armorClassFirstAttribute"
            render={({ field, fieldState: { error } }) => (
              <>
                <RNPickerSelect
                  onValueChange={field.onChange}
                  placeholder="Placeholder"
                  value={field.value}
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
                    ...ATTRIBUTES.map((attr) => ({
                      label: attr,
                      value: attr,
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
          <Text className="text-center"></Text>
        </View>

        <View>
          <Text className="font-medium">Attribute</Text>
          <Controller
            control={control}
            name="armorClassSecondAttribute"
            render={({ field, fieldState: { error } }) => (
              <>
                <RNPickerSelect
                  onValueChange={field.onChange}
                  placeholder="Placeholder"
                  value={field.value}
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
                    ...ATTRIBUTES.map((attr) => ({
                      label: attr,
                      value: attr,
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
