import { CharacterDetailsBackground } from '@/components/CharacterDetails/CharacterDetailsBackground.tsx';
import { CharacterDetailsClasses } from '@/components/CharacterDetails/CharacterDetailsClasses.tsx';
import { CharacterDetailsMain } from '@/components/CharacterDetails/CharacterDetailsMain.tsx';
import { CharacterDetailsProficiencies } from '@/components/CharacterDetails/CharacterDetailsProficiencies.tsx';
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
