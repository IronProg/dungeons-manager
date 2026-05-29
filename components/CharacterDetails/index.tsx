import { CharacterDetailsBackground } from '@/components/CharacterDetails/CharacterDetailsBackground';
import { CharacterDetailsClasses } from '@/components/CharacterDetails/CharacterDetailsClasses';
import { CharacterDetailsMain } from '@/components/CharacterDetails/CharacterDetailsMain';
import { CharacterDetailsProficiencies } from '@/components/CharacterDetails/CharacterDetailsProficiencies';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import type { Character } from '@/types/character';

type CharacterDetailsProps = {
  character: Character;
  canEdit: boolean;
};

export const CharacterDetails = ({
  character,
  canEdit,
}: CharacterDetailsProps) => {
  return (
    <AppKeyboardAvoidingView>
      <CharacterDetailsClasses character={character} canEdit={canEdit} />
      <CharacterDetailsMain characterId={character.id} canEdit={canEdit} />
      <CharacterDetailsProficiencies character={character} canEdit={canEdit} />
      <CharacterDetailsBackground character={character} canEdit={canEdit} />
    </AppKeyboardAvoidingView>
  );
};
