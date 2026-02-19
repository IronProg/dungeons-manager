import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import i18n from 'i18n';

import { FeaturesFormType, useFeaturesForm } from './useFeaturesForm';
import { useCharacter } from 'contexts/CharacterContext';
import {
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
} from 'services/features/feature';

import { Button } from 'components/ui/Button';

import { Feature } from 'types/character';

type FeaturesFormProps = {
  feature?: Feature;
  onClose: () => void;
};

export const FeaturesForm = ({ feature, onClose }: FeaturesFormProps) => {
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useFeaturesForm({ feature });

  const { mutate: createFeature, isPending: createPending } =
    useCreateFeatureMutation();
  const { mutate: updateFeature, isPending: updatePending } =
    useUpdateFeatureMutation();

  const onSubmit = useCallback(
    (values: FeaturesFormType) => {
      if (!feature) {
        createFeature(
          { characterId: characterId!, ...values },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      } else {
        updateFeature(
          { characterId: characterId!, id: feature.id!, ...values },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }
    },
    [feature, characterId, createFeature, onClose, updateFeature],
  );

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
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-40"
                  style={{
                    textAlignVertical: 'top',
                  }}
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  multiline
                  numberOfLines={5}
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
