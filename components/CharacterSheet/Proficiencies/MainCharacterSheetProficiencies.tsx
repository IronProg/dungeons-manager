import { useCharacters } from 'contexts/CharactersContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Character, Save, Skill } from 'types/character';

type MainCharacterSheetAttributes = {
  character: Character;
};

export const MainCharacterSheetProficiencies = ({
  character,
}: MainCharacterSheetAttributes) => {
  return (
    <>
      <View className="flex flex-col bg-gray-100 rounded-lg px-4">
        <View className="flex flex-row flex-wrap py-2 w-full">
          {character.saves.map((save, index) => (
            <SaveCard key={index} save={save} />
          ))}
        </View>

        <View className="border-t border-gray-300 mb-2" />

        <View className="flex flex-row flex-wrap py-2 w-full">
          {character.skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </View>
      </View>
    </>
  );
};

type SaveCardProps = { save: Save };

const SaveCard = ({ save }: SaveCardProps) => {
  const { character, getModifier } = useCharacters();

  const attributeModifier = getModifier(save.attribute);
  const proficiencyModifier = character?.proficiency || 0;

  const modifier =
    attributeModifier + (save.proficiency ? proficiencyModifier : 0);

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
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

type SkillCardProps = { skill: Skill };

const SkillCard = ({ skill }: SkillCardProps) => {
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
