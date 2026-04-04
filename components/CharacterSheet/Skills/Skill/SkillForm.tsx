import { Switch, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import i18n from 'i18n';

import { useUpdateSkillMutation } from 'services/skills/skill';
import { SkillFormType, useSkillForm } from './useSkillForm';

import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';
import { Button } from 'components/ui/Button';

import { Skill } from 'types/character';

export type SkillFormProps = {
  characterId: number;
  skill: Skill;
};

export const SkillForm = ({ characterId, skill }: SkillFormProps) => {
  const { close } = useBottomSheet();
  const { control, handleSubmit, watch } = useSkillForm({ skill });

  const proficiency = watch('proficiency');

  const { mutate: updateSkill, isPending } = useUpdateSkillMutation();

  const onSubmit = (values: SkillFormType) => {
    updateSkill(
      { characterId, id: skill.id!, ...values },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <View className="flex flex-col gap-4">
      <View>
        <Text className="text-gray-900 font-bold text-2xl text-center">
          {i18n.t(`skills.${skill.name}`)}
        </Text>
        <Text className="text-gray-600 font-semibold text-lg text-center">
          {i18n.t(`attributes.${skill.mainAttribute}`)}
        </Text>
      </View>

      <View className="flex flex-row gap-4 flex-wrap">
        <Controller
          control={control}
          name={'proficiency'}
          render={({ field, fieldState: { error } }) => (
            <View className="flex flex-col items-start">
              <Text>{i18n.t('general.proficiency')}</Text>
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
                <Text>{i18n.t('general.expertise')}</Text>
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

        <View className="min-w-0 flex-1">
          <Controller
            control={control}
            name={'customBonus'}
            render={({ field, fieldState: { error } }) => (
              <View className="flex flex-col items-start">
                <Text>{i18n.t('general.modifier')}</Text>
                <BottomSheetTextInput
                  className="w-full text-base bg-gray-200 rounded-xl h-15"
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

        <View className="min-w-0 flex-1">
          <Controller
            control={control}
            name={'extraAttribute'}
            render={({ field, fieldState: { error } }) => (
              <>
                <Text>{i18n.t('general.extraAttribute')}</Text>

                <AttributePicker {...field} error={error?.message} />
              </>
            )}
          />
        </View>
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
