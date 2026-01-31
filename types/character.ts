export type HitDicesType = 'd6' | 'd8' | 'd10' | 'd12';

export type Character = {
  id?: number;
  name: string;
  proficiency: number;
  level: number;
  experience: number;
  generalInfo: CharacterGeneralInfo;
  currencies: Currencies;
  characterAttributes: Attribute[];
  saves: Save[];
  skills: Skill[];
  attacks: Attack[];
  resources: Resource[];
  features: Feature[];
};

export type CharacterGeneralInfo = {
  id?: number;
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
  initiativeExtraAttribute?: AttributesType;
  passivePerceptionCustomBonus?: number;
  passivePerceptionExtraAttribute?: AttributesType;
  exhaustion: number;
};

export type Attribute = {
  id?: number;
  name: AttributesType;
  value: number;
  tempValue?: number;
  modifier: number;
};

export type Save = {
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

export type Skill = {
  id?: number;
  name: string;
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
  damages: Damage[];
};

export type Damage = {
  id?: number;
  dice?: string;
  mainAttribute?: AttributesType;
  kind?: string;
  customBonus?: string;
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
