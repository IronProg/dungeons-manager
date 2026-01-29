import { NewCharacter } from 'components/Characters/NewCharacter';
import { ScrollView } from 'react-native-gesture-handler';

export const NewCharacterScreen = () => {
  return (
    <ScrollView contentContainerClassName="flex-1 flex-col">
      <NewCharacter />
    </ScrollView>
  );
};
