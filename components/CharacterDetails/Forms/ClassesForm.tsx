import { Button } from 'components/ui/Button';
import i18n from 'i18n';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character, CharacterClass } from 'types/character';
import { ClassesFormType, useClassesForm } from './useClassesForm';
import { Controller, useFieldArray } from 'react-hook-form';
import { CastingKindPicker } from 'components/ui/inputs/CastingKindPicker';
import { useUpdateAllClassesMutation } from 'services/classes/class';
import { useCallback } from 'react';
import { Trash2 } from 'lucide-react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

type ClassesFormProps = {
  character: Character;
  characterClasses: CharacterClass[];
  onClose: () => void;
};

export const ClassesForm = ({
  character,
  characterClasses,
  onClose,
}: ClassesFormProps) => {
  const {
    mutate: updateAllClasses,
    reset,
    isPending,
  } = useUpdateAllClassesMutation();

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
          _destroy: i === index ? true : undefined,
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
        {
          characterId: character.id!,
          classes: data.classes,
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    },
    [character?.id, onClose, reset, updateAllClasses],
  );

  return (
    <View className="flex-1 flex flex-col gap-2 items-stretch">
      {fields.map((field, index) => {
        if (field._destroy) return;

        return (
          <View className="flex flex-row gap-2 pb-2 border-b-neutral-200 w-full relative">
            <Controller
              control={control}
              name={`classes.${index}.name`}
              render={({ field: { value, onChange } }) => (
                <View className="flex-1">
                  <Text className="font-medium">{i18n.t('classes.name')}</Text>
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
                  <Text className="font-medium">{i18n.t('classes.level')}</Text>
                  <BottomSheetTextInput
                    className="bg-slate-100 px-2 rounded-lg text-center w-12"
                    maxLength={2}
                    onChangeText={onChange}
                    value={`${value}`}
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

            <View className="absolute -top-2 right-0">
              <TouchableOpacity
                className="rounded-full bg-red-500 p-1"
                onPress={() => handleDelete(index)}
                hitSlop={10}
              >
                <Trash2 size={18} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <View className="mt-auto flex-1 gap-4">
        <Button
          text={i18n.t('classes.add')}
          className="bg-purple-600"
          onPress={() => append({ name: '', level: 1 })}
        />

        <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};
