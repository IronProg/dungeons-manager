import { Controller } from 'react-hook-form';
import { Attack } from 'types/character';
import { AttacksFormType, useAttacksForm } from './useAttacksForm';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { Switch } from 'react-native-gesture-handler';
import { useAttacks } from 'contexts/AttacksContext';
import { DamagesForm } from './DamagesForm';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';

type AttacksFormProps = {
  attack?: Attack;
  onClose: () => void;
};

export const AttacksForm = ({ attack, onClose }: AttacksFormProps) => {
  const { appendAttack, updateAttack } = useAttacks();
  const { control, handleSubmit } = useAttacksForm({ attack });

  const onSubmit = useCallback(
    (values: AttacksFormType) => {
      if (!attack) {
        appendAttack(values);
      } else {
        updateAttack(attack, values);
      }

      onClose();
    },
    [appendAttack, attack, onClose, updateAttack],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {attack ? i18n.t('titles.editAttack') : i18n.t('titles.newAttack')}
      </Text>

      <View className="flex flex-row gap-4">
        <View className="flex-1 grow">
          <Text>{i18n.t('general.name')}</Text>

          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15 w-full"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="min-w-0 w-28">
          <Text>{i18n.t('general.attribute')}</Text>

          <Controller
            control={control}
            name="attribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
            )}
          />
        </View>

        <View className="w-14">
          <Text>{i18n.t('general.mod')}</Text>

          <Controller
            control={control}
            name="customBonus"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="flex flex-col items-start">
          <Text>{i18n.t('general.prof')}</Text>

          <Controller
            control={control}
            name="applyProficiency"
            render={({ field, fieldState: { error } }) => (
              <>
                <Switch
                  value={field.value}
                  onValueChange={field.onChange}
                  className="pt-5"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <View className="flex flex-row gap-4">
        <View className="grow flex-1">
          <Text>{i18n.t('general.range')}</Text>

          <Controller
            control={control}
            name="range"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="grow flex-1 max-w-[70%]">
          <Text>{i18n.t('general.properties')}</Text>

          <Controller
            control={control}
            name="properties"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <DamagesForm control={control} />

      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <Text>{i18n.t('general.description')}</Text>

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  numberOfLines={3}
                  multiline
                />

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
          {i18n.t('general.save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
