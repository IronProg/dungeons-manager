import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { ArmorClassFormType, useArmorClassForm } from './useArmorClassForm';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';
import { CharacterGeneralInfo } from 'types/character';

type PassivePerceptionFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const ArmorClassForm = ({
  generalInfo,
  onClose,
}: PassivePerceptionFormProps) => {
  const { control, handleSubmit } = useArmorClassForm({
    generalInfo,
  });

  const onSubmit = useCallback(
    (values: ArmorClassFormType) => {
      const newGeneralInfo = { ...generalInfo, ...values };

      //updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.armorClass')}
      </Text>

      <View className="flex flex-row gap-4 items-start flex-wrap">
        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.base')}</Text>
          <Controller
            control={control}
            name="armorClassBase"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-base rounded-lg bg-gray-100 overflow-hidden h-15"
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

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.attribute')}</Text>
          <Controller
            control={control}
            name="armorClassFirstAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
            )}
          />
          <Text className="text-center"></Text>
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.attribute')}</Text>
          <Controller
            control={control}
            name="armorClassSecondAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
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
          {i18n.t('general.save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
