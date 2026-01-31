import { Controller } from 'react-hook-form';
import { Switch, Text, View } from 'react-native';
import { SaveFormType, useSaveForm } from './useSaveForm';
import { Save } from 'types/character';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';
import { useUpdateSaveMutation } from 'services/saves/save';
import { Button } from 'components/ui/Button';

type AttributesFormProps = {
  characterId: number;
  save: Save;
  onClose: () => void;
};

export const SaveForm = ({
  characterId,
  save,
  onClose,
}: AttributesFormProps) => {
  const { control, handleSubmit } = useSaveForm({ save });

  const { mutate: updateSave, isPending } = useUpdateSaveMutation();

  const onSubmit = (values: SaveFormType) => {
    updateSave(
      { characterId, id: save.id!, ...values },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-gray-900 font-bold text-2xl text-center">
        {i18n.t(`saves.${save.mainAttribute}`)}
      </Text>

      <View className="flex flex-row gap-4 flex-wrap">
        <View>
          <Controller
            control={control}
            name={'proficiency'}
            render={({ field, fieldState: { error } }) => (
              <View className="flex flex-col items-start">
                <Text>{i18n.t('general.proficiency')}</Text>
                <Switch value={field.value} onValueChange={field.onChange} />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <View className="min-w-0 flex-1">
          <Controller
            control={control}
            name={'customBonus'}
            render={({ field, fieldState: { error } }) => (
              <View className="flex flex-col items-start">
                <Text>{i18n.t('general.modifier')}</Text>
                <BottomSheetTextInput
                  className="w-full text-base bg-gray-200 rounded-xl h-15"
                  keyboardType="number-pad"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <View className="min-w-0 flex-1">
          <Controller
            control={control}
            name={'extraAttribute'}
            render={({ field, fieldState: { error } }) => (
              <>
                <Text>{i18n.t('general.extraAttribute')}</Text>

                <AttributePicker {...field} error={error?.message} />
              </>
            )}
          />
        </View>
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </View>
  );
};
