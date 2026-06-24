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
import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useGetCharacterGeneralInfo } from '@/services/generalInfos/generalInfos';

export const MainCharacterSheetGeneralInfo = () => {
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();
  const { canEdit } = useCharacter();

  const armorClassRef =
    useRef<AdaptiveBottomSheetHandle<ArmorClassFormProps>>(null);
  const initiativeRef =
    useRef<AdaptiveBottomSheetHandle<InitiativeFormProps>>(null);
  const speedRef = useRef<AdaptiveBottomSheetHandle<SpeedFormProps>>(null);
  const passivePerceptionRef =
    useRef<AdaptiveBottomSheetHandle<PassivePerceptionFormProps>>(null);

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
        <AdaptiveBottomSheet
          ref={armorClassRef}
          renderContent={({ params }) => <ArmorClassForm {...params} />}
        />

        <AdaptiveBottomSheet
          ref={initiativeRef}
          renderContent={({ params }) => <InitiativeForm {...params} />}
        />

        <AdaptiveBottomSheet
          ref={speedRef}
          renderContent={({ params }) => <SpeedForm {...params} />}
        />

        <AdaptiveBottomSheet
          ref={passivePerceptionRef}
          renderContent={({ params }) => <PassivePerceptionForm {...params} />}
        />
      </Portal>
    </View>
  );
};
