import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Currency } from './Currency/Currency';
import { Attacks } from './Attacks/Attacks';
import { Resources } from './Resources/Resources';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { Features } from './Features/Features';
import { Attack, Feature, Resource } from 'types/character';
import { AttacksForm } from './Attacks/AttacksForm';
import { FeaturesForm } from './Features/FeaturesForm';
import { ResourcesForm } from './Resources/ResourcesForm';
import { ActivityIndicator, Text, View } from 'react-native';
import { useCharacter } from 'contexts/CharacterContext';
import { useGetCharacterCurrency } from 'services/currencies/currencies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WeaponsAndToolsFormTypes = 'attacks' | 'resources' | 'features';

export const WeaponsAndTools = () => {
  const { bottom } = useSafeAreaInsets();
  const { character, canEdit } = useCharacter();
  const { data: currencies, isLoading: isLoadingCurrencies } =
    useGetCharacterCurrency();

  const [activeForm, setActiveForm] = useState<null | WeaponsAndToolsFormTypes>(
    null,
  );
  const [snapPoints, setSnapPoints] = useState<(number | string)[]>([]);

  const [highlightedAttack, setHighlightedAttack] = useState<Attack>();
  const [highlightedResource, setHighlightedResource] = useState<Resource>();
  const [highlightedFeature, setHighlightedFeature] = useState<Feature>();

  const { ref, open, close } = useBottomSheetRef();

  const getFormTypeSnapPoints = useMemo(
    () => ({
      attacks: ['95%'],
      resources: [590 + bottom],
      features: ['95%'],
    }),
    [bottom],
  );

  const handleOpen = useCallback(
    (formName: WeaponsAndToolsFormTypes) => {
      if (!canEdit) return;
      setActiveForm(formName);
      setSnapPoints(getFormTypeSnapPoints[formName] || [510 + bottom]);
      open();
    },
    [getFormTypeSnapPoints, bottom, open, canEdit],
  );

  const handleClose = useCallback(() => {
    setHighlightedAttack(undefined);
    setHighlightedResource(undefined);
    setHighlightedFeature(undefined);

    setActiveForm(null);
    close();
  }, [close]);

  return (
    <>
      {character && (
        <ScrollView
          scrollEnabled
          contentContainerClassName="flex flex-col gap-4 px-2"
        >
          {isLoadingCurrencies && <ActivityIndicator />}
          {currencies ? (
            <Currency currencies={currencies!} canEdit={canEdit} />
          ) : (
            <Text>No currencies found</Text>
          )}

          <View>
            <Attacks
              onCreate={() => {
                handleOpen('attacks');
              }}
              onSelect={(attack: Attack) => {
                setHighlightedAttack(attack);
                handleOpen('attacks');
              }}
              canEdit={canEdit}
            />
          </View>

          <View>
            <Resources
              onCreate={() => {
                handleOpen('resources');
              }}
              onSelect={(resource: Resource) => {
                setHighlightedResource(resource);
                handleOpen('resources');
              }}
              canEdit={canEdit}
            />
          </View>

          <View>
            <Features
              onCreate={() => {
                handleOpen('features');
              }}
              onSelect={(feature: Feature) => {
                setHighlightedFeature(feature);
                handleOpen('features');
              }}
              canEdit={canEdit}
            />
          </View>
        </ScrollView>
      )}

      <ReusableBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        onDismiss={handleClose}
      >
        {activeForm === 'attacks' && (
          <AttacksForm attack={highlightedAttack} onClose={handleClose} />
        )}
        {activeForm === 'resources' && (
          <ResourcesForm resource={highlightedResource} onClose={handleClose} />
        )}
        {activeForm === 'features' && (
          <FeaturesForm feature={highlightedFeature} onClose={handleClose} />
        )}
      </ReusableBottomSheetModal>
    </>
  );
};
