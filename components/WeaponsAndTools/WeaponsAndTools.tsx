import React, { useCallback, useState } from 'react';
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

type WeaponsAndToolsFormTypes = 'attacks' | 'resources' | 'features';

export const WeaponsAndTools = () => {
  const { character } = useCharacter();
  const { data: currencies, isLoading: isLoadingCurrencies } =
    useGetCharacterCurrency({ characterId: character?.id });

  const [activeForm, setActiveForm] = useState<null | WeaponsAndToolsFormTypes>(
    null,
  );

  const [highlightedAttack, setHighlightedAttack] = useState<Attack>();
  const [highlightedResource, setHighlightedResource] = useState<Resource>();
  const [highlightedFeature, setHighlightedFeature] = useState<Feature>();

  const { ref, open, close } = useBottomSheetRef();

  const handleOpen = useCallback(
    (formName: WeaponsAndToolsFormTypes) => {
      setActiveForm(formName);
      open();
    },
    [open],
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
            <Currency currencies={currencies!} />
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
            />
          </View>
        </ScrollView>
      )}

      <ReusableBottomSheetModal
        ref={ref}
        snapPoints={[600, '95%']}
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
