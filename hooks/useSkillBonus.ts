import { useCharacter } from 'contexts/CharacterContext';
import { useCallback } from 'react';
import { useGetAllSkills } from 'services/skills/skill';

export const useGetSkillBonus = () => {
  const { characterId, modifiers, proficiency } = useCharacter();
  const { data: skills } = useGetAllSkills({ characterId: characterId! });

  const getSkillBonus = useCallback(
    (name: string): number => {
      const skill = skills?.find((skill) => skill.name === name);

      if (!skill || !modifiers) return 0;

      let bonus = modifiers[skill.mainAttribute];

      if (skill.extraAttribute) bonus += modifiers[skill.extraAttribute];

      if (skill.customBonus) bonus += skill.customBonus;

      if (skill.proficiency) bonus += proficiency;

      if (skill.expertise) bonus += proficiency;

      return bonus;
    },
    [modifiers, proficiency, skills],
  );

  return { getSkillBonus };
};
