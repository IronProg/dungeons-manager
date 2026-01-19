import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { PassivePerception } from './PassivePerception/PassivePerception';
import { ArmorClass } from './ArmorClass/ArmorClass';
import { Initiative } from './Initiative/Initiative';
import { Speed } from './Speed/Speed';
import { Proficiency } from './Proficiency/Proficiency';
import { Exhaustion } from './Exhaustion/Exhaustion';
import { PassivePerceptionForm } from './PassivePerception/PassivePerceptionForm';
import { ProficiencyForm } from './Proficiency/ProficiencyForm';
import { InitiativeForm } from './Initiative/InitiativeForm';
import { ArmorClassForm } from './ArmorClass/ArmorClassForm';
import { SpeedForm } from './Speed/SpeedForm';

type GeneralInfoFormTypes =
  | 'passivePerception'
  | 'proficiency'
  | 'speed'
  | 'initiative'
  | 'armorClass'
  | 'experience'
  | 'hitDice'
  | 'hitPoint';

export const MainCharacterSheetGeneralInfo = () => {
  const [activeForm, setActiveForm] = useState<null | GeneralInfoFormTypes>(
    null,
  );
  const { ref, open, close } = useBottomSheetRef();

  const handleOpen = useCallback(
    (formName: GeneralInfoFormTypes) => {
      setActiveForm(formName);
      open();
    },
    [open],
  );

  return (
    <View className="py-4 flex flex-col gap-2">
      <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
        <ArmorClass onLongPress={() => handleOpen('armorClass')} />

        <Initiative onLongPress={() => handleOpen('initiative')} />

        <Speed onLongPress={() => handleOpen('speed')} />
      </View>

      <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
        <Proficiency onLongPress={() => handleOpen('proficiency')} />

        <Exhaustion />

        <PassivePerception
          onLongPress={() => {
            handleOpen('passivePerception');
          }}
        />
      </View>

      <ReusableBottomSheetModal
        ref={ref}
        onDismiss={() => {
          setActiveForm(null);
        }}
      >
        {activeForm === 'armorClass' && <ArmorClassForm onClose={close} />}
        {activeForm === 'initiative' && <InitiativeForm onClose={close} />}
        {activeForm === 'speed' && <SpeedForm onClose={close} />}
        {activeForm === 'proficiency' && <ProficiencyForm onClose={close} />}
        {activeForm === 'passivePerception' && (
          <PassivePerceptionForm onClose={close} />
        )}
      </ReusableBottomSheetModal>
    </View>
  );
};
