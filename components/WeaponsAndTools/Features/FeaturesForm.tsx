import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import type { FeaturesFormType } from '@/components/WeaponsAndTools/Features/useFeaturesForm.tsx';
import { useFeaturesForm } from '@/components/WeaponsAndTools/Features/useFeaturesForm.tsx';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import {
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
} from '@/services/features/feature';
import type { Feature } from '@/types/character';

export type FeaturesFormProps = {
  feature?: Feature;
};

export const FeaturesForm = ({ feature }: FeaturesFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useFeaturesForm({ feature });

  const { mutate: createFeature, isPending: createPending } =
    useCreateFeatureMutation();
  const { mutate: updateFeature, isPending: updatePending } =
    useUpdateFeatureMutation();

  const onSubmit = (values: FeaturesFormType) => {
      if (feature) {
        updateFeature(
          { characterId: characterId!, id: feature.id!, ...values },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      } else {
        createFeature(
          { characterId: characterId!, ...values },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      }
    },
    [feature, characterId, createFeature, close, updateFeature];

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {feature ? i18n.t('titles.editFeature') : i18n.t('titles.newFeature')}
      </Text>

      <View className="flex flex-col items-stretch">
        <View>
          <Text>{i18n.t('general.title')}</Text>

          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View>
          <Text>{i18n.t('general.origin')}</Text>

          <Controller
            control={control}
            name="origin"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View>
          <Text>{i18n.t('general.description')}</Text>

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100"
                  style={{
                    textAlignVertical: 'top',
                  }}
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  multiline
                  scrollEnabled={false}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <Button
        disabled={createPending || updatePending}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
