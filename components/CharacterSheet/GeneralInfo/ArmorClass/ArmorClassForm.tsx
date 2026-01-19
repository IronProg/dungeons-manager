import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { Plus } from 'lucide-react-native';
import { ArmorClassFormType, useArmorClassForm } from './useArmorClassForm';
import { Picker } from '@react-native-picker/picker';
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

      <View className="flex flex-row gap-2 items-start">
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

        <View className="pt-5">
          <Plus size={16} />
        </View>

        <View>
          <Text className="font-medium">Attribute</Text>
          <Controller
            control={control}
            name="armorClassFirstAttribute"
            render={({ field, fieldState: { error } }) => (
              <>
                <Picker
                  onValueChange={(value) => {
                    field.onChange(value === '' ? undefined : value);
                  }}
                  placeholder="Placeholder"
                  selectedValue={field.value || ''}
                  mode="dialog"
                  style={{
                    backgroundColor: '#f3f3f3ff',
                    width: 120,
                    height: 50,
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                >
                  <Picker.Item label="None" value="" />
                  {ATTRIBUTES.map((attr) => (
                    <Picker.Item key={attr} label={attr} value={attr} />
                  ))}
                </Picker>

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
                <Picker
                  onValueChange={(value) => {
                    field.onChange(value === '' ? undefined : value);
                  }}
                  placeholder="Placeholder"
                  selectedValue={field.value || ''}
                  mode="dialog"
                  style={{
                    backgroundColor: '#f3f3f3ff',
                    width: 120,
                    height: 50,
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                >
                  <Picker.Item label="None" value="" />
                  {ATTRIBUTES.map((attr) => (
                    <Picker.Item key={attr} label={attr} value={attr} />
                  ))}
                </Picker>

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
