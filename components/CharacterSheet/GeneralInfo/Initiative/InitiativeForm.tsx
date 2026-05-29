import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import type { InitiativeFormType } from '@/components/CharacterSheet/GeneralInfo/Initiative/useInitiativeForm.ts';
import { useInitiativeForm } from '@/components/CharacterSheet/GeneralInfo/Initiative/useInitiativeForm.ts';
import { Button } from '@/components/ui/Button';
import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useUpdateGeneralInfoMutation } from '@/services/generalInfos/generalInfos';
import type { CharacterGeneralInfo } from '@/types/character';

export type InitiativeFormProps = {
  generalInfo: CharacterGeneralInfo;
};

export const InitiativeForm = ({ generalInfo }: InitiativeFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useInitiativeForm({ generalInfo });

  const { mutate: updateCharacter, isPending } = useUpdateGeneralInfoMutation();

  const onSubmit = (values: InitiativeFormType) => {
      updateCharacter(
        { characterId: characterId!, ...values },
        {
          onSuccess: () => {
            close();
          },
        },
      );
    },
    [characterId, close, updateCharacter];

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.initiative')}
      </Text>

      <View className="flex flex-row gap-4 items-start">
        <View>
          <Text className="font-medium mb-3">{i18n.t('general.base')}</Text>
          <Text className="text-center text-xl">2</Text>
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
                  value={`${field.value ?? ''}`}
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
            name="initiativeExtraAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
            )}
          />
        </View>
      </View>

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
