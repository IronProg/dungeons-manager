import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Plus, Trash } from 'lucide-react-native';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';

import {
  useDeleteFeatureMutation,
  useGetAllFeatures,
} from 'services/features/feature';
import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';
import { BaseModal } from 'components/ui/Modals/BaseModal';

import { Feature } from 'types/character';
import {
  DisposableBottomSheet,
  DisposableBottomSheetHandle,
} from 'components/ui/BottomSheet/DisposableBottomSheet';
import { Portal } from 'react-native-portalize';
import { FeaturesForm, FeaturesFormProps } from './FeaturesForm';

type FeaturesProps = {
  canEdit: boolean;
};

const snapPoints = ['95%'];

export const Features = ({ canEdit }: FeaturesProps) => {
  const { characterId } = useCharacter();
  const { data: features, isLoading } = useGetAllFeatures();
  const ref = useRef<DisposableBottomSheetHandle<FeaturesFormProps>>(null);
  const { mutate: deleteFeature } = useDeleteFeatureMutation();

  const [detailedFeature, setDetailedFeature] = useState<Feature>();
  const [featureToDelete, setFeatureToDelete] = useState<Feature>();

  const handleDelete = useCallback(() => {
    if (featureToDelete) {
      deleteFeature(
        { characterId: characterId!, id: featureToDelete.id! },
        {
          onSuccess: () => {
            setFeatureToDelete(undefined);
          },
        },
      );
    }
  }, [characterId, deleteFeature, featureToDelete]);

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="text-black text-2xl font-bold text-center flex-1 grow">
          {i18n.t('titles.features')}
        </Text>

        {canEdit && (
          <TouchableOpacity
            onPress={() => ref.current?.show({})}
            className="rounded-full bg-green-500 p-2"
          >
            <Plus size={16} color={'white'} />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && <ActivityIndicator />}

      <View className="flex flex-col gap-2">
        {features && features.length > 0 ? (
          features?.map((feature, index) => {
            return (
              <View
                key={index}
                className="flex flex-row gap-2 border-b border-gray-300 items-center"
              >
                <TouchableOpacity
                  onPress={() => setDetailedFeature(feature)}
                  onLongPress={
                    canEdit ? () => ref.current?.show({ feature }) : undefined
                  }
                  className="rounded-lg gap-2 py-1 grow flex-1"
                >
                  <View className="bg-white rounded-lg px-2 py-1">
                    <Text>
                      {feature.title}

                      {feature.origin && (
                        <Text className="text-gray-700">
                          {' '}
                          ({feature.origin})
                        </Text>
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>

                {canEdit && (
                  <TouchableOpacity
                    onPress={() => setFeatureToDelete(feature)}
                    className="bg-red-500 rounded-full p-2"
                  >
                    <Trash size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        ) : (
          <Text>{i18n.t('features.noneFound')}</Text>
        )}
      </View>

      <ConfirmationModal
        isVisible={!!featureToDelete}
        onClose={() => setFeatureToDelete(undefined)}
        onConfirm={handleDelete}
      />

      <BaseModal
        visible={!!detailedFeature}
        onClose={() => setDetailedFeature(undefined)}
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
      </BaseModal>

      <Portal>
        <DisposableBottomSheet
          ref={ref}
          snapPoints={snapPoints}
          renderContent={({ params }) => <FeaturesForm {...params} />}
        />
      </Portal>
    </>
  );
};
