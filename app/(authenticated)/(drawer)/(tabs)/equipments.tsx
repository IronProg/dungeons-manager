import React from 'react';

import { Container } from 'components/Container';
import { View } from 'react-native';
import { Notes } from 'components/Notes/Notes';
import { Equipments } from 'components/Equipments/Equipments';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function CharacterSheetScreen() {
  return (
    <Container>
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="grow gap-4 flex flex-col p-4"
      >
        <View className="px-2 flex-col gap-6 flex items-stretch">
          <Equipments />

          <Notes />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
}
