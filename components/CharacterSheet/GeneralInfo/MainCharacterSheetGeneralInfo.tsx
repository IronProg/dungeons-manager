import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { useGetCharacterGeneralInfo } from 'services/generalInfos/generalInfos';
import { useCharacter } from 'contexts/CharacterContext';

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
  | 'armorClass';

export const MainCharacterSheetGeneralInfo = () => {
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();
  const { bottom } = useSafeAreaInsets();
  const { canEdit } = useCharacter();

  const [activeForm, setActiveForm] = useState<null | GeneralInfoFormTypes>(
    null,
  );
  const [snapPoints, setSnapPoints] = useState<(number | string)[]>([]);

  const { ref, open, close } = useBottomSheetRef();

  const getFormTypeSnapPoints = useMemo(
    () => ({
      passivePerception: [510 + bottom],
      speed: [510 + bottom],
      initiative: [510 + bottom],
      armorClass: [525 + bottom],
    }),
    [bottom],
  );

  const handleOpen = useCallback(
    (formName: GeneralInfoFormTypes) => {
      if (!canEdit) return;
      setActiveForm(formName);
      setSnapPoints(getFormTypeSnapPoints[formName] || [510 + bottom]);
      open();
    },
    [getFormTypeSnapPoints, bottom, open, canEdit],
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
              canEdit={canEdit}
            />

            <Initiative
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('initiative')}
              canEdit={canEdit}
            />

            <Speed
              generalInfo={generalInfo}
              onLongPress={() => handleOpen('speed')}
              canEdit={canEdit}
            />
          </View>

          <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
            <Proficiency />

            <Exhaustion generalInfo={generalInfo} canEdit={canEdit} />

            <PassivePerception
              generalInfo={generalInfo}
              onLongPress={() => {
                handleOpen('passivePerception');
              }}
              canEdit={canEdit}
            />
          </View>
        </>
      ) : (
        <Text>No Data Found</Text>
      )}

      <ReusableBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        onDismiss={() => setActiveForm(null)}
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
