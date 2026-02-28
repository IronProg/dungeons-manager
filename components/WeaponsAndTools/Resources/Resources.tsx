import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Plus, Trash } from 'lucide-react-native';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import {
  useDeleteResourceMutation,
  useGetAllResources,
  useUpdateResourceMutation,
} from 'services/resources/resource';

import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import { Resource } from 'types/character';

type ResourcesProps = {
  onCreate: () => void;
  onSelect: (resource: Resource) => void;
};

export const Resources = ({ onCreate, onSelect }: ResourcesProps) => {
  const { characterId } = useCharacter();
  const { data: resources, isLoading } = useGetAllResources();
  const { mutate: updateResource, isPending } = useUpdateResourceMutation();

  const { mutate: deleteResource } = useDeleteResourceMutation();

  const [resourceToDelete, setResourceToDelete] = useState<Resource>();

  const handleDelete = useCallback(() => {
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
  }, [characterId, deleteResource, resourceToDelete]);

  const handleQuickUpdate = useCallback(
    (resource: Resource) => {
      if (resource.amount <= 0) return;

      updateResource({
        characterId: characterId!,
        id: resource.id!,
        amount: resource.amount - 1,
      });
    },
    [characterId, updateResource],
  );

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="mt-4 text-black text-2xl font-bold text-center">
          {i18n.t('titles.resourcesAndAmmunitions')}
        </Text>

        <TouchableOpacity
          onPress={onCreate}
          className="rounded-full bg-green-500 p-2"
        >
          <Plus size={16} color={'white'} />
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator />}

      {resources && resources.length > 0 ? (
        resources?.map((resource, index) => {
          return (
            <View key={resource.id} className="flex flex-row gap-2 items-start">
              <TouchableOpacity
                disabled={isPending}
                onPress={() => handleQuickUpdate(resource)}
                onLongPress={() => onSelect(resource)}
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

              <TouchableOpacity
                onPress={() => setResourceToDelete(resource)}
                className="bg-red-500 rounded-full p-2"
              >
                <Trash size={16} color="white" />
              </TouchableOpacity>
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
    </>
  );
};
