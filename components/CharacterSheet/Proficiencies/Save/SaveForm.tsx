import { Controller } from 'react-hook-form';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SaveFormType, useSaveForm } from './useSaveForm';
import { Character, Save } from 'types/character';
import { useCharacters } from 'contexts/CharactersContext';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

type AttributesFormProps = {
  save: Save;
  onClose: () => void;
};

export const SaveForm = ({ save, onClose }: AttributesFormProps) => {
  const { character, updateCharacter } = useCharacters();
  const { control, handleSubmit } = useSaveForm({ save });

  const onSubmit = (values: SaveFormType) => {
    const newSaves = character!.saves.map((save) => {
      if (save.attribute === values.attribute) {
        return values;
      }

      return save;
    });

    const newCharacter: Character = { ...character!, saves: newSaves };

    updateCharacter(newCharacter);

    onClose();
  };

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-gray-900 font-bold text-2xl text-center">
        {save.attribute} Save
      </Text>

      <View className="flex flex-row gap-6 flex-wrap">
        <Controller
          control={control}
          name={'proficiency'}
          render={({ field, fieldState: { error } }) => (
            <View className="flex flex-col items-start">
              <Text>Proficiência</Text>
              <Switch value={field.value} onValueChange={field.onChange} />

              {error?.message && (
                <Text className="text-sm text-center text-red-400">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name={'customBonus'}
          render={({ field, fieldState: { error } }) => (
            <View className="flex flex-col items-start">
              <Text>Modificador</Text>
              <BottomSheetTextInput
                className="w-full text-2xl bg-gray-200 rounded-xl"
                keyboardType="number-pad"
                onChangeText={field.onChange}
                value={`${field.value || ''}`}
              />

              {error?.message && (
                <Text className="text-sm text-center text-red-400">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
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
