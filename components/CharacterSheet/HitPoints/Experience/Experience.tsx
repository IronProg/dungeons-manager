import {
  DisposableBottomSheet,
  DisposableBottomSheetHandle,
} from 'components/ui/BottomSheet/DisposableBottomSheet';
import { useCharacter } from 'contexts/CharacterContext';
import i18n from 'i18n';
import { Book } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRef } from 'react';
import { Portal } from 'react-native-portalize';
import { ExperienceForm, ExperienceFormProps } from './ExperienceForm';

type ExperienceProps = { canEdit: boolean };

const snapPoints = [585];

export const Experience = ({ canEdit }: ExperienceProps) => {
  const { character } = useCharacter();

  const ref = useRef<DisposableBottomSheetHandle<ExperienceFormProps>>(null);

  return (
    <>
      <TouchableOpacity
        disabled={!canEdit}
        onLongPress={() => ref.current?.show({ character: character! })}
        className="relative flex flex-col items-center justify-center w-[90px]"
      >
        <Book size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />

        <View className="absolute flex flex-col items-center justify-center h-full w-full">
          <Text className="text-gray-900 text-sm font-semibold text-center">
            {i18n.t('titles.experience')}
          </Text>
          <Text className="text-2xl font-bold text-center">
            {character?.experience}
          </Text>
        </View>
      </TouchableOpacity>

      <Portal>
        <DisposableBottomSheet
          ref={ref}
          snapPoints={snapPoints}
          renderContent={({ params }) => <ExperienceForm {...params} />}
        />
      </Portal>
    </>
  );
};
