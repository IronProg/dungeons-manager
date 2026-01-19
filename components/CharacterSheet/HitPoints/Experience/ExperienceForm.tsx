import { Text, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useCharacters } from 'contexts/CharactersContext';
import { ExperienceFormType, useExperienceForm } from './useExperienceForm';

type ExperienceFormProps = {
  onClose: () => void;
};

export const ExperienceForm = ({ onClose }: ExperienceFormProps) => {
  const { character, updateExperience } = useCharacters();
  const { control, handleSubmit } = useExperienceForm({
    experience: character?.experience || 0,
  });

  const onSubmit = useCallback(
    (values: ExperienceFormType) => {
      updateExperience(values.experience);

      onClose();
    },
    [onClose, updateExperience],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">Experiência</Text>

      <View className="flex flex-col items-center">
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
        <Text className="text-center"></Text>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
