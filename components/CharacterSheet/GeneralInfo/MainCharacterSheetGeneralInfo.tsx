import React, { useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useGetCharacterGeneralInfo } from 'services/generalInfos/generalInfos';
import { useCharacter } from 'contexts/CharacterContext';

import { PassivePerception } from './PassivePerception/PassivePerception';
import { ArmorClass } from './ArmorClass/ArmorClass';
import { Initiative } from './Initiative/Initiative';
import { Speed } from './Speed/Speed';
import { Proficiency } from './Proficiency/Proficiency';
import { Exhaustion } from './Exhaustion/Exhaustion';
import {
  PassivePerceptionForm,
  PassivePerceptionFormProps,
} from './PassivePerception/PassivePerceptionForm';
import {
  InitiativeForm,
  InitiativeFormProps,
} from './Initiative/InitiativeForm';
import {
  ArmorClassForm,
  ArmorClassFormProps,
} from './ArmorClass/ArmorClassForm';
import { SpeedForm, SpeedFormProps } from './Speed/SpeedForm';
import {
  DisposableBottomSheet,
  DisposableBottomSheetHandle,
} from 'components/ui/BottomSheet/DisposableBottomSheet';
import { Portal } from 'react-native-portalize';
import i18n from 'i18n';

const GENERAL_INFO_SNAP_POINTS = [600];
const ARMOR_CLASS_SNAP_POINTS = [625];

export const MainCharacterSheetGeneralInfo = () => {
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();
  const { canEdit } = useCharacter();

  const armorClassRef =
    useRef<DisposableBottomSheetHandle<ArmorClassFormProps>>(null);
  const initiativeRef =
    useRef<DisposableBottomSheetHandle<InitiativeFormProps>>(null);
  const speedRef = useRef<DisposableBottomSheetHandle<SpeedFormProps>>(null);
  const passivePerceptionRef =
    useRef<DisposableBottomSheetHandle<PassivePerceptionFormProps>>(null);

  return (
    <View className="py-4 flex flex-col gap-2">
      {isLoading && <ActivityIndicator />}
      {generalInfo ? (
        <>
          <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
            <ArmorClass
              generalInfo={generalInfo}
              onLongPress={() => armorClassRef.current?.show({ generalInfo })}
              canEdit={canEdit}
            />

            <Initiative
              generalInfo={generalInfo}
              onLongPress={() => initiativeRef.current?.show({ generalInfo })}
              canEdit={canEdit}
            />

            <Speed
              generalInfo={generalInfo}
              onLongPress={() => speedRef.current?.show({ generalInfo })}
              canEdit={canEdit}
            />
          </View>

          <View className="flex flex-row justify-between flex-wrap px-2 gap-4">
            <Proficiency />

            <Exhaustion generalInfo={generalInfo} canEdit={canEdit} />

            <PassivePerception
              generalInfo={generalInfo}
              onLongPress={() => {
                passivePerceptionRef.current?.show({ generalInfo });
              }}
              canEdit={canEdit}
            />
          </View>
        </>
      ) : (
        <Text>{i18n.t('general.noDataFound')}</Text>
      )}

      <Portal>
        <DisposableBottomSheet
          ref={armorClassRef}
          snapPoints={ARMOR_CLASS_SNAP_POINTS}
          renderContent={({ params }) => <ArmorClassForm {...params} />}
        />

        <DisposableBottomSheet
          ref={initiativeRef}
          snapPoints={GENERAL_INFO_SNAP_POINTS}
          renderContent={({ params }) => <InitiativeForm {...params} />}
        />

        <DisposableBottomSheet
          ref={speedRef}
          snapPoints={GENERAL_INFO_SNAP_POINTS}
          renderContent={({ params }) => <SpeedForm {...params} />}
        />

        <DisposableBottomSheet
          ref={passivePerceptionRef}
          snapPoints={GENERAL_INFO_SNAP_POINTS}
          renderContent={({ params }) => <PassivePerceptionForm {...params} />}
        />
      </Portal>
    </View>
  );
};
