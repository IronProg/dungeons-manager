import { useCharacter } from 'contexts/CharacterContext';
import i18n from 'i18n';
import { Info, Plus, Trash } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import {
  useDeleteResourceMutation,
  useGetAllResources,
  useUpdateResourceMutation,
} from 'services/resources/resource';
import { Resource } from 'types/character';

type ResourcesProps = {
  onCreate: () => void;
  onSelect: (resource: Resource) => void;
};

export const Resources = ({ onCreate, onSelect }: ResourcesProps) => {
  const { characterId } = useCharacter();
  const { data: resources, isLoading } = useGetAllResources({
    characterId: characterId!,
  });
  const { mutate: updateResource, isPending } = useUpdateResourceMutation();

  const { mutate: deleteResource } = useDeleteResourceMutation();

  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const handleDelete = useCallback(
    (resource: Resource) => {
      deleteResource({ characterId: characterId!, id: resource.id! });
    },
    [characterId, deleteResource],
  );

  const handleQuickUpdate = useCallback(
    (resource: Resource) => {
      if (deleteMode || resource.amount <= 0) return;

      updateResource({
        characterId: characterId!,
        id: resource.id!,
        amount: resource.amount - 1,
      });
    },
    [characterId, deleteMode, updateResource],
  );

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <TouchableOpacity
          onPress={() => setDeleteMode((prev) => !prev)}
          className={`rounded-full p-2 ${deleteMode ? 'bg-slate-500' : 'bg-red-500'}`}
        >
          {deleteMode ? (
            <Info color="white" size={16} />
          ) : (
            <Trash color="white" size={16} />
          )}
        </TouchableOpacity>

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
            <TouchableOpacity
              disabled={isPending}
              onPress={() => handleQuickUpdate(resource)}
              onLongPress={() => !deleteMode && onSelect(resource)}
              key={index}
              className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2"
            >
              <Text className="bg-gray-100 rounded-lg px-2 py-1 grow">
                {resource.name}
              </Text>

              <Text className="bg-gray-100 rounded-lg px-2 py-1" key={index}>
                {resource.amount}
                {resource.max && resource.max > 0 && `/${resource.max}`}
              </Text>

              {deleteMode && (
                <View className="absolute inset-y-0 right-2 flex flex-row items-center">
                  <TouchableOpacity
                    onPress={() => handleDelete(resource)}
                    className="bg-red-500 rounded-full p-2"
                  >
                    <Trash size={16} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No resources found.</Text>
      )}
    </>
  );
};
