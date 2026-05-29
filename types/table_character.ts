import type {
  Attribute,
  CharacterGeneralInfo,
  Currencies,
  Resource,
  SavingThrow,
  Skill,
} from '@/types/character.ts';

export type TableCharacter = {
  id: number;
  name: string;
  level: number;
  proficiencyBonus: number;
  generalInfo: CharacterGeneralInfo;
  hitDicesMaximum: number;
  hitDiceAmount: number;
  characterAttributes: Attribute[];
  savingThrows: SavingThrow[];
  currencies: Currencies;
  resources: Resource[];
  perceptionSkill: Skill;
};
