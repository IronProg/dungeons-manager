import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import i18n from 'i18n';

import { useGetAllSkills } from 'services/skills/skill';
import { useGetAllSaves } from 'services/saves/save';
import { useCharacter } from 'contexts/CharacterContext';
import { useGetSkillBonus } from 'hooks/useSkillBonus';

import { SaveForm } from './Save/SaveForm';
import { SkillForm } from './Skill/SkillForm';

import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';

import type { Save, Skill } from 'types/character';

export const MainCharacterSheetSkills = () => {
  const { characterId } = useCharacter();
  const { data: saves, isLoading: isLoadingSaves } = useGetAllSaves({
    characterId: characterId!,
  });
  const { data: skills, isLoading: isLoadingSkills } = useGetAllSkills({
    characterId: characterId!,
  });

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
      <View className="flex flex-col rounded-lg px-4">
        <View className="flex flex-row flex-wrap py-2 w-full">
          {isLoadingSaves && <ActivityIndicator />}
          {saves && saves.length > 0 ? (
            saves.map((save, index) => (
              <SaveCard
                key={index}
                save={save}
                onLongPress={() => handleOpen({ save })}
              />
            ))
          ) : (
            <Text>No data found</Text>
          )}
        </View>

        <View className="border-t border-gray-300 mb-2" />

        <View className="flex flex-row flex-wrap py-2 w-full">
          {isLoadingSkills && <ActivityIndicator />}
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onLongPress={() => handleOpen({ skill })}
              />
            ))
          ) : (
            <Text>No data found</Text>
          )}
        </View>
      </View>

      <ReusableBottomSheetModal
        ref={bottomSheetRef}
        onDismiss={handleClose}
        snapPoints={[300, 600]}
      >
        {highlightedSave && (
          <SaveForm
            characterId={characterId!}
            save={highlightedSave}
            onClose={handleClose}
          />
        )}

        {highlightedSkill && (
          <SkillForm
            characterId={characterId!}
            skill={highlightedSkill}
            onClose={handleClose}
          />
        )}
      </ReusableBottomSheetModal>
    </>
  );
};

type SaveCardProps = { save: Save; onLongPress: () => void };

const SaveCard = ({ save, onLongPress }: SaveCardProps) => {
  const { modifiers, proficiencyBonus } = useCharacter();
  let modifier =
    (modifiers?.[save.mainAttribute] || 0) + (save.customBonus || 0);

  if (modifiers && save.extraAttribute) {
    modifier += modifiers[save.extraAttribute];
  }

  if (save.proficiency) {
    modifier += proficiencyBonus;
  }

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
        onLongPress={onLongPress}
        className={`flex flex-row items-center px-2 gap-2 border overflow-hidden rounded-lg w-full ${save?.proficiency && 'bg-green-200'}`}
      >
        <View className="min-w-0 flex-1 py-1">
          <Text
            numberOfLines={0}
            className="text-gray-900 text-sm font-semibold"
          >
            {i18n.t(`attributes.${save.mainAttribute}`)}
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
  const { getSkillBonus } = useGetSkillBonus();

  const modifier = getSkillBonus(skill.name);

  return (
    <View className="flex items-center justify-center w-[50%] p-2 py-1.5">
      <TouchableOpacity
        onLongPress={onLongPress}
        className={`flex-row flex items-center gap-2 rounded-lg px-3 py-2.5 border w-full ${skill.expertise ? 'bg-orange-200' : skill?.proficiency && 'bg-green-200'}`}
      >
        <View className="min-w-0 flex-1 flex flex-row flex-wrap py-1 justify-start items-center">
          <Text className="text-gray-900 text-sm font-semibold rounded-md">
            {i18n.t(`skills.${skill.name}`)}{' '}
          </Text>

          <Text className="text-gray-400 text-xs font-semibold rounded-md">
            ({i18n.t(`attributes.${skill.mainAttribute}`).substring(0, 3)})
          </Text>
        </View>

        <Text className="font-bold text-center rounded-md">
          {modifier > 0 && '+'}
          {modifier?.toFixed(0)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
