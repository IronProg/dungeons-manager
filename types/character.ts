import type { Table } from '@/types/table';

export type HitDicesType = 'd6' | 'd8' | 'd10' | 'd12';
export type SpellSlotKindType = 'normal' | 'pact';
export type SpellSlotLevelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SpellSchoolType =
  | 'abjuration'
  | 'conjuration'
  | 'divination'
  | 'enchantment'
  | 'evocation'
  | 'illusion'
  | 'necromancy'
  | 'transmutation';
export type SkillType =
  | 'acrobatics'
  | 'animal_handling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleight_of_hand'
  | 'stealth'
  | 'survival';

export type Character = {
  id?: number;
  name: string;
  proficiencyBonus: number;
  level: number;
  experience: number;
  table?: Table;
  generalInfo: CharacterGeneralInfo;
  currencies: Currencies;
  characterAttributes: Attribute[];
  savingThrows: SavingThrow[];
  skills: Skill[];
  attacks: Attack[];
  resources: Resource[];
  features: Feature[];
  isOwner?: boolean;
};

export type CharacterGeneralInfo = {
  id?: number;
  hitPoints: number;
  hitPointsLimit: number;
  hitPointsLimitTemporary?: number;
  temporaryHitPoints?: number;
  armorClassBase: number;
  armorClassFirstAttribute?: AttributesType | null;
  armorClassSecondAttribute?: AttributesType | null;
  hitDices?: number;
  hitDicesMaximum?: number;
  hitDicesSize?: HitDicesType;
  speed: number;
  speedClimbing?: number;
  speedFlying?: number;
  initiativeCustomBonus?: number;
  initiativeExtraAttribute?: AttributesType;
  passivePerceptionCustomBonus?: number;
  passivePerceptionExtraAttribute?: AttributesType;
  exhaustion: number;
};

export type Note = {
  id?: number;
  text: string;
};

export type Attribute = {
  id?: number;
  name: AttributesType;
  value: number;
  tempValue?: number | null;
  modifier: number;
};

export type CharacterClass = {
  id?: number;
  name: string;
  level: number;
  hitDice: HitDicesType;
  hitDiceAmount: number;
  castingKind?: CastingKindType;
};

export type SavingThrow = {
  id?: number;
  mainAttribute: AttributesType;
  proficiency: boolean;
  customBonus?: number;
  extraAttribute?: AttributesType;
};

export type Feature = {
  id?: number;
  title: string;
  description: string;
  origin?: string;
};

export type Equipment = {
  id?: number;
  name: string;
  amount: number;
  description: string;
};

export type Skill = {
  id?: number;
  name: SkillType;
  mainAttribute: AttributesType;
  proficiency: boolean;
  expertise?: boolean;
  customBonus?: number;
  extraAttribute?: AttributesType;
};

export type Currencies = {
  id?: number;
  copperPoints: number;
  silverPoints: number;
  electrumPoints: number;
  goldPoints: number;
  platinumPoints: number;
};

export type Attack = {
  id?: number;
  name: string;
  mainAttribute?: AttributesType;
  applyProficiency: boolean;
  customBonus?: number;
  range?: string;
  properties?: string;
  description?: string;
  originKind?: string;
  damages: Damage[];
};

export type Damage = {
  id?: number;
  diceAmount?: number;
  diceSize?: number;
  mainAttribute?: AttributesType;
  kind?: string;
  customBonus?: number;
  higherLevel?: boolean;
};

export type Resource = {
  id?: number;
  name: string;
  amount: number;
  max?: number;
};

export type Modifiers = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Proficiency = {
  id?: number;
  armors: string;
  weapons: string;
  tools: string;
  languages: string;
};

export type Background = {
  id?: number;
  alignment: string;
  background: string;
  bonds: string;
  flaws: string;
  ideals: string;
  personalityTraits: string;
  race: string;
};

export type Spell = {
  id?: number;
  name: string;
  level: SpellSlotLevelType;
  school: SpellSchoolType;
  castingTime: string;
  components: string;
  concentration: boolean;
  ritual: boolean;
  description: string;
  duration: string;
  higherLevelDescription: string;
  innateTotal: number;
  material: boolean;
  materialDescription?: string;
  prepared: boolean;
  range: string;
  somatic: boolean;
  target: string;
  verbal: boolean;
  attack?: Attack;
  damages: Damage[];
  higherLevelsDamages: Damage[];
};

export type SpellSlot = {
  id?: number;
  level: number;
  kind: SpellSlotKindType;
  total: number;
  amount: number;
};
