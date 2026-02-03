import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { SpeedFormType, useSpeedForm } from './useSpeedForm';
import i18n from 'i18n';
import { CharacterGeneralInfo } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { useUpdateGeneralInfoMutation } from 'services/generalInfos/generalInfos';
import { Button } from 'components/ui/Button';

type SpeedFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const SpeedForm = ({ generalInfo, onClose }: SpeedFormProps) => {
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useSpeedForm({ generalInfo });

  const { mutate: updateCharacter, isPending } = useUpdateGeneralInfoMutation();

  const onSubmit = useCallback(
    (values: SpeedFormType) => {
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
        {i18n.t('titles.speed')}
      </Text>

      <View className="flex flex-row gap-4 items-start">
        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('speeds.normal')}</Text>
          <Controller
            control={control}
            name="speed"
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
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('speeds.climbing')}</Text>
          <Controller
            control={control}
            name="speedClimbing"
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
        </View>

        <View className="min-w-0 flex-1">
          <Text className="font-medium">{i18n.t('speeds.flying')}</Text>
          <Controller
            control={control}
            name="speedFlying"
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
        </View>
      </View>

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
