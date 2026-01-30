import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import {
  HitPointsModifierFormType,
  useHitPointsModifierForm,
} from './useHitPointsModifierForm';
import i18n from 'i18n';
import { CharacterGeneralInfo } from 'types/character';
import { useCharacter } from 'contexts/CharacterContext';
import { useUpdateGeneralInfoMutation } from 'services/generalInfos/generalInfos';
import { Button } from 'components/ui/Button';

type HitPointsModifierFormProps = {
  generalInfo: CharacterGeneralInfo;
  onClose: () => void;
};

export const HitPointsModifierForm = ({
  generalInfo,
  onClose,
}: HitPointsModifierFormProps) => {
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useHitPointsModifierForm();

  const { mutate: updateGeneralInfo, isPending } =
    useUpdateGeneralInfoMutation();

  const onSubmit = useCallback(
    (values: HitPointsModifierFormType) => {
      let hitPoints = generalInfo.hitPoints;
      let temporaryHitPoints: number | null =
        generalInfo?.temporaryHitPoints || 0;

      if (values.damage) {
        temporaryHitPoints -= values.damage;

        if (temporaryHitPoints < 0) {
          hitPoints -= Math.abs(temporaryHitPoints);
        }
      }

      if (values.healing) {
        const healedHitPoints = hitPoints + values.healing;

        if (healedHitPoints > generalInfo.hitPointsLimit) {
          hitPoints = generalInfo.hitPointsLimit;
        } else {
          hitPoints = healedHitPoints;
        }
      }

      if (temporaryHitPoints < 0) temporaryHitPoints = null;
      if (hitPoints < 0) hitPoints = 0;

      if (values.temporary) {
        temporaryHitPoints = Math.max(
          values.temporary,
          temporaryHitPoints || 0,
        );
      }

      updateGeneralInfo(
        { characterId: characterId!, hitPoints, temporaryHitPoints },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );

      onClose();
    },
    [
      characterId,
      generalInfo.hitPoints,
      generalInfo.hitPointsLimit,
      generalInfo?.temporaryHitPoints,
      onClose,
      updateGeneralInfo,
    ],
  );

  return (
    <View className="flex flex-col items-center">
      <Text className="text-2xl text-center font-medium">
        {i18n.t('titles.hitPoints')}
      </Text>

      <View className="flex flex-row gap-4">
        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.damage')}
          </Text>

          <Controller
            control={control}
            name="damage"
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

        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.healing')}
          </Text>

          <Controller
            control={control}
            name="healing"
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

        <View className="min-w-0 flex-1">
          <Text className="font-medium text-center">
            {i18n.t('general.temporary')}
          </Text>

          <Controller
            control={control}
            name="temporary"
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
      </View>

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
