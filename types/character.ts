export type AttributesType =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type Character = {
  id?: number;
  name: string;
  hitPoints: number;
  hitPointsLimit: number;
  temporaryHitPoints: number;
  armorClass: number;
  speed: number;
  proficiency: number;
  initiative: number;
  passivePerception: number;
  experience: number;
  attributes: Attribute[];
  saves: Save[];
  skills: Skill[];
  attacks: Attack[];
  resources: Resource[];
  features: Feature[];
};

export type Attribute = {
  name: AttributesType;
  value: number;
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
