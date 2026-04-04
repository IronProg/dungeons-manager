import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet';
import i18n from 'i18n';

import { EquipmentsFormType, useEquipmentsForm } from './useEquipmentsForm';
import { useCharacter } from 'contexts/CharacterContext';
import {
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
} from 'services/equipments/equipment.api';

import { Button } from 'components/ui/Button';

import { Equipment } from 'types/character';

export type EquipmentsFormProps = {
  equipment?: Equipment;
};

export const EquipmentsForm = ({ equipment }: EquipmentsFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useEquipmentsForm({ equipment });

  const { mutate: createEquipment, isPending: createPending } =
    useCreateEquipmentMutation();
  const { mutate: updateEquipment, isPending: updatePending } =
    useUpdateEquipmentMutation();

  const onSubmit = useCallback(
    (values: EquipmentsFormType) => {
      if (!equipment) {
        createEquipment(
          { characterId: characterId!, ...values },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      } else {
        updateEquipment(
          { characterId: characterId!, id: equipment.id!, ...values },
          {
            onSuccess: () => {
              close();
            },
          },
        );
      }
    },
    [equipment, characterId, createEquipment, close, updateEquipment],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {equipment ? i18n.t('equipments.edit') : i18n.t('equipments.new')}
      </Text>

      <View className="flex flex-col items-stretch">
        <View>
          <Text>{i18n.t('equipments.name')}</Text>

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

        <View>
          <Text>{i18n.t('equipments.amount')}</Text>

          <Controller
            control={control}
            name="amount"
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
          <Text>{i18n.t('equipments.description')}</Text>

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100"
                  style={{ textAlignVertical: 'top' }}
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
