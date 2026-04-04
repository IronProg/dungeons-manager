import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import { useCharacter } from 'contexts/CharacterContext';

import { Attacks } from './Attacks/Attacks';
import { Resources } from './Resources/Resources';
import { Features } from './Features/Features';

export const WeaponsAndTools = () => {
  const { character, canEdit } = useCharacter();
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      {character && (
        <ScrollView
          scrollEnabled
          contentContainerClassName="flex flex-col gap-4 p-4"
          contentContainerStyle={{ paddingBottom: bottom + 16 }}
          className="bg-slate-200 flex-1"
        >
          <View>
            <Attacks canEdit={canEdit} />
          </View>

          <View>
            <Resources canEdit={canEdit} />
          </View>

          <View>
            <Features canEdit={canEdit} />
          </View>
        </ScrollView>
      )}
    </>
  );
};
