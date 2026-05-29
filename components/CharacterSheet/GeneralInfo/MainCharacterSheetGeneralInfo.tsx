import React, { useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';

import { ArmorClass } from '@/components/CharacterSheet/GeneralInfo/ArmorClass/ArmorClass';
import type { ArmorClassFormProps } from '@/components/CharacterSheet/GeneralInfo/ArmorClass/ArmorClassForm';
import { ArmorClassForm } from '@/components/CharacterSheet/GeneralInfo/ArmorClass/ArmorClassForm';
import { Exhaustion } from '@/components/CharacterSheet/GeneralInfo/Exhaustion/Exhaustion';
import { Initiative } from '@/components/CharacterSheet/GeneralInfo/Initiative/Initiative';
import type { InitiativeFormProps } from '@/components/CharacterSheet/GeneralInfo/Initiative/InitiativeForm';
import { InitiativeForm } from '@/components/CharacterSheet/GeneralInfo/Initiative/InitiativeForm';
import { PassivePerception } from '@/components/CharacterSheet/GeneralInfo/PassivePerception/PassivePerception';
import type { PassivePerceptionFormProps } from '@/components/CharacterSheet/GeneralInfo/PassivePerception/PassivePerceptionForm';
import { PassivePerceptionForm } from '@/components/CharacterSheet/GeneralInfo/PassivePerception/PassivePerceptionForm';
import { Proficiency } from '@/components/CharacterSheet/GeneralInfo/Proficiency/Proficiency';
import { Speed } from '@/components/CharacterSheet/GeneralInfo/Speed/Speed';
import type { SpeedFormProps } from '@/components/CharacterSheet/GeneralInfo/Speed/SpeedForm';
import { SpeedForm } from '@/components/CharacterSheet/GeneralInfo/Speed/SpeedForm';
import { DisposableBottomSheet } from '@/components/ui/BottomSheet/DisposableBottomSheet';
import type { DisposableBottomSheetHandle } from '@/components/ui/BottomSheet/DisposableBottomSheet';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useGetCharacterGeneralInfo } from '@/services/generalInfos/generalInfos';

const PASSIVE_PERCEPTION_SNAP_POINTS = [300];
const INITIATIVE_SNAP_POINTS = [300];
const SPEED_SNAP_POINTS = [300];
const ARMOR_CLASS_SNAP_POINTS = [300];

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
          snapPoints={INITIATIVE_SNAP_POINTS}
          renderContent={({ params }) => <InitiativeForm {...params} />}
        />

        <DisposableBottomSheet
          ref={speedRef}
          snapPoints={SPEED_SNAP_POINTS}
          renderContent={({ params }) => <SpeedForm {...params} />}
        />

        <DisposableBottomSheet
          ref={passivePerceptionRef}
          snapPoints={PASSIVE_PERCEPTION_SNAP_POINTS}
          renderContent={({ params }) => <PassivePerceptionForm {...params} />}
        />
      </Portal>
    </View>
  );
};
