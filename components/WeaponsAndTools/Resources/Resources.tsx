import { Plus, Trash } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import type { ResourcesFormProps } from '@/components/WeaponsAndTools/Resources/ResourcesForm';
import { ResourcesForm } from '@/components/WeaponsAndTools/Resources/ResourcesForm';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import {
  useDeleteResourceMutation,
  useGetAllResources,
  useUpdateResourceMutation,
} from '@/services/resources/resource';
import type { Resource } from '@/types/character';

type ResourcesProps = {
  canEdit: boolean;
};

export const Resources = ({ canEdit }: ResourcesProps) => {
  const { characterId } = useCharacter();
  const { data: resources, isLoading } = useGetAllResources();
  const { mutate: updateResource, isPending } = useUpdateResourceMutation();

  const ref = useRef<AdaptiveBottomSheetHandle<ResourcesFormProps>>(null);

  const { mutate: deleteResource } = useDeleteResourceMutation();

  const [resourceToDelete, setResourceToDelete] = useState<Resource>();

  const handleDelete = () => {
    if (resourceToDelete) {
      deleteResource(
        { characterId: characterId!, id: resourceToDelete.id! },
        {
          onSuccess: () => {
            setResourceToDelete(undefined);
          },
        },
      );
    }
  };

  const handleQuickUpdate = (resource: Resource) => {
    if (!canEdit || resource.amount <= 0) return;

    updateResource({
      characterId: characterId!,
      id: resource.id!,
      amount: resource.amount - 1,
    });
  };

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="mt-4 text-black text-2xl font-bold text-center flex-1 grow">
          {i18n.t('titles.resourcesAndAmmunitions')}
        </Text>

        {canEdit && (
          <TouchableOpacity
            onPress={() => ref.current?.show({})}
            className="rounded-full bg-green-500 p-2"
          >
            <Plus size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && <ActivityIndicator />}

      {resources && resources.length > 0 ? (
        resources?.map((resource, index) => {
          return (
            <View key={resource.id} className="flex flex-row gap-2 items-start">
              <TouchableOpacity
                disabled={isPending}
                onPress={() => handleQuickUpdate(resource)}
                onLongPress={
                  canEdit ? () => ref.current?.show({ resource }) : undefined
                }
                key={index}
                className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2 flex-1"
              >
                <Text className="bg-white rounded-lg px-2 py-1 flex-1">
                  {resource.name}
                </Text>

                <Text className="bg-white rounded-lg px-2 py-1" key={index}>
                  {resource.amount}
                  {resource.max && resource.max > 0 && `/${resource.max}`}
                </Text>
              </TouchableOpacity>

              {canEdit && (
                <TouchableOpacity
                  onPress={() => setResourceToDelete(resource)}
                  className="bg-red-500 rounded-full p-2"
                >
                  <Trash size={16} color="white" />
                </TouchableOpacity>
              )}
            </View>
          );
        })
      ) : (
        <Text>{i18n.t('resources.noneFound')}</Text>
      )}

      <ConfirmationModal
        isVisible={!!resourceToDelete}
        onClose={() => setResourceToDelete(undefined)}
        onConfirm={handleDelete}
      />

      <Portal>
        <AdaptiveBottomSheet
          ref={ref}
          renderContent={({ params }) => <ResourcesForm {...params} />}
        />
      </Portal>
    </>
  );
};
