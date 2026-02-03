import { Controller } from 'react-hook-form';
import { Resource } from 'types/character';
import { ResourcesFormType, useResourcesForm } from './useResourcesForm';
import { Text, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import i18n from 'i18n';
import {
  useCreateResourceMutation,
  useUpdateResourceMutation,
} from 'services/resources/resource';
import { useCharacter } from 'contexts/CharacterContext';
import { Button } from 'components/ui/Button';

type ResourcesFormProps = {
  resource?: Resource;
  onClose: () => void;
};

export const ResourcesForm = ({ resource, onClose }: ResourcesFormProps) => {
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
              onClose();
            },
          },
        );
      } else {
        updateResource(
          { characterId: characterId!, id: resource.id!, ...values },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }
    },
    [resource, characterId, createResource, onClose, updateResource],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {resource ? 'Editar Característica' : 'Nova Característica'}
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
