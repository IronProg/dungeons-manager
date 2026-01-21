import { Controller } from 'react-hook-form';
import { Feature } from 'types/character';
import { FeaturesFormType, useFeaturesForm } from './useFeaturesForm';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useFeatures } from 'contexts/FeaturesContext';

type FeaturesFormProps = {
  feature?: Feature;
  onClose: () => void;
};

export const FeaturesForm = ({ feature, onClose }: FeaturesFormProps) => {
  const { appendFeature, updateFeature } = useFeatures();
  const { control, handleSubmit } = useFeaturesForm({ feature });

  const onSubmit = useCallback(
    (values: FeaturesFormType) => {
      if (!feature) {
        appendFeature(values);
      } else {
        updateFeature(feature, values);
      }

      onClose();
    },
    [appendFeature, feature, onClose, updateFeature],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {feature ? 'Editar Característica' : 'Nova Característica'}
      </Text>

      <View className="flex flex-col items-stretch">
        <View>
          <Text>Título</Text>

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
          <Text>Origem</Text>

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
          <Text>Origem</Text>

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

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
