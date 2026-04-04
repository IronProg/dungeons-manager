import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useCharacter } from 'contexts/CharacterContext';
import { useGetCharacterGeneralInfo } from 'services/generalInfos/generalInfos';

import { Experience } from './Experience/Experience';
import { HitDices } from './HitDices/HitDices';
import { HitPoints } from './HitPoints/HitPoints';

export const MainCharacterSheetHitPoints = () => {
  const { canEdit } = useCharacter();
  const { data: generalInfo, isLoading } = useGetCharacterGeneralInfo();

  return (
    <>
      <View className="flex flex-row justify-between flex-wrap p-4">
        {isLoading && <ActivityIndicator />}
        {generalInfo ? (
          <>
            <HitPoints generalInfo={generalInfo} canEdit={canEdit} />

            <HitDices generalInfo={generalInfo} canEdit={canEdit} />

            <Experience canEdit={canEdit} />
          </>
        ) : (
          <Text>No data found</Text>
        )}
      </View>
    </>
  );
};
