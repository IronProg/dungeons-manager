export type NpcEntryKind = 'trait' | 'reaction' | 'action' | 'legendaryAction';

export type NpcAbilityName =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type NpcSummary = {
  id: number;
  name: string;
  challengeRating: string;
  hitPoints: number;
};

export type NpcDamage = {
  id: number;
  diceAmount: number;
  diceSize: number;
  mainAttribute?: NpcAbilityName | null;
  customBonus?: number | null;
  kind?: string | null;
};

export type NpcAttack = {
  id: number;
  mainAttribute?: NpcAbilityName | null;
  applyProficiency: boolean;
  customBonus?: number | null;
  range?: string | null;
  properties?: string | null;
  description?: string | null;
};

export type NpcEntry = {
  id: number;
  kind: NpcEntryKind;
  title: string;
  description: string;
  cost?: string | null;
  npcAttack?: NpcAttack | null;
  npcDamages?: NpcDamage[] | null;
};

export type Npc = NpcSummary & {
  characterId?: number | null;
  proficiencyBonus: number;
  hitPointsLimit: number;
  hitPointsLimitTemporary?: number | null;
  temporaryHitPoints?: number | null;
  armorClass: number;
  speeds?: string | null;
  senses?: string | null;
  languages?: string | null;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  challengeRatingInfo?: string | null;
  entries: NpcEntry[];
};

export type NpcDamageParams = {
  id?: number;
  diceAmount?: number;
  diceSize?: number;
  mainAttribute?: NpcAbilityName | null;
  customBonus?: number | null;
  kind?: string | null;
  _destroy?: true;
};

export type NpcAttackParams = {
  id?: number;
  mainAttribute?: NpcAbilityName | null;
  applyProficiency?: boolean;
  customBonus?: number | null;
  range?: string | null;
  properties?: string | null;
  description?: string | null;
  _destroy?: true;
};

export type NpcEntryParams = {
  id?: number;
  kind?: NpcEntryKind;
  title?: string;
  description?: string;
  cost?: string | null;
  npcAttackAttributes?: NpcAttackParams;
  npcDamagesAttributes?: NpcDamageParams[];
  _destroy?: true;
};

export type NpcScalars = Partial<
  Pick<
    Npc,
    | 'name'
    | 'hitPoints'
    | 'hitPointsLimit'
    | 'hitPointsLimitTemporary'
    | 'temporaryHitPoints'
    | 'armorClass'
    | 'speeds'
    | 'senses'
    | 'languages'
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma'
    | 'challengeRating'
    | 'challengeRatingInfo'
  >
>;

export type NpcCreateParams = {
  name: string;
  characterId?: number;
};

export type NpcUpdateParams = NpcScalars & {
  entriesAttributes?: NpcEntryParams[];
};

export type NpcImportParams = {
  characterId?: number;
};
