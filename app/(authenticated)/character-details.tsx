import { useCharacter } from 'contexts/CharacterContext';
import { CharacterDetails } from 'components/CharacterDetails';
import { Redirect } from 'expo-router';

export default function CharacterDetailsScreen() {
  const { character } = useCharacter();

  if (!character) {
    return <Redirect href={'/(authenticated)/(drawer)/new-character'} />;
  }

  return <CharacterDetails character={character} />;
}
