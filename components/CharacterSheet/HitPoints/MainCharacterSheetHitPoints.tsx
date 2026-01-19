import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Experience } from './Experience/Experience';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { ExperienceForm } from './Experience/ExperienceForm';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { HitDices } from './HitDices/HitDices';
import { HitDicesForm } from './HitDices/HitDicesForm';
import { HitPoints } from './HitPoints/HitPoints';
import { HitPointsForm } from './HitPoints/HitPointsForm';
import { HitPointsModifierForm } from './HitPoints/HitPointsModifierForm';

type HitPointsFormTypes =
  | 'hitPoints'
  | 'hitPointModifier'
  | 'hitDices'
  | 'experience';

export const MainCharacterSheetHitPoints = () => {
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
        <HitPoints
          onLongPress={() => handleOpen('hitPoints')}
          onPress={() => handleOpen('hitPointModifier')}
        />

        <HitDices onLongPress={() => handleOpen('hitDices')} />

        <Experience onLongPress={() => handleOpen('experience')} />

        <ReusableBottomSheetModal
          ref={ref}
          onDismiss={() => {
            setActiveForm(null);
          }}
        >
          {activeForm === 'hitPoints' && <HitPointsForm onClose={close} />}
          {activeForm === 'hitPointModifier' && (
            <HitPointsModifierForm onClose={close} />
          )}
          {activeForm === 'hitDices' && <HitDicesForm onClose={close} />}
          {activeForm === 'experience' && <ExperienceForm onClose={close} />}
        </ReusableBottomSheetModal>
      </View>
    </>
  );
};
