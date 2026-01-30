import { Text, View } from 'react-native';
import {
  PassivePerceptionFormType,
  usePassivePerceptionForm,
} from './usePassivePerceptionForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';
import { CharacterGeneralInfo } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { useUpdateGeneralInfoMutation } from 'services/generalInfos/generalInfos';
import { Button } from 'components/ui/Button';

type PassivePerceptionFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const PassivePerceptionForm = ({
  generalInfo,
  onClose,
}: PassivePerceptionFormProps) => {
  const { characterId } = useCharacter();
  const { control, handleSubmit } = usePassivePerceptionForm({ generalInfo });

  const { mutate: updateCharacter, isPending } = useUpdateGeneralInfoMutation();

  // const percetionBonus = getSkillBonus('perception');
  const percetionBonus = 0;

  const onSubmit = useCallback(
    (values: PassivePerceptionFormType) => {
      console.log({ values });
      updateCharacter(
        { characterId: characterId!, ...values },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    },
    [characterId, onClose, updateCharacter],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.passivePerception')}
      </Text>

      <View className="flex flex-row gap-4 items-start">
        <View>
          <Text className="font-medium mb-3">{i18n.t('general.base')}</Text>
          <Text className="text-center text-xl">10</Text>
        </View>

        <View>
          <Text className="font-medium mb-3">
            {i18n.t('titles.perception')}
          </Text>
          <Text className="text-center text-xl">{percetionBonus}</Text>
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('general.modifier')}</Text>
          <Controller
            control={control}
            name="passivePerceptionCustomBonus"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
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
            name="passivePerceptionExtraAttribute"
            render={({ field, fieldState: { error } }) => (
              <AttributePicker {...field} error={error?.message} />
            )}
          />
        </View>
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
