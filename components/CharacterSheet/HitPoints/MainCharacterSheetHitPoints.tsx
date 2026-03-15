import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useCharacter } from 'contexts/CharacterContext';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { useGetCharacterGeneralInfo } from 'services/generalInfos/generalInfos';

import { Experience } from './Experience/Experience';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { ExperienceForm } from './Experience/ExperienceForm';
import { HitDices } from './HitDices/HitDices';
import { HitDicesForm } from './HitDices/HitDicesForm';
import { HitPoints } from './HitPoints/HitPoints';
import { HitPointsForm } from './HitPoints/HitPointsForm';
import { HitPointsModifierForm } from './HitPoints/HitPointsModifierForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HitPointsFormTypes =
  | 'hitPoints'
  | 'hitPointModifier'
  | 'hitDices'
  | 'experience';

export const MainCharacterSheetHitPoints = () => {
  const { character } = useCharacter();
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();
  const { bottom } = useSafeAreaInsets();

  const [activeForm, setActiveForm] = useState<null | HitPointsFormTypes>(null);
  const [snapPoints, setSnapPoints] = useState<(number | string)[]>([
    300,
    '65%',
  ]);
  const { ref, open, close } = useBottomSheetRef();

  const getFormTypeSnapPoints = useMemo(
    () => ({
      hitPoints: [585 + bottom],
      hitPointModifier: [510 + bottom],
      hitDices: [],
      experience: [495 + bottom],
    }),
    [bottom],
  );

  const handleOpen = useCallback(
    (formName: HitPointsFormTypes) => {
      setActiveForm(formName);
      setSnapPoints(getFormTypeSnapPoints[formName] || [510 + bottom]);
      open();
    },
    [getFormTypeSnapPoints, bottom, open],
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
          snapPoints={snapPoints}
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
