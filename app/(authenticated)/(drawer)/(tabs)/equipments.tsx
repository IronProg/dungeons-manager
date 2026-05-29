import React from 'react';
import { View } from 'react-native';

import { Currencies } from '@/components/Equipments/Currency';
import { Equipments } from '@/components/Equipments/Equipments';
import { Notes } from '@/components/Notes/Notes';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';

export default function CharacterSheetScreen() {
  return (
    <AppKeyboardAvoidingView>
      <View className="flex-col gap-6 flex items-stretch">
        <Currencies />

        <Equipments />

        <Notes />
      </View>
    </AppKeyboardAvoidingView>
  );
}
