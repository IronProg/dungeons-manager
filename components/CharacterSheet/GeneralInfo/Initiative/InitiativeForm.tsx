import { Text, TouchableOpacity, View } from 'react-native';
import { InitiativeFormType, useInitiativeForm } from './useInitiativeForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { CharacterGeneralInfo } from 'types/character';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';

type InitiativeFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const InitiativeForm = ({
  generalInfo,
  onClose,
}: InitiativeFormProps) => {
  const { control, handleSubmit } = useInitiativeForm({ generalInfo });

  const onSubmit = useCallback(
    (values: InitiativeFormType) => {
      const newGeneralInfo: CharacterGeneralInfo = {
        ...generalInfo,
        ...values,
      };

      // updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.initiative')}
      </Text>

      <View className="flex flex-row gap-4 items-start">
        <View>
          <Text className="font-medium mb-3">{i18n.t('general.base')}</Text>
          <Text className="text-center text-xl">2</Text>
          {/* <Text className="text-center text-xl">{modifiers.dexterity}</Text> */}
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.modifier')}</Text>
          <Controller
            control={control}
            name="initiativeCustomBonus"
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
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">
            {i18n.t('general.extraAttribute')}
          </Text>
          <Controller
            control={control}
            name="initiaveExtraAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
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
