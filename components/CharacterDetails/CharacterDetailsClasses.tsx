import {
  useGetBackground,
  useUpdateBackgroundMutation,
} from 'services/backgrounds/background.api';
import { Character } from 'types/character';
import { DetailsEditableTextBox } from './shared/DetailsEditableTextBox';
import { useCallback } from 'react';
import i18n from 'i18n';
import { View } from 'react-native';

type UpdateBackgroundFormData = Omit<UpdateBackgroundParams, 'characterId'>;

type CharacterDetailsProps = {
  character: Character;
};

export const CharacterDetailsClasses = ({
  character,
}: CharacterDetailsProps) => {
  const { data: background, isLoading: backgroundLoading } = useGetBackground({
    characterId: character.id!,
  });

  const { mutate: updateBackground, isPending: backgroundPending } =
    useUpdateBackgroundMutation();

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
      <View className="flex flex-row items-between">
        <View className="w-1/2 pr-2">
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
