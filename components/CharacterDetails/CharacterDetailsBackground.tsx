import { DetailsEditableTextBox } from '@/components/CharacterDetails/shared/DetailsEditableTextBox';
import i18n from '@/i18n';
import {
  useGetBackground,
  useUpdateBackgroundMutation,
} from '@/services/backgrounds/background.api';
import type { Character } from '@/types/character';

type UpdateBackgroundFormData = Omit<UpdateBackgroundParams, 'characterId'>;

type CharacterDetailsProps = {
  character: Character;
  canEdit: boolean;
};

export const CharacterDetailsBackground = ({
  character,
  canEdit,
}: CharacterDetailsProps) => {
  const { data: background, isLoading } = useGetBackground();

  const { mutate: updateBackground, isPending } = useUpdateBackgroundMutation();

  const handleSaveBackground = (
    params: UpdateBackgroundFormData,
    callback: () => void,
  ) => {
    updateBackground(
      { characterId: character.id!, ...params },
      { onSuccess: () => callback() },
    );
  };

  return (
    <>
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={background?.personalityTraits}
        label={i18n.t('background.personalityTraits')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ personalityTraits: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={background?.ideals}
        label={i18n.t('background.ideals')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ ideals: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        disabled={!canEdit}
        isLoading={isLoading}
        text={background?.bonds}
        label={i18n.t('background.bonds')}
        isPending={isPending}
        onSave={(newText, callback) =>
          handleSaveBackground({ bonds: newText }, callback)
        }
      />
      <DetailsEditableTextBox
        disabled={!canEdit}
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
