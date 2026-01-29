import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Experience } from './Experience/Experience';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { ExperienceForm } from './Experience/ExperienceForm';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { HitDices } from './HitDices/HitDices';
import { HitDicesForm } from './HitDices/HitDicesForm';
import { HitPoints } from './HitPoints/HitPoints';
import { HitPointsForm } from './HitPoints/HitPointsForm';
import { HitPointsModifierForm } from './HitPoints/HitPointsModifierForm';
import { useGetCharacterGeneralInfo } from 'services/characters/character';
import { useCharacter } from 'contexts/CharacterContext';

type HitPointsFormTypes =
  | 'hitPoints'
  | 'hitPointModifier'
  | 'hitDices'
  | 'experience';

export const MainCharacterSheetHitPoints = () => {
  const { character, characterId } = useCharacter();
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo({
    characterId: characterId!,
  });
  const [activeForm, setActiveForm] = useState<null | HitPointsFormTypes>(null);
  const { ref, open, close } = useBottomSheetRef();

  const handleOpen = useCallback(
    (formName: HitPointsFormTypes) => {
      setActiveForm(formName);
      open();
    },
    [open],
  );

  return (
    <>
      <View className="flex flex-row justify-between flex-wrap p-4">
        {isLoading && <ActivityIndicator />}
        {generalInfo ? (
          <>
            <HitPoints
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('hitPoints')}
              onPress={() => handleOpen('hitPointModifier')}
            />

            <HitDices
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('hitDices')}
            />

            <Experience onLongPress={() => handleOpen('experience')} />
          </>
        ) : (
          <Text>No data found</Text>
        )}

        <ReusableBottomSheetModal
          ref={ref}
          snapPoints={[300, 650]}
          onDismiss={() => {
            setActiveForm(null);
          }}
        >
          {generalInfo && (
            <>
              {activeForm === 'hitPoints' && (
                <HitPointsForm generalInfo={generalInfo} onClose={close} />
              )}
              {activeForm === 'hitPointModifier' && (
                <HitPointsModifierForm
                  generalInfo={generalInfo}
                  onClose={close}
                />
              )}
              {activeForm === 'hitDices' && (
                <HitDicesForm generalInfo={generalInfo} onClose={close} />
              )}
            </>
          )}
          {activeForm === 'experience' && (
            <ExperienceForm character={character!} onClose={close} />
          )}
        </ReusableBottomSheetModal>
      </View>
    </>
  );
};
