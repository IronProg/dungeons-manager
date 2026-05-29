import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Attacks } from '@/components/WeaponsAndTools/Attacks/Attacks.tsx';
import { Features } from '@/components/WeaponsAndTools/Features/Features.tsx';
import { Resources } from '@/components/WeaponsAndTools/Resources/Resources.tsx';
import { useCharacter } from '@/contexts/CharacterContext';

export const WeaponsAndTools = () => {
  const { character, canEdit } = useCharacter();
  const { bottom } = useSafeAreaInsets();

  return (
    character && (
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
    )
  );
};
