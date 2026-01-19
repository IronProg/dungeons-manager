export type AttributesType =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type HitDicesType = 'd6' | 'd8' | 'd10' | 'd12';

export type Character = {
  id?: number;
  name: string;
  proficiency: number;
  level: number;
  experience: number;
  generalInfo: CharacterGeneralInfo;
  attributes: Attribute[];
  saves: Save[];
  skills: Skill[];
  attacks: Attack[];
  resources: Resource[];
  features: Feature[];
};

export type CharacterGeneralInfo = {
  hitPoints: number;
  hitPointsLimit: number;
  hitPointsLimitTemporary?: number;
  temporaryHitPoints?: number;
  armorClassBase: number;
  armorClassFirstAttribute?: AttributesType;
  armorClassSecondAttribute?: AttributesType;
  speed: number;
  hitDices: number;
  hitDicesMaximum: number;
  hitDicesSize: HitDicesType;
  speedClimbing?: number;
  speedFlying?: number;
  initiativeCustomBonus?: number;
  passivePerceptionCustomBonus?: number;
  exhaustion: number;
};

export type Attribute = {
  name: AttributesType;
  value: number;
  tempValue?: number;
  modifier: number;
};

export type Save = {
  attribute: AttributesType;
  proficiency: boolean;
  customBonus?: number;
};

export type Feature = {
  title: string;
  description: string;
  origin: string;
};

export type Skill = {
  name: string;
  attribute: AttributesType;
  proficiency: boolean;
  expertise?: boolean;
  customBonus?: number;
};

export type Attack = {
  name: string;
  attribute: AttributesType;
  applyProficiency: boolean;
  range: string;
  damages: Damage[];
  properties: string;
  description?: string;
};

export type Damage = {
  dice: string;
  attribute: AttributesType;
  kind: string;
  customBonus?: string;
};

export type Resource = {
  name: string;
  amount: number;
  max: number;
  description?: string;
};

export type Modifiers = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};
