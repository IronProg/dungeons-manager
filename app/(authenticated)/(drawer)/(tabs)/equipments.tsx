import React from 'react';

import { Container } from 'components/Container';
import { View } from 'react-native';
import { Notes } from 'components/Notes/Notes';
import { Equipments } from 'components/Equipments/Equipments';
import { ScrollView } from 'react-native-gesture-handler';

export default function CharacterSheetScreen() {
  return (
    <Container>
      <ScrollView>
        <View className="px-2 flex-col gap-6 flex items-stretch">
          <Equipments />

          <Notes />
        </View>
      </ScrollView>
    </Container>
  );
}
