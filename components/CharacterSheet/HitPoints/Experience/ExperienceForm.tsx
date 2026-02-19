import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import i18n from 'i18n';

import { useUpdateCharacterMutation } from 'services/characters/character.api';
import { ExperienceFormType, useExperienceForm } from './useExperienceForm';

import { Button } from 'components/ui/Button';

import type { Character } from 'types/character';

type ExperienceFormProps = {
  character: Character;
  onClose: () => void;
};

export const ExperienceForm = ({ character, onClose }: ExperienceFormProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useExperienceForm({
    experience: character.experience || 0,
  });

  const { mutate: updateCharacter, isPending } = useUpdateCharacterMutation();

  const onSubmit = useCallback(
    (values: ExperienceFormType) => {
      updateCharacter(
        { id: character.id!, experience: values.experience },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['characters', character.id!],
            });

            onClose();
          },
        },
      );
    },
    [character.id, onClose, queryClient, updateCharacter],
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
                value={`${field.value ?? ''}`}
                keyboardType="numeric"
              />

              <Text className="text-red-400 text-sm">{error?.message}</Text>
            </>
          )}
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
