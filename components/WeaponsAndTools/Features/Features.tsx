import { useFeatures } from 'contexts/FeaturesContext';
import { Plus } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feature } from 'types/character';
import RNModal from 'react-native-modal';
import { useState } from 'react';

type FeaturesProps = {
  onCreate: () => void;
  onSelect: (feature: Feature) => void;
};

export const Features = ({ onCreate, onSelect }: FeaturesProps) => {
  const [detailedFeature, setDetailedFeature] = useState<Feature>();
  const { features } = useFeatures();

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="text-black text-2xl font-bold text-center">
          Características
        </Text>

        <TouchableOpacity
          onPress={onCreate}
          className="rounded-full bg-green-500 p-2"
        >
          <Plus size={16} color={'white'} />
        </TouchableOpacity>
      </View>

      {features?.map((feature, index) => {
        return (
          <TouchableOpacity
            onPress={() => setDetailedFeature(feature)}
            onLongPress={() => onSelect(feature)}
            key={index}
            className="rounded-lg gap-2 border-b border-gray-300 pb-2 mb-2"
          >
            <View className="bg-gray-100 rounded-lg px-2 py-1 flex flex-row gap-1 items-center flex-wrap">
              <Text>{feature.title}</Text>

              {feature.origin && (
                <Text className="text-gray-700">({feature.origin})</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

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
              <Text className="font-medium">Origem:</Text>

              <Text>{detailedFeature?.origin}</Text>
            </View>
          )}

          <View className="flex flex-col gap-2">
            <Text className="font-medium">Descrição:</Text>

            <Text>{detailedFeature?.description}</Text>
          </View>
        </View>
      </RNModal>
    </>
  );
};
