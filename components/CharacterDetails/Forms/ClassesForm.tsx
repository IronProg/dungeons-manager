import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { Trash2 } from 'lucide-react-native';
import { useCallback } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { useClassesForm } from '@/components/CharacterDetails/Forms/useClassesForm.tsx';
import type { ClassesFormType } from '@/components/CharacterDetails/Forms/useClassesForm.tsx';
import { Button } from '@/components/ui/Button';
import { CastingKindPicker } from '@/components/ui/inputs/CastingKindPicker';
import { HitDicePicker } from '@/components/ui/inputs/HitDicePicker';
import i18n from '@/i18n';
import { useUpdateAllClassesMutation } from '@/services/classes/class';
import type { Character, CharacterClass } from '@/types/character';

export type ClassesFormProps = {
  character: Character;
  characterClasses: CharacterClass[];
};

export const ClassesForm = ({
  character,
  characterClasses,
}: ClassesFormProps) => {
  const { close } = useBottomSheet();
  const { mutate: updateAllClasses, isPending } = useUpdateAllClassesMutation();

  const { control, handleSubmit, getValues } = useClassesForm({
    characterClasses,
  });

  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: 'classes',
    keyName: 'fieldId',
  });

  const handleDelete = useCallback(
    (index: number) => {
      const classes = getValues('classes');
      const field = getValues(`classes.${index}`);

      if (field.id) {
        const newClasses = classes.map((item, i) => ({
          ...item,
          _destroy: i === index ? true : item._destroy,
        }));

        replace(newClasses);
      } else {
        remove(index);
      }
    },
    [getValues, remove, replace],
  );

  const onSubmit = useCallback(
    (data: ClassesFormType) => {
      updateAllClasses(
        { characterId: character.id!, classes: data.classes },
        {
          onSuccess: () => {
            close();
          },
        },
      );
    },
    [character.id, close, updateAllClasses],
  );

  return (
    <View className="flex-1 flex flex-col gap-2 items-stretch">
      {fields.map((field, index) => {
        if (field._destroy) return;

        return (
          <View
            key={field.fieldId}
            className="flex flex-col gap-2 pb-2 border-b-neutral-200 w-full relative"
          >
            <View className="flex flex-row gap-2 pb-2 w-full">
              <Controller
                control={control}
                name={`classes.${index}.name`}
                render={({ field: { value, onChange } }) => (
                  <View className="flex-1">
                    <Text className="font-medium">
                      {i18n.t('classes.name')}
                    </Text>
                    <BottomSheetTextInput
                      className="bg-slate-100 px-2 rounded-lg"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />

              <Controller
                control={control}
                name={`classes.${index}.level`}
                render={({ field: { value, onChange } }) => (
                  <View>
                    <Text className="font-medium">
                      {i18n.t('classes.level')}
                    </Text>
                    <BottomSheetTextInput
                      className="bg-slate-100 px-2 rounded-lg text-center w-20"
                      maxLength={2}
                      onChangeText={onChange}
                      value={`${value}`}
                    />
                  </View>
                )}
              />
            </View>

            <View className="flex flex-row gap-2 pb-2 w-full">
              <Controller
                control={control}
                name={`classes.${index}.hitDice`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <View>
                    <Text className="font-medium">
                      {i18n.t('classes.hitDice')}
                    </Text>
                    <HitDicePicker
                      value={value}
                      onChange={onChange}
                      error={error?.message}
                    />
                  </View>
                )}
              />

              <Controller
                control={control}
                name={`classes.${index}.castingKind`}
                render={({ field: { value, onChange } }) => (
                  <View className="flex-1 min-w-20">
                    <Text className="font-medium">
                      {i18n.t('classes.castingKind')}
                    </Text>
                    <CastingKindPicker onChange={onChange} value={value} />
                  </View>
                )}
              />
            </View>

            <View className="absolute -top-2 right-0">
              <TouchableOpacity
                className="rounded-full bg-red-500 p-1"
                onPress={() => handleDelete(index)}
                hitSlop={10}
              >
                <Trash2 size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <View className="mt-auto flex-1 gap-4">
        <Button
          text={i18n.t('classes.add')}
          className="bg-purple-600"
          onPress={() => append({ name: '', level: 1, hitDice: 'd6' })}
        />

        <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};
