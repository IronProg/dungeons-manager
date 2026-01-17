import { Controller } from 'react-hook-form';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SkillFormType, useSkillForm } from './useSkillForm';
import { Character, Skill } from 'types/character';
import { useCharacters } from 'contexts/CharactersContext';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

type AttributesFormProps = {
  skill: Skill;
  onClose: () => void;
};

export const SkillForm = ({ skill, onClose }: AttributesFormProps) => {
  const { character, updateCharacter } = useCharacters();
  const { control, handleSubmit, watch } = useSkillForm({ skill });

  const proficiency = watch('proficiency');

  const onSubmit = (values: SkillFormType) => {
    console.log({ values });
    const newSkills = character!.skills.map((skill) => {
      if (skill.name === values.name) {
        return values;
      }

      return skill;
    });

    const newCharacter: Character = { ...character!, skills: newSkills };

    updateCharacter(newCharacter);

    onClose();
  };

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-gray-900 font-bold text-2xl text-center">
        {skill.name}
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

        {proficiency && (
          <Controller
            control={control}
            name={'expertise'}
            render={({ field, fieldState: { error } }) => (
              <View className="flex flex-col items-start">
                <Text>Expertise</Text>
                <Switch value={field.value} onValueChange={field.onChange} />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        )}

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
