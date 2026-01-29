import { Text, TouchableOpacity, View } from 'react-native';
import {
  PassivePerceptionFormType,
  usePassivePerceptionForm,
} from './usePassivePerceptionForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';
import { CharacterGeneralInfo } from 'types/character';

type PassivePerceptionFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const PassivePerceptionForm = ({
  generalInfo,
  onClose,
}: PassivePerceptionFormProps) => {
  const { control, handleSubmit } = usePassivePerceptionForm({
    generalInfo,
  });

  // const percetionBonus = getSkillBonus('perception');
  const percetionBonus = 0;

  const onSubmit = useCallback(
    (values: PassivePerceptionFormType) => {
      const newGeneralInfo = {
        ...generalInfo,
        passivePerceptionCustomBonus: values.passivePerceptionCustomBonus,
      };

      // updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.passivePerception')}
      </Text>

      <View className="flex flex-row gap-4 items-start">
        <View>
          <Text className="font-medium mb-3">{i18n.t('general.base')}</Text>
          <Text className="text-center text-xl">10</Text>
        </View>

        <View>
          <Text className="font-medium mb-3">
            {i18n.t('titles.perception')}
          </Text>
          <Text className="text-center text-xl">{percetionBonus}</Text>
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.modifier')}</Text>
          <Controller
            control={control}
            name="passivePerceptionCustomBonus"
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
            name="passivePerceptionExtraAttribute"
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
