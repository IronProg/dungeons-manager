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
import {
  useGetCharacter,
  useGetCharacterCurrency,
} from 'services/characters/character';
import { ActivityIndicator, Text } from 'react-native';

type WeaponsAndToolsFormTypes = 'attacks' | 'resources' | 'features';

export const WeaponsAndTools = () => {
  const { data: character } = useGetCharacter({ id: 10 });
  const { data: currencies, isLoading: isLoadingCurrencies } =
    useGetCharacterCurrency({ characterId: 10 });

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
        <ScrollView scrollEnabled>
          {isLoadingCurrencies && <ActivityIndicator />}
          {currencies ? (
            <Currency currencies={currencies!} />
          ) : (
            <Text>No currencies found</Text>
          )}

          <Attacks
            characterId={character.id!}
            onCreate={() => {
              handleOpen('attacks');
            }}
            onSelect={(attack: Attack) => {
              setHighlightedAttack(attack);
              handleOpen('attacks');
            }}
          />

          <Resources
            characterId={character.id!}
            onCreate={() => {
              handleOpen('resources');
            }}
            onSelect={(attack: Resource) => {
              setHighlightedResource(attack);
              handleOpen('resources');
            }}
          />

          <Features
            characterId={character.id!}
            onCreate={() => {
              handleOpen('features');
            }}
            onSelect={(attack: Feature) => {
              setHighlightedFeature(attack);
              handleOpen('features');
            }}
          />
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
