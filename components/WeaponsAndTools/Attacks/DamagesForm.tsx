import { Control, Controller, useFieldArray } from 'react-hook-form';
import { AttacksFormType } from './useAttacksForm';
import { Text, TouchableOpacity, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';

type DamagesFormProps = {
  control: Control<AttacksFormType>;
};

export const DamagesForm = ({ control }: DamagesFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'damages',
  });

  return (
    <View className="flex flex-col items-stretch">
      <View className="flex flex-row justify-between">
        <TouchableOpacity
          onPress={() => remove(fields.length - 1)}
          className="rounded-full bg-red-400 flex items-center justify-center p-2"
        >
          <Minus color="white" size={16} />
        </TouchableOpacity>

        <Text className="text-center text-lg">{i18n.t('titles.damages')}</Text>

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
            <Text>{i18n.t('general.dice')}</Text>

            <Controller
              control={control}
              name={`damages.${index}.dice`}
              render={({ field, fieldState: { error } }) => (
                <>
                  <BottomSheetTextInput
                    className="rounded-lg bg-gray-100 h-15 text-base"
                    onChangeText={field.onChange}
                    value={field.value}
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>

          <View className="w-24">
            <Text>Atributo</Text>

            <Controller
              control={control}
              name={`damages.${index}.attribute`}
              render={({ field, fieldState: { error } }) => (
                <AttributePicker {...field} error={error?.message} />
              )}
            />
          </View>

          <View className="w-16">
            <Text>{i18n.t('general.mod')}</Text>

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
            <Text>{i18n.t('general.type')}</Text>

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
