import { useResources } from 'contexts/ResourcesContext';
import i18n from 'i18n';
import { Plus } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Resource } from 'types/character';

type ResourcesProps = {
  onCreate: () => void;
  onSelect: (attack: Resource) => void;
};

export const Resources = ({ onCreate, onSelect }: ResourcesProps) => {
  const { resources, updateResource } = useResources();

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="text-black text-2xl font-bold text-center">
          {i18n.t('titles.resourcesAndAmmunitions')}
        </Text>

        <TouchableOpacity
          onPress={onCreate}
          className="rounded-full bg-green-500 p-2"
        >
          <Plus size={16} color={'white'} />
        </TouchableOpacity>
      </View>

      {resources?.map((resource, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              const newAmount = resource.amount > 0 ? resource.amount - 1 : 0;

              updateResource(resource, { ...resource, amount: newAmount });
            }}
            onLongPress={() => onSelect(resource)}
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
          </TouchableOpacity>
        );
      })}
    </>
  );
};
