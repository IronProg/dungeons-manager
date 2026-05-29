import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Minus, Plus } from 'lucide-react-native';
import type { Control } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import { DamageDicePicker } from '@/components/ui/inputs/DamageDicePicker';
import type { AttacksFormType } from '@/components/WeaponsAndTools/Attacks/useAttacksForm';
import i18n from '@/i18n';

type DamagesFormProps = { control: Control<AttacksFormType> };

export const DamagesForm = ({ control }: DamagesFormProps) => {
  const { fields, append, remove, update } = useFieldArray({
    keyName: 'fieldId',
    control,
    name: 'damagesAttributes',
  });

  const handleRemove = () => {
    if (!fields.length) return;

    const lastVisible = [...fields]
      .map((field, index) => ({ field, index }))
      .filter(({ field }) => !field._destroy)
      .pop();

    if (!lastVisible) return;

    const { field, index } = lastVisible;

    if (field?.id) {
      update(index, {
        ...field,
        _destroy: true,
      });
    } else {
      remove(index);
    }
  };

  return (
    <View className="flex flex-col items-stretch gap-8">
      <View className="flex flex-row justify-between">
        <TouchableOpacity
          onPress={handleRemove}
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

      {fields.map((field, index) => {
        if (field._destroy) return null;

        return (
          <View
            key={field.fieldId}
            className="flex flex-col gap-0 border-b border-gray-200 mb-2"
          >
            <View className="flex flex-row gap-2">
              <View className="grow flex-1">
                <Text>{i18n.t('general.dice')}</Text>

                <View className="flex flex-row items-center gap-1">
                  <Controller
                    control={control}
                    name={`damagesAttributes.${index}.diceAmount`}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <BottomSheetTextInput
                          className="rounded-lg bg-gray-100 h-15 text-base grow"
                          onChangeText={field.onChange}
                          keyboardType="numeric"
                          value={`${field.value ?? ''}`}
                        />

                        <Text className="text-red-400 text-sm">
                          {error?.message}
                        </Text>
                      </>
                    )}
                  />

                  <Text>d</Text>

                  <Controller
                    control={control}
                    name={`damagesAttributes.${index}.diceSize`}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <DamageDicePicker
                          onChange={field.onChange}
                          value={field.value}
                          error={error?.message}
                        />

                        <Text className="text-red-400 text-sm">
                          {error?.message}
                        </Text>
                      </>
                    )}
                  />
                </View>
              </View>

              <View className="w-16">
                <Text>{i18n.t('general.mod')}</Text>

                <Controller
                  control={control}
                  name={`damagesAttributes.${index}.customBonus`}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <BottomSheetTextInput
                        className="text-base px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                        onChangeText={field.onChange}
                        value={`${field.value ?? ''}`}
                        keyboardType="numeric"
                      />

                      <Text className="text-red-400 text-sm">
                        {error?.message}
                      </Text>
                    </>
                  )}
                />
              </View>
            </View>

            <View className="flex flex-row gap-2">
              <View className="w-40">
                <Text>{i18n.t('general.attribute')}</Text>

                <Controller
                  control={control}
                  name={`damagesAttributes.${index}.mainAttribute`}
                  render={({ field, fieldState: { error } }) => (
                    <AttributePicker {...field} error={error?.message} />
                  )}
                />
              </View>

              <View className="flex-1">
                <Text>{i18n.t('general.damageType')}</Text>

                <Controller
                  control={control}
                  name={`damagesAttributes.${index}.kind`}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <BottomSheetTextInput
                        className="text-base px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                        onChangeText={field.onChange}
                        value={`${field.value ?? ''}`}
                      />

                      <Text className="text-red-400 text-sm">
                        {error?.message}
                      </Text>
                    </>
                  )}
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
