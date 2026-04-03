import { Text, TouchableOpacity, View } from 'react-native';
import { Trash2 } from 'lucide-react-native';

import { useGetAllEquipments } from 'services/equipments/equipment.api';

import { Equipment } from 'types/character';
import { Skeleton } from 'components/ui/Skeleton';

type EquipmentsListProps = {
  onShow: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
  onDelete: (equipment: Equipment) => void;
  canEdit: boolean;
};

export const EquipmentsList = ({
  onShow,
  onEdit,
  onDelete,
  canEdit,
}: EquipmentsListProps) => {
  const { data: equipments, isPending } = useGetAllEquipments();

  return (
    <View className="flex flex-col gap-2">
      {isPending ? (
        <>
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </>
      ) : (
        equipments &&
        equipments.length > 0 &&
        equipments.map((equipment) => (
          <View key={equipment.id!} className="flex flex-row gap-2">
            <TouchableOpacity
              onPress={() =>
                equipment.description?.length > 0 && onShow(equipment)
              }
              onLongPress={canEdit ? () => onEdit(equipment) : undefined}
              className="flex flex-row gap-2 bg-white rounded-lg py-1 px-2 grow"
            >
              <Text className="flex-1 border-r border-neutral-500 line-clamp-1">
                {equipment.name}
              </Text>

              <Text>{equipment.amount}x</Text>
            </TouchableOpacity>

            {canEdit && (
              <TouchableOpacity
                onPress={() => onDelete(equipment)}
                className="rounded-full h-8 w-8 flex items-center justify-center bg-red-500"
              >
                <Trash2 size={16} color={'white'} />
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </View>
  );
};
