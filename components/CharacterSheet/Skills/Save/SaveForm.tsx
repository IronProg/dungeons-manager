import { Controller } from 'react-hook-form';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SaveFormType, useSaveForm } from './useSaveForm';
import { Save } from 'types/character';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useSaves } from 'contexts/SavesContext';
import i18n from 'i18n';
import { AttributePicker } from 'components/ui/inputs/AttributePicker';

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
  const { updateSaves } = useSaves();
  const { control, handleSubmit } = useSaveForm({ save });

  const onSubmit = (values: SaveFormType) => {
    // const newSaves = saves.map((save) => {
    //   if (save.mainAttribute === values.mainAttribute) {
    //     return values;
    //   }

    //   return save;
    // });

    // updateSaves(newSaves);

    onClose();
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
