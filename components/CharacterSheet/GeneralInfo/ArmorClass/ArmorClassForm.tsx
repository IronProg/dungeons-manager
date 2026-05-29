import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import type { ArmorClassFormType } from '@/components/CharacterSheet/GeneralInfo/ArmorClass/useArmorClassForm.ts';
import { useArmorClassForm } from '@/components/CharacterSheet/GeneralInfo/ArmorClass/useArmorClassForm.ts';
import { Button } from '@/components/ui/Button';
import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useUpdateGeneralInfoMutation } from '@/services/generalInfos/generalInfos';
import type { CharacterGeneralInfo } from '@/types/character';

export type ArmorClassFormProps = {
  generalInfo: CharacterGeneralInfo;
};

export const ArmorClassForm = ({ generalInfo }: ArmorClassFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useArmorClassForm({ generalInfo });

  const { mutate: updateGeneralInfo, isPending } =
    useUpdateGeneralInfoMutation();

  const onSubmit = (values: ArmorClassFormType) => {
      updateGeneralInfo(
        { characterId: characterId!, ...values },
        {
          onSuccess: () => {
            close();
          },
        },
      );
    },
    [characterId, close, updateGeneralInfo];

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.armorClass')}
      </Text>

      <View className="flex flex-row gap-4 items-start flex-wrap">
        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.base')}</Text>
          <Controller
            control={control}
            name="armorClassBase"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-base rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
          <Text className="text-center" />
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.attribute')}</Text>
          <Controller
            control={control}
            name="armorClassFirstAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
            )}
          />
          <Text className="text-center" />
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.attribute')}</Text>
          <Controller
            control={control}
            name="armorClassSecondAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
            )}
          />
          <Text className="text-center" />
        </View>
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
