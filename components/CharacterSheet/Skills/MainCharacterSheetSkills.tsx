import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import i18n from 'i18n';

import { useGetAllSkills } from 'services/skills/skill';
import { useGetAllSavingThrows } from 'services/savingThrows/savingThrow';
import { useCharacter } from 'contexts/CharacterContext';
import { useDiceRoll } from 'contexts/DiceRollContext';
import { useGetSkillBonus } from 'hooks/useSkillBonus';

import { SavingThrowForm } from './SavingThrow/SavingThrowForm';
import { SkillForm } from './Skill/SkillForm';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';

import type { SavingThrow, Skill } from 'types/character';

export const MainCharacterSheetSkills = () => {
  const { characterId, canEdit } = useCharacter();
  const { data: savingThrows, isLoading: isLoadingSavingThrows } =
    useGetAllSavingThrows();

  const { data: skills, isLoading: isLoadingSkills } = useGetAllSkills();

  const [highlightedSavingThrow, setHighlightedSavingThrow] =
    useState<SavingThrow | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<Skill | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback(
    ({ savingThrow, skill }: { savingThrow?: SavingThrow; skill?: Skill }) => {
      if (!canEdit) return;

      if (savingThrow) {
        setHighlightedSavingThrow(savingThrow);
      } else if (skill) {
        setHighlightedSkill(skill);
      }
      bottomSheetRef.current?.present();
    },
    [canEdit],
  );

  const handleClose = useCallback(() => {
    setHighlightedSavingThrow(null);
    setHighlightedSkill(null);
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <>
      <View className="flex flex-col rounded-lg px-4">
        <View className="flex flex-row flex-wrap py-2 w-full">
          {isLoadingSavingThrows && <ActivityIndicator />}
          {savingThrows && savingThrows.length > 0 ? (
            savingThrows.map((savingThrow, index) => (
              <SavingThrowCard
                key={index}
                savingThrow={savingThrow}
                onLongPress={() => handleOpen({ savingThrow })}
                canEdit={canEdit}
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
                canEdit={canEdit}
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
        {highlightedSavingThrow && (
          <SavingThrowForm
            characterId={characterId!}
            savingThrow={highlightedSavingThrow}
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

type SavingThrowCardProps = {
  savingThrow: SavingThrow;
  onLongPress: () => void;
  canEdit: boolean;
};

const SavingThrowCard = ({
  savingThrow,
  onLongPress,
  canEdit,
}: SavingThrowCardProps) => {
  const { simpleRoll } = useDiceRoll();
  const { modifiers, proficiencyBonus } = useCharacter();
  let modifier =
    (modifiers?.[savingThrow.mainAttribute] || 0) +
    (savingThrow.customBonus || 0);

  if (modifiers && savingThrow.extraAttribute) {
    modifier += modifiers[savingThrow.extraAttribute];
  }

  if (savingThrow.proficiency) {
    modifier += proficiencyBonus;
  }

  const handleRoll = useCallback(() => {
    simpleRoll([modifier]);
  }, [modifier, simpleRoll]);

  return (
    <View className="flex items-center justify-center w-[50%] pr-2 mb-2">
      <TouchableOpacity
        onPress={handleRoll}
        onLongPress={canEdit ? onLongPress : undefined}
        className={`flex flex-row items-center px-2 gap-2 border overflow-hidden rounded-lg w-full ${savingThrow?.proficiency && 'bg-green-200'}`}
      >
        <View className="min-w-0 flex-1 py-1">
          <Text
            numberOfLines={0}
            className="text-gray-900 text-sm font-semibold"
          >
            {i18n.t(`attributes.${savingThrow.mainAttribute}`)}
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

type SkillCardProps = {
  skill: Skill;
  onLongPress: () => void;
  canEdit: boolean;
};

const SkillCard = ({ skill, onLongPress, canEdit }: SkillCardProps) => {
  const { simpleRoll } = useDiceRoll();
  const { getSkillBonus } = useGetSkillBonus();

  const modifier = getSkillBonus(skill.name);

  const handleRoll = useCallback(() => {
    simpleRoll([modifier]);
  }, [modifier, simpleRoll]);

  return (
    <View className="flex items-center justify-center w-[50%] p-2 py-1.5">
      <TouchableOpacity
        onPress={handleRoll}
        onLongPress={canEdit ? onLongPress : undefined}
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
