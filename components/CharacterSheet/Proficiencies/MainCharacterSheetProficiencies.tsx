import { useCharacters } from 'contexts/CharactersContext';
import React, { useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character, Save, Skill } from 'types/character';
import { SaveForm } from './Save/SaveForm';
import { SkillForm } from './Skill/SkillForm';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';

type MainCharacterSheetAttributes = {
  character: Character;
};

export const MainCharacterSheetProficiencies = ({
  character,
}: MainCharacterSheetAttributes) => {
  const [highlightedSave, setHighlightedSave] = useState<Save | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<Skill | null>(null);

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
          {character.saves.map((save, index) => (
            <SaveCard
              key={index}
              save={save}
              onLongPress={() => handleOpen({ save })}
            />
          ))}
        </View>

        <View className="border-t border-gray-300 mb-2" />

        <View className="flex flex-row flex-wrap py-2 w-full">
          {character.skills.map((skill) => (
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
  const { character, getModifier } = useCharacters();

  const attributeModifier = getModifier(save.attribute);
  const proficiencyModifier = character?.proficiency || 0;

  let modifier =
    attributeModifier + (save.proficiency ? proficiencyModifier : 0);

  if (save.customBonus) {
    modifier += save.customBonus;
  }

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
        onLongPress={onLongPress}
        className={`flex flex-row flex items-stretch gap-2 border rounded-lg w-full ${save.proficiency && 'bg-green-200'}`}
      >
        <Text className="grow text-gray-900 text-sm font-semibold px-2 rounded-md py-1">
          {save.attribute}
        </Text>
        <Text className="font-bold text-center px-2 rounded-md py-1">
          {modifier > 0 && '+'}
          {modifier}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

type SkillCardProps = { skill: Skill; onLongPress: () => void };

const SkillCard = ({ skill, onLongPress }: SkillCardProps) => {
  const { character, getModifier } = useCharacters();

  let modifier = 0;

  modifier = getModifier(skill.attribute);

  if (character?.proficiency) {
    if (skill.expertise) modifier += character.proficiency * 2;
    else if (skill.proficiency) modifier += character.proficiency;
  }

  if (skill.customBonus) modifier += skill.customBonus;

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
        onLongPress={onLongPress}
        className={`flex flex-row flex items-stretch gap-2 border rounded-lg w-full ${skill.expertise ? 'bg-orange-200' : skill.proficiency && 'bg-green-200'}`}
      >
        <Text className="grow text-gray-900 text-sm font-semibold px-2 rounded-md py-1">
          {skill.name} ({skill.attribute.substring(0, 3)})
        </Text>
        <Text className="font-bold text-center px-2 rounded-md py-1">
          {modifier > 0 && '+'}
          {modifier.toFixed(0)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
