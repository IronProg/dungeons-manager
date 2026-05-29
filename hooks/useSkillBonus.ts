import { useCharacter } from '@/contexts/CharacterContext';
import { useGetAllSkills } from '@/services/skills/skill';

export const useGetSkillBonus = () => {
  const { modifiers, proficiencyBonus } = useCharacter();
  const { data: skills } = useGetAllSkills();

  const getSkillBonus = (name: string): number => {
    const skill = skills?.find((skill) => skill.name === name);

    if (!skill || !modifiers) return 0;

    let bonus = modifiers[skill.mainAttribute];

    if (skill.extraAttribute) bonus += modifiers[skill.extraAttribute];

    if (skill.customBonus) bonus += skill.customBonus;

    if (skill.proficiency) bonus += proficiencyBonus;

    if (skill.expertise) bonus += proficiencyBonus;

    return bonus;
  };

  return { getSkillBonus };
};
