import { Text, TouchableOpacity, View } from 'react-native';
import { InitiativeFormType, useInitiativeForm } from './useInitiativeForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { CharacterGeneralInfo } from 'types/character';
import { useAttributes } from 'contexts/AttributesContext';

type InitiativeFormProps = {
  onClose: () => void;
};

export const InitiativeForm = ({ onClose }: InitiativeFormProps) => {
  const { modifiers } = useAttributes();
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { control, handleSubmit } = useInitiativeForm({ generalInfo });

  const onSubmit = useCallback(
    (values: InitiativeFormType) => {
      const newGeneralInfo: CharacterGeneralInfo = {
        ...generalInfo,
        ...values,
      };

      updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">Iniciativa</Text>

      <View className="flex flex-row gap-4 items-start">
        <View>
          <Text className="font-medium mb-3">Base</Text>
          <Text className="text-center text-xl">{modifiers.dexterity}</Text>
        </View>

        <View>
          <Text className="font-medium">Modifier</Text>
          <Controller
            control={control}
            name="initiativeCustomBonus"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
          <Text className="text-center"></Text>
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
