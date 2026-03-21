import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Trash } from 'lucide-react-native';
import i18n from 'i18n';

import { SpellLevelPicker } from '../../ui/inputs/SpellLevelPicker';
import {
  useCreateSpellMutation,
  useDeleteSpellMutation,
  useUpdateSpellMutation,
} from 'services/spells/spell.api';
import { SpellFormValues, useSpellForm } from './useSpellForm';

import { SpellSchoolPicker } from '../../ui/inputs/SpellSchoolPicker';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import { Spell, SpellSlotLevelType } from 'types/character';

type SpellFormProps = {
  initialData?: Spell;
  defaultLevel: SpellSlotLevelType;
  onSuccess: () => void;
};

export const SpellForm = ({
  initialData,
  defaultLevel,
  onSuccess,
}: SpellFormProps) => {
  const { back } = useRouter();
  const isEditing = !!initialData?.id;
  const [deleting, setDeleting] = useState(false);

  const { mutate: createSpell, isPending: isCreating } =
    useCreateSpellMutation(defaultLevel);
  const { mutate: updateSpell, isPending: isUpdating } =
    useUpdateSpellMutation();
  const { mutate: deleteSpell } = useDeleteSpellMutation(defaultLevel);

  const { control, handleSubmit, watch, reset } = useSpellForm({
    spell: initialData,
  });

  const materialChecked = watch('material');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: SpellFormValues) => {
    if (isEditing) {
      updateSpell(data, { onSuccess });
    } else {
      createSpell(data, { onSuccess });
    }
  };

  const handleDelete = useCallback(() => {
    deleteSpell(initialData!.id!, {
      onSuccess: () => {
        back();
      },
    });
    setDeleting(false);
  }, [back, deleteSpell, initialData]);

  const isSubmitting = isCreating || isUpdating;

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white"
      contentContainerClassName="p-4 pb-10"
    >
      <View className="w-full flex flex-row justify-end">
        {isEditing && (
          <TouchableOpacity
            onPress={() => setDeleting(true)}
            disabled={isSubmitting}
            className={`bg-red-500 p-2 rounded-xl mt-4 items-center ${isSubmitting ? 'opacity-50' : ''}`}
          >
            <Trash size={20} color={'white'} />
          </TouchableOpacity>
        )}
      </View>

      <View className="gap-4">
        <View className="gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.name')}
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-lg"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('spells.name')}
              />
            )}
          />
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.level')}
            </Text>
            <Controller
              control={control}
              name="level"
              render={({ field: { onChange, value } }) => (
                <SpellLevelPicker
                  value={value as SpellSlotLevelType}
                  onChange={onChange}
                />
              )}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.school')}
            </Text>
            <Controller
              control={control}
              name="school"
              render={({ field: { onChange, value } }) => (
                <SpellSchoolPicker value={value} onChange={onChange} />
              )}
            />
          </View>
        </View>

        {/* Casting Time and Range */}
        <View className="flex-row gap-4">
          <View className="flex-1 gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.castingTime')}
            </Text>
            <Controller
              control={control}
              name="castingTime"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.range')}
            </Text>
            <Controller
              control={control}
              name="range"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.duration')}
            </Text>
            <Controller
              control={control}
              name="duration"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.target')}
            </Text>
            <Controller
              control={control}
              name="target"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>

        <View className="flex-row flex-wrap gap-4 items-center justify-between bg-gray-50 p-3 rounded-lg">
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-bold">{i18n.t('spells.verbal')}</Text>
            <Controller
              control={control}
              name="verbal"
              render={({ field: { onChange, value } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-bold">
              {i18n.t('spells.somatic')}
            </Text>
            <Controller
              control={control}
              name="somatic"
              render={({ field: { onChange, value } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-bold">
              {i18n.t('spells.material')}
            </Text>
            <Controller
              control={control}
              name="material"
              render={({ field: { onChange, value } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-bold">
              {i18n.t('spells.concentration')}
            </Text>
            <Controller
              control={control}
              name="concentration"
              render={({ field: { onChange, value } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </View>
        </View>

        {materialChecked && (
          <View className="gap-1">
            <Text className="text-gray-600 font-bold">
              {i18n.t('spells.components')}
            </Text>
            <Controller
              control={control}
              name="components"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-gray-100 p-3 rounded-lg"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        )}

        <View className="gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.innateTotal')}
          </Text>
          <Controller
            control={control}
            name="innateTotal"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                keyboardType="numeric"
                onChangeText={onChange}
                value={`${value}`}
              />
            )}
          />
        </View>

        {/* Description */}
        <View className="gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.description')}
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg min-h-[100px]"
                multiline
                textAlignVertical="top"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        {/* Higher Level Description */}
        <View className="gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.higherLevelDescription')}
          </Text>
          <Controller
            control={control}
            name="higherLevelDescription"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg min-h-[80px]"
                multiline
                textAlignVertical="top"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`bg-indigo-600 p-4 rounded-xl mt-4 items-center ${isSubmitting ? 'opacity-50' : ''}`}
        >
          <Text className="text-white font-bold text-lg">
            {isSubmitting
              ? i18n.t('general.current') + '...'
              : i18n.t('general.save')}
          </Text>
        </TouchableOpacity>
      </View>

      <ConfirmationModal
        isVisible={deleting}
        onClose={() => setDeleting(false)}
        onConfirm={handleDelete}
        buttonClassName="bg-red-500"
      />
    </KeyboardAwareScrollView>
  );
};
