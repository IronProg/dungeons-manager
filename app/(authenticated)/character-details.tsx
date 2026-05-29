import { Redirect } from 'expo-router';

import { CharacterDetails } from '@/components/CharacterDetails';
import { useCharacter } from '@/contexts/CharacterContext';

export default function CharacterDetailsScreen() {
  const { character, canEdit } = useCharacter();

  if (!character) {
    return <Redirect href="/(authenticated)/(drawer)/new-character" />;
  }

  return <CharacterDetails character={character} canEdit={canEdit} />;
}
