import React, { useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Save, Skill } from 'types/character';
import { SaveForm } from './Save/SaveForm';
import { SkillForm } from './Skill/SkillForm';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { useSaves } from 'contexts/SavesContext';
import { useSkills } from 'contexts/SkillsContext';

export const MainCharacterSheetProficiencies = () => {
  const [highlightedSave, setHighlightedSave] = useState<Save | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<Skill | null>(null);

  const { saves } = useSaves();
  const { skills } = useSkills();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback(
    ({ save, skill }: { save?: Save; skill?: Skill }) => {
      if (save) {
        setHighlightedSave(save);
      } else if (skill) {
        setHighlightedSkill(skill);
      }
      bottomSheetRef.current?.present();
    },
    [],
  );

  const handleClose = useCallback(() => {
    setHighlightedSave(null);
    setHighlightedSkill(null);
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <>
      <View className="flex flex-col bg-gray-100 rounded-lg px-4">
        <View className="flex flex-row flex-wrap py-2 w-full">
          {saves.map((save, index) => (
            <SaveCard
              key={index}
              save={save}
              onLongPress={() => handleOpen({ save })}
            />
          ))}
        </View>

        <View className="border-t border-gray-300 mb-2" />

        <View className="flex flex-row flex-wrap py-2 w-full">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              onLongPress={() => handleOpen({ skill })}
            />
          ))}
        </View>
      </View>

      <ReusableBottomSheetModal
        ref={bottomSheetRef}
        onDismiss={handleClose}
        snapPoints={[300, 600]}
      >
        {highlightedSave && (
          <SaveForm save={highlightedSave} onClose={handleClose} />
        )}

        {highlightedSkill && (
          <SkillForm skill={highlightedSkill} onClose={handleClose} />
        )}
      </ReusableBottomSheetModal>
    </>
  );
};

type SaveCardProps = { save: Save; onLongPress: () => void };

const SaveCard = ({ save, onLongPress }: SaveCardProps) => {
  const { getSaveBonus } = useSaves();

  const modifier = getSaveBonus(save.attribute);

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
        onLongPress={onLongPress}
        className={`flex flex-row flex items-center px-2 gap-2 border overflow-hidden rounded-lg w-full ${save.proficiency && 'bg-green-200'}`}
      >
        <View className="min-w-0 flex-1 py-1">
          <Text
            numberOfLines={0}
            className="text-gray-900 text-sm font-semibold"
          >
            {save.attribute}
          </Text>
        </View>

        <Text className="font-bold text-center py-1">
          {modifier > 0 && '+'}
          {modifier}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

type SkillCardProps = { skill: Skill; onLongPress: () => void };

const SkillCard = ({ skill, onLongPress }: SkillCardProps) => {
  const { getSkillBonus } = useSkills();

  const modifier = getSkillBonus(skill.name);

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
        onLongPress={onLongPress}
        className={`flex flex-row flex items-center px-2 gap-2 border rounded-lg w-full ${skill.expertise ? 'bg-orange-200' : skill.proficiency && 'bg-green-200'}`}
      >
        <View className="min-w-0 flex-1 py-1">
          <Text className="grow text-gray-900 text-sm font-semibold rounded-md">
            {skill.name} ({skill.attribute.substring(0, 3)})
          </Text>
        </View>

        <Text className="font-bold text-center rounded-md">
          {modifier > 0 && '+'}
          {modifier.toFixed(0)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
