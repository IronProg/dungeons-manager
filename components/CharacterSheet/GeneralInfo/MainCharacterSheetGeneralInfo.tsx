import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { useGetCharacterGeneralInfo } from 'services/generalInfos/generalInfos';

import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { PassivePerception } from './PassivePerception/PassivePerception';
import { ArmorClass } from './ArmorClass/ArmorClass';
import { Initiative } from './Initiative/Initiative';
import { Speed } from './Speed/Speed';
import { Proficiency } from './Proficiency/Proficiency';
import { Exhaustion } from './Exhaustion/Exhaustion';
import { PassivePerceptionForm } from './PassivePerception/PassivePerceptionForm';
import { InitiativeForm } from './Initiative/InitiativeForm';
import { ArmorClassForm } from './ArmorClass/ArmorClassForm';
import { SpeedForm } from './Speed/SpeedForm';

type GeneralInfoFormTypes =
  | 'passivePerception'
  | 'speed'
  | 'initiative'
  | 'armorClass'
  | 'experience'
  | 'hitDice'
  | 'hitPoint';

export const MainCharacterSheetGeneralInfo = () => {
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();

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
      {isLoading && <ActivityIndicator />}
      {generalInfo ? (
        <>
          <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
            <ArmorClass
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('armorClass')}
            />

            <Initiative
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('initiative')}
            />

            <Speed
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('speed')}
            />
          </View>

          <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
            <Proficiency />

            <Exhaustion generalInfo={generalInfo} />

            <PassivePerception
              generalInfo={generalInfo}
              onLongPress={() => {
                handleOpen('passivePerception');
              }}
            />
          </View>
        </>
      ) : (
        <Text>No Data Found</Text>
      )}

      <ReusableBottomSheetModal
        ref={ref}
        onDismiss={() => {
          setActiveForm(null);
        }}
      >
        {generalInfo && (
          <>
            {activeForm === 'armorClass' && (
              <ArmorClassForm generalInfo={generalInfo} onClose={close} />
            )}
            {activeForm === 'initiative' && (
              <InitiativeForm generalInfo={generalInfo} onClose={close} />
            )}
            {activeForm === 'speed' && (
              <SpeedForm generalInfo={generalInfo} onClose={close} />
            )}
            {activeForm === 'passivePerception' && (
              <PassivePerceptionForm
                generalInfo={generalInfo}
                onClose={close}
              />
            )}
          </>
        )}
      </ReusableBottomSheetModal>
    </View>
  );
};
