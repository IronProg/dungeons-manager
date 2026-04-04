import { CharacterDetailsBackground } from './CharacterDetailsBackground';
import { CharacterDetailsProficiencies } from './CharacterDetailsProficiencies';
import { CharacterDetailsMain } from './CharacterDetailsMain';
import { CharacterDetailsClasses } from './CharacterDetailsClasses';

import { Character } from 'types/character';
import { AppKeyboardAvoidingView } from 'components/ui/AppKeyboardAvoidingView';

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
      <CharacterDetailsMain characterId={character.id!} canEdit={canEdit} />
      <CharacterDetailsProficiencies character={character} canEdit={canEdit} />
      <CharacterDetailsBackground character={character} canEdit={canEdit} />
    </AppKeyboardAvoidingView>
  );
};
