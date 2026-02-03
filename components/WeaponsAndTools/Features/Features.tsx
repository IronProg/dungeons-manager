import { Info, Plus, Trash } from 'lucide-react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Feature } from 'types/character';
import RNModal from 'react-native-modal';
import { useCallback, useState } from 'react';
import i18n from 'i18n';
import {
  useDeleteFeatureMutation,
  useGetAllFeatures,
} from 'services/features/feature';
import { useCharacter } from 'contexts/CharacterContext';

type FeaturesProps = {
  onCreate: () => void;
  onSelect: (feature: Feature) => void;
};

export const Features = ({ onCreate, onSelect }: FeaturesProps) => {
  const { characterId } = useCharacter();
  const { data: features, isLoading } = useGetAllFeatures({
    characterId: characterId!,
  });
  const { mutate: deleteFeature } = useDeleteFeatureMutation();

  const [detailedFeature, setDetailedFeature] = useState<Feature>();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const handleDelete = useCallback(
    (resource: Feature) => {
      deleteFeature({ characterId: characterId!, id: resource.id! });
    },
    [characterId, deleteFeature],
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

        <Text className="text-black text-2xl font-bold text-center">
          {i18n.t('titles.features')}
        </Text>

        <TouchableOpacity
          onPress={onCreate}
          className="rounded-full bg-green-500 p-2"
        >
          <Plus size={16} color={'white'} />
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator />}

      {features && features.length > 0 ? (
        features?.map((feature, index) => {
          return (
            <TouchableOpacity
              disabled={deleteMode}
              onPress={() => setDetailedFeature(feature)}
              onLongPress={() => onSelect(feature)}
              key={index}
              className="rounded-lg gap-2 border-b border-gray-300 pb-2 mb-2"
            >
              <View className="bg-white rounded-lg px-2 py-1 flex flex-row gap-1 items-center flex-wrap">
                <Text>{feature.title}</Text>

                {feature.origin && (
                  <Text className="text-gray-700">({feature.origin})</Text>
                )}
              </View>

              {deleteMode && (
                <View className="absolute inset-y-0 right-2 flex flex-row items-center">
                  <TouchableOpacity
                    onPress={() => handleDelete(feature)}
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
        <Text>No features found</Text>
      )}

      <RNModal
        isVisible={!!detailedFeature}
        onBackdropPress={() =>
          requestAnimationFrame(() => {
            setDetailedFeature(undefined);
          })
        }
      >
        <View className="flex flex-col rounded-lg bg-white gap-4 items-stretch p-4">
          <Text className="text-2xl font-medium text-center">
            {detailedFeature?.title}
          </Text>

          {detailedFeature?.origin && (
            <View className="flex flex-col gap-2">
              <Text className="font-medium">{i18n.t('general.origin')}:</Text>

              <Text>{detailedFeature?.origin}</Text>
            </View>
          )}

          <View className="flex flex-col gap-2">
            <Text className="font-medium">
              {i18n.t('general.description')}:
            </Text>

            <Text>{detailedFeature?.description}</Text>
          </View>
        </View>
      </RNModal>
    </>
  );
};
