import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { useDeleteEquipmentMutation } from 'services/equipments/equipment.api';

import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { EquipmentsForm } from './Form/EquipmentsForm';
import { EquipmentsList } from './EquipmentsList';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';
import { BaseModal } from 'components/ui/Modals/BaseModal';

import { Equipment } from 'types/character';

export const Equipments = () => {
  const { bottom } = useSafeAreaInsets();
  const { characterId } = useCharacter();
  const { mutate: deleteEquipment } = useDeleteEquipmentMutation();

  const { ref, open, close } = useBottomSheetRef();

  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment>();
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
    open();
  }, [open]);

  const onEdit = useCallback(
    (equipment: Equipment) => {
      setEquipmentToEdit(equipment);
      open();
    },
    [open],
  );

  const onDelete = useCallback((equipment: Equipment) => {
    setEquipmentToDelete(equipment);
  }, []);

  const onShow = useCallback((equipment: Equipment) => {
    setDetailedEquipment(equipment);
  }, []);

  const handleClose = useCallback(() => {
    setEquipmentToEdit(undefined);
    close();
  }, [close]);

  return (
    <>
      <View className="relative flex flex-col gap-2">
        <Text className="text-xl font-medium text-center mb-1">
          {i18n.t('equipments.title')}
        </Text>

        <TouchableOpacity
          onPress={onCreate}
          className="rounded-full bg-green-500 p-2 absolute top-0 right-0"
          hitSlop={15}
        >
          <Plus size={16} color={'white'} />
        </TouchableOpacity>

        <EquipmentsList onShow={onShow} onDelete={onDelete} onEdit={onEdit} />
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

      <ReusableBottomSheetModal
        ref={ref}
        onDismiss={handleClose}
        snapPoints={[830 + bottom]}
      >
        <EquipmentsForm onClose={handleClose} equipment={equipmentToEdit} />
      </ReusableBottomSheetModal>
    </>
  );
};
