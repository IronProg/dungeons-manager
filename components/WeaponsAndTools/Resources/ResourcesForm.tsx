import { Controller } from 'react-hook-form';
import { Resource } from 'types/character';
import { ResourcesFormType, useResourcesForm } from './useResourcesForm';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useResources } from 'contexts/ResourcesContext';
import i18n from 'i18n';

type ResourcesFormProps = {
  resource?: Resource;
  onClose: () => void;
};

export const ResourcesForm = ({ resource, onClose }: ResourcesFormProps) => {
  const { appendResource, updateResource } = useResources();
  const { control, handleSubmit } = useResourcesForm({ resource });

  const onSubmit = useCallback(
    (values: ResourcesFormType) => {
      if (!resource) {
        appendResource(values);
      } else {
        updateResource(resource, values);
      }

      onClose();
    },
    [appendResource, resource, onClose, updateResource],
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

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          {i18n.t('general.save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
