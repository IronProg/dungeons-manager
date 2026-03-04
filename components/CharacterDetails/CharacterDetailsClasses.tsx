import { useMemo } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Edit } from 'lucide-react-native';
import i18n from 'i18n';

import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { useGetAllClasses } from 'services/classes/class';

import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { ClassesForm } from './Forms/ClassesForm';

import { Character, CharacterClass } from 'types/character';

type CharacterDetailsProps = {
  character: Character;
};

export const CharacterDetailsClasses = ({
  character,
}: CharacterDetailsProps) => {
  const { ref: bottomSheetRef, open, close } = useBottomSheetRef();

  const { data: characterClasses, isPending } = useGetAllClasses();

  const totalLevels = useMemo(() => {
    if (!characterClasses || characterClasses.length === 0) return 0;

    const levels = characterClasses.map((cls) => cls.level || 0);

    return levels.reduce((acc, item) => acc + item, 0);
  }, [characterClasses]);

  return (
    <>
      <View className="flex flex-col gap-2 border-neutral-200 bg-white p-2 rounded-lg shadow-sm">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-lg font-medium">{i18n.t('classes.title')}</Text>

          {characterClasses && characterClasses.length > 0 && (
            <Text className="text-lg font-medium">
              {i18n.t('classes.level')}: {totalLevels}
            </Text>
          )}

          <TouchableOpacity
            onPress={open}
            hitSlop={15}
            className="rounded-full h-10 w-10 bg-purple-500 flex items-center justify-center"
          >
            <Edit size={16} color={'white'} />
          </TouchableOpacity>
        </View>

        {isPending ? (
          <View className="flex flex-row w-full justify-center">
            <ActivityIndicator />
          </View>
        ) : (
          <View className="flex flex-col gap-1">
            <View className="flex flex-row">
              <Text className="w-4/12 font-medium">
                {i18n.t('classes.name')}
              </Text>
              <Text className="w-2/12 font-medium text-center">
                {i18n.t('classes.level')}
              </Text>
              <Text className="w-2/12 font-medium text-center">
                {i18n.t('classes.hitDice')}
              </Text>
              <Text className="w-4/12 font-medium">
                {i18n.t('classes.castingKind')}
              </Text>
            </View>

            {characterClasses?.map((characterClass) => (
              <ClassListItem
                key={characterClass.id}
                characterClass={characterClass}
              />
            ))}
          </View>
        )}
      </View>

      <ReusableBottomSheetModal
        onDismiss={close}
        ref={bottomSheetRef}
        snapPoints={[700]}
      >
        <ClassesForm
          onClose={close}
          character={character}
          characterClasses={characterClasses!}
        />
      </ReusableBottomSheetModal>
    </>
  );
};

type ClassListItemProps = {
  characterClass: CharacterClass;
};
const ClassListItem = ({ characterClass }: ClassListItemProps) => {
  return (
    <View className="flex flex-row border-neutral-200 border-t pt-1">
      <Text className="w-4/12">{characterClass.name}</Text>
      <Text className="w-2/12 text-center">{characterClass.level}</Text>
      <Text className="w-2/12 text-center">{characterClass.hitDice}</Text>
      {characterClass.castingKind && (
        <Text className="w-4/12">
          {i18n.t(`classes.castingKinds.${characterClass.castingKind}`)}
        </Text>
      )}
    </View>
  );
};
