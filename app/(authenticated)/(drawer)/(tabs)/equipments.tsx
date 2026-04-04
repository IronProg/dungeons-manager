import React from 'react';
import { View } from 'react-native';
import { AppKeyboardAvoidingView } from 'components/ui/AppKeyboardAvoidingView';

import { Notes } from 'components/Notes/Notes';
import { Equipments } from 'components/Equipments/Equipments';
import { Currencies } from 'components/Equipments/Currency';

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
