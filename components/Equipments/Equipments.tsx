import { Plus } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Portal } from 'react-native-portalize';

import { EquipmentsList } from '@/components/Equipments/EquipmentsList';
import type { EquipmentsFormProps } from '@/components/Equipments/Form/EquipmentsForm';
import { EquipmentsForm } from '@/components/Equipments/Form/EquipmentsForm';
import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { BaseModal } from '@/components/ui/Modals/BaseModal';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { useCharacter } from '@/contexts/CharacterContext';
import { useModalTextHeight } from '@/hooks/useModalTextHeight';
import i18n from '@/i18n';
import { useDeleteEquipmentMutation } from '@/services/equipments/equipment.api';
import type { Equipment } from '@/types/character';

export const Equipments = () => {
  const { modalTextHeight } = useModalTextHeight();
  const { characterId, canEdit } = useCharacter();
  const { mutate: deleteEquipment } = useDeleteEquipmentMutation();

  const ref = useRef<AdaptiveBottomSheetHandle<EquipmentsFormProps>>(null);

  const [detailedEquipment, setDetailedEquipment] = useState<Equipment>();
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment>();

  const handleDelete = () => {
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
  };

  const onCreate = () => {
    if (!canEdit) return;
    ref.current?.show({});
  };

  const onEdit = (equipment: Equipment) => {
    if (!canEdit) return;

    ref.current?.show({ equipment });
  };

  const onDelete = (equipment: Equipment) => {
    if (!canEdit) return;

    setEquipmentToDelete(equipment);
  };

  const onShow = (equipment: Equipment) => {
    setDetailedEquipment(equipment);
  };

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
            <Plus size={16} color="white" />
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

            <ScrollView style={{ maxHeight: modalTextHeight }}>
              <Text>{detailedEquipment?.description}</Text>
            </ScrollView>
          </View>
        </View>
      </BaseModal>

      <Portal>
        <AdaptiveBottomSheet
          ref={ref}
          renderContent={({ params }) => <EquipmentsForm {...params} />}
        />
      </Portal>
    </>
  );
};
