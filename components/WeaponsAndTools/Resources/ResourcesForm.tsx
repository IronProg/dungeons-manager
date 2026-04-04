import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import i18n from 'i18n';

import { ResourcesFormType, useResourcesForm } from './useResourcesForm';
import {
  useCreateResourceMutation,
  useUpdateResourceMutation,
} from 'services/resources/resource';
import { useCharacter } from 'contexts/CharacterContext';

import { Button } from 'components/ui/Button';

import { Resource } from 'types/character';

export type ResourcesFormProps = {
  resource?: Resource;
};

export const ResourcesForm = ({ resource }: ResourcesFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useResourcesForm({ resource });

  const { mutate: createResource, isPending: createPending } =
    useCreateResourceMutation();
  const { mutate: updateResource, isPending: updatePending } =
    useUpdateResourceMutation();

  const onSubmit = useCallback(
    (values: ResourcesFormType) => {
      if (!resource) {
        createResource(
          { characterId: characterId!, ...values },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      } else {
        updateResource(
          { characterId: characterId!, id: resource.id!, ...values },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      }
    },
    [resource, characterId, createResource, close, updateResource],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {resource
          ? i18n.t('titles.editResource')
          : i18n.t('titles.newResource')}
      </Text>

      <View className="flex flex-col items-stretch">
        <View>
          <Text>{i18n.t('general.title')}</Text>

          <Controller
            control={control}
            name="name"
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

        <View className="flex flex-row justify-between gap-4">
          <View className="flex-1">
            <Text>{i18n.t('general.currentQuantity')}</Text>

            <Controller
              control={control}
              name="amount"
              render={({ field, fieldState: { error } }) => (
                <>
                  <BottomSheetTextInput
                    className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                    onChangeText={field.onChange}
                    value={`${field.value || ''}`}
                    keyboardType="numeric"
                  />

                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                </>
              )}
            />
          </View>

          <View className="flex-1">
            <Text>{i18n.t('general.limit')}</Text>

            <Controller
              control={control}
              name="max"
              render={({ field, fieldState: { error } }) => (
                <>
                  <BottomSheetTextInput
                    className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
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
      </View>

      <Button
        disabled={createPending || updatePending}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
