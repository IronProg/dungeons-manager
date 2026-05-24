import React, { useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import { useDeleteEquipmentMutation } from 'services/equipments/equipment.api';

import { EquipmentsForm, EquipmentsFormProps } from './Form/EquipmentsForm';
import { EquipmentsList } from './EquipmentsList';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';
import { BaseModal } from 'components/ui/Modals/BaseModal';
import {
  DisposableBottomSheet,
  DisposableBottomSheetHandle,
} from 'components/ui/BottomSheet/DisposableBottomSheet';
import { Portal } from 'react-native-portalize';

import { Equipment } from 'types/character';

const snapPoints = [400];

export const Equipments = () => {
  const { characterId, canEdit } = useCharacter();
  const { mutate: deleteEquipment } = useDeleteEquipmentMutation();

  const ref = useRef<DisposableBottomSheetHandle<EquipmentsFormProps>>(null);

  const [detailedEquipment, setDetailedEquipment] = useState<Equipment>();
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment>();

  const handleDelete = useCallback(() => {
    if (equipmentToDelete) {
      deleteEquipment(
        { characterId: characterId!, id: equipmentToDelete.id! },
        {
          onSuccess: () => {
            setEquipmentToDelete(undefined);
          },
        },
      );
    }
  }, [characterId, deleteEquipment, equipmentToDelete]);

  const onCreate = useCallback(() => {
    if (!canEdit) return;
    ref.current?.show({});
  }, [canEdit]);

  const onEdit = useCallback(
    (equipment: Equipment) => {
      if (!canEdit) return;
      ref.current?.show({ equipment });
    },
    [canEdit],
  );

  const onDelete = useCallback(
    (equipment: Equipment) => {
      if (!canEdit) return;
      setEquipmentToDelete(equipment);
    },
    [canEdit],
  );

  const onShow = useCallback((equipment: Equipment) => {
    setDetailedEquipment(equipment);
  }, []);

  return (
    <>
      <View className="relative flex flex-col gap-2">
        <Text className="text-xl font-medium text-center mb-1">
          {i18n.t('equipments.title')}
        </Text>

        {canEdit && (
          <TouchableOpacity
            onPress={onCreate}
            className="rounded-full bg-green-500 p-2 absolute top-0 right-0"
            hitSlop={15}
          >
            <Plus size={16} color={'white'} />
          </TouchableOpacity>
        )}

        <EquipmentsList
          onShow={onShow}
          onDelete={onDelete}
          onEdit={onEdit}
          canEdit={canEdit}
        />
      </View>

      <ConfirmationModal
        onClose={() => setEquipmentToDelete(undefined)}
        isVisible={!!equipmentToDelete}
        onConfirm={handleDelete}
      />

      <BaseModal
        visible={!!detailedEquipment}
        onClose={() => setDetailedEquipment(undefined)}
      >
        <View className="flex flex-col rounded-lg bg-white gap-4 items-stretch p-4">
          <Text className="text-2xl font-medium text-center">
            {detailedEquipment?.name}
          </Text>

          <View className="flex flex-col gap-2">
            <Text className="font-medium">
              {i18n.t('general.description')}:
            </Text>

            <Text>{detailedEquipment?.description}</Text>
          </View>
        </View>
      </BaseModal>

      <Portal>
        <DisposableBottomSheet
          ref={ref}
          snapPoints={snapPoints}
          renderContent={({ params }) => <EquipmentsForm {...params} />}
        />
      </Portal>
    </>
  );
};
