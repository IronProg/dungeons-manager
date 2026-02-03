import { Text, View } from 'react-native';
import { ProficiencyFormType, useProficiencyForm } from './useProficiencyForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import i18n from 'i18n';
import { useCharacter } from 'contexts/CharacterContext';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateCharacterMutation } from 'services/characters/character';
import { Button } from 'components/ui/Button';

type ProficiencyFormProps = {
  onClose: () => void;
};

export const ProficiencyForm = ({ onClose }: ProficiencyFormProps) => {
  const queryClient = useQueryClient();
  const { characterId } = useCharacter();
  const { proficiency } = useCharacter();
  const { control, handleSubmit } = useProficiencyForm({ proficiency });

  const { mutate: updateCharacter, isPending } = useUpdateCharacterMutation();

  const onSubmit = useCallback(
    (values: ProficiencyFormType) => {
      updateCharacter(
        { id: characterId!, ...values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['characters', characterId!],
            });

            onClose();
          },
        },
      );
    },
    [characterId, onClose, queryClient, updateCharacter],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('general.proficiency')}
      </Text>

      <View className="min-w-0 flex-1">
        <Controller
          control={control}
          name="proficiency"
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

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
