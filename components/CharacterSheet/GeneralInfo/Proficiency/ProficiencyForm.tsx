import { Text, TouchableOpacity, View } from 'react-native';
import { ProficiencyFormType, useProficiencyForm } from './useProficiencyForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useCharacters } from 'contexts/CharactersContext';

type ProficiencyFormProps = {
  onClose: () => void;
};

export const ProficiencyForm = ({ onClose }: ProficiencyFormProps) => {
  const { proficiency, updateProficiency } = useCharacters();
  const { control, handleSubmit } = useProficiencyForm({ proficiency });

  const onSubmit = useCallback(
    (values: ProficiencyFormType) => {
      updateProficiency(values.proficiencyBonus);

      onClose();
    },
    [onClose, updateProficiency],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">Proficiência</Text>

      <View className="flex flex-col items-center">
        <Controller
          control={control}
          name="proficiencyBonus"
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
