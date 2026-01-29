import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { ExperienceFormType, useExperienceForm } from './useExperienceForm';
import i18n from 'i18n';
import { Character } from 'types/character';

type ExperienceFormProps = {
  character: Character;
  onClose: () => void;
};

export const ExperienceForm = ({ character, onClose }: ExperienceFormProps) => {
  const { control, handleSubmit } = useExperienceForm({
    experience: character?.experience || 0,
  });

  const onSubmit = useCallback(
    (values: ExperienceFormType) => {
      // updateExperience(values.experience);

      onClose();
    },
    [onClose],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.experience')}
      </Text>

      <View className="min-w-0 flex-1">
        <Controller
          control={control}
          name="experience"
          render={({ field, fieldState: { error } }) => (
            <>
              <BottomSheetTextInput
                className="text-center text-xl px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                onChangeText={field.onChange}
                value={`${field.value || ''}`}
                keyboardType="numeric"
              />

              <Text className="text-red-400 text-sm">{error?.message}</Text>
            </>
          )}
        />
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
