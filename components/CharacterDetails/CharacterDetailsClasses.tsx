import {
  useGetBackground,
  useUpdateBackgroundMutation,
} from 'services/backgrounds/background.api';
import { DetailsEditableTextBox } from './shared/DetailsEditableTextBox';
import { useCallback } from 'react';
import i18n from 'i18n';
import { View } from 'react-native';
import {
  useGetCharacter,
  useUpdateCharacterMutation,
} from 'services/characters/character.api';

type UpdateBackgroundFormData = Omit<UpdateBackgroundParams, 'characterId'>;

type CharacterDetailsProps = {
  characterId: number;
};

export const CharacterDetailsClasses = ({
  characterId,
}: CharacterDetailsProps) => {
  const { data: character } = useGetCharacter({ id: characterId });

  const { data: background, isLoading: backgroundLoading } = useGetBackground({
    characterId: character?.id,
  });

  const { mutate: updateBackground, isPending: backgroundPending } =
    useUpdateBackgroundMutation();
  const { mutate: updateCharacter, isPending: characterPending } =
    useUpdateCharacterMutation();

  const handleSaveBackground = useCallback(
    (params: UpdateBackgroundFormData, callback: () => void) => {
      updateBackground(
        { characterId, ...params },
        { onSuccess: () => callback() },
      );
    },
    [characterId, updateBackground],
  );

  const handleSaveCharacter = useCallback(
    (params: UpdateCharacterParams, callback: () => void) => {
      updateCharacter(
        { id: params.id, name: params.name },
        { onSuccess: () => callback() },
      );
    },
    [updateCharacter],
  );

  if (!character) return;

  return (
    <>
      <View className="flex flex-row items-between flex-wrap gap-y-4">
        <View className="w-1/2 pr-2">
          <DetailsEditableTextBox
            isLoading={characterPending}
            text={character.name}
            label={i18n.t('background.name')}
            isPending={characterPending}
            onSave={(newText, callback) =>
              handleSaveCharacter(
                { id: character.id!, name: newText },
                callback,
              )
            }
          />
        </View>

        <View className="w-1/2 pl-2">
          <DetailsEditableTextBox
            isLoading={backgroundLoading}
            text={background?.race}
            label={i18n.t('background.race')}
            isPending={backgroundPending}
            onSave={(newText, callback) =>
              handleSaveBackground({ race: newText }, callback)
            }
          />
        </View>

        <View className="w-1/2 pr-2">
          <DetailsEditableTextBox
            isLoading={backgroundLoading}
            text={background?.background}
            label={i18n.t('background.background')}
            isPending={backgroundPending}
            onSave={(newText, callback) =>
              handleSaveBackground({ background: newText }, callback)
            }
          />
        </View>

        <View className="w-1/2 pl-2">
          <DetailsEditableTextBox
            isLoading={backgroundLoading}
            text={background?.alignment}
            label={i18n.t('background.alignment')}
            isPending={backgroundPending}
            onSave={(newText, callback) =>
              handleSaveBackground({ alignment: newText }, callback)
            }
          />
        </View>
      </View>
    </>
  );
};
