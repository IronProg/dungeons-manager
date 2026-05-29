import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Experience } from '@/components/CharacterSheet/HitPoints/Experience/Experience.tsx';
import { HitDices } from '@/components/CharacterSheet/HitPoints/HitDices/HitDices.tsx';
import { HitPoints } from '@/components/CharacterSheet/HitPoints/HitPoints/HitPoints.tsx';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useGetCharacterGeneralInfo } from '@/services/generalInfos/generalInfos';

export const MainCharacterSheetHitPoints = () => {
  const { canEdit } = useCharacter();
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();

  return (
    <View className="flex flex-row justify-between flex-wrap p-4">
      {isLoading && <ActivityIndicator />}
      {generalInfo ? (
        <>
          <HitPoints generalInfo={generalInfo} canEdit={canEdit} />

          <HitDices generalInfo={generalInfo} canEdit={canEdit} />

          <Experience canEdit={canEdit} />
        </>
      ) : (
        <Text>{i18n.t('general.noDataFound')}</Text>
      )}
    </View>
  );
};
