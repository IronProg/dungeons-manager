import {
  useGetBackground,
  useUpdateBackgroundMutation,
} from 'services/backgrounds/background.api';
import { Character } from 'types/character';
import { DetailsEditableTextBox } from './shared/DetailsEditableTextBox';
import { useCallback } from 'react';
import i18n from 'i18n';

type UpdateBackgroundFormData = Omit<UpdateBackgroundParams, 'characterId'>;

type CharacterDetailsProps = {
  character: Character;
};

export const CharacterDetailsBackground = ({
  character,
}: CharacterDetailsProps) => {
  const { data: background, isLoading } = useGetBackground();

  const { mutate: updateBackground, isPending } = useUpdateBackgroundMutation();

  const handleSaveBackground = useCallback(
    (params: UpdateBackgroundFormData, callback: () => void) => {
      updateBackground(
        { characterId: character.id!, ...params },
        { onSuccess: () => callback() },
      );
    },
    [character.id, updateBackground],
  );

  return (
    <>
      <DetailsEditableTextBox
        isLoading={isLoading}
        text={background?.personalityTraits}
        label={i18n.t('background.personalityTraits')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ personalityTraits: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        isLoading={isLoading}
        text={background?.ideals}
        label={i18n.t('background.ideals')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ ideals: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        isLoading={isLoading}
        text={background?.bonds}
        label={i18n.t('background.bonds')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ bonds: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        isLoading={isLoading}
        text={background?.flaws}
        label={i18n.t('background.flaws')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ flaws: newText }, callback)
        }
      />
    </>
  );
};
