import { Control, Controller, useFieldArray } from 'react-hook-form';
import { AttacksFormType } from './useAttacksForm';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronDown, Plus } from 'lucide-react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import { ATTRIBUTES } from 'core/enums/attributes';

type DamagesFormProps = {
  control: Control<AttacksFormType>;
};

export const DamagesForm = ({ control }: DamagesFormProps) => {
  const { fields, append } = useFieldArray({ control, name: 'damages' });

  return (
    <View className="flex flex-col items-stretch">
      <View className="flex flex-row justify-between">
        <View />

        <Text className="text-center text-lg">Danos</Text>

        <TouchableOpacity
          onPress={() => append({})}
          className="rounded-full bg-green-400 flex items-center justify-center p-2"
        >
          <Plus color="white" size={16} />
        </TouchableOpacity>
      </View>

      {fields.map((field, index) => (
        <View key={index} className="flex flex-row gap-2">
          <View className="grow flex-1">
            <Text>Dado</Text>

            <Controller
              control={control}
              name={`damages.${index}.dice`}
              render={({ field, fieldState: { error } }) => (
                <>
                  <BottomSheetTextInput
                    className="rounded-lg bg-gray-100 h-15 text-base"
                    onChangeText={field.onChange}
                    value={`${field.value}`}
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>

          <View>
            <Text>Atributo</Text>

            <Controller
              control={control}
              name={`damages.${index}.attribute`}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RNPickerSelect
                    onValueChange={field.onChange}
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
                      <Text>{field.value}</Text>

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

          <View className="w-12">
            <Text>Mod</Text>

            <Controller
              control={control}
              name={`damages.${index}.customBonus`}
              render={({ field, fieldState: { error } }) => (
                <>
                  <BottomSheetTextInput
                    className="text-base px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                    onChangeText={field.onChange}
                    value={`${field.value || ''}`}
                    keyboardType="numeric"
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>

          <View className="flex-1">
            <Text>Tipo</Text>

            <Controller
              control={control}
              name={`damages.${index}.kind`}
              render={({ field, fieldState: { error } }) => (
                <>
                  <BottomSheetTextInput
                    className="text-base px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                    onChangeText={field.onChange}
                    value={`${field.value || ''}`}
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
