import { useAttributes } from 'contexts/AttributesContext';
import { useCharacters } from 'contexts/CharactersContext';
import { SkillsContext } from 'contexts/SkillsContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Skill } from 'types/character';

export type SkillsProviderProps = {
  skills: Skill[];
  updateSkills: (newSkills: Skill[]) => void;
  getSkillBonus: (name: string) => number;
};

export const SkillsProvider = ({ children }: { children: ReactNode }) => {
  const { character, proficiency } = useCharacters();
  const { modifiers } = useAttributes();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (character) {
      setSkills(character.skills);
    }
  }, [character]);

  const getSkillBonus = useCallback(
    (name: string) => {
      const selectedSkill = skills.find((skill) => skill.name === name);

      if (!selectedSkill) return 0;

      let modifier = modifiers[selectedSkill.attribute];

      if (selectedSkill.expertise) {
        modifier += proficiency;
      } else if (selectedSkill.proficiency) {
        modifier += proficiency;
      }

      if (selectedSkill.customBonus) {
        modifier += selectedSkill.customBonus;
      }

      return modifier;
    },
    [modifiers, proficiency, skills],
  );

  const updateSkills = useCallback((newSaves: Skill[]) => {
    setSkills(newSaves);
  }, []);

  const value: SkillsProviderProps = { skills, updateSkills, getSkillBonus };

  return (
    <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>
  );
};
