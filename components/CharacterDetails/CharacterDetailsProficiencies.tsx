import { Character } from 'types/character';
import { DetailsEditableTextBox } from './shared/DetailsEditableTextBox';
import { useCallback } from 'react';
import i18n from 'i18n';
import {
  useGetProficiency,
  useUpdateProficiencyMutation,
} from 'services/proficiencies/proficiency.api';

type UpdateProficiencyFormData = Omit<UpdateProficiencyParams, 'characterId'>;

type CharacterDetailsProps = {
  character: Character;
  canEdit: boolean;
};

export const CharacterDetailsProficiencies = ({
  character,
  canEdit,
}: CharacterDetailsProps) => {
  const { data: proficiency, isLoading } = useGetProficiency();

  const { mutate: udpateProficiency, isPending } =
    useUpdateProficiencyMutation();

  const handleSaveProficiency = useCallback(
    (params: UpdateProficiencyFormData, callback: () => void) => {
      udpateProficiency(
        { characterId: character.id!, ...params },
        { onSuccess: () => callback() },
      );
    },
    [character.id, udpateProficiency],
  );

  return (
    <>
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={proficiency?.armors}
        label={i18n.t('proficiency.armors')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveProficiency({ armors: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={proficiency?.weapons}
        label={i18n.t('proficiency.weapons')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveProficiency({ weapons: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={proficiency?.tools}
        label={i18n.t('proficiency.tools')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveProficiency({ tools: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={proficiency?.languages}
        label={i18n.t('proficiency.languages')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveProficiency({ languages: newText }, callback)
        }
      />
    </>
  );
};
