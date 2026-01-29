import { Modifiers, Skill } from 'types/character';

type calculateSkillBonusProps = {
  modifiers: Modifiers;
  proficiencyBonus: number;
  skill: Skill;
};

export const calculateSkillBonus = ({
  modifiers,
  proficiencyBonus,
  skill,
}: calculateSkillBonusProps): number => {
  const attributeBonus = modifiers[skill.mainAttribute];

  let modifier = attributeBonus;

  if (skill.expertise) {
    modifier += proficiencyBonus * 2;
  } else {
    modifier += proficiencyBonus;
  }

  if (skill.customBonus) modifier += skill.customBonus;

  return modifier;
};
