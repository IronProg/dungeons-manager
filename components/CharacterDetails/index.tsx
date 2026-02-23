import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { CharacterDetailsBackground } from './CharacterDetailsBackground';
import { CharacterDetailsProficiencies } from './CharacterDetailsProficiencies';
import { CharacterDetailsMain } from './CharacterDetailsMain';
import { CharacterDetailsClasses } from './CharacterDetailsClasses';

import { Character } from 'types/character';

type CharacterDetailsProps = {
  character: Character;
};

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  return (
    <KeyboardAwareScrollView
      className="flex-1"
      contentContainerClassName="grow gap-4 flex flex-col p-4"
    >
      <Text className="text-2xl font-medium text-center">
        {character?.name}
      </Text>

      <CharacterDetailsClasses character={character} />
      <CharacterDetailsMain characterId={character.id!} />
      <CharacterDetailsProficiencies character={character} />
      <CharacterDetailsBackground character={character} />
    </KeyboardAwareScrollView>
  );
};
